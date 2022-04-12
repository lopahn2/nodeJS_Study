# 쿠키 활용
## 쿠키의 종류
1. **세션쿠키** : 웹 브라우저가 켜져있는 동안에만 유효한 쿠키 
<br>

2. **영구쿠키** : 영구적인 쿠키로서 웹 브라우저가 꺼져도 유효한 쿠키
<br>

🙎‍♂️ 이 둘을 구분하는 방법은 쿠키의 삭제 일자를 정해주는 것이다. 

- **Max-Age** : 쿠키가 현재로부터 얼마나 유효한가. (상대적인 값이며 초 단위로 지정)
- **Expires** : 쿠키를 언제 해지할 지. (절대적)

<br>

```js
res.writeHead(200, {
		'Set-Cookie' : ['yummy_cookie=choco', 
						'tasty_cookie=strawberry',
					    `Permanent=cookies; Max-Age=${60*60*24*30}`
					   ]
});
```
## 쿠키옵션
### 🙎‍♂️ 보안
1. **Secure** : 웹 브라우저가 https 통신을 할 때에만 쿠키를 전송한다.

2. **HttpOnly** : 웹 브라우저가 http 통신을 하더라도 쿠키를 전송하나 자바스크립트로 쿠키 값을 읽을 수 없음.

### 🙋‍♂️ 제어
1. **Path** : 특정 경로에서만 쿠키가 활성화되게 하고싶을 때. 특정 경로라 함은 설정한 경로와 그 하위경로까지  포함. 

🏃‍♀️ Path = /path  -> /path/cookie 에서도 작동.

2. **Domain** : 특정 도메인의 서브 도메인에서도 생성되는 쿠키를 만들고자 할 때.

🏃‍♂️ 설정을 Domain = o2.org로 했으면 test.o2.org에서도 쿠키가 생성됨.

```js
res.writeHead(200, {
		'Set-Cookie' : ['yummy_cookie=choco', 
						'tasty_cookie=strawberry',
					    `Permanent=cookies; Max-Age=${60*60*24*30}`,
					    `Secure=Secure; Secure`,
					    `HttpOnly=HttpOnly; HttpOnly`,
					   	`Path=Path; Path=/cookie`,
						`Domain=Domain; Domain = o2.org`
					    ]
});
```
