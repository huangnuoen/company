{
	let tell = function* () {
		yield 'a';
		yield 'b';
		return 'c';
	}
	let a = tell();
	console.log(a.next());
	console.log(a.next());
	console.log(a.next());
	console.log(a.next());

}
{
	let obj = {};
	obj[Symbol.iterator] = function* (){
		yield 1;
		yield 2;
		yield 3;
		return 4;
	}
	for(let value of obj) {
		console.log(value);
	}
}
{
	let state = function* (){
		while(2) {
			yield 'a';
			yield 'b';
			yield 'c';
		}
	}
	let status = state();
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
	console.log(status.next());
}
{
	//抽奖剩余次数
	let draw = function(count){
		console.info(`还有${count}次`);
	}
	let residue = function* (count){
		while(count>0){
			count--;
			yield draw(count);
		}
	}
	let start = residue(5);
	let btn = document.createElement('button');
	btn.id = 'start';
	btn.innerHTML = 'start';
	document.body.appendChild(btn);
	document.getElementById('start').addEventListener('click', function(){
		start.next();
	}, false);
}
{
	//长轮询
	let ajax = function* (){
		yield new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve({code: 0})
			}, 1000);
		})
	}
	let pull = function() {
		let genertor = ajax()
		let step = genertor.next();
		step.value.then(function(d){
			if(d.code != 0) {
				setTimeout(function(){
					console.log('查询中');
					pull();
				}, 1000);
			} else {
				console.log(d);
			}
		})
	}
	pull();
}