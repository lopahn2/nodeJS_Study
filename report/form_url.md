# Form tag action property
Form 태그를 거의 안쓰고 프로젝트를 진행해온 지난 나날들... <br>
항상 Form 태그에 들어가는 action property 의 url value 가 이해가 되지 않았다. <br>

분명 나는 `/create` 루트에서 작업하는데 여기로 보내야지 왜 `/create_process` 루트로 보내는 걸까? <br>

<br>

기능에 따라 API를 구분하는 건데 `/create` 루트에서는 사용자 입력 값을 입력 받는 곳이고
`/create_process` 루트에서는 이 정보를 가공해서 처리하는 곳인 것이다.
<br>

이에 따라 `main.js`에서 라우팅을 잘 조정해주어야 하겠지?

```js
if (pathName === '/create') {
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

if (pathName === '/create_process') {
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
```

<br>

## request 
```js
request.on('data', () => {
	// 데이터를 수신할 때마다 호출되는 콜백 함수
	// 데이터 처리 기능 정의
}); 

request.on('end', () => {
	// 수신할 정보가 더이상 없으면 호출되는 콜백 함수
	// 데이터 처리를 마무리하는 기능 정의
})
```
<br>

`/create` 에서 송신한 내용은 `/create_process`에서 **`querystring`** 을 이용해 받아올 수 있다.

<br>

```js
var post = qs.parse(body);
var title = post.title;
var description = post.description;

// 여기서 form 태그의 input, textarea tag에 name을 붙여준 이유가 
// 입력값을 객체 읽기처럼 받아오기 위해서이다.
```
<br>

## 리다이렉션

```js
fs.writeFile(`data/${title}`, description,'utf8', (err) => {
	response.writeHead(302, {Location: `/?id=${title}`});
	response.end();
});
```
<br>

파일을 생성하고 우리가 원하는 라우트로 이동하게 해주는 기능을 **리다이렉션** 이라 한다. <br>
head에 상태정보값을 **302** 로 넣어주고, 인자로 **`{Location: '/?id=${title}'}`** 를 넣어준다. <br>

<br>

> **3xx 리다이렉션 완료** <br>
> 301 : 요청한 페이지가 영구적으로 이동. <br>
> 302 : 현재 서버가 다른 위치의 페이지로 요청에 응답하고 있지만 요청자는 향후 요청시 원래 위치를 계속 사용해야 함. <br>
