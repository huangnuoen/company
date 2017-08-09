<template>
  <div id="app">
    <header></header>
    <div class="tab">
      i am tab.
    </div>
    <div class="content">
      i am content.
    </div>
  </div>
</template>

<script>
  import header from './components/header/header.vue';

  export default {
    components: {
      header
    }
  };
</script>

<style scoped>
</style>
