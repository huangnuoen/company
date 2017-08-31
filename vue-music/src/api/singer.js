import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// 获取歌手数据
export function getSingerList () {
	// 数据来源
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
	})
	// 返回调用jsonp的结果，promise实例
	return jsonp(url, data, options)
}
