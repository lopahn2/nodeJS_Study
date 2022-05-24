const passport = require('passport');
const local = require('./localStrategy');
const con = require('../mysql/mysql');


module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.dog_tag_name);
    // done(errorObject, wanted data)
  });

  passport.deserializeUser((email, done) => {
	try {
		const sql = `select * from member where dog_tag_name = "${email}"`
		con.query(sql, (err, result, field) => {
			done(null, result[0]);
		});
	}catch(error) {
		done(error);
	}
	// DB에서 유저 찾아와서 저거 해줘야 함
  });

  local();
};