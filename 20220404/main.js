const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");

const template = require("./httpModules/template.js");

const app = http.createServer((req, res) => {
	let _url = req.url;
	let queryData = url.parse(_url, true).query;
	let pathname = url.parse(_url, true).pathname;
	
	
	if (pathname === "/") {
		let html = template.root();
		res.writeHead(200);
		res.end(html);
	} else if (pathname === "/home") {
		let html = template.home();
		res.writeHead(200);
		res.end(html);
	} else if (pathname === "/home/write") {
		let html = template.write();
		res.writeHead(200);
		res.end(html);
	} else if (pathname === "/home/write_process") {
		let body = '';

        req.on('data', (data) => {
			body += data;
            
        });

        req.on('end', function () {
            let post = qs.parse(body);
			let title = post.title
			let data = post.content;
			fs.writeFile(`data/${title}.txt`, data, 'utf8', function(error){
			});
        });
		
		let html = template.writeProcess();
		res.writeHead(200);
		res.end(html);
	} else if (pathname === "/home/contents") {

		if (queryData.id === undefined) {
			fs.readdir("./data", function (err, files) {
				if (err) {
					return console.log('Unable to scan directory: ' + err);
				} 
				let html = template.listUp(files);
				res.writeHead(200);
				res.end(html);
			});	
		} else {
			fs.readdir("./data", function (err, files) {
				if (err) {
					return console.log('Unable to scan directory: ' + err);
				}
				
				let fileId = queryData.id;
				fs.readFile(`data/${fileId}.txt`, 'utf8', (err2, data) => {
					let title = fileId;
					let html = template.fileContents(files, title, data,"");
					res.writeHead(200);
					res.end(html);
				});
				
			});	
		}
		
	} else if (pathname === "/home/contents/delete_process") {
		let body = '';
		req.on('data', (data) => {
			body += data;
		});
		
		req.on('end', () => {
			let post = qs.parse(body);
			let id = post.id;
			fs.unlink(`data/${id}.txt`, (err) => {});
			res.writeHead(302, {Location:'/home/contents'});
			res.end();
		});
	} else if (pathname === "/home/contents/update") {
		fs.readdir("./data", function (err, files) {
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			}

			let fileId = queryData.id;
			fs.readFile(`data/${fileId}.txt`, 'utf8', (err2, data) => {
				let title = fileId;
				let html = template.fileContents(files, title, data,`
				<form action = "/home/contents/update_process" method = "post">
					<p><input type="hidden" name="id" value="${title}"></p>
					<p><input type="text" name="title" placeholder="${title}" value="${title}"></p>
					<p>
						<textarea name = 'text' placeholder = ${data}>${data}</textarea>
					</p>
					<p><input type="submit"></p>
				</form>
				
				`);
				res.writeHead(200);
				res.end(html);
			});

		});	
	} else if (pathname === "/home/contents/update_process") {
		let body = '';
		req.on('data', (data) => {
			body += data;
		});
		
		req.on('end', () => {
			let post = qs.parse(body);
			
			let id = post.id;
			let title = post.title;
			let data = post.text;
			
			fs.rename(`data/${id}.txt`, `data/${title}.txt`, (err) => {
				fs.writeFile(`data/${title}.txt`, data, 'utf8', (err) => {
			
				});
			});
			
		});
		res.writeHead(302, {Location:'/home/contents'});
		res.end();
		
	
	}
	
});

app.listen(80);