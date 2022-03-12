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

🙋‍♂️ [패키지 매니저 사용하기](https://github.com/lopahn2/nodeJS_Study/blob/main/PM2.md)

🙆‍♂️ GET method 사용시 url의 쿼리스트링이 노출되고 POST method 사용시 노출 안됨. 데이터를 읽어올 때는 get, 작성 후 전송할 때 post 를 쓰는 이유!

🤦‍♂️ 에러 발생과 해결
`TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Location"]` <br>

**Ans** -> internal server error occurs when redirect path includes `query strings of non-ascii character(like Japanese)`

💁‍♂️ [form 태그를 이용한 POST 메소드 사용](https://github.com/lopahn2/nodeJS_Study/blob/main/report/form_url.md)

## 2022-03-11 

🙋‍ [수정 기능 구현](https://github.com/lopahn2/nodeJS_Study/blob/main/report/update.md)

🙆‍ [삭제 기능 구현](https://github.com/lopahn2/nodeJS_Study/blob/main/report/delete.md)

🤦‍ 에러 발생과 해결
`Access to font at 'https://www.goorm.io/goormMainPage/lib/css/font/NotoSansKR-Regular.woff2' from origin 'https://hwany.run.goorm.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` <br>

`CORS` 오류인데 이에 대한 자세히 설명해놓은 포스팅을 찾아서 첨부!! <br>

[CORS오류의 종류와 해결법](https://evan-moon.github.io/2020/05/21/about-cors/)

## 2022-03-12

🙋‍ 코드 리펙토링 (모듈화) 

🙆‍ [URL path에 중요 정보 노출 안되게 하기](https://github.com/lopahn2/nodeJS_Study/blob/main/report/URL-Security.md)

🤦‍ [XSS 막기](https://github.com/lopahn2/nodeJS_Study/blob/main/report/XSS.md)
