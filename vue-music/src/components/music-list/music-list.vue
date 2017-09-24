<template>
  <div class="music-list">
  	<div class="back"  @click="back">
  		<i class="icon-back"></i>
  	</div>
  	<h1 class="title" v-html="title"></h1>
  	<div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
  		<div class="filter" ref="filter"></div>
  	</div>
  	<!-- 背景遮罩层 -->
  	<div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll"
    				:data="songs" 
    				class="list" 
    				ref="list" 
    				:listenScroll="listenScroll" 
    				:probeType="probeType">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
      	<loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {playlistMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    // 混合组件处理列表bottom问题
    mixins: [playlistMixin],
  	props: {
  		bgImage: {
  			type: String,
  			default: ''
      },
  		songs: {
  			type: Array,
  			default: []
  		},
  		title: {
  			type: String,
  			default: ''
  		},
      rank: {
        type: Boolean,
        default: false
      }
  	},
  	data() {
  		return {
  			scrollY: 0
  		}
  	},
  	created() {
  		this.probeType = 3
  		this.listenScroll = true
  	},
  	mounted() {
  		// 避免clientHeight会重绘dom
  		this.imageHeight = this.$refs.bgImage.clientHeight
  		// layer最大滚动距离取负
  		this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
  		// list组件的根元素的样式
  		this.$refs.list.$el.style.top = this.imageHeight + 'px'
  	},
  	methods: {
      // 处理mini播放器造成的bottom
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
  		scroll(pos) {
  			this.scrollY = pos.y
  		},
      back() {
        this.$router.back()
      },
      selectItem(item, index) {
        this.selectPlay({
          // list是整个列表
          list: this.songs,
          index: index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
  	},
  	computed: {
  		// 顶部背景图
  		bgStyle() {
  			return `background-image:url(${this.bgImage})`
  		}
  	},
  	watch: {
  		scrollY(newY) {
  			// 在layer未达到指定位置，translateY取newY
  			let translateY = Math.max(this.minTransalteY, newY)
        // 每次滚动都被先初始化zindex
  			let zIndex = 0
        let scale = 1
        let blur = 0
        console.log('transform')
  			// 让layer向上
  			this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
        const percent = Math.abs(newY / this.imageHeight)
        // 向下拉时，bgImage放大
        if (newY > 0) {
          // 放大并覆盖在上面
          zIndex = 10
          scale = 1 + percent
          // this.$refs.bgImage.style.zIndex = zIndex
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
  			// 滚到顶部时
  			if (newY < this.minTransalteY) {
  				zIndex = 10
  				this.$refs.bgImage.style.paddingTop = 0
  				this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
  				this.$refs.playBtn.style.display = 'none'
  			} else {
  				// 从顶部回滚时
  				this.$refs.bgImage.style.paddingTop = '70%'
  				this.$refs.bgImage.style.height = 0
  				this.$refs.playBtn.style.display = ''
  			}
        // bgImage放大效果
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
  		}
  	},
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
    	position: absolute
    	top: 0
    	left: 6px
    	z-index: 50
    	.icon-back
    		display: block
    		padding: 10px
    		font-size: $font-size-large-x
    		color: $color-theme
    .title
    	position: absolute
    	top: 0
    	left: 10%
    	z-index: 40
    	width: 80%
    	no-wrap()
    	text-align: center
    	line-height: 40px
    	font-size: $font-size-large
    	color: $color-text
    .bg-image
    	position: relative
    	width: 100%
    	height: 0
    	/* 宽高比10：7，上内边距先占位 */
    	padding-top: 70%
    	transform-origin: top
    	background-size: cover
    	.play-wrapper
    		position: absolute
    		bottom: 20px
    		z-index: 50
    		width: 100%
    		.play
    		  box-sizing: border-box
    		  width: 135px
    		  padding: 7px 0
    		  margin: 0 auto
    		  text-align: center
    		  border: 1px solid $color-theme
    		  color: $color-theme
    		  border-radius: 100px
    		  font-size: 0
    		  .icon-play
    		  	display: inline-block
    		  	vertical-align: middle
    		  	margin-right: 6px
    		  	font-size: $font-size-medium-x
    		  .text
    		  	display: inline-block
    		  	vertical-align: middle
    		  	font-size: $font-size-small
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        /* 高度基于父的height+padding-top */
        height: 100%
        background: rgba(7, 17, 27, .4)
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
			.loading-container
				position: absolute
				top: 50%
				width: 100%
				transform: translateY(-50%)
</style>