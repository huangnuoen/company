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
		return el.getAttribute(prefix + name)
	}
}

/* style 添加浏览器前缀 */
let elementStyle = document.createElement('div').style

let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	} 
	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key
		}
	}
	return false
})()
export function prefixStyle(style) {
	if (vendor === false) {
		return false
	}
	if (vendor === 'standard') {
		return style
	}
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
} 
