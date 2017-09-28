<template>
  <div class="search">
  	<div class="search-box-wrapper">
	  	<search-box ref="searchBox" @query="onQueryChange"></search-box>
  	</div>
  	<div class="shortcut-wrapper" v-show="!query">
  		<scroll class="shortcut" :data="showcut" ref="shortcut">
        <div>
    			<div class="hot-key">
    				<h1 class="title">热门搜索</h1>
    				<ul>
    					<li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
    					<span>{{item.k}}</span>
    					</li>
    				</ul>
    			</div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
  		</scroll>
  	</div>
  	<div class="search-result" v-show="query">
	  	<suggest :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
   	</div>
    <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
   	<router-view></router-view>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
	import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
	import {getHotKey} from 'api/search'
	import {ERR_OK} from 'api/config'
  import {mapActions, mapGetters} from 'vuex'

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
    computed: {
      // 为了传入scroll组件，连接2个数据，一个变化即showcut也会改变
      showcut() {
        return this.hotKey.concat(this.searchHistory)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
  	methods: {
  		addQuery(query) {
  			this.$refs.searchBox.setQuery(query)
  		},
  		onQueryChange(query) {
  			this.query = query
  		},
  		blurInput() {
  			this.$refs.searchBox.blur()
  		},
  		// 保存搜索历史
  		saveSearch() {
        this.saveSearchHistory(this.query)
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
  		// 获取热门搜索
  		_getHotKey() {
  			getHotKey().then((res) => {
  				if (res.code === ERR_OK) {
  					// 只取前10条
  					this.hotKey = res.data.hotkey.slice(0, 10)
  				}
  			})
  		},
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
  	},
    watch: {
      // query新值为空时，即从suggest换到shortcut页面时，
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 111020)
        }
      }
    },
  	components: {
  		SearchBox,
  		Suggest,
  		SearchList,
      Confirm,
      Scroll
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
						font-size: $font-size-medium
						color: $color-text-l
					.item
						display: inline-block
						padding: 5px 10px
						margin: 0 20px 10px 0
						border-radius: 6px
						background: $color-highlight-background
						font-size: $font-size-medium
						color: $color-text-d
				.search-history
					position: relative
					margin: 0 20px
					.title
						display: flex
						align-items: center
						height: 40px
						font-size: $font-size-medium
						color: $color-text-l
						.text
							flex: 1	
						.clear
							extend-click()
							.icon-clear
								font-size: $font-size-medium
								color: $color-text-d					
		.search-result
			position: fixed
			width: 100%
			top: 178px
			bottom: 0
</style>