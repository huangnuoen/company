<template>
  <scroll class="listview"
          :data="data" 
          :listenScroll="listenScroll"
          :probeType="probeType" 
          ref="listview"
          @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" 
              v-for="item in group.items" 
              class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart($event)" @touchmove.stop.prevent="onShortcutTouchMove($event)">
      <ul>
        <li v-for="(item, index) in shortcutList"
            class="item"
            :data-index="index"
            :class="{'current': currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import Loading from 'base/loading/loading'
  // 18是右侧每个字母的固定高度
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

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
        currentIndex: 0,
        // 下一个titlet和fixedtitle的差值
        diff: 0
      }
    },
    created() {
      // 共享firstTouch
      this.touch = {}
      this.listenScroll = true
      // 存放每个group的高度
      this.listHeight = []
      this.probeType = 3
    },
    computed: {
      // title组成的新数组
      shortcutList() {
        // 遍历数据，返回由每组数据的title组成的新数组
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },

      // 当前要显示的title
      fixedTitle() {
        // 当由顶部向上拖动时
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      selectItem(item) {
        // 触发当前实例的select事件，item交给响应该自定义事件的组件
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        // 获得触摸触点，存储它的页面位置
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        // 记录开始触摸的索引
        this.touch.anchorIndex = anchorIndex
        // 滚动到相应元素
        this._scrollTo(anchorIndex)
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
        this._scrollTo(anchorIndex)
      },
      // 更新scrollY为当前位置
      scroll(pos) {
        this.scrollY = pos.y
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      // 滚动至索引位,并更新scrollY
      _scrollTo(index) {
        console.log(index)
        // 点击到<li>区域外时
        if (!index && index !== 0) {
          return
        }
        // touchmove到区域外时
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight - 2) {
          index = this.listHeight.length
        }
        this.scrollY = -this.listHeight[index]
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
      // scrollY变化时，传入新值newY, 向下滚动时newY为负
      scrollY(newY) {
        const listHeight = this.listHeight
        // 判断位置
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if ((-newY) >= height1 && (-newY) < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        // 当diff小于title高度时
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        // 判断，为了在fixedTop为0时不用每次都去渲染dom
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    },
    components: {
      Scroll,
      Loading
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
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background         
    .loading-container
      position: absolute
      top: 50%
      width: 100%
      transform: translateY(-50%)
</style>