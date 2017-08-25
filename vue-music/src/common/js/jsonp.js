import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
	// 给url前面加问号,如果前面已经有问号，则用&连接处理好的data
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	// 返回promise实例
	return new Promise((resolve, reject) => {
		originJSONP(url, option, (err, data) => {
			if (!err) {
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}
// 用&拼接data数据并转码
function param(data) {
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += `&${k}=${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}