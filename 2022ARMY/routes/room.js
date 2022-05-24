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



router.get('/room_create', isLoggedIn, (req, res, next) => {
	res.render('roomCreate');
});

router.post('/room_create', isLoggedIn, (req, res, next) => {
	const {room_name, room_pw, dog_tag_name} = req.body;
	
	const sqlRoomCreate = `insert into room(room_name, room_pw, dog_tag_name, create_time)
		values("${room_name}", "${room_pw}", "${dog_tag_name}", default)
		`;
	con.query(sqlRoomCreate, (err, result, fields) => {
	});
	
	res.redirect('/dashboard');
});

router.get('/:room_id', isLoggedIn, (req, res, next) => {
	const roomId = req.params.room_id;
	const sqlRoomSelect = `select * from room where room_id = "${roomId}"`;
	
	con.query(sqlRoomSelect, (err, result, fields) => {
		const roomInfo = result[0];
		const sqlAdminSelect = `
		select * from member as m 
		join army_unit as au
		on m.dog_tag_name = au.dog_tag_name
		where m.dog_tag_name = "${roomInfo.dog_tag_name}"`;
		
		con.query(sqlAdminSelect, (err1, result1, fields1) => {
			const adminInfo = result1[0];
			res.render('room', {roomInfo, adminInfo});	
		});
		
		
	});
	
});

module.exports = router;