const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
    // done(errorObject, wanted data)
  });

  passport.deserializeUser((id, done) => {
    /*
	User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
	*/
	  
	// DB에서 유저 찾아와서 저거 해줘야 함
  });

  local();
};