var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
    var _url = request.url; //사용자가 요청한 값. - 쿼리문을 가져옴
	var queryData = url.parse(_url, true).query; //id = html 이 { id : html} 로 받아짐
	var title = queryData.id;
	
	console.log(_url);
    if(_url == '/') {
		title = 'Welcome';
    }
    if(_url == '/favicon.ico') {
        return response.writeHead(404);
    }
    response.writeHead(200);
	fs.readFile(`data/${title}`, 'utf8', function(err, description){
		if(description==undefined) {
			description = 'hello world!';
		}
		
		var template = `
		<!doctype html>
		<html>
		<head>
		  <title>WEB1 - ${title}</title>
		  <meta charset="utf-8">
		</head>
		<body>
		  <h1><a href="/">WEB</a></h1>
		  <ol>
			<li><a href="?id=HTML">HTML</a></li>
			<li><a href="?id=CSS">CSS</a></li>
			<li><a href="?id=JavaScript">JavaScript</a></li>
		  </ol>
		  <h2>${title}</h2>
		  <p>${description}</p>
		</body>
		</html>
	`;
		response.end(template);
	});
	
	
	
	
	
	
	
	
	
	
	// 브라우저의 응답에 어떤 것을 내보내 줄 지 결정하는 부분 response.end
    //response.end(fs.readFileSync(__dirname + _url));
	
});
app.listen(80);