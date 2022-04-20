const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const template = require('./template/template.js');

const app = express();

const session = require('express-session');
const FileStore = require('session-file-store')(session);


app.use(session({
	secret : 'hwany wanna go home',
	resave: false,
	saveUninitialized : true,
	store : FileStore(),
	maxAge  : new Date(Date.now() + 3600000)
}));

const mysql = require('mysql');
const db = mysql.createConnection({
	host : 'localhost',
	user : 'hwany',
	password : '1q2w3e4r',
	port : '3306',
	database : 'opentutorials'
});
db.connect((err) => {
	if (err) throw err;
	console.log("connected!")
});



app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/img"));



app.get('/', (req, res) => {
	
	if (req.session.isLogin === true) {
		res.redirect('/home');
	} else {
		res.sendFile(__dirname + "/html/index.html");	
	}
	
});

app.get('/signup', (req, res) => {
	res.sendFile(__dirname + "/html/signUp.html");
});

app.get('/home', (req, res) => {
	
	if (req.session.isLogin === true){
		let html = template.home(req.session.N_NAME) 
		res.send(html);	
	} else {
		res.write("<script>alert('로그인 안하면 못들어가 바보야')</script>");
		res.write("<script>window.location=\"/\"</script>");
		res.end();
	}
	
});

app.get('/dashboard', (req, res) => {
	if (req.session.isLogin === true){
		let html = template.dashboard(req.session.N_NAME) 
		res.send(html);	
	} else {
		res.write("<script>alert('로그인 안하면 못들어가 바보야')</script>");
		res.write("<script>window.location=\"/\"</script>");
		res.end();
	}
});


app.post('/signup_process', (req,res) => {
	let post = req.body;
	let fname = post.fname;
	let lname = post.lname;
	let nickName = post.nname;
	let email = post.email;
	let password = post.password;
	password = crypto.createHash('md5').update(password).digest('base64');
	
	db.query(`INSERT INTO user (F_NAME, L_NAME, N_NAME, EMAIL, PASSWORD, SIGN_IN_TIME) VALUES(?,?,?,?,?,NOW())`,[fname, lname, nickName, email, password]), (err, rows, field) => {
		if (err) throw err;
	};
	
	res.redirect('/');
	
});

app.post('/signout_process', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

app.post('/user_check', (req, res) => {
	let post = req.body;
	let email = post.email;
	let password = crypto.createHash('md5').update(post.password).digest('base64');;
	
	db.query(`SELECT * FROM user where email= ? and password = ?`,[email, password],(err, result) => {
		if (result.length === 0) {
			res.write("<script>alert('등록되지 않은 사용자거나 비밀번호가 틀렸어')</script>");
			res.write("<script>window.location=\"/\"</script>");
			res.end();
		} else {
			req.session.isLogin = true;
			req.session.N_NAME = result[0].N_NAME;
			req.session.save();
			
			res.redirect('/home');
		}
	});
	
});


app.listen(80);