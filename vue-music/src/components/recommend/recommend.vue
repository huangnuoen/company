<template>
	<div class="recommend">
		<div class="recommend-content">
			<!-- 获取到数据后才渲染 -->
			<div v-if="recommends.length" class="slider-wrapper">
				<slider>
					<!-- 轮播图图片 -->
					<div v-for="item in recommends">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" alt="">
						</a>
					</div>
				</slider>
			</div>
			<div class="recommend-list">
				<h1 class="list-title">热门歌单推荐</h1>
				<ul></ul>
			</div>
		</div>
  
  </div>
</template>

<script>
	import Slider from 'base/slider/slider'
	import {getRecommend, getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	export default {
		data() {
			return {
				recommends: []
			}
		},
		created() {
			this._getRecommend()
			this._getDiscList()
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider
					};
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					console.log('成功2')
					if (res.code === ERR_OK) {
						console.log('成功')
						console.log(res.data)
					}
				})
			}
		},
		components: {
			Slider
		}
	}
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"
	
	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.slider-wrapper
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme


</style>