module.exports = {
    home : function(nickName) {
        return`
		<!doctype html>
		<html>
			<head>
				<title>Hwany-Blog</title>
				<meta charset="utf-8">
				<link rel="stylesheet" href="../home.css" />
			</head>
			<body>
				<div id="header"></div>
				<p id="menu"><a href="/dashboard">방명록</a> | <a>체팅방 입장</a> | <a>방문자기록</a> | ${nickName}님 환영합니다.</p>
				<form action="/signout_process" method ="post"><input type="submit" value="로그아웃" id ="signout_btn"></form>
				<div id="welcome"></div>
			</body>
		</html>
		`
    },
	dashboard : function(nickName, imgSrc) {
		return`
		<!doctype html>
		<html>
			<head>
				<title>Hwany-Blog</title>
				<meta charset="utf-8">
				<link rel="stylesheet" href="../dashboard.css" />
			</head>
			<body>
				<div id="header"></div>
				<p id="menu"><a href="/home">뒤로가기</a> | <a>체팅방 입장</a> | <a>방문자기록</a> | ${nickName}님이 쓴 글들입니다.</p>
				<form action="/signout_process" method ="post"><input type="submit" value="로그아웃" id ="signout_btn"></form>
				<p><a href="/create">글쓰러가기</a></p>
				<div id="dashboard">
					<div class = "content">
						<div class = "thumbnail">\
							<img src = "${imgSrc}"
						</div>
						<div class = "content-description">
							<p class = "title">이건 제목이야</p>
							<p class = "subtitle">이 글의 내용은 말이야...</p>
						</div>
					</div>
				</div>
			</body>
		</html>
		`
	},
	create : function(nickName) {
		return `
		<!doctype html>
		<html>
			<head>
				<title>Hwany-Blog</title>
				<meta charset="utf-8">
				<link rel="stylesheet" href="../create.css" />
			</head>
			<body>
				<div id="header"></div>
				<p id="menu"><a href="/home">뒤로가기</a> | <a>체팅방 입장</a> | <a>방문자기록</a> | ${nickName}님 환영합니다.</p>
				<form action="/signout_process" method ="post"><input type="submit" value="로그아웃" id ="signout_btn"></form>
				<p><a href="/create">글쓰러가기</a></p>
				<div id="dashboard">
					<form action="/create_process" method="post" enctype="multipart/form-data">
						<p>
							글 제목 : <input type="text" name="title" >
						</p>
						<p>
							섬네일 올리기 : <input type="file"  name="image">
						</p>
						<p>내용을 작성하기!</p>
						<p>
							 <input type="text" name="description" >
						</p>
						<p>
							<input type="submit" value="제출하기">
						</p>
					</form>
				</div>
			</body>
		</html>
		`
	}
}
