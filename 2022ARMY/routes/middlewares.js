const con = require('../mysql/mysql');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = '로그인한 상태입니다.';
	console.error(message);
	res.redirect('/dashboard');
    
  }
};

