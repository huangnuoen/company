import {mapGetters} from 'vuex'
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

