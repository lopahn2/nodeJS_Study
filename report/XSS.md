# XSS ( Cross-Site Scripting)
๐โโ๏ธ `./create` ์ ๋ผ์ฐํธ์์ ์ฌ์ฉ์๊ฐ `<script></script>` ํ๊ทธ๋ฅผ ์ฌ์ด๋์ ๊ธ์ ์์ฑํ๋ค๋ฉด <br>
<br>
๐โโ๏ธ ์น ๋ธ๋ผ์ฐ์ ๋ ์ด๋ฅผ script ์ฝ๋๋ก ์คํดํ๊ณ  text๋ก ์ธ์ํ๋ ๊ฒ์ด ์๋๋ผ ์คํํ  ์ฝ๋๋ก ์ธ์ํ๋ค. <br>

๐โโ๏ธ ์ด๋ฅผ ๊ตฌํํ  ์๋ ์์ผ๋ ์ฝ๊ฒ ์ฒ๋ฆฌํ๊ธฐ ์ํด `npm` ๋ก ์ธ๋ถ ๋ชจ๋์ ๋ค์ด๋ฐ์์ ์ฌ์ฉํ์. <br>

## Sanitize-html
```
> npm init
> npm install -S sanitize-html
```

<br>

```js
var sanitizeHtml = require('sanitize-html');

var sanitizedTitle = sanitizeHtml(title);
// title์ script๋ html tag ๊ฐ ๋ค์ด๊ฐ text

var sanitizedDescription = sanitizeHtml(description, {
	allowedTags : ['h1'],
}) 
// text์ ํ์ฉํ  ํ๊ทธ๋ ๋ ๋ฒ์งธ ์ธ์๋ก ๊ฐ์ฒด๋ฅผ ๋๊ฒจ์ฃผ๋ฉด ๋จ
```
