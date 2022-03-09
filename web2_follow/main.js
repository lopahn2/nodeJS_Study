const http = require('http');
const fs = require('fs');
const url = require('url');

const templateHTML = (title, list, content) => {
	let template = 
		`
		<!DOCTYPE html>
		<html>
			<head>
				<title>self-following ${title}</title>
				<meta charset="utf-8" />
			</head>
			<body>
				<h1><a href='/'>화니의 노드세상</a></h1>
				<h2>${title}</h2>
				${list}
				<p>
				${content}
				</p>
			</body>
		</html>
		`;
	return template
}

const templateList = (fileList) => {
	let list = `<ul>`;
	for (let i = 0 ; i < fileList.length; i++){
		list += `<li><a href='/?id=${fileList[i]}'>${fileList[i]}</a></li>`
	}
	list += `</ul>`;
	return list;
}





const app = http.createServer((request, response) => {
	let _url = request.url;
	let pathName = url.parse(_url, true).pathname;
	let queryData = url.parse(_url, true).query;
	let title = queryData.id;
	if (pathName === '/') {
		if (queryData.id === undefined) {
			
			fs.readdir('./data', (err, fileList) => {
				
				var title = '본부2분대 대표노예들 ㅋㅋㅋ';
				description = '각자의 개성에 대해 알아가 볼까요?';
				let list = templateList(fileList);
				let template = templateHTML(title, list, description);
				
				response.writeHead(200);
				response.end(template);
			});
		} else {
			fs.readdir('./data', (err, fileList) => {
				fs.readFile(`data/${title}`, 'utf8', (err, description) => {
					
					let title = queryData.id;
					let list = templateList(fileList);
					let template = templateHTML(title, list, description);
					
					response.writeHead(200);
					response.end(template);
				});
			});
		}
	} else {
		response.writeHead(404);
		response.end('이거아닌데~이거아닌데~');
	}
	
	
});

app.listen(80);