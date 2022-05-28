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



router.get('/room_create', isLoggedIn, (req, res, next) => {
	res.render('roomCreate');
});

router.post('/room_create', isLoggedIn, (req, res, next) => {
	const {room_name, room_pw, dog_tag_name} = req.body;
	
	const sqlRoomCreate = `insert into room(room_name, room_pw, dog_tag_name, create_time)
		values("${room_name}", "${room_pw}", "${dog_tag_name}", default)
		`;
	
	con.query(sqlRoomCreate, (err, result, fields) => {
		const sqlSelect = `
		select * from member as m 
		join army_unit as au
		on m.dog_tag_name = au.dog_tag_name
		where m.dog_tag_name = "${req.user.dog_tag_name}"
		`;
		con.query(sqlSelect, (err1, result1, fields1) => {
			const sqlInsert = `
			insert into access_department(allow_department, room_id)
			values("${result1[0].department}", ${parseInt(result.insertId)})
			`;
			con.query(sqlInsert, (e,r,f) => {});
		});
		
	});
	
	res.redirect('/dashboard');
});

router.get('/:room_id', isLoggedIn, (req, res, next) => {
	
	const roomId = parseInt(req.params.room_id);
	
	const sqlSelect = `
	select * from member as m 
	join army_unit as au
	on m.dog_tag_name = au.dog_tag_name
	where m.dog_tag_name = "${req.user.dog_tag_name}"
	`;
	
	con.query(sqlSelect, (err, result, fields) => {
		const department = result[0].department;
		const sqlSelectAccess = `
		select * from access_department
		where room_id = ${roomId} and allow_department = "${department}"
		`;
		con.query(sqlSelectAccess, (err1, result1, fields1) => {
			if(result1.length !== 0) {
				const sqlRoomSelect = `select * from room where room_id = ${roomId}`;
				con.query(sqlRoomSelect, (err, result, fields) => {
					try {
						const roomInfo = result[0];
						const sqlAdminSelect = `
						select * from member as m 
						join army_unit as au
						on m.dog_tag_name = au.dog_tag_name
						where m.dog_tag_name = "${roomInfo.dog_tag_name}"`;
						con.query(sqlAdminSelect, (err1, result1, fields1) => {
							const adminInfo = result1[0];
							const sqlAccessSelect = `
							select * from access_department where room_id = ${roomId}
							`;
							con.query(sqlAccessSelect, (err2, result2, fields2) => {
								const accessInfo = result2;
								res.render('room', {roomInfo, adminInfo, accessInfo});		
							});
						});
					} catch(error) {
						next(error);
					}
				});
			} else {
				accessDenied = new Error('접근 권한이 없습니다.');
				
				next(accessDenied);
			}	
		});
		
	});
	
	
	
	
		
});

module.exports = router;