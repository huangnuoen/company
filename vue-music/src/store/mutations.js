import * as types from './mutation-types'
/* 修改状态 */
const mutations = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	},
	[types.SET_PLAYING](state, flag) {
		state.playing = flag
	},
	[types.SET_FULL_SCREAN](state, flag) {
		state.fullScrean = flag
	},
	[types.SET_PLAYLIST](state, list) {
		state.playlist = list
	},
	[types.SET_SEQUENCE_LIST](state, list) {
		state.sequenceList = list
	},
	[types.SET_PLAY_MODE](state, mode) {
		state.playMode = mode
	},
	[types.SET_CURRENT_INDEX](state, index) {
		state.currentIndex = index
	}
}

export default mutations