/*解构赋值*/
{
	let metaData = {
		title: 'json',
		desc: [{head: 'hello'}, {title: 'world'}]
	};
	let {title: a, desc: [{head: x}, {title: etTitle}]} = metaData;
	console.log(a, x, etTitle);//json [Object]
}
{
	let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y: z }] } = obj;
console.log(x,  z)
}