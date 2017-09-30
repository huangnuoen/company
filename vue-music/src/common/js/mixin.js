import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
/* 混合组件 */

/* 处理mini播放器出现后各组件bottom设置问题并refresh */
export const playlistMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	// 组件创建时
	mounted() {
		this.handlePlaylist(this.playlist)
	},
	// <keep-alive>内组件切换时触发
	activated() {
		this.handlePlaylist(this.playlist)
	},
	watch: {
		// playlist改变时触发
		playlist(newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		// 当原始组件中没有handlePlaylist方法时便会报错
		handlePlaylist() {
			throw new Error('component must implement hanlePlaylist method')
		}
	}
}

/* 播放器,播放列表共同组件 */
export const playerMixin = {
	computed: {
		iconMode() {
			if (this.mode === playMode.sequence) {
				return 'icon-sequence'
			} else if (this.mode === playMode.loop) {
				return 'icon-loop'
			} else {
				return 'icon-random'
			}
			// return this.mode === playMode.sequence ? 'icon-sequence' : (this.mode === this.playMode.loop ? 'icon-loop' ? 'icon-random')
		},
		...mapGetters([
			'playlist',
			'currentSong',
			'mode',
			'sequenceList'
		])
	},
	methods: {
		changeMode() {
			const mode = (this.mode + 1) % 3
			this.setPlayMode(mode)
			let list = null
			if (mode === playMode.random) {
				list = shuffle(this.sequenceList)
			} else {
				list = this.sequenceList
			}
			// 列表改变后，当前歌曲索引也会改变，要将currentIndex改成当前歌曲在新列表的索引
			this.resetCurrentIndex(list)
			// 修改播放列表
			this.setPlaylist(list)
		},
		resetCurrentIndex(list) {
			// 在当前列表找到当前歌曲的索引
			let index = list.findIndex((item) => {
				return item.id === this.currentSong.id
			})
			this.setCurrentIndex(index)
		},
		...mapMutations({
			setPlayState: 'SET_PLAYING_STATE',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayMode: 'SET_PLAY_MODE'
		})
	}
}

/* search共用组件 */
export const searchMixin = {
	data() {
		return {
			query: ''
		}
	},
	computed: {
    ...mapGetters([
      'searchHistory'
    ])
	},
	methods: {
		addQuery(query) {
			this.$refs.searchBox.setQuery(query)
		},
		blurInput() {
			this.$refs.searchBox.blur()
		},
		// 保存搜索历史
		saveSearch() {
      this.saveSearchHistory(this.query)
    },
		onQueryChange(query) {
			this.query = query
		},
    ...mapActions([
      'deleteSearchHistory',
      'saveSearchHistory'
    ])
	}
}