// 定义常用对象
export const commonParams = {
	g_tk: 67232076,
	inCharset: 'utf-8',
	outCharset: 'utf-8',
	notice: 0,
	format: 'jsonp'
}
// 一般配置，设置参数
export const options = {
	param: 'jsonpCallback'
}
// 特定前缀，因为服务器规定了固定回调函数名
export const optionsPlaylist = {
	param: 'jsonpCallback',
	prefix: 'playlistinfoCallback'
}

export const ERR_OK = 0