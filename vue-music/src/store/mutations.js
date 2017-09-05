import * as types from './mutation-types'
/* 修改状态 */
const mutations = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	}
}

export default mutations