<template>
  <div class="search">
  	<div class="search-box-wrapper">
	  	<search-box></search-box>
  	</div>
  	<div class="shortcut-wrapper">
  		<div class="shortcut">
  			<div class="hot-key">
  				<h1 class="title">热门搜索</h1>
  				<ul>
  					<li class="item" v-for="item in hotKey">{{item.k}}</li>
  				</ul>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import {getHotKey} from 'api/search'
	import {ERR_OK} from 'api/config'

  export default {
  	data() {
  		return {
  			hotKey: []
  		}
  	},
  	created() {
  		this._getHotKey()
  	},
  	methods: {
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
  		SearchBox
  	}
  }
</script>

<style scoped lang="stylus">

</style>