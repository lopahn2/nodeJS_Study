# Package Manager
패키지를 설치, 업데이트, 삭제하는 등의 관리를 도와주는 프로그램을 **`Package Manager`** 라고 한다. ->  **`npm`** 가 대표적!

## PM2
pm2는 Node.js에서 실행중인 프로세스를 관리해주는 프로그램이다.

```js
//pm2 프로그램을 전역설치
npm install pm2 -g
```

## PM2 실행

### PM2 실행하기
```
pm2 start main.js
```

### 프로세스 감시
```
pm2 monit
```

### 프로세스 목록
```
pm2 list
```

### 프로세스 종료
```
pm2 stop main.js
```

### 소스파일 감시
이 기능은 소스파일을 수정 후 저장하면 PM2 프로그램이 자동으로 서버를 재시동해준다.
```
pm2 start main.js --watch
```

단 이때 PM2가 오류가 발생해도 서버를 자동으로 재시동하기 때문에 오류 내역을 볼 수 없다.
이때 쓰는 것이
```
pm2 log
```

