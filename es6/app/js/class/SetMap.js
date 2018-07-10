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
	let set = new Set();
	let map = new Map();
	let arr = [];
	//增
	let add = {t: 3}
	set.add(add);
	map.set('t', 3);
	arr.push({t: 3});
	console.log(set, map, arr);
	//查
	console.log(
		set.has(add),
		map.has('t'), 
		arr.find(item=> item.t)//输出键名为t的键值
	);
	//改
	set.forEach(item => item.t ? item.t = 1 : '');
	map.set('t', 1);
	arr.forEach(item => item.t ? item.t = 1 : '');
	console.log(set, map, arr);
	//删
	set.delete(add);
	map.delete('t');
	let i = arr.findIndex( item => item.t);
	arr.splice(i, 1);
	console.log(set, map, arr);
}
{
	console.log('Set, Map 与 Object 对比');
	let item = {t: 1};
	let map = new Map();
	let set = new Set();
	let obj = {};

	map.set('t', 1);
	set.add(item);
	obj['t'] = 1;
	console.log(map, set, obj);

	console.info(map.has('t'), set.has(item), 't' in obj);

	map.set('t', 3);
	item.t = 3;
	obj.t = 3;
	console.log(map, set, obj);

	map.delete('t');
	set.delete(item);
	delete obj.t;
	console.log(map, set, obj);
}