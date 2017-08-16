<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount > 0}">
						<i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
					</div>
					<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{payDesc}}</div>
			</div>
		</div>
		<div class="ball-container">
			<div class="ball" v-for="ball in balls" v-show="ball.show" transition="drop">
				<div class="inner"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				]
			};
		},
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元配送`;
				} else {
					return '去结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			}
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		z-index: 50
		height: 48px
		width: 100%
		background: #000
		.content
			display: flex
			background: #141d27
			font-size: 0
			color: #80858a
			.content-left
				flex: 1
				.logo-wrapper
					display: inline-block
					position: relative
					top: -10px
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					vertical-align: top
					border-radius: 50%
					background: #141d27
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #fff
						background: rgb(240, 20, 20)
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background: #2b343c
						text-align: center
						&.highlight
							background: RGB(0, 160, 220)
						.icon-shopping_cart
							line-height: 44px
							font-size: 24px
							&.highlight
								color: #fff
				.price
					display: inline-block
					margin-top: 12px
					vertical-align: top
					line-height: 24px
					font-size: 16px
					font-weight: 700
					padding-right: 12px
					box-sizing: border-box
					border-right: 1px solid rgba(255, 255, 255, .1)
					&.highlight
						color: #fff
				.desc
					display: inline-block
					vertical-align: top
					margin: 12px 0 0 12px
					line-height: 24px
					font-size: 16px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					background: #2b343c
					font-weight: 700
					&.not-enough
						background: #2b343c
					&.enough
						background: #00b43c
						color: #fff
		.ball-container
			.ball
				position: fixed
				left: 32px
				bottom: 22px
				z-200
				&.drop-transition
					transition: all .4s
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background: rgb(0, 160, 220)
					transition: all .4s
</style>
