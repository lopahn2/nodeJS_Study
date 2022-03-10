var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');



function templateHTML(title, list, body) {
	return `
			<!doctype html>
			<html>
			<head>
			  <title>WEB1 - ${title}</title>
			  <meta charset="utf-8">
			</head>
			<body>
			  <h1><a href="/">WEB</a></h1>
			  ${list}
			  ${body}
			  <a href='/create'>create</a>
			</body>
			</html>
	
	`
}

function templateList (filelist) {
	var list = `<ul>`;
	for(let i = 0; i < filelist.length; i++){
		list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
	}
	list += `</ul>`;
	
	return list;
} 






var app = http.createServer(function(request, response) {
    var _url = request.url; //사용자가 요청한 값. - 쿼리문을 가져옴
	var queryData = url.parse(_url, true).query; //id = html 이 { id : html} 로 받아짐
	var pathName = url.parse(_url, true).pathname;
	var title = queryData.id;
	//console.log(url.parse(_url, true)); // pathname에 주목하자.
	if(pathName === '/') {
		if(queryData.id === undefined) {
			fs.readdir('./data', (err, fileList) => {
				var title = 'Welcome!';
				description = 'Hello Node.js';
				
				
				var list = templateList(fileList);
				var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
				
				response.writeHead(200);
				response.end(template);
				
			});
			
			
		}else {
			fs.readdir('./data', (err, fileList) => {
				
				fs.readFile(`data/${title}`, 'utf8', function(err, description){
					
					title = queryData.id;
					var list = templateList(fileList);
					var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
					
				response.writeHead(200);
				response.end(template);
				});	
			});
		}	   
	} else if (pathName === '/create') {
		fs.readdir('./data', (err, fileList) => {
				var title = 'WEB-Create!';
				
				
				
				var list = templateList(fileList);
				var template = templateHTML(title, list, `
				<form action = 'https://hwany.run.goorm.io/create_process' method = 'post'>
					<p>
						<input type='text' name = 'title' placeholder = 'title'>
					</p>
					<p>
						<textarea name = 'description' placeholder = 'description'></textarea>
					</p>
					<p>
						<input type='submit'>
						<!-- 서버에 데이터를 전송할 때 사용한다. -->
					</p>
				</form>
	

				
				`);
				
				response.writeHead(200);
				response.end(template);
				
			});
	} else if (pathName === '/create_process') {
		var body = '';
		request.on('data', (data) => {
			body += data;
		});
		
		request.on('end', () => {
			var post = qs.parse(body);
			var title = post.title;
			var description = post.description;
			fs.writeFile(`data/${title}`, description,'utf8', (err) => {
				response.writeHead(302, {Location: `/?id=${title}`});
				response.end();
			});
		});
		//폼 데이터를 받아오는 법
		
		
	}else {
		response.writeHead(404);
		response.end('notFound');
	}
	
    
    
	
	
	
	

	
	
	
	// 브라우저의 응답에 어떤 것을 내보내 줄 지 결정하는 부분 response.end
    //response.end(fs.readFileSync(__dirname + _url));
	
});
app.listen(80);