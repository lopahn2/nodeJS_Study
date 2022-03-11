# Update

## update link 생성

수정 버튼이 필요한 UI는 '/' 혹은 '?id=something'이냐에 따라서 달라진다.<br>
<br>
무언가를 수정하려면 무언가의 안에서 수정 버튼이 구현되야 한다. <br>
<br>
URL에 따라서 수정 링크가 있고 없고를 결정해 주어야 한다. <br>
<br>

```js
function templateHTML(title, list, body, control) {
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
			  ${control}
			  ${body}
			</body>
			</html>
	
	`
}
// home url 의 template
	var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href='/create'>create</a>`);



// update 필요한 곳의 template
	var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`, 
      `<a href='/create'>create</a> 
      <a href='/update?id=${title}'>update</a>
      `);					
```
<br>


## update 할 정보 전송

수정을 하기 위해서 input tag로 넘어온 정보를 수정 후 서버로 request를 보낸다고 생각해보자. <br>
<br>
우리가 input tag를 수정한 단계에서는 이미 기존의 정보는 수정된 상태이고 request가 적절히 도달할 수 없다... <br>
<br>
따라서 hidden type의 input tag를 이용해서 기존의 정보를 잠시 가지고 있어야 한다.<br>
<br>
```html
<form action = 'delete_process' method = 'post' onsubmit='return confirm("정말 삭제하시겠습니까?")'>
	<input type='hidden' name='id' value='${title}'>
	<input type='submit' value='delete'>
</form>
```

## update 한 내용 저장
create할 때와 동일하다. <br>
단지 파일 이름을 변경하는 fs.rename(); 을 사용하냐의 차이이다. <br>
<br>
```js
else if (pathName === '/update_process') {
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
```

