const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

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



app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/img"));



app.get('/', (req, res) => {
	res.sendFile(__dirname + "/html/index.html");
});

app.get('/signup', (req, res) => {
	res.sendFile(__dirname + "/html/signUp.html");
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
		
		console.log(rows, field);
		
	};
	
	res.redirect('/');
	
});
app.listen(80);


/*
const express = require("express");
const server = express();

server.use(express.static(__dirname + "/public"));
server.use(express.static(__dirname + "/script"));

server.get("/", (req, res) => {
 
  res.sendFile(__dirname + "/html/index.html");
});

server.get("/about", (req, res) => {
	res.sendFile(__dirname +"/html/about.html");
});

/*
server.use((req, res) => {
  res.sendFile(__dirname + "/html/error.html");
});
*/
/*
server.listen(80, (err) => {
  if (err) return console.log(err);
  
});

*/