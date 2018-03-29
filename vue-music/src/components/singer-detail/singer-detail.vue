<template>
	<transition name="slider">
    <music-list :songs="songs"
                :title="title"
                :bg-image="bgImage"></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {createSong} from 'common/js/song'
	import {ERR_OK} from 'api/config'
  import MusicList from 'components/music-list/music-list'
  export default {
    data() {
      return {
        // 存储歌曲
        songs: []
      }
    },
  	// 取得状态
  	computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
  		// 在vue中挂载了singer属性
  		...mapGetters([
  			// singer指getters.js中的
  			'singer'
  		])
  	},
  	created() {
  		this._getDetail()
  	},
  	methods: {
  		_getDetail() {
        // 没有id时(在本页刷新则获取不到id)，回退到歌手页面
        if (!this.singer.id) {
          this.$router.push('/singer')
        }
  			getSingerDetail(this.singer.id).then((res) => {
  				if (res.code === ERR_OK) {
            console.log('res', res)
            this.songs = this._normalizeSinger(res.data.list)
            console.log(this.songs)
  				}
  			})
  		},
      // 处理list
      _normalizeSinger(list) {
        let ret = []
        list.forEach((item) => {
          // 解构赋值,取得item.musicData
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
          	// 传入歌曲信息，创建song对象
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
	@import "~common/stylus/variable"


	.slider-enter-active, .slider-leave-active
		transition: all .3s
	.slider-enter, .slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>