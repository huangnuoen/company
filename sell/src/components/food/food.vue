<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
  	<div class="food-content">
  		<div class="image-header">
  			<img :src="food.image">
  			<div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
  		</div>
  		<div class="content">
  			<h1 class="title">{{food.name}}</h1>
  			<div class="detail">
  				<span class="sell-count">月售{{food.sellCount}}份</span>
  				<span class="sell-rating">好评率{{food.rating}}%</span>
  			</div>
  			<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  			</div>
  		</div>
  		<div class="cartcontrol-wrapper">
  			<cartcontrol :food="food"></cartcontrol>
  		</div>
  		<div class="buy" @click="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
  	</div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false
			};
		},
		methods: {
			show() {
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$els.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if (!event._constructed) {
					return;
				};
				this.$dispatch('cart.add', event.target);
				// 要下落动画执行后才将数量设为1
				this.$nextTick(() => {
				Vue.set(this.food, 'count', 1);
				});
			}
		},
		components: {
			cartcontrol
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	.food
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		z-index: 30
		width: 100%
		background: #fff
		&.move-transition
			transform: translate3d(0, 0, 0)
			transition: all .2s linear
		&.move-enter, &.move-leave
			transform: translate3d(-100%, 0, 0)
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 0
				left: 0
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 20px
					color: #fff
					border-radius: 50%
					background: rgba(7, 17, 27, .2)
		.content
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 8px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
			.detail
				margin-bottom: 18px
				line-height: 10px
				font-size:0
				.sell-count, .sell-rating
					color: rgb(147, 153, 159)
					font-size: 12px
				.sell-count
					margin-right: 12px
			.price
				font-weight: 700
				line-height: 24px
				.now
					margin-right: 8px
					font-size: 14px
					color: rgb(240, 20, 20)
				.old
					font-size: 10px
					text-decoration: line-through
					color: rgb(147, 153, 159)
		.cartcontrol-wrapper
			position: absolute
			right: 12px
			bottom: 12px
		.buy
			position: absolute
			right: 18px
			bottom: 18px
			z-index: 10
			height: 24px
			line-height: 24px
			padding: 0 12px
			box-sizing: border-box
			font-size: 10px
			border-radius: 12px
			background: rgb(0, 160, 220)
			color: #fff
</style>

