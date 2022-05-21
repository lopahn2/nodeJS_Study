const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

dotenv.config();
const passportConfig = require('./passport');
passportConfig();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
	express : app,
	watch : true
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/public')));

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












app.get('/', (req, res) => {
	res.render('index', { title : "express", isLoggedIn : false });
});

app.listen(app.get('port'), () => { 
	console.log(`${app.get('port')} 에서 대기중`)
});