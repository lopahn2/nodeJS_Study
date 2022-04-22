const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const template = require('./template/template.js');
const multer = require('multer');
const fs = require('fs');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

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

fs.readdir('uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('uploads');
    }
})

const fileStorage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename : (req, file, cb) => {
		cb(null, file.filename + '-' + file.originalname);
	}
});
const fileFilter = (req,file,cb) => { // 확장자 필터링 
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
		cb(null,true); // 해당 mimetype만 받겠다는 의미 
	}
	else{ // 다른 mimetype은 저장되지 않음 
		cb(null,false);
	}
};

app.use(multer({storage :fileStorage, fileFilter:fileFilter}).single('image')); // 라우터 

app.use(session({
	secret : 'hwany wanna go home',
	resave: false,
	saveUninitialized : true,
	store : FileStore(),
	maxAge  : new Date(Date.now() + 3600000)
}));

app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/uploads"));


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
		db.query(`SELECT IMGSCR FROM contents where N_NAME = ?`, [req.session.N_NAME], (err, result) => {
			console.log(result);
		});
		let html = template.dashboard(req.session.N_NAME,"");
		res.send(html);	
	} else {
		res.write("<script>alert('로그인 안하면 못들어가 바보야')</script>");
		res.write("<script>window.location=\"/\"</script>");
		res.end();
	}
});

app.get('/create', (req, res) => {
	if (req.session.isLogin === true){
		let html = template.create(req.session.N_NAME);
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

app.post('/create_process', (req, res) => {
	res.send("need to rest until reach the right level. ")
});

app.listen(80);