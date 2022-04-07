/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/') {
        if(queryData.id === undefined) {
            fs.readdir('./data', function(error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2><p>${description}</p>`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        } else {
            fs.readdir('./data', function(error, filelist) {
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description, {
                        allowedTags:['h1']
                    });
                    var list = template.list(filelist);
                    var html = template.HTML(sanitizedTitle, list,
                        `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
                        `<a href="/create">create</a>
                        <a href="/update?id=${sanitizedTitle}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                        </form>`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if(pathname === '/create') {
        fs.readdir('./data', function(error, filelist) {
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.HTML(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(html);
        });
    } else if(pathname === '/create_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    } else if(pathname === '/update') {
        fs.readdir('./data', function(error, filelist) {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `
                    <form action="/update_process" method="post">
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
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if(pathname === '/update_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(error) {
                fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    } else if(pathname === '/delete_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function(error) {
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(80);
*/

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const bodyParser = require('body-parser');
const compression = require('compression');

const template = require('./lib/template.js');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(compression());
app.get('*', (req, res, next) => {
	fs.readdir('./data', (err, fileList) => {
		req.list = fileList;
		next();
	});
});
app.use(express.static('public'));


app.get('/', (req, res) => {
	fs.readdir('./data', function(error, filelist) {
		let title = 'Welcome';
		let description = 'Hello, Node.js';
		let list = template.list(filelist);
		let html = template.HTML(title, list,
			`<h2>${title}</h2><p>${description}</p>
			 <img src="/images/main.jpg" style="width:300px; display:block; margin-top : 10px;">	
			`,
			`<a href="/create">create</a>`
		);
		res.send(html);
	});
}); 

app.get('/page/:pageId', (req, res, next) => {

	let filteredId = path.parse(req.params.pageId).base;
	fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
		if (err) {
			next(err);
		} else {
			let title =req.params.pageId;
			let sanitizedTitle = sanitizeHtml(title);
			let sanitizedDescription = sanitizeHtml(description, {
				allowedTags:['h1']
			});
			let list = template.list(req.list);
			let html = template.HTML(sanitizedTitle, list,
				`<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
				`<a href="/create">create</a>
				<a href="/update/${sanitizedTitle}">update</a>
				<form action="/delete_process" method="post">
					<input type="hidden" name="id" value="${sanitizedTitle}">
					<input type="submit" value="delete">
				</form>`
			);
			res.send(html);
		}
		
	});
	
});

app.get('/create', (req, res) => {
	
	let title = 'WEB - create';
	let list = template.list(req.list);
	let html = template.HTML(title, list, `
		<form action="/create_process" method="post">
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

app.post('/create_process', (req, res) => {
	/*let body = '';
	req.on('data', function(data) {
		body = body + data;
	});
	req.on('end', function() {
		let post = qs.parse(body);
		let title = post.title;
		let description = post.description;
		fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
			res.writeHead(302, {Location: `/page/${title}`});
			res.end();
		});
	});*/
	
	let post = req.body;
	let title = post.title;
	let description = post.description;
	fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
		res.writeHead(302, {Location: `/page/${title}`});
		res.end();
	});

});

app.get('/update/:pageId', (req, res) => {
	
	let filteredId = path.parse(req.params.pageId).base;
	fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
		let title = req.params.pageId;
		let list = template.list(req.list);
		let html = template.HTML(title, list,
			`
			<form action="/update_process" method="post">
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
			`<a href="/create">create</a> <a href="/update/${title}">update</a>`
		);
		res.send(html)
	});
	
});

app.post('/update_process', (req, res) => {
	/*let body = '';
	req.on('data', function(data) {
		body = body + data;
	});
	req.on('end', function() {
		let post = qs.parse(body);
		let id = post.id;
		let title = post.title;
		let description = post.description;
		fs.rename(`data/${id}`, `data/${title}`, function(error) {
			fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
				
			});
		});
		res.redirect(`/page/${title}`);
		
	});*/
	
	let post = req.body;
	let id = post.id;
	let title = post.title;
	let description = post.description;
	fs.rename(`data/${id}`, `data/${title}`, function(error) {
		fs.writeFile(`data/${title}`, description, 'utf8', function(err) {

		});
	});
	res.redirect(`/page/${title}`);
	
});

app.post('/delete_process', (req, res) => {
	/*let body = '';
	req.on('data', function(data) {
		body = body + data;
	});
	req.on('end', function() {
		let post = qs.parse(body);
		let id = post.id;
		let filteredId = path.parse(id).base;
		fs.unlink(`data/${filteredId}`, function(error) {
			res.redirect('/')
		});
	});*/
	
	let post = req.body;
	let id = post.id;
	let filteredId = path.parse(id).base;
	fs.unlink(`data/${filteredId}`, function(error) {
		res.redirect('/')
	});
	
	
});


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(500).send("something wrong!");
});



app.listen(80);