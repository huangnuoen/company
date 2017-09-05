<template>
	<transition name="slider">
	  <div class="singer-detail">singer-detail
	  </div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {ERR_OK} from 'api/config'
  export default {
  	// 取得状态
  	computed: {
  		// 在vue中挂载了singer属性
  		...mapGetters([
  			// singer指getters.js中的
  			'singer'
  			])
  	},
  	created() {
  		this._getDetail()
  		console.log('this.singer', this.singer)
  	},
  	methods: {
  		_getDetail() {
  			getSingerDetail(this.singer.id).then((res) => {
  				if (res.code === ERR_OK) {
  					console.log(res.data.list)
  				}
  			})
  		}
  	}
  }
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"

	.singer-detail
		position: fixed
		z-index: 100
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: $color-background

	.slider-enter-active, .slider-leave-active
		transition: all .3s
	.slider-enter, .slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>