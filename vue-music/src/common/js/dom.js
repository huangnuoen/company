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

/* 获取/设置元素属性值 */
export function getData(el, name, val) {
	const prefix = 'data-'
	if (val) {
		return el.setAttribute(prefix + name, val)
	} else {
		return el.getAttribute(name)
	}
}