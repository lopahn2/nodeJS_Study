const http = require('http');
const url = require('url');
const template = require('./htmlModule/template.js');


const app = http.createServer((req, res) => {
	let reqUrl = url.parse(req.url, true).pathname;
	let queryData = url.parse(req.url, true).query;
	if (reqUrl === '/') {
		res.writeHead(200);
		res.end(template.rootHtml());
	} else if (reqUrl === '/menu') {
		if (queryData.name === undefined) {
			res.writeHead(200);
			res.end(template.menuHtml());		
		} else {
			queryData = url.parse(req.url, true).query;
			let html = template.houseHtml(queryData.name);
			res.writeHead(200);
			res.end(html);	
		}
	} else if (reqUrl === '/menu/room') {
		queryData = url.parse(req.url, true).query;
		res.writeHead(200);
		let html = template.roomHtml(queryData.roomowner, queryData.roomname);
		res.end(html);	
	} else if (reqUrl === '/time') {
		res.writeHead(200);
		let html = template.timeHtml();
		res.end(html);
	} else {
		res.writeHead(404);
		let html = template.errorHtml();
		res.end(html);
	}
	
	
	
});

app.listen(80);
