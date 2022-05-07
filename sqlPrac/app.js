const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);
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

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다요?`);
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.local.message = error.message;
	res.local.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(`${app.get('port')}에서 대기중`);
});
