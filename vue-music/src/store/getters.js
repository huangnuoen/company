/* 对数据的映射 */
// 从state中取数据，类似计算属性
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScrean = state => state.fullScrean

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

// 取得当前播放歌曲
export const currentSong = (state) => {
	return state.playlist[state.currentIndex] || {}
} 