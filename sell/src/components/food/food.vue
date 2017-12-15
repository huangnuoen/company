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
	  		<div class="cartcontrol-wrapper">
	  			<cartcontrol :food="food"></cartcontrol>
	  		</div>
	  		<div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0" transition="fade">加入购物车</div>
	  	</div>
	  	<split v-show="food.info"></split>
	  	<div class="info" v-show="food.info">
	  		<h1 class="title">商品信息</h1>
	  		<p class="text">{{food.info}}</p>
	  	</div>
	  	<split></split>
	  	<div class="rating">
	  		<h1 class="title">商品评价</h1>
		  	<ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
		  	<div class="rating-wrapper">
		  		<ul v-show="food.ratings && food.ratings.length">
		  			<li class="rating-item border-1px" v-for="rating in food.ratings" v-show="needShow(rating.rateType, rating.text)">
		  				<div class="user">
		  					<span class="name">{{rating.username}}</span>
		  					<img width="12" height="12" class="avatar" :src="rating.avatar" >
		  				</div>
		  				<div class="time">{{rating.rateTime | formatDate}}</div>
				  		<p class="text">
				  			<span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
				  		</p>
		  			</li>
		  		</ul>
		  		<div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
		  	</div>
	  	</div>
  	</div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';

	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				},
				selectType: ALL,
				onlyContent: true
			};
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd  hh:mm');
			}
		},
		methods: {
			show() {
				this.showFlag = true;
				// 在展示详情时，都恢复默认设置
				this.selectType = 2;
				this.onlyContent = true;
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
				Vue.set(this.food, 'count', 1);
				// 要下落动画执行后才将数量设为1
				// this.$nextTick(() => {
				// Vue.set(this.food, 'count', 1);
				// });
			},
			// 如何展示评价列表
			needShow(type, text) {
				// 内容判断
				if (this.onlyContent && !text) {
					return false;
				}
				// 类型判断
				if (this.selectType === ALL) {
					return true;
				} else {
					return this.selectType === type;
				}
			}
		},
		events: {
			'ratingtype.select'(type) {
				this.selectType = type;
				// 上一步操作会改变dom的高度，需重新调用BScroll，且必须在DOM更新完后才能调用
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			'content.toggle'(onlyContent) {
				this.onlyContent = onlyContent;
				// 上一步操作会改变dom的高度，需重新调用BScroll，且必须在DOM更新完后才能调用
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.food
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		z-index: 30
		overflow: hidden
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
			position: relative
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
				&.fade-transition
					opacity: 1
					transition: all .2s
				&.fade-enter, &.fade-leave
					opacity: 0
		.info
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7, 17, 27)
			.text
				padding: 0 8px
				font-size: 12px
				font-weight: 200
				line-height: 24px
				color: rgb(77, 85, 93)
		.rating
			padding-top: 18px
			.title
				margin-bottom: 6px
				margin-left: 8px
				line-height: 14px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.rating-wrapper
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-1px(rgba(7, 17, 27, .1))
					color: rgb(147, 153, 159)
					.user
						font-size: 0
						position: absolute
						right: 0
						top: 16px
						line-height: 12px
						.name
							display: inline-block
							vertical-align: top
							font-size: 10px
							margin-right: 6px
						.avatar
							border-radius: 50%
					.time
						font-size: 10px
						margin-bottom: 6px
					.text
						line-height: 12px
						font-size: 12px
						color: rgb(7, 17, 27)
						.icon-thumb_up, .icon-thumb_down
							margin-right: 4px
							line-height: 24px
							font-size: 12px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.icon-thumb_down
							color: rgb(147, 153, 159)
				.no-rating
					padding: 16px 0
					font-size: 14px
					color: rgb(147, 153, 159)


</style>

