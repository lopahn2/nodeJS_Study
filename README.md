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

## 2022-04-27 길벗 1일차 (마크업 문서 수정필요 / npm 다시 )
1. 프로젝트 구조 갖추기
 - package.json 작성
 - database package install
 -- npm i sequelize mysql2 sequelize-cli
 -- npx sequelize init

 - 폴더 구조 생성
 -- 템플릿 파일 (nunjucks)을 넣을 views 폴더
 -- 라우터를 넣을 routes 폴더
 -- 정적 파일들을 넣을 public 폴더

 - 서버 파일 생성
 -- app.js 생성
 -- .env 파일 생성

 - 필요한 package들 설치
 -- npm i express  cookie-parser express-session morgan multer dotenv nunjucks
 -- npm i -D nodemon

2. app.js 파일 작성
 - 필요한 모듈들 선언하기
 - 미들웨어 express 객체에 붙이기
 - 라우팅 처리하고 에러 처리 라우팅 붙이기
 - .env 파일 작성하기

3. page.js 라우터 파일 작성
 - 필요한 기능들을 express.Router() 에 붙이기. 이때 템플릿 엔진에서 공통으로 사용할 변수를 
  res.locals 객체에 넣어두었음.
 - 템플릿 엔진 파일 작성

4. 데이터 베이스 세팅하기
 - Sequelize 미들웨어를 이용해서 모델들 정의하기
 - models 폴더 내부에 있는 index.js를 내가 쓰는 모델들에 대해서 맞춰주기
 - 각 모델들 간의 관계 형성하기. static associate(db) { /* 여기에다가 */ }
 -- 같은 테이블 간 N:M 관계는 모델 이름과 컬럼 이름을 따로 정해주어야 한다. (through 프로퍼티 사용)
 -- 같은 테이블 간 N:M 관계에서 foreignKey와 as 프로퍼티는 서로 반대되는 모델을 포인팅함.
 -- belongsTo의 경우 (정보가 기입되는 테이블).belongsTo(정보를 주는 테이블) 임을 유의한다.


Sequelize CLI [Node: 10.16.3, CLI: 6.4.1, ORM: 6.19.0]

Loaded configuration file "config/config.json".
Using environment "development".

ERROR: Access denied for user 'root'@'localhost'

해결 : https://stackoverflow.com/questions/16003338/mysql2error-access-denied-for-user-testlocalhost-to-database-depot-test


여기서 부터 막힘 왤까 ... 뭐가 문제일까
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

