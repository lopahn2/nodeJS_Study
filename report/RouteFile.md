# router
## index

### 분리하고자 하는 파일
```js
const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

router.get('/', (req, res) => {
	
		var title = 'Welcome';
		var description = 'Hello, Node.js';
		var list = template.list(req.list);
		var html = template.HTML(title, list,
			`<h2>${title}</h2><p>${description}</p>`,
			`<a href="/topic/create">create</a>`
		);
		res.send(html);
	
});

module.exports = router;
```

### 분리한 파일을 main.js 에서 불러와서 깔끔하게 관리하자!

```js
// 생략*
const indexRouter = require('./routes/index');

app.use('/', indexRouter);
// 생략*
```

## deep route

### 분리하고자 하는 파일

```js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const bodyParser = require('body-parser');
const compression = require('compression');
const template = require('../lib/template.js');



router.get('/create', (req, res) => {
	
		var title = 'WEB - create';
		var list = template.list(req.list);
		var html = template.HTML(title, list, `
			<form action="/topic/create_process" method="post">
				<p><input type="text" name="title" placeholder="title"></p>
				<p>
					<textarea name="description" placeholder="description"></textarea>
				</p>
				<p>
					<input type="submit">
				</p>
			</form>
		`, '');
		res.send(html);
	
});

router.post('/create_process', (req, res) => {
	let post = req.body;
	let title = post.title;
	let description = post.description;
	fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
		res.redirect(`/topic/${title}`)
	});
	
});

router.get('/update/:pageId', (req, res) => {
	
		var filteredId = path.parse(req.params.pageId).base;
		fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
			var title = req.params.pageId;
			var list = template.list(req.list);
			var html = template.HTML(title, list,
				`
				<form action="/topic/update_process" method="post">
					<input type="hidden" name="id" value="${title}">
					<p><input type="text" name="title" placeholder="title" value="${title}"></p>
					<p>
						<textarea name="description" placeholder="description">${description}</textarea>
					</p>
					<p>
						<input type="submit">
					</p>
				</form>
				`,
				`<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
			);
			res.send(html);
		});
	
});

router.post('/update_process', (req, res) => {
	
		let post = req.body;
		let id = post.id;
		let title = post.title;
		let description = post.description;
		fs.rename(`data/${id}`, `data/${title}`, function(error) {
			fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
				
			});
		});
		res.redirect(`/topic/${title}`)
		
	
});

router.post('/delete_process', (req, res) => {
	var post = req.body;
	var id = post.id;
	var filteredId = path.parse(id).base;
	fs.unlink(`data/${filteredId}`, function(error) {
		res.redirect(`/`)
	});
	
});

router.get('/:pageId', (req, res, next) => {
	
		var filteredId = path.parse(req.params.pageId).base;
		fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
			if (err) {
				next(err);
			} else {
				var title = req.params.pageId;
				var sanitizedTitle = sanitizeHtml(title);
				var sanitizedDescription = sanitizeHtml(description, {
					allowedTags:['h1']
				});
				var list = template.list(req.list);
				var html = template.HTML(sanitizedTitle, list,
					`<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
					`<a href="/topic/create">create</a>
					<a href="/topic/update/${sanitizedTitle}">update</a>
					<form action="/topic/delete_process" method="post">
						<input type="hidden" name="id" value="${sanitizedTitle}">
						<input type="submit" value="delete">
					</form>`
				);
				res.send(html);
			}
		});
	
});

module.exports = router;
```
이때 router의 경로는 /create지만 main.js로 넘어가서는 /topic/create가 됨에 유의하자!

## 분리한 파일을 main.js 에서 깔끔하게 관리하자!

```js
// 생략*
const topicRouter = require('./routes/topic');
app.use('/topic', topicRouter);
// 생략*
```

