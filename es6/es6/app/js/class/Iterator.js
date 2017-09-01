{
	let arr = ['hello', 'world'];
	let map = arr[Symbol.iterator]();
	console.log(map.next());
	console.log(map.next());
	console.log(map.next());
	for(let key of arr) {
		console.log(key);
	}
}
{
	//自定义布置iterator接口
	let obj = {
		start: [1, 3, 2],
		end: [8, 11, 7],
		[Symbol.iterator]() {
			let self = this;
			let index = 0;
			let arr = self.start.concat(self.end);
			let len = arr.length;
			return {
				next(){
					if(index < len) {
						return {
							value: arr[index++],
							done: false
						}
					} else {
						return {
							value: arr[index++],
							done: true
						}
					}
				}
			}
		}
	}
	let map = obj[Symbol.iterator]();
	console.log(map.next());
	console.log(map.next());
	console.log(map.next());
	console.log(map.next());
	console.log(map.next());
	for(let key of obj){
		console.log(key);
	}
}