<template>
  <div class="singer" ref="singer">
  singer
  </div>
</template>

<script>
  import Singer from 'common/js/singer'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
  	data() {
  		return {
  			singers: []
  		}
  	},
  	created() {
  		this._getSingerList()
  	},
  	methods: {
  		_getSingerList() {
  			getSingerList().then((res) => {
  				if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
  					console.log(this.singers)
  				}
  			})
  		},
  		// 将list重新归类
  		_normalizeSinger(list) {
        // 定义hot
  			let map = {
  				hot: {
  					title: HOT_NAME,
  					items: []
  				}
  			}
        // 遍历数组
  			list.forEach((item, index) => {
          // 取前10条为热门
  				if (index <= HOT_SINGER_LEN) {
            // 推送到热门对象，将Singer定义为类，可复用
  					map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
  				}
          // 定义首字母对象
  				const key = item.Findex
  				if (!map[key]) {
  					map[key] = {
  						title: key,
  						items: []
  					}
  				}
  				map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
  			})
        return map
  		}
  	}
  }
</script>

<style scoped lang="stylus">
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
</style>