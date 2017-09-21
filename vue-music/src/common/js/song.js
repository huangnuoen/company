import {getLyric} from 'api/song'
 import {ERR_OK} from 'api/config'
/*  构造歌曲信息类
*  集中维护代码，拓展性高
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
	// 获取歌词
	getLyric() {
		getLyric(this.mid).then((res) => {
			if (res.retcode === ERR_OK) {
				this.lyric = res.lyric
				console.log(res)
			}
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
