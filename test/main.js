var http = require('http');
var fs = require('fs');
var url = require('url');






var app = http.createServer(function(request, response) {
    var _url = request.url; //사용자가 요청한 값. - 쿼리문을 가져옴
	
	var pathName = url.parse(_url, true).pathname;

	if(pathName === '/') {
		_url = '/test.html'
	}
			  
	
    response.writeHead(200);
	response.end(fs.readFileSync(__dirname + _url));
    
	
	
	
	

	
	
	
	// 브라우저의 응답에 어떤 것을 내보내 줄 지 결정하는 부분 response.end
    //response.end(fs.readFileSync(__dirname + _url));
	
});
app.listen(80);