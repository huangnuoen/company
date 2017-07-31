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
{
	let a1 = Symbol.for('foo');//不能用new
	let a2 = Symbol.for('foo');
	console.log(a1 === a2);
	let obj = {
		[a1]: 123,
		'foo': 456,
		'bar': 789,
		a1: 1000
	}
	Reflect.ownKeys(obj).forEach(function(item){
		console.log('属性名：', item, '值：', obj[item]);
	})
}
{
	let list = new Set([1, 2, 3, '2', 3]);
	console.log('set');
	for(let key of list.keys()) {
		console.log(key);
	}
	for(let [key,val] of list.entries()) {
		console.log([key,val]);
	}
	list.forEach(function(item){
		console.log(item);
	});
}
{
	let arr = new Map([['a', 123], ['b', 456]]);
	console.log(arr);
}