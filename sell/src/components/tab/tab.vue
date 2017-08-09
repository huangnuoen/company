<template>
  <div class="tab">
		<div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
		<div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
		<div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	.tab
		display: flex
		height: 40px
		line-height: 40px
		.tab-item
			flex: 1
			text-align: center
</style>
