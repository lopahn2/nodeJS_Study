var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html')




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
				
				
				var list = template.list(fileList);
				var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href='/create'>create</a>`);
				
				response.writeHead(200);
				response.end(html);
				
			});
			
			
		}else {
			fs.readdir('./data', (err, fileList) => {
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
					
					title = queryData.id;
					var sanitizedTitle = sanitizeHtml(title);
					var sanizizedDescription = sanitizeHtml(description, {
						allowedTags : ['h1']
					});
					var list = template.list(fileList);
					var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2><p>${sanizizedDescription}</p>`, 
												`<a href='/create'>create</a> 
												<a href='/update?id=${sanitizedTitle}'>update</a>
												<form action = 'delete_process' method = 'post' onsubmit='return confirm("정말 삭제하시겠습니까?")'>
													<input type='hidden' name='id' value='${sanitizedTitle}'>
													<input type='submit' value='delete'>
												</form>
												`);
					
				response.writeHead(200);
				response.end(html);
				});	
			});
		}	   
	} else if (pathName === '/create') {
		fs.readdir('./data', (err, fileList) => {
				var title = 'WEB-Create!';
				
				
				
				var list = template.list(fileList);
				var html = template.HTML(title, list, `
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
				response.end(html);
				
			});
	} else if (pathName === '/update') {
		// read
		fs.readdir('./data', (err, fileList) => {
			var filteredId = path.parse(queryData.id).base;
			fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){

				title = queryData.id;
				var list = template.list(fileList);
				var html = template.HTML(title, list, `
				<form action = 'https://hwany.run.goorm.io/update_process' method = 'post'>
					<input type='hidden' name='id' value='${title}'> 
					<p>
						<input type='text' name = 'title' placeholder = 'title' value ='${title}'>
					</p>
					<p>
						<textarea name = 'description' placeholder = 'description'>${description}</textarea>
					</p>
					<p>
						<input type='submit'>
						<!-- 서버에 데이터를 전송할 때 사용한다. -->
					</p>
				</form>
				
				`, `<a href='/create'>create</a> <a href='/update?id=${title}'>update</a>`);

			response.writeHead(200);
			response.end(html);
			});	
		});
		
		// form
		
		
	}else if (pathName === '/create_process') {
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
		
		
	} else if (pathName === '/update_process') {
		var body = '';
		request.on('data', (data) => {
			body += data;
		});
		
		request.on('end', () => {
			var post = qs.parse(body);
			var id = post.id;
			var title = post.title;
			var description = post.description;
			
			fs.rename(`data/${id}`, `data/${title}`, (err) => {
				fs.writeFile(`data/${title}`, description, 'utf8', (err1) => {
					response.writeHead(302, {Location: `/?id=${title}`});
					response.end();
				});
			});
		});
	} else if (pathName === '/delete_process') {
		var body = '';
		request.on('data', (data) => {
			body += data;
		});
		
		request.on('end', () => {
			var post = qs.parse(body);
			var id = post.id;
			var filteredId = path.parse(id).base;
			fs.unlink(`data/${filteredId}`, (err) => {
				response.writeHead(302, {Location: `/`});
				response.end();
			});
		});
	} else {
		response.writeHead(404);
		response.end('notFound');
	}

	
	
	// 브라우저의 응답에 어떤 것을 내보내 줄 지 결정하는 부분 response.end
    //response.end(fs.readFileSync(__dirname + _url));
	
});
app.listen(80);