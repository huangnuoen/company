<template>
  <div class="recommend">
<<<<<<< HEAD
    <scroll class="recommend-content" :data="discList" ref="scroll">
=======
    <scroll ref="scroll" class="recommend-content" :data="discList">
>>>>>>> 0e7c49b702bb42719977ece5609a07d1ab0ab2ed
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <!-- 轮播图图片 -->
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
<<<<<<< HEAD
                <img @load="loadImage" :src="item.picUrl" alt="">
=======
                <img :src="item.picUrl" @load="loadImage">
>>>>>>> 0e7c49b702bb42719977ece5609a07d1ab0ab2ed
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p>{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 获取到数据后才渲染 -->
    </scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        recommends: [],
        // 传递给子组件，子组件中监听变化
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          };
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            // 获取歌单数据
            this.discList = res.data.list
          }
        })
      },
      loadImage() {
        if (!this.checkloaded) {
          // refresh()后会出错？错误计算了高度
          this.$refs.scroll.refresh()
          this.checkloaded = true
        }
      }
    },
    components: {
      Slider,
      Scroll
    }
  }

</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 1
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
</style>
