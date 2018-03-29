import axios from 'axios'
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
    g_tk: 1664029744,
    platform: 'yqq'
  })
	// 返回调用jsonp的结果，promise实例
	return jsonp(url, data, options)
}

export function getSingerDetail1(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(mid) {
  // 本地存放目录
  const url = '/api/getPurlUrl'
  // 请求参数
  // const data = {}
  // '{"comm":{"g_tk":5381,"uin":1261290560,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"url_mid":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6763139031","songmid":["001J5QJL1pRQYB","003OUlho2HcRHC","003aAYrm3GE0Ac","002qU5aY3Qu24y","0039MnYb0qxYhV","001Js78a40BZU6","004BhQke4adHcf","000amRvH3wxv56","0009BCJK1nRaad","004Z8Ihr0JIu5s","0042QMDR1VzSsx","004bRWFg3fej9y","004emQMs09Z1lz","003ZrdgZ0UnjDl","001zMQr71F1Qo8"],"songtype":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uin":"1261290560","loginflag":0,"platform":"23"}}}'
  // 发出请求
  return axios.post(url, {
    // params: JSON.parse('{"comm":{"g_tk":5381,"uin":1261290560,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"url_mid":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6763139031","songmid":["001J5QJL1pRQYB","003OUlho2HcRHC","003aAYrm3GE0Ac","002qU5aY3Qu24y","0039MnYb0qxYhV","001Js78a40BZU6","004BhQke4adHcf","000amRvH3wxv56","0009BCJK1nRaad","004Z8Ihr0JIu5s","0042QMDR1VzSsx","004bRWFg3fej9y","004emQMs09Z1lz","003ZrdgZ0UnjDl","001zMQr71F1Qo8"],"songtype":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uin":"1261290560","loginflag":0,"platform":"23"}}}')
    params: '{"comm":{"g_tk":5381,"uin":1261290560,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"url_mid":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6763139031","songmid":["001J5QJL1pRQYB","003OUlho2HcRHC","003aAYrm3GE0Ac","002qU5aY3Qu24y","0039MnYb0qxYhV","001Js78a40BZU6","004BhQke4adHcf","000amRvH3wxv56","0009BCJK1nRaad","004Z8Ihr0JIu5s","0042QMDR1VzSsx","004bRWFg3fej9y","004emQMs09Z1lz","003ZrdgZ0UnjDl","001zMQr71F1Qo8"],"songtype":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uin":"1261290560","loginflag":0,"platform":"23"}}}:{"comm":{"g_tk":5381,"uin":1261290560,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"url_mid":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6763139031","songmid":["001J5QJL1pRQYB","003OUlho2HcRHC","003aAYrm3GE0Ac","002qU5aY3Qu24y","0039MnYb0qxYhV","001Js78a40BZU6","004BhQke4adHcf","000amRvH3wxv56","0009BCJK1nRaad","004Z8Ihr0JIu5s","0042QMDR1VzSsx","004bRWFg3fej9y","004emQMs09Z1lz","003ZrdgZ0UnjDl","001zMQr71F1Qo8"],"songtype":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uin":"1261290560","loginflag":0,"platform":"23"}}}:'
  }).then((res) => {
    // 成功后传入数据,返回promise,resolve(res.data)
    return Promise.resolve(res.data)
  })
}
