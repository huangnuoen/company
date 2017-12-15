<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <!-- vue1 -->
      <div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
    </div>
    <!-- 路由外链 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script>
  import {urlParse} from 'common/js/util';
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  // 输出对象
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            // 获取解析后的id
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    // 在实例被创建后调用
    created() {
      // 根据id获取不同的商家数据
      this.$http.get('/api/seller?id' + this.seller.id).then((response) => {
        response = response.body;
        console.log(this.seller.id);
        if (response.errno === ERR_OK) {
          // 不能直接赋值，因为response.data中没有id的信息
          // this.seller = response.data;
          // 采用assign()拷贝
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'v-header': header
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
