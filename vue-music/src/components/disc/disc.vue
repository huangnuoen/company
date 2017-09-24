<template>
  <transition name="slider">
  	<music-list :bgImage="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSongList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
  export default {
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
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
          	console.log(res.cdlist[0])
          }
        }).catch(() => {
        	console.log('fail')
        })
      }
   	// 	_getSongList() {
  		// 	// 调用api方法
  		// 	getSongList(this.disc.dissid).then((res) => {
	  	// 		console.log('success')
  		// 		if (res.code === ERR_OK) {
  		// 			console.log(res)
  		// 		}
  		// 	})
  		// }
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