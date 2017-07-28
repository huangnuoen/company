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