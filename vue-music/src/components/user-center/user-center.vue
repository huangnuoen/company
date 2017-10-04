<template>
	<transition name="slide">
		<div class="user-center">
			<div class="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wrapper"></div>
			<div class="play-btn">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
			<div class="list-wrapper"></div>
		</div>
	</transition>
</template>

<script>
	export default {}
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"

	.user-center
		position: fixed
		top: 0
		bottom: 0
		z-index: 100
		width: 100%
		background: $color-background
</style>