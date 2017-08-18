<template>
  <div class="ratingselect">
  	<div class="rating-type border-1px">
  		<span class="block all">{{desc.all}}<span class="count">47</span></span>
  		<span class="block positive">{{desc.positive}}<span class="count">47</span></span>
  		<span class="block negative">{{desc.negative}}<span class="count">47</span></span>
  	</div>
  	<div class="switch">
  		<span class="icon-check_circle"></span>
  		<span class="text">只看有内容的评价</span>
  	</div>
  </div>
</template>

<script>
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			// 选择的评价类型
			selectType: {
				tpe: Number,
				default: ALL
			},
			// 只看有内容的评价
			onlyContent: {
				type: Boolean,
				default: false
			},
			// 描述
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.ratingselect
		.rating-type
			padding: 18px 0
			margin: 0 18px
			border-1px(rgba(7, 17, 27, .1))
			font-size: 0
			.block
				display: inline-block
				padding: 8px 12px
				margin-right: 8px
				font-size: 12px
				line-height: 16px
				border-radius: 1px
				color: rgb(77, 85, 93)
				background: rgb(0, 160, 220)
				.count
					font-size: 8px
					margin-left: 2px
					line-height: 16px
				&.all
					color: #fff
				&.positive
					background: rgba(0, 160, 220, .2)
				&.negative
					background: rgba(77, 85, 93, .2)

</style>
