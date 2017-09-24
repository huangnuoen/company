// 定义常用对象
export const commonParams = {
	g_tk: 5381,
	inCharset: 'utf-8',
	outCharset: 'utf-8',
	notice: 0,
	format: 'jsonp'
}
// 一般配置
export const options = {
	param: 'jsonpCallback'
}
// 特定前缀，服务器规定了固定回调函数名
export const optionsPlaylist = {
	param: 'jsonpCallback',
	prefix: 'playlistinfoCallback'
}

export const ERR_OK = 0