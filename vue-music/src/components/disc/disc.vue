<template>
  <transition name="slider">
  	<music-list :bgImage="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSongList} from 'api/recommend'
	import {createSong} from 'common/js/song'
	import {ERR_OK} from 'api/config'
  export default {
  	data() {
  		return {
  			songs: []
  		}
  	},
  	computed: {
  		title() {
  			return this.disc.dissname
  		},
  		bgImage() {
  			return this.disc.imgurl
  		},
  		...mapGetters([
  			'disc'
  		])
  	},
  	created() {
  		this._getSongList()
  	},
  	methods: {
   		_getSongList() {
        // 没有id时(在本页刷新则获取不到id)，回退到推荐页面
   			if (!this.disc.dissid) {
   				this.$router.push('/recommend')
   			}
  			// 调用api方法
  			getSongList(this.disc.dissid).then((res) => {
  				if (res.code === ERR_OK) {
  					this.songs = this._normalizeSongs(res.cdlist[0].songlist)
  				}
  			})
  		},
  		_normalizeSongs(list) {
  			let ret = []
  			// 处理列表
  			list.forEach((musicData) => {
  				if (musicData.songid && musicData.albumid) {
  					// 新建歌曲对象
  					ret.push(createSong(musicData))
  				}
  			})
  			return ret
  		}
  	},
  	components: {
  		MusicList
  	}
  }
</script>

<style scoped lang="stylus">
	.slider-enter-active, .slider-leave-active
		transition: all .3s
	.slider-enter, .slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>