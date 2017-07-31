{
	let o = 1;
	let k = 2; 
	let es5 = {
		o: o,
		hello: function(){
			return 'es5';
		}
	};
	let es6 = {
		o,
		hello() {
			return 'es6';
		},
		[k]: 3,
		['k']: k
	}
	console.log(es5, es6);
}
{
	console.log(Object.is('abc', 'abc'), 'abc'==='abc', [] === []);
	console.log('copy', Object.assign({target: 1}, {src1: 2}, {src2: 3}));
}
{
	let test = {k: 123, o: 456};
	for(let [key, val] of Object.entries(test)) {
		console.log(key, val);
	}
}
