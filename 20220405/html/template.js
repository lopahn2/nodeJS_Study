const template = {
	root : function root() {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px; color : blue;">2022년 4월 5일 스터디 복습!</h1>
					<p style = "font-size : 20px;"><a href = "/home">시작하기</a></p>
				</body>
			</html>
		`
	},
	error : function error() {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px; color : blue;">error!!</h1>
					<p style = "font-size : 20px;"><a href = "/">돌아가기</a></p>
				</body>
			</html>
		`
	},
	home : function home() {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px;">BLOG CRUD 2회차! 너무 지겨워용</h1>
					<h2>뭐 하고 싶은데?</h2>
					<ul>
						<li><a href="/contents">글 보러 가기</a></li>
						<li><a href="/write">글 쓰러 가기</a></li>
						<li><a href="/endTime">얼마나 걸렸을까?</a></li>
					</ul>
				</body>
			</html>
		`
	},
	write : function write() {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px;">CREATE</h1>
					<h2>글 쓸꺼야! 글 쓸꺼야!</h2>
					<form action = "/write_process" method = "post">
						<p>
							<input type = "text" name = "title" placeholder = "제목을 입력하세요">
						</p>
						<p>
							<textarea name = "description" ></textarea>	
						</p>


						<input type = "submit" value = "제출하기!">
					</form>
					<a href = "/home">돌아가기</a>
				</body>
			</html>
		`
	},
	contents : function contents(lists, contents) {
		let list = `<ul>`
		lists.forEach((item) => {
			item = item.replace('.txt', '');
			list += `<li><a href = "/contents?id=${item}">${item}</a></li>`
		});
		list += `</ul>`
		
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px;">READ</h1>
					<h2>글 볼꺼야! 글 볼꺼야!</h2>
					${list}
					${contents}
					<a href = "/home">돌아가기</a>
				</body>
			</html>
		`
	},
	read : function read(title, data) {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px;">READ</h1>
					<h2>${title}</h2>
					<p>
						${data}
					</p>    	
					<a href = "/contents">돌아가기</a>
					<form action = "/delete_process" method="post" onsubmit = "return confirm('정말로 지우실 겁니까?');">
						<input type="hidden" name="id" value=${title}>
						<input type="submit" value = "delete">
					</form>
					<a href = "/update?id=${title}">update!</a>
				</body>
			</html>
		
		`
	},
	update : function update(title, description) {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>20220405 - study</title>
					<meta charset = "utf-8">
				</head>
				<body>
					<h1 style = "font-size : 50px;">UPDATE</h1>
					<h2>수정할꺼야! 수정할꺼야!</h2>
					<form action = "update_process" method ="post">
						<input type = "hidden" name ="id" value = ${title}>
						<input type = "text" name = "title" value = ${title}>
						<textarea name = "description" placeholder="description">${description}</textarea>
						<input type="submit">
					</form>
					<a href = "/home">돌아가기</a>
				</body>
			</html>
		`
	}
}

module.exports = template;