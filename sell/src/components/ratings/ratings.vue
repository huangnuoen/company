<template>
  <div class="ratings">
  	<div class="ratings-content">
  		<div class="overview">
  			<div class="overview-left">
  				<h1 class="score">{{seller.score}}</h1>
  				<div class="title">综合评分</div>
  				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
  			</div>
  			<div class="overview-right"></div>
  		</div>
  	</div>
  </div>
</template>

<script>
	export default {
		props: {
			seller: {
				type: Object
			}
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	.ratings
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden
		.overview
			display: flex
			padding: 18px
			.overview-left
				flex: 0 0 137px
				width: 137px
				border-right: 1px solid rgba(7, 17, 27, .1)
				text-align: center
			.overview-right
				padding-left: 24px
				flex: 1
</style>
