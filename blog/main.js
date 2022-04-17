const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mysql = require('mysql');
const con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1q2w3e4r'
});
con.connect((err) => {
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
	let email = post.email;
	let password = post.password;
	
	res.send(post);
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