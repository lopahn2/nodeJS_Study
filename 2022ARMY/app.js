const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const roomRouter = require('./routes/room');

const con = require('./mysql/mysql');
const bodyparser = require('body-parser');

con.connect((err) => {
	if(err) throw err;
	console.log('connected');
});

const app = express();

dotenv.config();

const passportConfig = require('./passport');
passportConfig();

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure('views', {
	express : app,
	watch : true
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/room', roomRouter);


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => { 
	console.log(`${app.get('port')} 에서 대기중`)
});