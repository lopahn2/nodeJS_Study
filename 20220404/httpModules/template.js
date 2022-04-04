const template = {
	root : function root() {
		return `<!doctype html>
				<html>
				<head>
				  <title>혼자공부</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 100px; display: bolck; margin: auto auto;">2022년 4월 4일 복습</h1>
					<p style = "font-size: 30px; display: block; margin: 0 auto 0 auto"><a href = "/home">시작하기</a></p>
				</body>
				</html>`
	},
	home : function home() {
		return `<!DOCTYPE html>
					<html>
						<head>
							<title>혼자공부</title>
							<meta charset="utf-8" />
						</head>
						<body>
						<h1>화니의 블로그에 오신 걸 환영합니다!</h1>
						<h2>무엇을 하고 싶으신가요??</h2>
						<ul>
							<li><a href = "/home/contents">작성한 글 보기</a></li>	
							<li><a href = "home/write">글 쓰러 가기</a></li>	
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
					<title>혼자공부</title>
					<meta charset="utf-8" />
				</head>
				<body>
				<h1>블로그에 남기고 싶으신 글을 작성해 주세요!</h1>
				<form action="/home/write_process" method="post">
					제목 : <input type="text" name="title" placeholder = "제목을 입력하세요"><br>
					내용 :  <textarea name="content"></textarea><br>
					<input type="submit" value = "제출하기!">
				</form>
				<a href = "/home">home으로 돌아가기</a>
				</body>
			</html>
		`
	},
	writeProcess : function writeProcess() {
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>혼자공부</title>
					<meta charset="utf-8" />
				</head>
				<body>
				<h1>sucess!</h1>
				<a href = "/home">go home</a>
				</body>
			</html>
		`
	},
	listUp : function listUp (lists) {
		let list = '<ul>';
		lists.forEach((title, idx) => {
			let replacedTitle = title.replace(".txt", "");
			list += `<li><a href = "/home/contents?id=${replacedTitle}">${replacedTitle}</a></li>`
		})
		list += '</ul>'
		
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>혼자공부</title>
					<meta charset="utf-8" />
				</head>
				<body>
				<h1>화니 블로그 작성글</h1>
				${list}
				<a href = "/home">go home</a>
				</body>
			</html>
		`
		
	},
	fileContents : function fileContents (lists, title, content, control) {
		let list = '<ul>';
		lists.forEach((title, idx) => {
			let replacedTitle = title.replace(".txt", "");
			list += `<li><a href = "/home/contents?id=${replacedTitle}">${replacedTitle}</a></li>`
		})
		list += '</ul>'
		
		return `
		<!DOCTYPE html>
			<html>
				<head>
					<title>혼자공부</title>
					<meta charset="utf-8" />
				</head>
				<body>
				<h1>화니 블로그 작성글</h1>
				${list}
				
				<h2>${title}</h2>
				<p>${content}</p>
				${control}
				<a href = "/home">go home</a>
				<form action = "/home/contents/delete_process" method="post" onsubmit = "return confirm('정말로 지우실 겁니까?');">
					<input type="hidden" name="id" value=${title}>
					<input type="submit" value = "delete">
				</form>
				<a href = "/home/contents/update?id=${title}">updata</a>
				</body>
			</html>
		`
		
	}
}

module.exports = template;