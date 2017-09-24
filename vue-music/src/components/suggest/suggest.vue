<template>
  <scroll class="suggest" :data="result">
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
  </scroll>
</template>

<script>
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
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
				// 搜索结果
				result: []
			}
		},
		methods: {
			// 请求服务端检索
			search() {
				search(this.query, this.page, this.showSinger).then((res) => {
					if (res.code === ERR_OK) {
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
					return `${item.name}-${item.singer}`
				}
			},
			_genResult(data) {
				// 存储zhida,type,song.list
				let ret = []
				// 如果是歌手，则添加type和zhida
				if (data.zhida && data.zhida.singerid) {
					// ...将对象转为用,分隔的参数,
					// 将data.zhida对象转为参数，将type也转为参数，合成一个对象
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				// 歌曲
				if (data.song) {
					// 将song.list数组和ret连接成新数组
					ret = ret.concat(this._normalizeSongs(data.song.list))
					console.log(data.song, ret)
				}
				// [歌手信息?，歌曲信息，歌曲信息]
				return ret
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		watch: {
			query() {
				this.search()
			}
		},
		components: {
			Scroll
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