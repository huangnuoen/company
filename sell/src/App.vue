<template>
  <div>
    <v-header></v-header>
    <div class="tab border-1px">
      <!-- vue1 -->
      <div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
    </div>
    <!-- 路由外链 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  // import tab from './components/tab/tab.vue';

  export default {
    components: {
      'v-header': header
      // 'v-tab': tab
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin"

  .tab
    display: flex
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
