const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

const con = require('../mysql/mysql');

router.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.ip = req.ip;
	next();
});

router.get('/', isNotLoggedIn ,(req, res) => {
	res.render('index');
});

router.get('/dashboard', isLoggedIn ,(req, res, next) => {
	try {
		
		console.log(req.user.dog_tag_name);
		const sqlSelectRoom = `select * from room`;
		con.query(sqlSelectRoom, (err, result, fields) => {
			const sqlSelectIp = `select * from ip where dog_tag_name = "${req.user.dog_tag_name}"`;
			con.query(sqlSelectIp, (err1, result1, fields1) => {
				console.log(err1);
				console.log(result1);
				res.render('dashboard', {roomList : result, ipInfo : result1});		
			});
			
		});	
	}catch(err) {
		next(err);
	}
	
	
	
});


module.exports = router;