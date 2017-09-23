<template>
  <transition name="slider">
  	<music-list :bgImage="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'

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