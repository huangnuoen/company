<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
  	<div class="bar-inner">
  		<div class="progress" ref="progress"></div>
  		<div class="progress-btn-wrapper"
  				 ref="progressBtn"
  				 @touchstart.prevent="progressTouchStart"
  				 @touchmove.prevent="progressTouchMove"
  				 @touchend="progressTouchEnd">
	  		<div class="progress-btn"></div>
  		</div>
  	</div>
  </div>
</template>

<script>
	import {prefixStyle} from 'common/js/dom'
	const progressBtnWidth = 16
	const transform = prefixStyle('transform')

  export default {
  	props: {
  		percent: {
  			type: Number,
  			default: 0
  		}
  	},
  	created() {
  		// 记录touch信息，各touch事件的联系
  		this.touch = {}
  	},
  	methods: {
  		progressTouchStart(e) {
  			this.touch.initiated = true
  			this.touch.startX = e.touches[0].pageX
  			this.touch.left = this.$refs.progress.clientWidth
  		},
  		progressTouchMove(e) {
  			// 如果没触发touchstar事件,直接触发touchmove时
  			if (!this.touch.initiated) {
  				return
  			}
  			// 移动距离
  			const deltaX = e.touches[0].pageX - this.touch.startX
  			// 偏移距离应在0~barWidth之间
  			const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
  			this._offset(offsetWidth)
  		},
  		progressTouchEnd(e) {
  			this.touch.initiated = false
  			this._triggerPercent()
  		},
  		progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        console.log(e, e.offsetX, offsetWidth)
        // 点击btn时，offsetX获取不对,因为触发对象变成btn
  			// this._offset(e.offsetX)
        this._offset(offsetWidth)
  			this._triggerPercent()
  		},
			// 告诉父要跳转到该进度
  		_triggerPercent() {
  			const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
  			const percent = this.$refs.progress.clientWidth / barWidth
  			this.$emit('percentChange', percent)
  		},
  		// 进度条和小球的偏移
  		_offset(offsetWidth) {
  				this.$refs.progress.style.width = `${offsetWidth}px`
  				this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
  		}
  	},
  	watch: {
  		// 监听歌曲进度百分比
  		percent(newPercent) {
  			// percent大于0且不在拖动状态时
  			if (newPercent >= 0 && !this.touch.initiated) {
  				const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
  				const offsetWidth = newPercent * barWidth
  				this._offset(offsetWidth)
  			}
  		}
  	}
  }
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"
	.progress-bar
		height: 30px
		.bar-inner
			position: relative
			top: 13px
			height: 4px
			background: rgba(0, 0, 0, .3)
			.progress
				position: absolute
				height: 100%
				background: $color-theme
			.progress-btn-wrapper
				position: absolute
				left: -8px
				top: -13px
				width: 30px
				height: 30px
				.progress-btn
					position: relative
					top: 7px
					left: 7px
					box-sizing: border-box
					width: 16px
					height: 16px
					border: 3px solid $color-text
					border-radius: 50%
					background: $color-theme
</style>