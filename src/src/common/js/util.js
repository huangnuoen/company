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