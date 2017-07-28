{
	let regex = new RegExp('xyz', 'i');
	let regex2 = new RegExp(/xyz/i);

	console.log(regex.test('xyz123'), regex2.test('234x'));

	let regex3 = new RegExp(/xyz/ig, 'i');//第二个修饰符会覆盖前一个
	console.log(regex3.flags);
}
{
	let s = 'bbb_bb_b';
	let a1 = /b+/g;
	let a2 = /b+/y;
	console.log('one:', a1.exec(s), a2.exec(s));
	console.log('two:', a1.exec(s), a2.exec(s));
}

{
	console.log('a', '\u0061');
	console.log('s', '\u{20bb7}');
	let s = '𠮷';
	console.log(s.length);
}

{
	let name = 'List';
	let info = 'hello world';
	let m = `i am ${name}, ${info}`;
	console.log(m);
}

{
	let date1 = '12'.padStart(7, '2017-0');
	let date2 = '2'.padStart(7, '2017-0');

	console.log(date1, date2);
}

{
	let user = {
		name: 'list',
		info: 'hello world'
	};
	console.log(abc`i am ${user.name}, ${user.info} `);
	function abc(s) {
		console.log(s);
		return s;
	}
}