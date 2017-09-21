<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import ListView from 'base/listview/listview'
  import Singer from 'common/js/singer'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'

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
      selectSinger(singer) {
        // 设置路由跳转路径
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // 传入singer参数，修改mutation
        this.setSinger(singer)
        console.log(singer)
      },
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
        // 将map排序
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 升序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // 合并2个数组
        return hot.concat(ret)
      },
      // 将mutation修改映射成一个方法名
      ...mapMutations({
        // 映射 this.setSinger() 为 this.$store.commit('SET_SINGER')
        setSinger: 'SET_SINGER'
      })
  	},
    components: {
      ListView
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