import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// 获取推荐数据
export function getRecommend() {
	// 数据来源
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		needNewCode: 1
	})
	// 返回调用jsonp的结果，promise实例
	return jsonp(url, data, options)
}