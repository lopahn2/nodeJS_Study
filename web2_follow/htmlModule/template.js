const template = {
	home : function home() {
		return `<!doctype html>
				<html>
				<head>
				  <title>혼자공부</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1 style = "font-size: 100px; display: bolck; margin: auto auto;">2022년 3월 22일 복습</h1>
					<p style = "font-size: 30px; display: block; margin: 0 auto 0 auto"><a href = "/menu">시작하기</a></p>
				</body>
				</html>`
	},
	mainHtml : function menu(list, title = "메뉴창", text = "파일을 선택하세요", control='') {
		return `<!doctype html>
				<html>
				<head>
				  <title>혼자공부</title>
				  <meta charset="utf-8">
				</head>
				<body>
					<h1>${title}</h1>
					${list}
					<p>${text}</p>
					${control}
				</body>
				</html>`
	},
	list : function list(fileList) {
		var _list = `<ul>`;
		for(let i = 0; i < fileList.length; i++){
			_list += `<li><a href="/menu?id=${fileList[i].slice(0,-4)}">${fileList[i]}</a></li>`
		}
		_list +=`</ul>`;
		return _list
	}
	
}

module.exports = template;