# XSS ( Cross-Site Scripting)
🙎‍♂️ `./create` 의 라우트에서 사용자가 `<script></script>` 태그를 심어놓은 글을 작성한다면 <br>
<br>
🙋‍♂️ 웹 브라우저는 이를 script 코드로 오해하고 text로 인식하는 것이 아니라 실행할 코드로 인식한다. <br>

🙆‍♂️ 이를 구현할 수도 있으나 쉽게 처리하기 위해 `npm` 로 외부 모듈을 다운받아서 사용하자. <br>

## Sanitize-html
```
> npm init
> npm install -S sanitize-html
```

<br>

```js
var sanitizeHtml = require('sanitize-html');

var sanitizedTitle = sanitizeHtml(title);
// title은 script나 html tag 가 들어간 text

var sanitizedDescription = sanitizeHtml(description, {
	allowedTags : ['h1'],
}) 
// text에 허용할 태그는 두 번째 인자로 객체를 넘겨주면 됨
```
