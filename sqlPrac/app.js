const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');

dotenv.config();

const app = express();
app.set('port', process.env.PORT);
app.set('view engine', 'html');
nunjucks.configure('views', {
	express : app,
	watch : true
});
sequelize.sync({ force : false })
	.then(() => {
	console.log('DB Connected!');
}).catch((err) => {
	console.error(err);
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다요?`);
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.locals.message = error.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? error : {};
	res.status(error.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(`${app.get('port')}에서 대기중`);
});
