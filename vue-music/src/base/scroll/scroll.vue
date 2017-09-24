<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      // 是否实时派发滚动事件
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      // 是否监听
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否上拉刷新
      pullup: {
        type: Boolean,
        default: false
      },
      // 父组件的data
      data: {
        tpye: Array,
        default: null
      }
    },
    // el挂载好后调用, 不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入 Vue.nextTick/vm.$nextTick。
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
        // console.log('mounted,没有加载好data', this.$refs.wrapper, this.$refs.wrapper.firstChild.clientHeight)

        if (this.listenScroll) {
          // me指向Vue实例
          let me = this
          this.scroll.on('scroll', (pos) => {
            // 触发当前实例的scroll事件,将pos传给响应该自定义事件的组件
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          // 滚动结束时
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部时
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // 派发滚动到底部事件
              this.$emit('scrollToEnd')
            }
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },

    // 监听数据，自动刷新
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
        // console.log('watch监听', this.$refs.wrapper.firstChild.clientHeight)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>