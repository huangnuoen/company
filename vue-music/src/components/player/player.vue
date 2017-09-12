<template>
  <div class="player" v-show="playlist.length>0">
  	<div class="normal-player" v-show="fullScreen">
  		<div class="background">
  			<img src="" width="100%" height="100%">
  		</div>
  		<div class="top">
  			<div class="back">
  				<i class="icon-back"></i>
  			</div>
  			<h1 class="title">1</h1>
  			<h2 class="subtitle">1</h2>
  		</div>
  		<div class="middle">
  			<div class="middle-l">
  				<div class="cd-wrapper">
  					<div class="cd">
  						<img src="" alt="" class="image">
  					</div>
  				</div>
  				<div class="playing-lyric-wrapper">
  					<div class="playing-lyric"></div>
  				</div>
  			</div>
  			<div class="middle-r"></div>
  		</div>
  		<div class="bottom">
  			<div class="dot-wrapper">
  				<span class="dot"></span>
  				<span class="dot"></span>
  			</div>
  			<div class="progress-wrapper"></div>
  			<div class="operators">
  				<div class="icon i-left">
  					<i></i>
  				</div>
  				<div class="icon i-left">
  					<i class="icon-prev"></i>
  				</div>
  				<div class="icon i-center">
  					<i class="playIcon"></i>
  				</div>
  				<div class="icon i-right">
  					<i class="icon-next"></i>
  				</div>
  				<div class="icon i-right">
  					<i class="icon"></i>
  				</div>
  			</div>
  		</div>
  	</div>
  	<div class="mini-player" v-show="!fullScreen">
  		<div class="icon">
  			<img src="" width="40" height="40">
  		</div>
  		<div class="text">
  			<h2 class="name"></h2>
  			<p class="desc"></p>
  		</div>
  		<div class="control">
  			<i class="icon-playlist"></i>
  		</div>
  	</div>
  </div>
</template>

<script>
	import {mapGetters} from 'vuex'
  export default {
  	computed: {
  		...mapGetters([
  			'fullScreen',
  			'playlist'
  		])
  	}
  }
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.player
		.normal-player
			position: fixed
			left: 0
			right: 0
			top: 0
			bottom: 0
			z-index: 150
			background: $color-background
			.background
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				z-index: -1
				opacity: .6
				filter: blur(20px)
			.top
				position: relative
				margin-bottom: 25px
				.back
					position: absolute
					top: 0
					left: 60px
					z-index: 50
					.icon-back
						display: block
						padding: 9px
						font-size: $font-size-large-x
						color: $color-theme
						transform: rotate(-90deg)
				.title
					width: 70%
					margin: 0 auto
					line-height: 40px
					text-align: center
					no-wrap()
					font-size: $font-size-large
					color: $color-text
				.subtitle
					line-height: 20px
					text-align: center
					font-size: $font-size-medium
					color: $color-text
			.middle
				position: fixed
				width: 100%
				top: 80px
				bottom: 170px
				white-space:ｎｏｗｒａｐ
		.mini-player
			display: flex
			align-items: center
			position: fixed
			left: 0
			bottom: 0
			z-index: 180
			width: 100%
			height: 60px
			background: $color-highlight-background

</style>