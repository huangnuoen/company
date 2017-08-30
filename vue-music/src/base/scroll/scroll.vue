<template>
  <div ref = "wrapper">
  	<slot></slot>
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			// 父组件的data
			data: {
				tpye: Array,
				default: null
			}
		},
		// slot挂载好后调用,样式可能还没渲染，高度还没撑开
		mounted() {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})
				console.log('mounted挂载元素', this.$refs.wrapper.firstChild.clientHeight)
			},
			refresh() {
				this.scroll && this.scroll.refresh()
				console.log('refresh重新刷新', this.$refs.wrapper.firstChild.clientHeight)
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			}
		},
		// 监听数据，自动刷新
		watch: {
			data() {
				setTimeout(() => {
					this.refresh()
				}, 20)
				console.log('watch监听', this.$refs.wrapper.firstChild.clientHeight)
			}
		}
	}
</script>

<style scoped lang="stylus">

</style>