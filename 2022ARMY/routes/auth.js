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


router.get('/join', isNotLoggedIn, (req, res, next) => {
	res.render('signUp');
});

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  
  const { email, password, rank, className, name, operator, division, brigade, battalion, department } = req.body;
  try {
	const sqlSelect = `select * from member where dog_tag_name = ${email}`;
	con.query(sqlSelect, (err, result, fields) => {
		if (result[0]) {
		  return res.redirect('/join?error=exist');
		}
		const hash = bcrypt.hash(password, 12);

		const sqlInsert = `insert into member(dog_tag_name, user_pw, rank, class, name, sign_up_date)
		values("${email}", "${password}", "${rank}", "${className}", "${name}", default)
		`;
		const sqlSubInfoInsert = `insert into army_unit(dog_tag_name, operator, division, brigade, battalion, department)
		values("${email}", "${operator}", "${division}", "${brigade}", "${battalion}", "${department}")
		`;
		con.query(sqlInsert, (err, result, fileds) => {
			if(err) throw err;
		});
		con.query(sqlSubInfoInsert, (err, result, fields) => {
			if(err) throw err;
		});
		return res.redirect('/');
	});
    
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
	  
      return res.redirect('/dashboard');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout((err) => {
	  if(err) {return next(err)}
	  req.session.destroy();
	  res.redirect('/');
  });
});

router.get('/update_room_option/:roomId', isLoggedIn, (req, res, next) => {
	const roomId = req.params.roomId;
	const sqlRoomSelect = `select * from room where room_id = "${roomId}"`;
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
					res.render('updating_room_option',{roomInfo, adminInfo});
				});
			} catch(error) {
				
				next(error);
				
			}
		});
	
	
});

router.post('/update_room_option/:roomId', isLoggedIn, (req, res, next) => {
	const roomId = parseInt(req.params.roomId);

	const {allowing_department, delete_department, update_password} = req.body;
	const sqlInsert = `insert into access_department(allow_department, room_id)
		values("${allowing_department}", ${roomId})
		`;
	const sqlDelete = `delete from access_department where room_id = ${roomId} and allow_department ="${delete_department}"`;
	const sqlUpdate = `update room set room_pw = "${update_password}" where room_id = ${roomId}`;
	
	con.query(sqlInsert, (err, result, fields) => {});
	con.query(sqlDelete, (err1, result, fields) => {});
	con.query(sqlUpdate, (err, result, fields) => {});

	setImmediate(() => {
	  res.redirect('/dashboard');
	});
	
});

router.get('/update_ip', isLoggedIn, (req, res, next) => {
	res.render('updating_ip');
});

router.post('/update_ip', isLoggedIn, (req, res, next) => {
	console.log(req.user, req.ip);
	const { user_location } = req.body;
	const sqlSelect = `select * from army_unit where dog_tag_name = "${req.user.dog_tag_name}"`;
	con.query(sqlSelect, (err, result, fields) => {
		const sqlInsert = `insert into ip(registed_ip, dog_tag_name, user_location, department)
		values("${req.ip}", "${req.user.dog_tag_name}", "${user_location}", "${result[0].department}")`;	
		con.query(sqlInsert, (err1, result1, fields1) => {
		});
	});
	
	res.redirect('/dashboard');
});

module.exports = router;