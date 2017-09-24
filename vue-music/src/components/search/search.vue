<template>
  <div class="search">
  	<div class="search-box-wrapper">
	  	<search-box ref="searchBox" @query="onQueryChange"></search-box>
  	</div>
  	<div class="shortcut-wrapper" v-show="!query">
  		<div class="shortcut">
  			<div class="hot-key">
  				<h1 class="title">热门搜索</h1>
  				<ul>
  					<li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
  					<span>{{item.k}}</span>
  					</li>
  				</ul>
  			</div>
  		</div>
  	</div>
  	<div class="search-result" v-show="query">
	  	<suggest :query="query"></suggest>
   	</div>
  </div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
	import {getHotKey} from 'api/search'
	import {ERR_OK} from 'api/config'

  export default {
  	data() {
  		return {
  			hotKey: [],
  			query: ''
  		}
  	},
  	created() {
  		this._getHotKey()
  	},
  	methods: {
  		addQuery(query) {
  			this.$refs.searchBox.setQuery(query)
  		},
  		onQueryChange(query) {
  			this.query = query
  		},
  		// 获取热门搜索
  		_getHotKey() {
  			getHotKey().then((res) => {
  				if (res.code === ERR_OK) {
  					// 只取前10条
  					this.hotKey = res.data.hotkey.slice(0, 10)
  				}
  			})
  		}
  	},
  	components: {
  		SearchBox,
  		Suggest
  	}
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

	.search
		.search-box-wrapper
			margin: 20px
		.shortcut-wrapper
			position: fixed
			top: 178px
			bottom: 0
			width: 100%
			.shortcut
				height: 100%
				overflow: hidden
				.hot-key
					margin: 0 20px 20px 20px
					.title
						margin-bottom: 20px
					.item
						display: inline-block
						padding: 5px 10px
						margin: 0 20px 10px 0
						border-radius: 6px
						background: $color-highlight-background
						font-size: $font-size-medium
						color: $color-text-d
		.search-result
			position: fixed
			width: 100%
			top: 178px
			bottom: 0
</style>