<template>
  <div class="suggest">
    <div class="suggest">
      <ul class="suggest-list">
        <li class="suggest-item" v-for="item in result">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {filterSinger} from 'common/js/song'
	const TYPE_SINGER = 'singer'

	export default {
		props: {
			query: {
				type: String,
				default: '1'
			},
			showSinger: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				page: 1,
				result: []
			}
		},
		methods: {
			// 请求服务端检索
			search() {
				search(this.query, this.page, this.showSinger).then((res) => {
					if (res.code === ERR_OK) {
						console.log(res)
						this.result = this._genResult(res.data)
					}
				})
			},
			getIconCls(item) {
				if (item.type === TYPE_SINGER) {
					return 'icon-mine'
				} else {
					return 'icon-music'
				}
			},
			getDisplayName(item) {
				if (item.type === TYPE_SINGER) {
					return item.singername
				} else {
					return `${item.songname}-${filterSinger(item.singer)}`
				}
			},
			_genResult(data) {
				// 存储zhida,type,song.list
				let ret = []
				if (data.zhida && data.zhida.singerid) {
					// ...将对象转为用,分隔的参数,
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				if (data.song) {
					ret = ret.concat(data.song.list)
				}
				return ret
			}
		},
		watch: {
			query() {
				this.search()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
</style>