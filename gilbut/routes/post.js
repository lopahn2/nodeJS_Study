const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
	fs.readdirSync('uploads');
} catch (err) {
	console.log('uploads 폴더가 없습니다. 생성!');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage : multer.diskStorage({
		destination(req, file, cb) {
			cb(null, 'uploads/');
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		}
	}),
	limits : { fileSize : 5*1024*1024}
});

router.post('/img', isLoggedIn , upload.single('img'), (req, res) => {
	console.log(req.file);
	res.json({url : `/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
	try {
		const post = await Post.create({
			content : req.body.content,
			img : req.body.url,
			UserId : req.user.id
		});
		
		const hashtag = req.body.content.match(/#[^\s#]+/g);
		if (hashtag) {
			const result = await Promise.all(
				hashtag.map(tag => {
					return Hashtag.findOrCreate({
						where : { title : tag.slice(1).toLowerCase() }
					});
				})
			);
			await post.addHashtags(result.map(r=>r[0]));
		}
		res.redirect('/');
		
	} catch(err) {
		console.error(err);
		next(err);
	}
});


router.delete('/:postId', isLoggedIn, async (req, res, next) => {
	try {
		const post = await Post.destory({
			where : {id : req.params.postId }
		});
		res.redirect('/');
		
		
	} catch(err) {
		console.error(err);
		next(err);
	}
});

module.exports = router