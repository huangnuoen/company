import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

// song在list的索引
function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

/* 选择播放 */
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  // 当前为随机播放模式时
  if (state.mode === playMode.random) {
  	// 洗牌，更新列表
		let randomList = shuffle(list)
	  commit(types.SET_PLAYLIST, randomList)
	  // 获取点击歌曲在新列表的索引
	  index = findIndex(randomList, list[index])
  } else {
	  commit(types.SET_PLAYLIST, list) 	
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

/* 随机播放全部 */
export const randomPlay = function({commit}, {list}) {
	// 设置模式
	commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST, randomList)
	commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}