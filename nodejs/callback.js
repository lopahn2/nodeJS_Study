const a = () => {
	console.log('Hello callback function!');
}

const slowFunc = (callback) => {
	callback();
}

slowFunc(a);