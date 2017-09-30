<template>
  <transition name="slide">
    <!-- 阻止click冒泡到父组件 -->
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box placeholder="搜索歌曲" @query="onQueryChange"></search-box>
      </div>
      <div class="shortcut" v-show="!query"></div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger" @select="selectSuggest"></suggest>
      </div>
    </div>
  </transition>  
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import {mapActions} from 'vuex'

	export default {
    data() {
      return {
        showFlag: false,
        query: '',
        showSinger: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      onQueryChange(query) {
        this.query = query
      },
      // 记录搜索历史
      selectSuggest() {
        this.saveSearchHistory(this.query)
      },
      ...mapActions([
        'saveSearchHistory'
      ])
    },
    components: {
      SearchBox,
      Suggest
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &slide-leave-active
      transition: all .3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
</style>