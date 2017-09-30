<template>
  <scroll class="suggest"
  				:pullup="pullup"
  				:beforeScroll="pullup"
  				:data="result" 
  				ref="suggest"
  				@scrollToEnd="searchMore"
  				@beforeScroll="listScroll">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
    	<no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
	import Singer from 'common/js/singer'
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import NoResult from 'base/no-result/no-result'
	import {mapMutations, mapActions} from 'vuex'

	const TYPE_SINGER = 'singer'
	const perpage = 20

	export default {
		props: {
			query: {
				type: String,
				default: ''
			},
			showSinger: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				page: 1,
				pullup: true,
				hasMore: true,
				beforeScroll: true,
				// 搜索结果
				result: []
			}
		},
		methods: {
			// 请求服务端检索
			search() {
				this.page = 1
				this.hasMore = true
				// 在每个第一次检索时，都滚动到顶部
				this.$refs.suggest.scrollTo(0, 0)
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this._genResult(res.data)
						// 检查data中的song数量
						this._checkMore(res.data)
					}
				})
			},
			// 搜索更多
			searchMore() {
				if (!this.hasMore) {
					return
				}
				this.page++
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this.result.concat(this._genResult(res.data))
						this._checkMore(res.data)
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
			selectItem(item) {
				// 歌手页面
				if (item.type === TYPE_SINGER) {
					const singer = new Singer({
						id: item.singermid,
						name: item.singername
					})
					this.$router.push({
						path: `/search/${singer.id}`
					})
					// 更新state.signer,以便singer-detail可以获取到新数据
					this.setSinger(singer)
				} else {
					// 歌曲页面
					this.insertSong(item)
				}
				// 派发
				this.$emit('select')
			},
			listScroll() {
				this.$emit('listScroll')
			},
			refresh() {
				this.$refs.suggest.refresh()
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
			},
			_checkMore(data) {
				const song = data.song
				// 判断歌曲当前显示数量是否大于总数
				if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
					this.hasMore = false
				}
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			}),
			...mapActions([
				'insertSong'
			])
		},
		watch: {
			// query变化时搜索
			query() {
				this.search()
			}
		},
		components: {
			Scroll,
			Loading,
			NoResult
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
      .icon
      	flex: 0 0 30px
      	width: 30px
      	[class^="icon-"]
      		font-size: 14px
      		color: $color-text-d
      .name
      	flex: 1
      	font-size: $font-size-medium
      	color: $color-text-d
      	overflow: hidden
      	.text
      		no-wrap()
    .no-result-wrapper
    	position: absolute
    	top: 50%
    	width: 100%
    	transform: translateY(-50%)
</style>