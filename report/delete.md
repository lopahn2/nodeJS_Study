# Delete

## Delete 버튼 구현
Delete는 서버의 파일이나 데이터 베이스를 크게 변화시킬 수 있는 기능이기 때문에 GET 메소드로 처리하면 안된다. <br>
<br>
즉 URL을 노출시키면 안되므로 form을 이용해서 POST 메소드로 처리해야한다.<br>
<br>
```js
<form action = 'delete_process' method = 'post' onsubmit='return confirm("정말 삭제하시겠습니까?")'>
	<input type='hidden' name='id' value='${title}'>
	<input type='submit' value='delete'>
</form>
```
<br>
여기서 사용자가 실수로 버튼을 눌렀을 때를 대비해서 submit event listener를 달아주었다.

## Delete 기능 구현
```js
else if (pathName === '/delete_process') {
	var body = '';
	request.on('data', (data) => {
		body += data;
	});
	
	request.on('end', () => {
		var post = qs.parse(body);
		var id = post.id;
		fs.unlink(`data/${id}`, (err) => {
			response.writeHead(302, {Location: `/`});
			response.end();
		});
	});
}
```
