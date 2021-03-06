# Node.js 
대학 수업을 들으며 필요에 의해 공부했었고 다시금 기억을 떠올리기 위해 <br> 
생활 코딩의 **`Node.js 프로그래밍`** 이란 책을 보면서 다시 시작했다. <br>
<br>
이 저장소의 내용은 매우 간단하다. <br>
<br>
내 생각에 CRUD가 존재하는 웹 페이지의 작동은 서버의 효율성등을 따지지 않는 이상<br>
가장 기초적인 것들로 구현할 줄 알아야 한다고 생각한다!!!
<br>
<br>
첫 째 - CRUD가 존재하며 DB는 `FileSystem`으로 대체하는 웹<br>
둘 째 - CRUD가 존재하며 DB는 `MySql`로 관리하는 웹<br>
<br>
이를 완수하고 나면 `express.js` 프레임워크를 이용해 위에서 이해한 내용들을 어떻게, 그리고<br>
얼마나 더 간편하게 만들 수 있는지 비교할 것이다. (내용은 스터디 레포에!)
<br>
<br>
마지막으로 보안성에 대한 기능을 부착하고 다중 접속 이용자들을 어떻게 관리할지를 
고민할 것이다.
<br>
<br>

## 2022-03-07 
레이아웃 짜기 (기능구현 인터페이스만)
## 2022-03-08 
대충 라우팅만 구현... 기능은 나중에 구현하자!
## 2022-03-09 
- css가 로딩이 안되는 이유를 찾았다....
> Hi Brian. Files such as css and pngs etc. are regarded as 'static' or 'public' files. You probably found that when simply viewing your index.html on your >local PC, (without Nodejs), these files were loaded automatically and it was your browser that handled that for you. But with nodejs, you have currently only >coded for index.html, so that in your browser, you can see at http://localhost:3000/ your index.html only.
>
>in your browser, if you look at your JavaScript console (F12 in Chrome), you will see these 2 errors (and maybe more)...
>
>Resource interpreted as Stylesheet but transferred with MIME type text/html: "http://localhost:3000/styles.css".
>
>Resource interpreted as Stylesheet but transferred with MIME type text/html: "http://localhost:3000/main.css".
>Your browser recognises that these 2 files are required but the node server cannot currently handle the request. Instead the server just returns the index.html >file which the browser knows is not formatted as text/css.
>
>So you would need to manually add 'routes' for each of these static files. In a nutshell, it can be done in native nodejs but quite quickly you would find this >is not the way to go. Instead, this is why frameworks like 'Express' are so popular because they have tools built-in, that handle all of this for you.
>
>Here are just 2 links that show how complex this can get if you try and do this manually.

아.. express 써야 쉽고 간편하단다... 직접구현은 어렵다고 손수 링크까지 써서 알려주네... 아...
- 이전꺼 복습하고 소대껄로 query 사용해서 라우팅 구현해봤음 다시...

## 2022-03-10 

🙎‍♂️ [패키지 매니저 사용하기](https://github.com/lopahn2/nodeJS_Study/blob/main/PM2.md)

🙋‍♂️ GET method 사용시 url의 쿼리스트링이 노출되고 POST method 사용시 노출 안됨. 데이터를 읽어올 때는 get, 작성 후 전송할 때 post 를 쓰는 이유!

🙆‍♂️ 에러 발생과 해결 <br>
`TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Location"]` <br>

**Ans** -> internal server error occurs when redirect path includes `query strings of non-ascii character(like Japanese)`

💁‍♂️ [form 태그를 이용한 POST 메소드 사용](https://github.com/lopahn2/nodeJS_Study/blob/main/report/form_url.md)

## 2022-03-11 

🙎‍♂️ [수정 기능 구현](https://github.com/lopahn2/nodeJS_Study/blob/main/report/update.md)

🙋‍♂️ [삭제 기능 구현](https://github.com/lopahn2/nodeJS_Study/blob/main/report/delete.md)

🙆‍♂️ 에러 발생과 해결 <br>
`Access to font at 'https://www.goorm.io/goormMainPage/lib/css/font/NotoSansKR-Regular.woff2' from origin 'https://hwany.run.goorm.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` <br>

`CORS` 오류인데 이에 대한 자세히 설명해놓은 포스팅을 찾아서 첨부!! <br>

[CORS오류의 종류와 해결법](https://evan-moon.github.io/2020/05/21/about-cors/)

## 2022-03-12

🙎‍♂️ 코드 리펙토링 (모듈화) 

🙋‍♂️ [URL path에 중요 정보 노출 안되게 하기](https://github.com/lopahn2/nodeJS_Study/blob/main/report/URL-Security.md)

🙆‍♂️ [XSS 막기](https://github.com/lopahn2/nodeJS_Study/blob/main/report/XSS.md)

🤷‍♂️ goorm 왜 이렇게 자주 튕기는거야 정말 난 진짜로 이해안돼!

![에러사진](https://user-images.githubusercontent.com/76484900/158021004-a3eea1a2-1ead-4bf6-b48c-25a9ec71df47.png)

## 2022-03-22

🙎‍♂️  격리 끝나고 머리 부여싸매면서 다시 기억해내고 혼자해보기

🙋‍♂️ 모듈 파일 exports를 export라 해서 10분 해매기

🙆‍♂️ 웹 페이지 만든 순서
1. 기본적인 UI 구성
2. main.js 에 필요한 모듈 require
3. UI를 template.js로 옮겨서 모듈화
4. pathName으로 큰 틀로 라우팅
5. querydata 이용해서 파일 읽어오기 구현
6. create UI 구현
7. create form 형식 이용해서 create_process 루트로 넘김
8. create에서 form 형식으로 넘어온 데이터 querystring 모듈이용해 파일 쓰기 구현

🤷‍♂️ 같은 과정 10번만 반복하면 익숙해질듯?


## 2022-03-25

🙎‍♂️  집들이 웹페이지 만들었어! 라우팅 공부하려고!

🙋‍♂️ menuHtml을 menuhtml이랑 햇갈려서 한 15분 고민한 듯

🙆‍♂️ `/menu` 에서 `/menu/room` 으로 이동한 뒤에 `/menu/room?name=누구게` 와 `/menu?name=누구게&roomname=어디로` 이 두가지 중 **`/menu/room?name=누구게`** 로 했는데 다음엔 쿼리스트링 두개 써서도 한 번 해보자!

🤷‍♂️1시간 15분 걸렸는데 40분 컷 할 때까지! 뇌가 익숙해질 때 까지! 으쌰쌰으쌰 뿌잉뿌뿌잉

## 2022-03-29~04-04 여단 격리... 응애... 나 격리당했오...

## 2022-04-04

🙎‍♂️ CRUD가 모두 있는 블로그 만들었쒈!

🙋‍♂️ 리다이렉션이랑 update 구현에서 살짝쿵 막혔었음. 복습 요망!

🙆‍♂️ 1시간 37분 걸렸다... 너무 길다. 1시간 내로 컷 할 때까지 몇 번 더 반복해보자.

## 2022-04-05
🙎‍ write에서 form 으로 넘어온 데이터를 res로 계속 받으려 했다. 나는 바보다.

🙋‍ 리다이렉션을 할 때에는 `res.on('end', ()=>{})` 내부에서 해야한다.
왜냐하면 데이터를 모두 받은 후 하는 액션이 저 내부블록에서 정의되기 때문에.

🙆‍update 또또또또 순서 꼬여서 시간 버렸어 
delete 살짝 설렜어 난 빰빠빰 또 까먹었어 빰빠빰

🤷‍♂️ 1시간 29분 걸렸다. 뇌절만 안하면 진짜 1시간 컷 될거같음. 파이팅!

!!!! 제일 중요한거. 작업 끝내고 **`pm2 kill`** 로 꼭 프로세스 끄기... 맨날 프로세스 겹친다..

## 2022-04-07

🙎‍ 기존에 만들어 놓았던 CRUD 블로그를 express.js 프레임워크를 이용해 깔쌈하게 바꿔보았다. 책 보면서 따라한게 다라서 내일 도서관에서 정리하고 나서 
스터디 레포에 정리해야지

## 2022-04-08 
🙎‍ 책 내용 정리! [express](https://github.com/lopahn2/nodeJS_Study/blob/main/report/Express.md)
<br>

🙋‍ **body-parser middleware** <br> 

Post 방식으로 전송한 데이터를 내부적으로 분석해서 그 결과를 request에 담아서 보내주는 미들웨어이다.
<br>

```js
cosnt bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : false }));

app.post('/create_process', (req, res) => {
  let post = req.body;
  ...
});
```

🙆‍ **Compression middleware** <br>

웹 서버가 웹 브라우저에게 응답할 때 데이터를 압축해서 보낼 수 있도록 해주는 미들웨어이다.
<br>
```js
const compression = require('compression');

app.use(compression());
```

## 2022-04-09
🙎‍ html 파일을 불러와서 script에서 require 함수가 안먹는다... 짜증난다... 

🙋‍ html 파일들을 node 모듈을 이용하면서 제어할 수 있도록 template.js로 관리하면서, css도 적용할 수 있도록 해봐야겠다. 

## 2022-04-10
🙎‍ [라우터 파일로 관리하기](https://github.com/lopahn2/nodeJS_Study/blob/main/report/RouteFile.md)

🙋‍ 이제 그냥 쿠키랑 세션으로 넘어가야겠다. 급하다 급해!

## 2022-04-11
🙎‍ [쿠키 생성과 읽기](https://github.com/lopahn2/nodeJS_Study/blob/main/report/Cookie_Create_Read.md)

## 2022-04-12
🙎‍ [쿠키의 활용](https://github.com/lopahn2/nodeJS_Study/blob/main/report/Cookie_Options.md)
<br>
🙋‍ 쿠키는 사용자의 개인화를 위한 도구이지 인증을 쿠키로 하면 안된다. 네트워크도구에 떡하니 내용이 찍히기 때문! 
따라서 이는 세션으로 인증을 구현하는데 인증을 구현하는 과정정도는 쿠키로 해봤다. 배워봤으니까 써먹어봐야지!
<br>

**<인증 기능 구현>** <br>
인증 기능을 구현할 때에는 쿠키를 사용하면 위험하다.<br>
콘솔의 네트워크도구에서 쿠키값을 바로 볼 수 있기 때문에.<br>

1. 로그인 화면 만들기<br>
2. 로그인 라우터 만들기<br>
3. 로그인 프로세스 라우터에서 로그인 쿠키 처리하기<br>
4. 로그인 상태 체크<br>
5. 로그아웃 구현<br>
6. 접근제어<br>


## 2022-04-14
🙎‍ [세션의 모든..것?](https://github.com/lopahn2/nodeJS_Study/blob/main/report/Session.md)

<br>
🙋‍ 이제 진짜 왠만한거는 다 만들 수 있을거 같아... 풀스택으로 블로그 하나 제대로 만들어보자! 한 일주일이면 되겠지? 

## 2022-04-15 mileston Blog CRUD 1일차
🙎‍ milestone을 사용해봤다. 이거 섹시한데? 오 이거 섹시한데? 오 이거 레오 섹시 한데? 이거 오 레오 한데? 섹시 <br>
그저 '/' 껍데기만 구현했다. ㅋ. ㅋ. ㅋ.
## 2022-04-15 mileston Blog CRUD 2일차
🙎‍ sign up 화면을 구현했다. 내일은 기능 구현할차례! <br>
그리고 생각해봤는데 아이디랑 비밀번호 찾는거 핸드폰 인증 API 땡겨와서 해볼까..? 돈안들겠지? ㅋㅋ
## 2022-04-17 mileston Blog CRUD 3일차
🙎‍ mysql 설정하기 [mysql](https://github.com/lopahn2/nodeJS_Study/blob/main/report/MySql.md) <br>
🙋‍ 진짜 설정하는데 애먹었다. 싸지방 정말 힘들다 ... 실습책 가지고 sql 좀 조물딱 거려보고 바로 blog에 적용해보자!
## 2022-04-18 mileston Blog CRUD 4일차
🙎‍ mysql 설정 하고 회원가입시 db저장 기능 구현 완료 <br>
🙋‍ 하는김에 비밀번호 암호화까지 설정완료! 훈련하느라 피곤하다... 한시간만 하고 자야지... <br>
## 2022-04-19 mileston Blog CRUD 5일차
🙎‍ 로그인 실패시 / 로그인 성공시 이동 페이지 구현완료 <br>
🙋‍ 홈페이지 능동적으로 만들기 위해서 모듈화시키기 (텍스트로 만들어 만들어 버려 버려)<br>
내일은 CRUD 본격적으로 구현해보자.
## 2022-04-20 mileston Blog CRUD 6일차
🙎‍ 초반에 로그인기능 중 예외처리 못한게 있어서 분기점을 수정했다. <br>
```js
db.query(`SELECT * FROM user where email= ? and password = ?`,[email, password],(err, result) => {
		if (result.length === 0) {
			res.write("<script>alert('등록되지 않은 사용자거나 비밀번호가 틀렸어')</script>");
			res.write("<script>window.location=\"/\"</script>");
			res.end();
		} else {
			req.session.isLogin = true;
			req.session.N_NAME = result[0].N_NAME;
			req.session.save();
			
			res.redirect('/home');
		}
	});
```

🙋‍ app.post 로 라우터를 처리하고 싶으면 꼭... form 태그로 감싸자.. 왜 a 태그로 해서 바보같이... <br>

🙆‍ session maxAge를 설정안해서 세션이 사라지는게 아니라 nodejs 서버가 재구동 될 때마다 ( 수정사항이 생길 때 마다 ) session이 사라지는 것이다. 새로고침이나 url 이동등으로 사라지는게 아님! <br>

🤷‍ dashboard 게시글은 float을 이용해서 한 번 해보자! 그럼 더 이쁠거같은데? 물론 UI는 난 모르겠다 ㅋㅋ 

## 2022-04-20 mileston Blog CRUD 7일차
🙎‍ img를 db에 저장해서 client가 불러오는 과정까지는 다 했는데... 왜 안돼지? ㅋㅋㅋㅋ 아 .. ㅋㅋㅋㅋ 내일 다시..해야지..

## 2022-04-20 mileston Blog CRUD 8일차
🙎‍ multer 미들웨어 사용하며 img 파일 업로드 까지는 됐는데.. 이걸 받아오는 create_process 라우터에서 계속 interval server error 가 발생한다.. 비동기 핸들링이 필요한 시점인거 같은데 공부좀 더 하고 와서 다시 시작해야할 것 같다. 여기서 잠시 멈추었다가 다시 시작하는게 더 나은 결과를 위한 길인 것 같다!

## 2022-04-27 길벗 1일차 

## 프로젝트 구조 갖추기

 **package.json 작성**

**database package install**
```
npm i sequelize mysql2 sequelize-cli
npx sequelize init
```
**폴더 구조 생성**
  - 템플릿 파일 (nunjucks)을 넣을 **views 폴더**
  - 라우터를 넣을 **routes 폴더**
  - 정적 파일들을 넣을 **public 폴더**

**서버 파일 생성**
  - app.js 생성
  - .env 파일 생성

**필요한 package들 설치**
```
npm i express  cookie-parser express-session morgan multer dotenv nunjucks
npm i -D nodemon

```
  
## app.js 파일 작성
1. 필요한 모듈들 선언하기
2. 미들웨어 express 객체에 붙이기
3. 라우팅 처리하고 에러 처리 라우팅 붙이기
4. .env 파일 작성하기

## page.js 라우터 파일 작성
1. 필요한 기능들을 express.Router() 에 붙이기. 이때 템플릿 엔진에서 공통으로 사용할 변수를 
  res.locals 객체에 넣어두었음.
2. 템플릿 엔진 파일 작성

## 데이터 베이스 세팅하기
1. Sequelize 미들웨어를 이용해서 모델들 정의하기
2. models 폴더 내부에 있는 index.js를 내가 쓰는 모델들에 대해서 맞춰주기
3. 각 모델들 간의 관계 형성하기. 
```js
static associate(db) { 
	/* 여기에다가 */ 
}
```

> 유의사항
> 1. 같은 테이블 간 N:M 관계는 모델 이름과 컬럼 이름을 따로 정해주어야 한다. (through 프로퍼티 사용)
>  2. 같은 테이블 간 N:M 관계에서 foreignKey와 as 프로퍼티는 서로 반대되는 모델을 포인팅함.
>  3. belongsTo의 경우 (정보가 기입되는 테이블).belongsTo(정보를 주는 테이블) 임을 유의한다.
  
 
## 에러
  
### mysql access denied error  
```
Sequelize CLI [Node: 10.16.3, CLI: 6.4.1, ORM: 6.19.0]

Loaded configuration file "config/config.json".
Using environment "development".

ERROR: Access denied for user 'root'@'localhost'
```

해결 : https://stackoverflow.com/questions/16003338/mysql2error-access-denied-for-user-testlocalhost-to-database-depot-test


### module path twisted??
여기서 부터 막힘 왤까 ... 뭐가 문제일까
```
Error: Cannot find module 'Sequelize'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
    at Module.require (internal/modules/cjs/loader.js:692:17)
    at require (internal/modules/cjs/helpers.js:25:18)
    at Object.<anonymous> (/workspace/nodeJS_Study/gilbut/models/post.js:1:19)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
[nodemon] app crashed - waiting for file changes before starting...
```

node_modules 와 sequelize 관련 폴더들을 모두 삭제한 뒤 재설치하니까 됐다. 세상 참 서럽다

## 2022-04-28 길벗 2일차

### Passport 모듈로 로그인 구현
필요 패키지
```
npm i passport passport-local passport-kakao bcrypt
```

1. passport 패키지를 app.js에 연결

2. passport 모듈을 만든다

🙍‍♂️ **serialize, deserialize** 

🙋‍♂️ **로컬, 카카오 로그인 전략 구현하기**

🙆‍♂️ 라우터에 **접근 권한을 제어** 하는 미들웨어가 필요하다.
**`req.isAuthenticated`** 메서드 : passport가 req 객체에 추가해주는 메서드.

💁‍♂️ page 라우터에 연결한다. 각 라우터에 미들웨어로 연결해준다.

```js
router.get('/profile', userDefinedMiddleWare, (req,res) => {~});
```


3. 회원가입, 로그인, 로그아웃 라우터를 작성한다.

4. 로그인 전략 js파일을 작성한다.

5. 카카오 로그인 라우터를 auth 라우터에 작성.

### ERROR
오류의 시작과 끝은 오타다 

#### local file
```
TypeError: User.fineOne is not a function
```
ㅋㅋㅋㅋㅋㅋㅋ
**`'fineOne'`**
ㅋㅋㅋㅋㅋㅋㅋ 
내 20분...

#### kakao authentication issue
```
관리자 설정 이슈 (KOE006)
node 두려운 재시작 서비스 관리자의 확인이 필요합니다.
관리자이신 경우 해결방안을 눌러 확인해보세요.
```
```
https://hwany.run.goorm.io/auth/kako/callback
```
ㅋㅋㅋㅋ kako ㅋㅋ
 카코 ㅋㅋ

**해결**
http 프로토콜로도 등록해주어야 된다. 
```
http://hwany.run.goorm.io/auth/kakao/callback
https://hwany.run.goorm.io/auth/kakao/callback
```

## 2022-04-30 길벗 3일차

multer 패키지로 이미지 업로드 구현

1. post 라우터 구현
이미지를 받아오는 라우터 /img
게시글을 업로드하는 라우터 /

2. page 라우터에 게시글을 함께 로딩하기위해 수정

3. 팔로잉 기능과 해시태그 검색기능 추가

4. page 라우터 수정

5. app.js 에 붙이기


이제 처음부터 다시 보면서 제대로 정리해보자.
한 번 해봤으니까 어떻게 돌아가는지 아니까!

이거 다하면 이제 군해커톤 준비 + 알고리즘 공부하면 되겠다! 
앞날 창창 제발!!

## 2022-05-02 길벗 4일차
공부한 내용들 포스팅 스터디에 업로드.
## 2022-05-03 길벗 5일차
nunjucks 템플릿 엔진 기본 사용법 인지. 혼자 공부할 때 컴포넌트 관리하듯 html 쓸 수 있어서 좋을 듯

## 2022-05-04 길벗 6일차

### 팔로잉 끊기 구현
**1. 먼저 조건에 따라 팔로우끊기 버튼이 나오도록 조정했다.**
```html
{% elif followerIdList.includes(twit.User.id) and twit.User.id !== user.id %}
<button class="twit-unfollow">팔로우끊기</button>  
```

**2. 이벤트를 달아주고 axios 요청을 팔로우 제거 라우터로 보내도록 만들었다.**
```js
document.querySelectorAll('.twit-unfollow').forEach(function(tag) {
	tag.addEventListener('click', function() {
	const myId = document.querySelector('#my-id');
	if (myId) {
	  const userId = tag.parentNode.querySelector('.twit-user-id').value;
	  if (userId !== myId.value) {
		if (confirm('언팔로우 하시겠습니까?')) {
		  axios.post(`/user/${userId}/unfollow`)
			.then(() => {
			  location.reload();
			})
			.catch((err) => {
			  console.error(err);
			});
		}
	  }
	}
	});
});
```

**3. 서버 라우터쪽에서 시퀄라이즈 모델의 팔로잉을 remove 해주었다.** <br>
[참고한 문서](https://sequelize.org/docs/v6/core-concepts/assocs/#note--method-names)

```js
router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
	try {
		const user = await User.findOne({ where : { id : req.user.id } });
		if(user) {
			await user.removeFollower(parseInt(req.params.id));
			await user.removeFollowing(parseInt(req.params.id));
			res.send('success');
		} else {
			res.status(404).send('no user');
		}
	} catch(err) {
		console.error(err);
		next(err);
	}
});
```

### 프로필 수정하기 구현
**1. 프로필 정보라 해봤자 닉네임 하나뿐이므로 입력창을 따로 안만들고 prompt로 간단히 구현**
```html
<a id="update" class="btn">프로필 수정하기</a>
```

```js
document.querySelector('#update').addEventListener('click', () => {
  const updateId = prompt("닉네임을 뭐로 바꾸실려고?");
  axios.post(`/auth/update/${updateId}`)
		.then(() => {
		  location.reload();
		})
		.catch((err) => {
		  console.error(err);
		});
 });	
```

**2. 라우터 구현**

```js
router.post('/update/:updateId', isLoggedIn, async (req, res) => {
	await User.update(
      {
		nick : req.params.updateId
	  },
	  {
		  where : {nick : req.user.nick}
	  }	
	);
	res.redirect('/');
	
});
```

## 2022-05-05 길벗 7일차

현타온다. 물론 이 많은 내용을 한 번에 이해하는 것은 불가능하겠지만... 리팩토링 손 대려니 하나도 못하겠다. 하나도 모르겠어.. 난 진짜 코드만 따라 적고있었던거지..<br>
어떻게 해야할까? 기능만 참고해서 처음부터 다시 만들어봐야하나? 그렇게 하려면 코딩테스트 공부는 언제하고? ... 모르겠다.. <br>

뭔가 내가 계속 외워서 문제를 해결하려는 것 같다. 필요에 의해 찾아보면서 부품들을 갖추어 나가다 보면 어느샌가 익숙해져 있지 않을까? <br>
의기소침해져가지고 공부하기 싫어지는 것 보다 그게 낫지 않을까?... 개인정비시간에도 내려와서 공부해야겠다. 진짜로 . 더이상은 안돼! <

## 2022-05-06 길벗 8일차
MySQL에 대해서 다시금 고민

## 2022-05-07 길벗 9일차

Sequelize 사용과 관계에 대해서 다시금 생각


## 2022-05-08 길벗 10일차
### 오늘의 바보짓

**1. 응애**

database config 파일에 development_database 사용한다 했는데 실제 nodejs에서는 nodejs database로 설정해놓고 안된다고 찡찡거리기. <br>

이때 발생한 오류는  <br>

`Unknown column 'name' in 'field list` <br>

바로 config 파일 수정해서 정상작동함. <br>

**2. 응애응애**
```
[ ValidationErrorItem {
       message: 'User.comment cannot be null',
       type: 'notNull Violation',
       path: 'comment',
       value: null,
       origin: 'CORE',
       instance: [User],
       validatorKey: 'is_null',
       validatorName: null,
       validatorArgs: [] } ] }
```

이런거 떴는데 난 분명 코드 책이랑 똑같이 쳐놨단 말이지..? <br>
그래서 User의 comment 컬럼 옵션을 어떻게 설정했는지 살펴봤어. <br>
```js
comment : {

type : Sequelize.TEXT,

allowNull : false,

},
```
아 null을 허용하지 않도록 해놨구나. 그래서 저 에러가 뜨는구나. <br>

했어. 했는데 아니 UI에 댓글다는 곳이 없잖아. <br>

밑에 아이디 입력하고 입력하는 칸은 있는데 아직 사용자 등록 전인데..??? <br>

그래서 comment 란은 allowNull을 true로 주고 defaultValue 를 "" 처리해주었다. <br>

```js
comment : {
				type : Sequelize.TEXT,
				allowNull : true,
				defaultValue : "",
			},
```
<br>
진짜 다사다난한다.. 그래도 이제 감잡았어. 어떻게 흘러가는지!  <br>
세번만 더 해보자. 그러면 진짜 흐름잡고 만들 수 있을거같아. <br>
<br>
5월 13일 이내에 프로젝트 시작하는거 목표로 공부한다. <br>
아무도 날 막을 수 없으샘 ㅋㅋ<br>

## 2022-05-09 길벗 11일차
### 오늘의 바보짓

```
TypeError: Router.use() requires a middleware function but got a Object  
```

router 파일의 맨 아래에... <br>
```js
module.exports = router;
```
이거 안해줘서..그런거.. ㅋㅋ..<br>
### 오늘 한 것들
package.json 파일 설정 <br>
필요한 패키지들 다운로드 <br>
폴더구조 생성 <br>
app.js 작성 <br>
routes 폴더 내부에 route 설정 <br>
프론트 레이아웃 설정 <br>
데이터베이스 세팅 <br>
 모델 선언 및 관계 설정 <br>
Passport 모듈로 로그인 구현하기 <br>

## 2022-05-11 길벗 12일차
multer 사용해서 파일 업로드 구현하고... 팔로우 팔로워 관계 정립하고... 마무리했다... <br>
아직도 팔로우 팔로워는 헷갈리는데 DB공부 진짜 좀 해야겠다. <br>
<br>
이제 내일 스스로 해보기 부분만 끝내고 바로 실전이다... 두근두근 떨린다... <br>
프로젝트 진행하면서 지금까지 배웠던 것들 다 써먹으면서 더더욱 발전해나가고 싶다. <br>
생각보다 생각을 안하는 나를 잘 알기에 귀찮음을 이겨내야 하기 때문에 더더욱 더더욱 명분을 만들고싶다. <br>

## 2022-05-12 길벗 13일차
드디어 끝났다. deserialize 가 cache가 안되긴 하는데.. 뭐 쩝...ㅋㅋ 어쩔티비~ <br>
이제 진짜 구현해보자. 가보자 해보자 가보자 해보자 가보자~~~~

