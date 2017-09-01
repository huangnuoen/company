{
	let arr = Array.of(3, 4, 7, 9, 11);
	let arr1 = Array.of();

	console.log(arr1);
}
{
	let p = document.querySelectorAll('p');
	let pArr = Array.from(p);
	pArr.forEach(function(item){
		console.log(item.textContent);
	})
}
{
	for(let index of [3, 5, 7].keys()){
		console.log(index);
	}
	// for(let value of [3, 5, 7].values()){
	// 	console.log(value);
	// }
	for(let [i, val] of [3, 5, 7].entries()){
		console.log(i, val);
	}
}
{
	function test(x, y = 'world'){
		console.log('默认值', x,y);
	}
	test('hello', 'girl');
	test('hello');
}
{
	let x = 'test';
	function test2(x, y = x) {
		console.log('作用域', x, y);
	}
	test2('hi');
}
{
	//指定参数默认值为一个空对象，设置了解构赋值的默认值，
	function m1({x = 0, y = 0} = {}) {
	  return [x, y];
	}
	//指定参数的默认值是一个有具体属性的对象，不指定解构赋值的默认值，在没有指定参数的情况下，参数的默认值才会生效
	function m2({x, y} = { x: 0, y: 0 }) {
	  return [x, y];
	}

	// 函数没有参数的情况
	m1() // [0, 0]
	m2() // [0, 0]

	// x有值，y无值的情况
	console.log(m1({x: 3}));//[3, 0]
	console.log(m2({x: 3}));//[3, undefined]

	// x和y都无值的情况
	m1({}) // [0, 0];
	m2({}) // [undefined, undefined]
}
{
	let arrow2 = () => 5;
	let arrow = v => 2*v;
	// function arrow(v) {
	// 	return 2*v;
	// }
	console.log('arrow', arrow(3));
}