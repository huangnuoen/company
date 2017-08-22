/*
 * 解析url参数
 * @example  ?id=123456&a=b
 * @return   Object {id: 123456, a: b}
 */
export function urlParse() {
	// 获取当前url(从?开始到#结束)
	let url = window.location.search;
	let obj = {};
	// 问号和&号后跟着非？&的字符1个或多个，后面用=连接, 后面跟着非？&的字符
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	// ['id=123456', 'a=b']
	if (arr) {
		arr.forEach((item) => {
			// 删除第一个字符, 以=为分隔符，生成数组
			let temArr = item.substring(1).split('=');
			let key = decodeURIComponent(temArr[0]);
			let val = decodeURIComponent(temArr[1]);
			obj[key] = val;
		});
	}
	return obj;
};
