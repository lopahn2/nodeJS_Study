# URL Security
## path module 사용하기

🙎‍♂️ The `path.parse()` method returns an object whose properties represent significant elements of the `path`. 

🙋‍♂️ Trailing directory separators are ignored.

![enter image description here](https://user-images.githubusercontent.com/76484900/158020487-2935f08d-e235-4374-8d2d-466382c761be.png)

🙆‍♂️ 사용자가 url에 `../secure/password.json` 와 같은 서버 내 파일에 접속하기 위해 url을 입력했을 때, base path만 나오도록 필터링 해주는 모듈이다.



