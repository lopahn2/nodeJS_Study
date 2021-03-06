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

๐โโ๏ธ express๋ฅผ ์ฌ์ฉํ์ง ์์์ ๋
```js
res.writeHead(200);
res.end("Hello World!");
```
<br>

๐โโ๏ธ express๋ฅผ ์ฌ์ฉํ  ๋
```js
res.send("Hello World!");
```

## Semantic URL

๐โโ๏ธ ๊ธฐ์กด์ queryString ์ ๋ฌ ๋ฐฉ์์์ ๊ฒ์ ์์ง์ ์นํ์ ์ธ semantic URL์ ์์ฃผ ์ฌ์ฉํ๋ค๊ณ  ํ๋ค.

- Route path = /page/:Doc/:User
- Request URL = http://www.naver.com/page/Html/hwany
- req.params = {"Doc" : "Html", "User" : "hwany"}
```js
app.get('/page/:Doc/:User', (req, res) => {
	res.send(req.params);
});
```

## app.get ?     app.post?

๐โโ๏ธ request์ response์ ๋ด์ฉ์ด ์๋ฒ์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๋๋ ์์ ํ๋๋์ ๋ฐ๋ผ์ ์ฌ์ฉํ๋ฉด ๋๋ค.  <br>

( form ํ๊ทธ์ method์ ๋ฐฉ์์ ๋ฐ๋ผ์ ์ฌ์ฉํ๋ฉด ๋๋ค.)

```js
app.get('/user', (req, res) => {
	~~~
});

app.post('/user_update', (req, res) => {
	~~~
});
```

## middleware
๐โโ๏ธ ๋ฏธ๋ค์จ์ด๋ ๊ฐ๋จํ ๋งํด์ ์ฌ๋ฌ ์ฌ๋์ด ๊ฐ๋ฐํ ์ํํธ์จ์ด๋ฅผ ์ฌ์ฉํด ์์ฐ์ฑ์ ๋์ด๋ ค๊ณ  ํ  ๋ ์ฌ์ฉํ๋ ๊ธฐ๋ฅ์ด๋ผ ๋ณด๋ฉด ๋๋ค. 

### type of middleware
- Application-lever middleware
- Router-lever middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware

๐โโ๏ธ Application-level middleware๋ express ์ ํ๋ฆฌ์ผ์ด์์ ๊ฐ์ฒด์ด๋ค.

๐โโ๏ธ ์ด๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด `app ๊ฐ์ฒด` ์ `use ๋ฉ์๋` ์ ์ฝ๋ฐฑ ํจ์๋ฅผ ์ ์ํ๋ ๊ฒ์ผ๋ก ์์ํ๋ค.
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

1. **`next('route')`** : ๋ค์ ๋ผ์ฐํธ์ ๋ฏธ๋ค์จ์ด๊ฐ ์คํ๋จ.
2. **`next()`** : ๋ค์ ๋ฏธ๋ค์จ์ด๊ฐ ์คํ ๋จ.
3. **`next(some argument)`** : ์๋ฌ ํธ๋ค๋ฌ์ ๋ฏธ๋ค์จ์ด๊ฐ ์คํ ๋จ.

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

๐โโ๏ธ ์๋ฌ ํธ๋ค๋ง ๋ฏธ๋ค์จ์ด๋ ์ฝ๋์ ๋ง์ง๋ง ๋ถ๋ถ์ ๋ฐฐ์นํ๋ค.

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
