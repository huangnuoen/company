import {playMode} from 'common/js/config'
/* 所有原始底层状态 */
const state = {
	singer: {},
	playing: false,
	fullScrean: false,
	// 播放列表
	playlist: [],
	// 播放模式列表
	sequenceList: [],
	mode: playMode.sequence,
	currentIndex: -1
}

export default state
