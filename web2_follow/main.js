const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");


const template = require("./htmlModule/template.js");
 

const app = http.createServer((request, response) => {
	let _url = request.url;
	let queryData = url.parse(_url, true).query;
	let pathName = url.parse(_url, true).pathname;
	if (pathName === "/") {
		let html = template.home();
		response.writeHead(200);
		response.end(html);
	} else if (pathName === "/menu") {
		if (queryData.id === undefined){
			fs.readdir('./data', (err, fileList) => {
				const list_ = template.list(fileList);
				let html = template.mainHtml(list_,undefined,undefined,	
				`<a href='/create'>create</a>`);
				response.writeHead(200);
				response.end(html);
			});	
		} else {
			fs.readdir('./data', (err, fileList) => {
				let fileId = queryData.id;
				fs.readFile(`data/${fileId}.txt`, 'utf8', (err, data) => {
					const list_ = template.list(fileList);
					let html = template.mainHtml(list_, `${fileId}`, data);
					response.writeHead(200);
					response.end(html);
				});
			});
		}

	} else if (pathName === "/create") {
		let html = template.mainHtml('','create new File', '',
					`<form action = 'https://hwany.run.goorm.io/create_process' method = 'post'>
						<p>
							<input type='text' name = 'title'>
						</p>
						<p>
							<textarea name = 'description'></textarea>
						</p>
						<p>
							<input type='submit'>
							<!-- 서버에 데이터를 전송할 때 사용한다. -->
						</p>
					</form>

					`);
		response.writeHead(200);
		response.end(html);
	} else if (pathName === "/create_process") {
		let body = '';
		request.on('data', (data) => {
			body += data;
		});
		request.on('end', () => {
			let post = qs.parse(body);
			let fileName = post.title;
			let description = post.description;
			fs.writeFile(`data/${fileName}.txt`, description, 'utf8', (err) => {
				response.writeHead(302, {Location:`/menu`});
				response.end();
			});
		});
	}
	
	
});

app.listen(80);