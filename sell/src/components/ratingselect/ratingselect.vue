<template>
  <div class="ratingselect">
  	<div class="rating-type border-1px">
  		<span @click="select(2,$event)" class="block all" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
  		<span @click="select(1, $event)" class="block positive" :class="{'active':selectType === 1}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
  		<span @click="select(0,$event)" class="block negative" :class="{'active':selectType === 0}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  	</div>
  	<div class="switch" :class="{'on':onlyContent === true}" @click="toggleContent($event)">
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
		},
/*		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.ratetype === POSITIVE;
				});
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.ratetype === NEGATIVE;
			}
		},
*/		methods: {
			select(type, event) {
				if (!event._constructed) {
					return;
				}
				this.selectType = type;
				// 将type传回父组件
				this.$dispatch('ratingtype.select', type);
			},
			toggleContent(event) {
				if (!event._constructed) {
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$dispatch('content.toggle', this.onlyContent);
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
				background: rgba(0, 160, 220, .2)
				.count
					font-size: 8px
					margin-left: 2px
					line-height: 16px
				&.all
					background: rgba(0, 160, 220, .2)
					&.active
						background: rgb(0, 160, 220)
						color: #fff
				&.positive
					background: rgba(0, 160, 220, .2)
					&.active
						background: rgb(0, 160, 220)
						color: #fff
				&.negative
					background: rgba(77, 85, 93, .2)
					&.active
						background: rgb(77, 85, 93)
						color: #fff
		.switch
			padding: 12px 18px
			font-size: 0
			line-height: 24px
			border-bottom: 1px solid rgba(7, 17, 27, .1)
			color: rgb(147, 153, 159)
			&.on
				.icon-check_circle
					color: #00c850
			.icon-check_circle
				display: inline-block
				margin-right: 4px
				font-size: 24px
				line-height: 24px
				vertical-align: top
			.text
				display: inline-block
				font-size: 12px


</style>
