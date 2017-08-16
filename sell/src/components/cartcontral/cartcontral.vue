<template>
  <div class="cartcontral">
  	<div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart($event)" v-show="food.count > 0"></div>
  	<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
  	<div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created() {
			console.log(this.food);
		},
		methods: {
			// 如果是浏览器原生事件时,避免PC端点击2次的问题
			addCart(event) {
				if (!event._constructed) {
					return;
				};
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				console.log(this.food.count);
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return;
				};
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	.cartcontral
		font-size: 0
		.cart-decrease, .cart-add
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
		.cart-count
			display: inline-block
			width: 12px
			vertical-align: top
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.cart-add
			display: inline-block
</style>
