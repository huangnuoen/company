<template>
  <div id="app">
    <v-header></v-header>
<<<<<<< HEAD
    <div class="tab">
      <div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
    </div>
    <router-view></router-view>
=======
    <v-tab></v-tab>
    <div class="content">
      i am content.
    </div>
>>>>>>> 588ee31b12feaa6288389016a6b90c5e335e73ae
  </div>
</template>

<script>
  import header from './components/header/header.vue';
<<<<<<< HEAD
  // import tab from './components/tab/tab.vue';

  export default {
    components: {
      'v-header': header
      // 'v-tab': tab
=======
  import tab from './components/tab/tab.vue';

  export default {
    components: {
      'v-header': header,
      'v-tab': tab
>>>>>>> 588ee31b12feaa6288389016a6b90c5e335e73ae
    }
  };
</script>

<style scoped>
</style>
