<template>
	<transition name="slider">
    <music-list :title="title" :bgImage="bgImage"></music-list>
	</transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      title() {
        return this.topList.title
      },
      bgImage() {
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"


	.slider-enter-active, .slider-leave-active
		transition: all .3s
	.slider-enter, .slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>