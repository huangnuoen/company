import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

// 获取各个歌单
export function getTopList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?'

	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		needNewCode: 1,
		g_tk: 1617356337
	})

	return jsonp(url, data, options)
}

// 获取歌单详情
export function getMusicList(topid) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?'

	const data = Object.assign({}, commonParams, {
		topid,
		page: 'detail',
		type: 'top',
		platform: 'h5',
		needNewCode: 1
	})

	return jsonp(url, data, options)
}