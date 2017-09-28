import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch} from 'common/js/cache'

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

/* 插入歌曲到当前列表 */
export const insertSong = function({commit, state}, song) {
	// 列表是引用类型，要获取副本，不然直接操作会报错
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex

	// 记录当前歌曲
	let currentSong = playlist[currentIndex]
	// 判断列表是否有该song
	let fpIndex = findIndex(playlist, song)

	// 向列表的当前歌曲后添加该song
	currentIndex++
	playlist.splice(currentIndex, 0, song)
	// 已有该歌曲时，将歌曲从列表删除
	if (fpIndex > -1) {
		// 如果该歌曲在前面，直接删除
		if (currentIndex > fpIndex) {
			playlist.splice(fpIndex, 1)
			// 因为删除了前面1个，所以song的索引要减1
			currentIndex--
		} else {
			// 该歌曲在后面时，因为加入了song,原来的序号要加一，再删除
			playlist.splice(fpIndex + 1, 1)
		}
	}

	// 找到当前歌曲在原始列表的索引
	let currentSIndex = findIndex(sequenceList, currentSong) + 1
	// sequenctList是否有song
	let fsIndex = findIndex(sequenceList, song)

	sequenceList.splice(currentSIndex, 0, song)

	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}

	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

/* 保存历史到本地和state */
export const saveSearchHistory = function ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}