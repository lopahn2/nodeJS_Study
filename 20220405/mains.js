const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");


const template = require("./html/template.js");

/* 22시 06분 시작 */

const app = http.createServer((req, res) => {
	let pathname = url.parse(req.url, true).pathname;
	let queryData = url.parse(req.url, true).query;
	
	if (pathname === "/") {
		let html = template.root();
		res.writeHead(200);
		res.end(html);
		
	} else if (pathname === "/home") {
		let html = template.home();
		res.writeHead(200);
		res.end(html);
	} else if (pathname === "/write") {
		let html = template.write();
		res.writeHead(200);
		res.end(html);
	} else if (pathname === "/write_process") {
		let body = '';

        req.on('data', (data) => {
			body += data;
            
        });

        req.on('end', function () {
            let post = qs.parse(body);
			let title = post.title
			let data = post.description;
			fs.writeFile(`data/${title}.txt`, data, 'utf8', function(error){
			});
			res.writeHead(302, {Location:'/home'});
			res.end();
        });
	} else if (pathname === "/contents") {
		if (queryData.id === undefined) {
			fs.readdir('data', (err, files) => {
				if (err)
					console.log(err);
				else {
					let html = template.contents(files, "");
					res.writeHead(200);
					res.end(html); 
				}
			})	
		} else {
			let title = queryData.id;
			fs.readFile(`./data/${title}.txt`, 'utf-8', function(err, data){
				let html = template.read(title, data);
				res.writeHead(200);
				res.end(html); 
			});
		}
		
	} else if (pathname === "/delete_process") {
		let body = '';
		req.on('data', (data) => {
			body += data;
		});
		
		req.on('end', () => {
			let post = qs.parse(body);
			let id = post.id;
			fs.unlink(`data/${id}.txt`, (err) => {});
			res.writeHead(302, {Location:'/contents'});
			res.end();
		});
	} else if (pathname === "/update") {
		let fileId = queryData.id;
		fs.readFile(`./data/${fileId}.txt`, 'utf-8', function(err, data){
				let html = template.update(fileId, data);
				res.writeHead(200);
				res.end(html); 
			});
	} else if (pathname === "/update_process") {
		let body = '';
		req.on('data', (data) => {
			body += data;
		});
		
		req.on('end', () => {
			let post = qs.parse(body);
			let id = post.id;
			let title = post.title;
			let description = post.description;
			fs.rename(`data/${id}.txt`, `data/${title}.txt`, () => {
				fs.writeFile(`data/${title}.txt`, description, 'utf8', function(error){
					
				});
			});
			res.writeHead(302, {Location:'/contents'});
			res.end();
			
		});
	} else if (pathname === "/endTime"){
		res.writeHead(200);
		res.end("1시간 29분");
	}
	
	
	else {
		let html = template.error();
		res.writeHead(404);
		res.end(html);
		
	}
	
	
	
	
});

app.listen(80);