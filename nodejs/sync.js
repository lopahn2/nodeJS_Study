const fs = require('fs');

//readFileSync
/*
console.log('A');
const result = fs.readFileSync('data/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

console.log('A');
fs.readFile('data/sample.txt', 'utf8', (err, response) => {
	console.log(response);	
});

console.log('C');