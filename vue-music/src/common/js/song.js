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
		// url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=38`
		url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songid}.m4a?fromtag=66`
		// http://dl.stream.qqmusic.qq.com/C400001OyHbk2MSIi4.m4a?vkey=D683BF789E3A2CFBB6A6D45A5600DC295F732CCB924F3E6532C6C798C011561785C5E32C15D9A6D2530C2FE9CCD485771A2219A451AA726D&guid=6763139031&uin=1261290560&fromtag=66
		// http://dl.stream.qqmusic.qq.com/C40000481cWs2JgWe0.m4a?vkey=618CF98BC7AF3CA56FFCD855349C5A8A2E794B83A2212917977EC3B863EEB18CEBCCC42B4B6A6C30A7D9CB57AB2389394309481DD7110506&guid=6763139031&uin=1261290560&fromtag=66
		// http://dl.stream.qqmusic.qq.com/C400004M3yRr3kOfnS.m4a?vkey=689995C4720DD90DEDCD8A7F58E7ED2C77A57C2A4E6FA58CCBDCFE20919E6B2FCF7E75AB46DC70A1477286F2626F17EF531B458F35E0AB4F&guid=6763139031&uin=1261290560&fromtag=66
		// http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?vkey=874037D2B5535690D851690FCB4A0A8DE2710E6BCBEFCA8D9233D49F3412043FC67DBBC8D4A598567FB5DD5FF3E38A0993878603637C5F4F&guid=6763139031&uin=1261290560&fromtag=66
	})
}

function filterSinger(singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}
