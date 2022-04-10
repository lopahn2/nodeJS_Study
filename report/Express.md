# express
```js
npm install express --save
```

## Hello World?
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("Hello World!");
});

app.listen(80);
```
<br>

🙎‍♂️ express를 사용하지 않았을 때
```js
res.writeHead(200);
res.end("Hello World!");
```
<br>

🙋‍♂️ express를 사용할 때
```js
res.send("Hello World!");
```

## Semantic URL

🙎‍♂️ 기존의 queryString 전달 방식에서 검색 엔진에 친화적인 semantic URL을 자주 사용한다고 한다.

- Route path = /page/:Doc/:User
- Request URL = http://www.naver.com/page/Html/hwany
- req.params = {"Doc" : "Html", "User" : "hwany"}
```js
app.get('/page/:Doc/:User', (req, res) => {
	res.send(req.params);
});
```

## app.get ?     app.post?

🙎‍♂️ request와 response의 내용이 서버의 데이터를 가져오느냐 수정하느냐에 따라서 사용하면 된다.  <br>

( form 태그의 method의 방식을 따라서 사용하면 된다.)

```js
app.get('/user', (req, res) => {
	~~~
});

app.post('/user_update', (req, res) => {
	~~~
});
```

## middleware
🙎‍♂️ 미들웨어란 간단히 말해서 여러 사람이 개발한 소프트웨어를 사용해 생산성을 높이려고 할 때 사용하는 기능이라 보면 된다. 

### type of middleware
- Application-lever middleware
- Router-lever middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware

🙋‍♂️ Application-level middleware는 express 애플리케이션의 객체이다.

🙆‍♂️ 이를 사용하려면 `app 객체` 의 `use 메서드` 에 콜백 함수를 정의하는 것으로 시작한다.
```js
const express = require('express');

const app = express();

// all route
app.use((req, res, next) => {
	console.log("Hello World!");
	next(); // next step middleware call
});

// specific route
app.use('/page/:pageId', (req, res, next) => {
	console.log("Hello World!");
	next(); // next step middleware call
});

// only for get/post method
app.get(('/page/:pageId', (req, res, next) => {
	res.send("USER");
});

// call backs
app.use('/user/:id', (req, res) => {
	console.log("Request Url : ", req.originalUrl);
	next(); // call next call back that is a second argument of use method
}, 
(req, res) => {
	console.log("Request Type : " : req.method);
	next(); 
});
```

### next method

1. **`next('route')`** : 다음 라우트의 미들웨어가 실행됨.
2. **`next()`** : 다음 미들웨어가 실행 됨.
3. **`next(some argument)`** : 에러 핸들러의 미들웨어가 실행 됨.

## serving the static file on our express application

```js
~~~
app.use(express.static('Directory Name'));

// example
app.use(express.static('public'));

app.get('/', (req, res) => {
	let html = `
		<img src="/images/hello.jpg">
	`
	res.send(html);
})
```

## error handling 

🙎‍♂️ 에러 핸들링 미들웨어는 코드의 마지막 부분에 배치한다.

```js
app.post('/', (req, res) => {
~~~
});

~~~
// set status
app.use((req, res, next) => {
	res.status(404).send("Sorry cant find that!");
});

// error handler middleware
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send("Something broke!");
});

~~~

app.listen(3000);
```
