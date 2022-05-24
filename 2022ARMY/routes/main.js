const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

const con = require('../mysql/mysql');

router.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

router.get('/',(req, res) => {
	res.render('index');
});

router.get('/dashboard', isLoggedIn ,(req, res, next) => {
	try {
		console.log(req.user.dog_tag_name);
		const sqlSelectRoom = `select * from room`;
		con.query(sqlSelectRoom, (err, result, fields) => {
			res.render('dashboard', {roomList : result});	
		});	
	}catch(err) {
		next(err);
	}
	
	
	
});


module.exports = router;