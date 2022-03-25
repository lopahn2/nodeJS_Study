const template = {
	rootHtml : function rootHtml () {
		return `
			<!doctype html>
				<html>
				<head>
				  <title>20220325</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 100px; display: bolck; margin: auto auto;">2022년 3월 25일 도전</h1>
					<p style = "font-size: 30px; display: block; margin: 0 auto 0 auto"><a href = "/menu">시작하기</a></p>
				</body>
				</html>
		`
	},
	menuHtml : function menuHtml() {
		return `
			<!doctype html>
				<html>
				<head>
				  <title>20220325</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 50px; display: bolck; margin: auto auto;">Welcome!</h1>
					<h2>누구네 집으로 이동할까요?</h2>
					<ul>
						<li><a href='/menu?name=소희'>소희네</a></li>
						<li><a href='/menu?name=태리'>태리네</a></li>
						<li><a href='/menu?name=수지'>수지네</a></li>
						<li><a href='/menu?name=세정이'>세정이네</a></li>
						<li><a href='/menu?name=송강'>송강네</a></li>
					</ul>
					<a href='/'>뒤로가기</a>
					<a href='/time'>이거 만드는데 얼마나 걸렸을까?</a>
				</body>
				</html>
		`
	},
	houseHtml : function houseHtml(roomOwner) {
		return `
			<!doctype html>
				<html>
				<head>
				  <title>20220325</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 50px; display: bolck; margin: auto auto;">${roomOwner}네 집에 온 것을 환영합니다!</h1>
					<ul>
						<li><a href='/menu/room?roomowner=${roomOwner}&roomname=안방'>${roomOwner}네 안방가기</a></li>
						<li><a href='/menu/room?roomowner=${roomOwner}&roomname=거실'>${roomOwner}네 거실가기</a></li>
						<li><a href='/menu/room?roomowner=${roomOwner}&roomname=큰방'>${roomOwner}네 큰방가기</a></li>
					</ul>
					<a href='/menu'>뒤로가기</a>
					<a href='/time'>이거 만드는데 얼마나 걸렸을까?</a>
				</body>
				</html>
		`
	},
	roomHtml : function roomHtml(roomOwner, roomName) {
		return `
			<!doctype html>
				<html>
				<head>
				  <title>20220325</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 50px; display: bolck; margin: auto auto;">${roomOwner}네 ${roomName}에 와부렸어요!</h1>
					<a href='/menu?name=${roomOwner}'>뒤로가기</a>
					<a href='/time'>이거 만드는데 얼마나 걸렸을까?</a>
				</body>
				</html>
		`
	},
	timeHtml : function timeHtml() {
		return`
			<!doctype html>
				<html>
				<head>
				  <title>20220325</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 50px; display: bolck; margin: auto auto;">1시간 15분 걸려부렸어요 ㅠㅜ</h1>
					<a href='/'>뒤로가기</a>
				</body>
				</html>
		`
	},
	errorHtml : function errorHtml(){
		return`
			<!doctype html>
				<html>
				<head>
				  <title>20220325</title>
				  <meta charset="utf-8">
				</head>
				<body>
					404 unfounded error
					<a href='/'>시작화면으로</a>
				</body>
				</html>
		`
	}
}


module.exports = template;