<template>
  <div id="app">
    <m-header>hello</m-header>
  </div>
</template>

<script>
	import Mheader from './components/m-header/m-header'
	export default {
		components: {
			Mheader
		}
	}
</script>

<style scoped lang="stylus">
	@import "common/stylus/variable"

	#app
		color: $color-theme
</style>