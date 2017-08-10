<template>
  <div class="header">
  	<div class="content-wrapper">
  		<div class="avatar">
  			<img :src="seller.avatar" width="64" height="64">
  		</div>
  	</div>
  	<div class="bullentin-wrapper"></div>
  </div>
</template>

<script>
	export default {
		// 绑定父组件数据到子组件
		props: {
			seller: {
				type: Object// 要求传入的数据类型是对象
			}
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
</style>
