<template>
  <div class="music-list">
  	<div class="back">
  		<i class="icon-back"></i>
  	</div>
  	<h1 class="title" v-html="title"></h1>
  	<div class="bg-image" :style="bgStyle" ref="bgImage">
  		<div class="filter"></div>
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
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'

  const RESERVED_HEIGHT = 40

  export default {
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
  		scroll(pos) {
  			this.scrollY = pos.y
  		}
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
  			let zIndex = 0
  			// 让layer向上
  			this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
  			this.$refs.layer.style['transform'] = `-webkit-translate3d(0, ${translateY}px, 0)`
  			// 滚到顶部时
  			if (newY < this.minTransalteY) {
  				zIndex = 10
  				this.$refs.bgImage.style.paddingTop = 0
  				this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
  			} else {
  				// 从顶部回滚时
  				zIndex = 0
  				this.$refs.bgImage.style.paddingTop = '70%'
  				this.$refs.bgImage.style.height = 0
  			}
  			this.$refs.bgImage.style.zIndex = zIndex
  		}
  	},
    components: {
      Scroll,
      SongList
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


</style>