var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, (err, fileList) => {
	console.log(fileList);
});