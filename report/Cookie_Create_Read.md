# cookie

🙎‍♂️ web에서 CRUD로 멀티 유저들이 여러 정보들을 관리할 수 있게 되었다. <br>

🙋‍♂️ 그러나 그 중에 '개인'에 관점을 맞추어서 문제를 해결하려 하였고 그에 대한 답안으로 나온 것이 **`cookie`** 이다. <br>

🙆‍♂️ 쿠키로 인해서 웹 브라우저는 사용자가 누구인지 확인할 수 있게 되었다. <br>

## 쿠키의 생성

🙎‍♂️ 쿠키는 웹 브라우저와 웹 서버가 정보를 주고받는 기술로 **`http 프로토콜`** 에 속한다. <br>

### MDN 문서
**`HTTP 쿠키(웹 쿠키, 브라우저 쿠키)`** 는 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각입니다. 브라우저는 그 데이터 조각들을 저장해 놓았다가, 동일한 서버에 재요청 시 **저장된 데이터를 함께 전송** 합니다. 쿠키는 두 요청이 동일한 브라우저에서 들어왔는지 아닌지를 판단할 때 주로 사용합니다. 이를 이용하면 사용자의 로그인 상태를 유지할 수 있습니다. 상태가 없는(stateless) HTTP 프로토콜에서 상태 정보를 기억시켜주기 때문입니다. <br>

쿠키는 주로 세 가지 목적을 위해 사용됩니다 <br>

- **`세션 관리(Session management)`** : 서버에 저장해야 할 로그인, 장바구니, 게임 스코어 등의 정보 관리

- **`개인화(Personalization)`** : 사용자 선호, 테마 등의 세팅

- **`트래킹(Tracking)`** : 사용자 행동을 기록하고 분석하는 용도

<br> 

### Set-Cookie 그리고 Cookie 헤더

Set-Cookie HTTP 응답 헤더는 서버로부터 사용자 에이전트로 전송됩니다. 간단한 쿠키는 다음과 같이 설정될 수 있습니다. <br>
```
Set-Cookie: <cookie-name>=<cookie-value>
```

<br>

이 서버 헤더는 클라이언트에게 쿠키를 저장하라고 전달합니다.
<br>

```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```

<br>

```js
const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, {
		'Set-Cookie' : ['yummy_cookie=choco', 'tasty_cookie=strawberry']
	})
	res.end('hello cookie!');
}).listen(80);
```
<br>

---

🙎‍♂️ 개발자 도구로 response의 header를 보면 cookie가 생성되어있다. <br>

🙋‍♂️ `res.writeHead` 부분을 주석처리하고 웹브라우저를 새로고침 해보면 response의 header에 있던 cookie는 사라지고 (주석 처리 했기 때문에) request의 header에 cookie가 생성되어있다. <br>

🙆‍♂️ 즉, 한 번 쿠키를 보내면 캐쉬를 초기화 하지 않는 이상 새로고침을 할 때마다 cookie의 헤더값이 서버로 전송된다. <br>

## 쿠키 읽기

🙎‍♂️ 쿠키의 request header에 두 개의 쿠키가 있기 때문에 **`request.headers.cookie`** 로 값을 읽어온다. <br>

```js
const http = require('http');

http.createServer((req, res) => {
	
	res.writeHead(200, {
		'Set-Cookie' : ['yummy_cookie=choco', 'tasty_cookie=strawberry']
	})
	console.log(req.headers.cookie);
	res.end('hello cookie!');
}).listen(80);

```
<br>

🙋‍♂️ 하지만 req.headers.cookie는 쿠키값을 문자열로 받아오기 때문에 이를 객체화 시켜주는 `cookie 모듈` 이 있다. <br>

🙆‍♂️ 이 모듈은 undefined를 예외처리 하지 못하는 경직된 모듈이기 때문에 if 문으로 예외처리를 해주어야 한다. <br>

```
npm install -s cookie
```
<br>

```js
const http = require('http');
const cookie = require('cookie');

http.createServer((req, res) => {
	let cookies = {};
	if (req.headers.cookie !== undefined) {
		cookies = cookie.parse(req.headers.cookie);
	}
	console.log(cookies);
	res.writeHead(200, {
		'Set-Cookie' : ['yummy_cookie=choco', 'tasty_cookie=strawberry']
	})
	
	res.end('hello cookie!');
}).listen(80);
```
