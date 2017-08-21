export function util() {
	let url = window.location.search();
	let obj = {};
	// 问号和&号后跟着非？&的字符1个或多个，后面用=连接, 后面跟着非？&的字符
	let reg = /[?&][^?&]+=[^&?]+/g;
	let arr = url.match(reg);
	// []
	if (arr) {
		arr.forEach((item) => {
			// 删除第一个字符, 以=为分隔符，生成数组
			let temArr = item.substring(1).split('=');
			let key = decodeURIComponent(temArr[0]);
			let val = decodeURIComponent(temArr[1]);
		});
	}
};