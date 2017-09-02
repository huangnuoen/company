<template>
  <scroll class="listview"
          :data="data" 
          :listenScroll="listenScroll" 
          ref="listview"
          @scroll="scroll(pos)">
  	<ul>
  		<li v-for="group in data" class="list-group" ref="listGroup">
  			<h2 class="list-group-title">{{group.title}}</h2>
  			<ul>
  				<li v-for="item in group.items" class="list-group-item">
  					<img v-lazy="item.avatar" class="avatar">
  					<span class="name">{{item.name}}</span>
  				</li>
  			</ul>
  		</li>
  	</ul>
  	<div class="list-shortcut" @touchstart="onShortcutTouchStart($event)" @touchmove.stop.prevent="onShortcutTouchMove($event)">
  		<ul>
  			<li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'current': currentIndex===index}">
  				{{item}}
  			</li>
  		</ul>
  	</div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  // 18是右侧每个字母的固定高度
  const ANCHOR_HEIGHT = 18

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        // 滚动位置
        scrollY: -1,
        // 当前所在位置
        currentIndex: 0
      }
    },
    created() {
      // 共享firstTouch
      this.touch = {}
      this.listenScroll = true
      // 存放每个group的高度
      this.listHeight = []
    },
    computed: {
    	// title组成的新数组
    	shortcutList() {
    		// 遍历数据，返回由每组数据的title组成的新数组
    		return this.data.map((group) => {
    			return group.title.substr(0, 1)
    		})
    	}
    },
    methods: {
    	onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        // 获得触摸触点，存储它的页面位置
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        // 记录开始触摸的索引
        this.touch.anchorIndex = anchorIndex
        // 滚动到相应元素
    		// this._scrollTo(anchorIndex)
        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    	},
      onShortcutTouchMove(e) {
        // 根据滚动的距离计算出末位置是哪个
        // 获得触点位置
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        // 计算索引
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // anchorindex是字符串，需转化
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        console.log(delta, anchorIndex)
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        console.log(this.scrollY)
        this.scrollY = pos.y
      },
      // 滚动至索引位
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      // 计算左侧每个group的高度
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        console.log(height, this.listHeight)
      }
    },
    watch: {
      // 实时监听data的变化，重新计算高度
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        let listHeight = this.listHeight
        // 判断位置
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i+1]
          if (newY > height1 && newY < height2)
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
  	position: relative
  	width: 100%
  	height: 100%
  	overflow: hidden
  	background: $color-background
  	.list-group
  		pading-bottom: 30px
  		.list-group-title
  			height: 30px
  			line-height: 30px
  			padding-left: 20px
  			font-size: $font-size-small
  			color: $color-text-l
  			background: $color-highlight-background
  		.list-group-item
  			display: flex
  			align-items: center
  			padding: 20px 0 0 30px
  			.avatar
  				width: 50px
  				height: 50px
  				border-radius: 50%
  			.name
  				margin-left: 20px
  				color: $color-text-l
  				font-size: $font-size-medium
  	.list-shortcut
  		position: absolute
  		z-index: 30
  		right: 0
  		top: 50%
  		transform: translateY(-50%)
  		width: 20px
  		padding: 20px 0
  		border-radius: 10px
  		text-align: center
  		background: $color-background-d
  		font-family: Helvetica
  		.item
  			padding: 3px
  			line-height: 1
  			color: $color-text-l
  			font-size: $font-size-small
  			&.current
  				color: $color-theme

</style>