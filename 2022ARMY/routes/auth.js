const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

const con = require('../mysql/mysql');

router.get('/join', isNotLoggedIn, (req, res, next) => {
	res.render('signUp');
});

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  
  const { email, password, rank, className, name } = req.body;
  try {
	var exUser = null;
	const sqlSelect = `select * from member where dog_tag_name = ${email}`;
	con.query(sqlSelect, (err, result, fields) => {
		exUser = result[0]
		if (exUser) {
		  return res.redirect('/join?error=exist');
		}
		const hash = bcrypt.hash(password, 12);

		const sqlInsert = `insert into member(dog_tag_name, user_pw, rank, class, name, sign_up_date)
		values("${email}", "${password}", "${rank}", "${className}", "${name}", default)
		`;

		con.query(sqlInsert, (err, result, fileds) => {
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

module.exports = router;