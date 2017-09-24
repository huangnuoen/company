import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

/*  构造歌曲信息类
*  集中维护代码，拓展性高
*  重新整合信息
*  获取歌词方法
*/
export default class Song {
	// 传入每首歌的基本信息，绑定到当前实例
	constructor({id, mid, singer, name, album, duration, image, url}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}
	
	// 获取歌词,返回promise,通过resolve处理lyric
	getLyric() {
		if (this.lyric) {
			// 返回promise对象，在resolve传入this.lyric,相当于
			// new Promise((resolve,reject) => resolve(this.lyric))
			return Promise.resolve(this.lyric)
		}
		// 返回promise对象，
		return new Promise((resolve, reject) => {
			// 不直接返回，是因为需要在此对res.lyric进行转义，再由vue组件用resolve处理；也要在resolve回调中通过retcode判断是否要reject
			getLyric(this.mid).then((res) => {
				if (res.retcode === ERR_OK) {
					// base64可转义
					this.lyric = Base64.decode(res.lyric)
					resolve(this.lyric)
					console.log(this.lyric)
				} else {
					reject('no lyric')
				}
			})
		})
	}
}
/* 工厂方法，调用该方法只须传入musicData即可生成song实例
*  简化代码，不必在每次new的时候传一串参数
*  不必写大量重复性代码
*/
export function createSong(musicData) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R150x150M000${musicData.albummid}.jpg?max_age=2592000`,
		url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=38`
	})
}

export function filterSinger(singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}
