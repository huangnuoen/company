/* 洗牌 */
export function shuffle(arr) {
	let _arr = arr.slice()
	// 将数组的每个元素和另一个随机元素交换
	for (let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}
// 取得[min,max]间的随机整体数
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/* 节流
*  如果定时队列有内容，又触发了，则清空先前队列，再添加新定时器，
*  实现间隔在delay内的不连续触发func函数
*/
export function debounce(func, delay) {
	let timer
	// ...args指func的参数，args指func的参数组,相当于arguments,var args = arguments
	return function(...args) {
		if (timer) {
			clearTimeout(timer)
		}
		// console.log(arguments, args)
		timer = setTimeout(() => {
			// 调用func,传入args参数数组
			func.apply(this, args)
		}, delay)
	}
}