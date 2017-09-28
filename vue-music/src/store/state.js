import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

/* 所有原始底层状态 */
const state = {
	singer: {},
	playing: false,
	fullScreen: false,
	// 播放列表
	playlist: [],
	// 播放模式列表
	sequenceList: [],
	mode: playMode.sequence,
	currentIndex: -1,
	disc: {},
	topList: {},
	// 搜索历史初始化为本地缓存
	searchHistory: loadSearch()
}

export default state
