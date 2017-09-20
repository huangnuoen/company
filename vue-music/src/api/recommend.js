import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// 获取推荐数据
export function getRecommend() {
	// 数据来源
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})
	// 返回调用jsonp的结果，promise实例
	return jsonp(url, data, options)
}

export function getDiscList() {
	// 从本地服务器请求
	const url = '/api/getDiscList'
	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		rnd: Math.random(),
		format: 'json'
	})
	// 向服务器请求
	return axios.get(url, {
		// 配置参数
		params: data
	}).then((res) => {
		// 新建Promise对象，成功时传入res.data
		return Promise.resolve(res.data)
	})
}