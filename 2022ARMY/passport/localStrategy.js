const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const con = require('../mysql/mysql');

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password'
	}, async(email, password, done) => {
		try {
			const sql = `select * from member where dog_tag_name = "${email}" and user_pw = "${password}"`
			con.query(sql, (err, result, fields) => {
				if(result[0]) {
					if(password) {
						done(null, result[0]);
					} else {
						done(null, false, {message : '비밀번호가 일치하지 않습니다.'});
					}
				}else {
					done(null, false, {message : '가입되지 않은 회원입니다.'});
				}	
			});

		} catch(err) {
			console.error(err);
			done(err);
		}
	}));
}