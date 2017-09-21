import axios from 'axios'
import {commonParams} from './config'

export function getLyric(mid) {
	// 本地存放目录
	const url = '/api/lyric'
	// 请求参数
	const data = Object.assign({}, commonParams, {
		songmid: mid,
		pcachetime: +new Date(),
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		g_tk: 67232076,
		format: 'json'
	})
	// 发出请求
	return axios.get(url, {
		params: data
	}).then((res) => {
		// 成功后传入数据,返回promise,resolve(res.data)
		return Promise.resolve(res.data)
	})
}
