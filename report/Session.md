# Session
## 세션의 등장
🙍‍♂️ 쿠키의 등장으로 웹 사이트는 개인화와 인증등의 기능을 구현할 수 있게 되었다. 
<br>
🙋‍♂️ 그러나!! 쿠키는 네트워크 도구나 개발자 도구로도 내용을 읽어올 수 있기 때문에 보안상 취약하다. 
<br>
🙆‍♂️ 따라서 이에대한 수요로 세션이 등장하게 되었다.
<br>
### 세션으로 인증한 웹의 경우
1. 로그인시 세션 아이디가 발급
2. 이 아이디 값 자체는 의미가 없고 필요로 하는 데이터의 주소로서 작용
3. 실제 정보는 session 디렉터리에 파일로 저장되거나 DB로 연동한 경우 안전하게 보관됨.

💁‍♂️ 즉, 민감한 정보는 서버쪽에서 은밀히 저장하고 클라이언트는 정보가 사용자의 것인지 아닌지를 식별하는 용도로 사용한다.
<br>
## 세션의 사용


> **nodemon**
> nodemon은 pm2보다 편리한 패키지 매니저로 `nodemon [ App file name]` 으로 실행한다. 
> ```
> npm install nodemon
> ```
<br>

### 세션 설치 및 등록

```
npm install -s express-session
```
<br>

```js
// 세션 미들웨어 불러오기
const session = require("express-session");

// 세션 미들웨어 등록하기
app.use(session{
	secret : '다른사람에게 노출되선 안되고 자신만 알고싶은 내용',
	resave: false,
	saveUninitialized : true
});
```

### 옵션명
1. **secret** :  노출되면 안되는 내용을 작성한다. git으로 버전관리를 하는 경우 커밋하면 안되고 따로 파일로 관리해 변수로 불러와야 한다.
2. **resave** : 데이터를 세션저장소에 저장할지 설정한다.  <br> <br> **`false`**  : 세션 데이터가 바뀌지 않는 한 세션저장소에 저장하지 않는다.  <br> **`true`** : 무조건 세션저장소에 저장한다.  <br>
3. **`saveUninitialized`** : 세션의 구동여부를 설정한다. <br><br> **`false`** : 무조건 세션을 구동한다. <br> **`true`**  : 세션이 필요하기 전까지 세션을 구동하지 않는다.

<br>

## 세션 객체의 내용
```js
app.get('/' , (req, res) => {
	console.log(req.session);
	res.send("Hello Session");
});
```
🙍‍♂️ 세션 객체가 콘솔창에 나온다. 
<br>
🙋‍♂️ 즉, 데이터는 request의 세션객체에 태워 보내면 된다.


## 세션 저장소
🙍‍♂️ 세션 데이터는 서버 메모리에 저장되기 때문에 nodejs 서버를 종료하면 삭제된다.
<br>
🙋‍♂️ 이를 막기위해 세션스토어(session-store)를 이용해서 저장소를 구축하면 된다.
<br>
```
npm install session-file-store
```

```js
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session{
	secret : '다른사람에게 노출되선 안되고 자신만 알고싶은 내용',
	resave: false,
	saveUninitialized : true,
	store : FileStore()
});
```

🙆‍♂️ 이러면 디렉터리에 json 확장자 명을 가진 세션파일이 생성된다.
<br>
💁‍♂️ 우리가 사용하는 **express-session** 미들웨어는 사용자가 세션아이디를 가지고 있는 상태에서 서버로 접속시 요청헤더에 있는 쿠키값으로 세션 아이디를 서버에 전달한다.

## 알뜰신잡
1. **세션삭제** : **`req.session.destory((err) => {});`** 
2. **세션저장** : 세션 저장소가 굉장히 느려져서 리다이렉션이 먼저 발생하는 경우 인증이 되지 않는다. 이를 막기위해서 세션객체의 save 메소드를 사용한다. <br> <br> **`req.session.save(() => {});`**
3. **보안통신** :  앱이 https 프로토콜만으로 통신하기 원하고 세션값을 자바스크립트로 오남용할 수 없도록 하고싶을 때 사용한다. <br> 
```js
app.use(session({
	secure : true,
	HttpOnly : true,
	...
}));
```
