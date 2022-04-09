const data = '/data';
const fs = require('fs');

let list = `<ul>`;
const listContainer = document.querySelector('#list-up')

fs.readdir(data, (err, fileList) => {
	fileList.forEach((file) => {
		fs.readFile(file, 'utf8', (err, content) => {
			list += `<li>${content}</li>`;
		});
	});
	list += `</ul>`;
	listContainer.innerHTML = list;
});


console.log("hello world!");