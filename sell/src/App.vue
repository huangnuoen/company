<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <div class="content">
      i am content.
    </div>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import tab from './components/tab/tab.vue';

  export default {
    components: {
      'v-header': header,
      'v-tab': tab
    }
  };
</script>

<style scoped>
</style>
