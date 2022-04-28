const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password'
	}, async (email, password, done) => {
		try {
			const exUser = await User.findOne({ where : {email} });
			
			if(exUser) {
				const result = await bcrypt.compare(password, exUser.password);
				if(result) {
					done(null, exUser);
				} else {
					done(null, false, { message : '비밀번호가  틀렸어용' });
				}
			} else {
				done(null, false, { message : '비밀번호가  틀렸어용' });
			}
			
			
		} catch(err) {
			console.error(err);
			done(err);
		}
	}));
}