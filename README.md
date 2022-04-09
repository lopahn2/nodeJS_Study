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

🤷‍ **Compression middleware** <br>

웹 서버가 웹 브라우저에게 응답할 때 데이터를 압축해서 보낼 수 있도록 해주는 미들웨어이다.
<br>
```js
const compression = require('compression');

app.use(compression());
```


