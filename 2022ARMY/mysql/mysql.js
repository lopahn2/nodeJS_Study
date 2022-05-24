const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
	host : 'localhost',
	user : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME
})

module.exports = con;