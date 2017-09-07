<template>
	<transition name="slider">
	  <div class="singer-detail">singer-detail
	  </div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {createSong} from 'common/js/singer'
	import {ERR_OK} from 'api/config'
  export default {
    data() {
      return {
        // 存储歌曲
        songs: []
      }
    },
  	// 取得状态
  	computed: {
  		// 在vue中挂载了singer属性
  		...mapGetters([
  			// singer指getters.js中的
  			'singer'
  			])
  	},
  	created() {
  		this._getDetail()
  		console.log('this.singer', this.singer)
  	},
  	methods: {
  		_getDetail() {
        // 没有id时(在本页刷新则获取不到id)，回退到歌手页面
        if (!this.singer.id) {
          this.$router.push('/singer')
        }
  			getSingerDetail(this.singer.id).then((res) => {
  				if (res.code === ERR_OK) {
            console.log(res.data.list)
            this._normalizeSinger(res.data.list)
  				}
  			})
  		},
      // 处理list
      _normalizeSinger(list) {
        // let ret = []
        list.forEach((item) => {
          // 解构赋值,取得item.musicData
          let {musicData} = item
          console.log(musicData)
          if (musicData.songid && musicData.albummid) {
            createSong(musicData)
          }
        })
      }
  	}
  }
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"

	.singer-detail
		position: fixed
		z-index: 100
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: $color-background

	.slider-enter-active, .slider-leave-active
		transition: all .3s
	.slider-enter, .slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>