<template>
  <div class="star" :class="starType">
  	<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			// 计算starType
			starType() {
				return 'star-' + this.size;
			}
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.star
		font-size: 0
		.star-item
			display: inline-block
			background-repeat: no-repeat
		&.star-48
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&:last-child
					margin-right: 0
				&.on
					bg-image('start48_on')
				&.half
					bg-image('start48_half')
				&.off
					bg-image('start48_off')
		&.star-32
			.star-item
				width: 15px
				height: 15px
				margin-right: 16px
				background-size: 15px 15px
				&:last-child
					margin-right: 0
				&.on
					bg-image('start36_on')
				&.half
					bg-image('start36_half')
				&.off
					bg-image('start36_off')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin-right: 13px
				background-size: 10px 10px
				&:last-child
					margin-right: 0
				&.on
					bg-image('start24_on')
				&.half
					bg-image('start24_half')
				&.off
					bg-image('start24_off')
</style>
