/* 类名操作 */
export function addClass(el, className) {
	if (hasClass(el, className)) {
		return
	}
	// 将类名分割
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function hasClass(el, className) {
	// 正则，以该类名开头或该类名前有一个空格
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}