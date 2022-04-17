const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'hwany',
	password : '1q2w3e4r',
	database : 'opentutorials',
	port : '3306'
});

connection.connect();

connection.query('SELECT * FROM topic', (err, result, fields) => {
	if(err) {
		console.log(err);
	}
	console.log(result);
});

connection.end();