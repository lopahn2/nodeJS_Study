const express = require('express');
const app = express();

app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/img"));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/html/index.html");
});

app.get('/signup', (req, res) => {
	res.sendFile(__dirname + "/html/signUp.html");
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