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
        <search-box ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
          <scroll ref="searchList" class="list-scroll" :refreshDelay="refreshDelay" v-if="currentIndex===1" :data="searchHistory">
            <div class="list-inner">
              <search-list :searches="searchHistory" @delete="deleteSearchHistory" @select="addQuery"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger" @select="selectSuggest"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到列表</span>
        </div>
      </top-tip>
    </div>
  </transition>  
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Suggest from 'components/suggest/suggest'
  import SearchList from 'base/search-list/search-list'
  import TopTip from 'base/top-tip/top-tip'
  import {searchMixin} from 'common/js/mixin'
  import Song from 'common/js/song'
  import {mapGetters, mapActions} from 'vuex'

	export default {
    mixins: [searchMixin],
    data() {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        switches: [
          {name: '最近播放'},
          {name: '搜索历史'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory',
        'searchHistory'
      ])
    },
    methods: {
      show() {
        this.showFlag = true
        // scroll在noshow时就已经渲染好，show时要再刷新
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      // 记录搜索历史
      selectSuggest() {
        this.saveSearchHistory(this.query)
        this.showTip()
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song, index) {
        // 该song不是song对象，要先转化为song
        if (index !== 0) {
          this.insertSong(new Song(song))
          this.showTip()
        }
      },
      showTip() {
        this.$refs.topTip.show()
      },
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query(newQuery) {
        // 从suggest中点击后，searchList会更新，但当前dom显示的是suggest,searchList没有显示,故而要在query为空时，即searchList显示后，再refresh()
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.searchList.refresh()
          }, 20)
        }
      }
    },
    components: {
      SearchBox,
      Suggest,
      Switches,
      Scroll,
      SongList,
      SearchList,
      TopTip
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
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>