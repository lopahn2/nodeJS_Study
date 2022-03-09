var http = require('http');
var fs = require('fs');
var url = require('url');



var app = http.createServer(function(request, response) {
    var _url = request.url; //사용자가 요청한 값. - 쿼리문을 가져옴
	var pathName = url.parse(_url, true).pathname;
	var queryData = url.parse(_url, true).query;
	//console.log(url.parse(_url, true)); // pathname에 주목하자.
	if (pathName === '/') {
		_url = '/html/index.html'
		response.writeHead(200);
		response.end(fs.readFileSync(__dirname + _url));
	} 
	
	if (pathName === '/list.html'){
		_url = '/html/list.html'
		response.writeHead(200);
		response.end(fs.readFileSync(__dirname + _url));
	}
	
	if (pathName === '/write.html'){
		_url = '/html/write.html'
		response.writeHead(200);
		response.end(fs.readFileSync(__dirname + _url));
	}
	
	if (pathName === '/content.html'){
		_url = '/html/content.html'
		response.writeHead(200);
		response.end(fs.readFileSync(__dirname + _url));
	}
	// 브라우저의 응답에 어떤 것을 내보내 줄 지 결정하는 부분 response.end
    //response.end(fs.readFileSync(__dirname + _url));
	
});
app.listen(80);