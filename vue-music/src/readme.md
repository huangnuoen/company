## 主要组件
1. m-header.vue
2. tab.vue 导航
3. recommend.vue
	- 引入子组件slider.vue,scroll.vue, 懒加载
	- 在<slider>里写dom
	- 如何确定推荐数据已经获取并加载，并加载好图片（图片是渲染高度的主要元素）
		- 监听<img>load事件,触发时再refresh()
4. singer.vue
	- liveview.vue
	- singer-detail.vue
	- 配置子路由和vuex
5. singer-detail.vue
	- 从vuex的getters中通过...mapGetters()取得'singer'
	- 调用getSingerDetail(),传入singer.id,获取该歌手信息
	- 没有id时(在本页刷新则获取不到id，singer为空，singer只有在点击singer.vue中的li时才会创建)，回退到歌手页面
		```
	  if (!this.singer.id) {
	    this.$router.push('/singer')
	  }
		```	
	- _normalizeSinger(list)处理list,
6. music-list.vue 音乐列表组件
	- 歌手头像和歌曲列表
	- 头像用padding-top先占位
	- div.layer层，用于歌曲列表向上滚动时，用translate3d遮住bgImage
		- 监听滚动事件，获取滚动位移
		- 设置一个最大滚动距离，在watch: scrollY(newY)，实时translateY,当layer未达到指定位置时，translateY取newY,否则取最大滚动距离
		- 滚动到顶部时，剩余的bgImage应覆盖在列表上，且height为40px,padding-top为0
		- 回滚时，应复原
7. player.vue 播放器组件
8. disc.vue 歌单详情页 
	- 二级路由，在router中配置

## 公用js
1. dom.js 所有对dom的操作方法
	- 类名操作
	- 自动添加浏览器前缀
2. jsonp.js 处理jsonp请求
3. singer.js 定义类
4. song.js
	- 歌曲类，配置每首歌的基本信息
		- 配置方法：获取歌词,返回**promise对象**，再由vue组件用resolve处理
		- 歌词是base码，通过js-base64库转义
	- createSong工厂方法，直接new一个song,调用该方法只须传入musicData即可生成song实例，简化代码，不必在每次new的时候传一串参数
5. util.js
	- shuffle()将数组打乱
6. mixin.js 放置混合组件
	- const playlistMixin = {}
		- 在该Mixin中完成：当playlist存在时，$refs.list设置新bottom,并refresh()

## 基础vue组件
1. slider.vue
2. scroll.vue
	- 将BScroll的初始化抽象成组件
	- 可向该组件传入配置信息
	- <slot>可随意在父组件中插入要scroll的DOM
	- 初次bscroll时，用mounted调用，父组件可能还没完全渲染好样式，需要传入data数据(推荐和歌单资源)监听，
	- watch实时监听data的变化
3. song-list.vue  歌曲列表组件
	- 点击li派发select事件

## API接口
1. recommend.js 获取推荐数据
	- 获取轮播推荐数据
	- 获取推荐歌单列表
	- 获取推荐歌单歌曲列表
2. singer.js 获取歌手数据
3. song.js  获取歌词
	- axios从本地服务器获取
	- dev-server.js中,用axios配置头部信息

## 后端请求
1. dev-server.js 用express, axios库请后端请求数据
2. express.Router()实例，向后端请求数据
3. axios.get()重新配置header, params信息
4. 前端可通过axios.get()向本地服务器请求

	4.1 歌词部分获得的data是callback，还需要将string转为json

### app.vue
1. 用<keep-alive>保存当前路由状态
2. 放置路由

### main.js
1. 全局引进库
```
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
```

### router/index.js
1. 配置路由，并设置默认值

### 引入库
1. fastclick
	- 解决移动端延迟300ms的问题
	- 与better-scroll冲突，在有点击功能的元素上添加needsclick类

### vuex
- 将所有状态存储在state中，通过mutations去改变状态，getters去获取状态
1. 在singer.vue的methods中通过mapMutations映射setSinger方法，调用setSinger(singer)方法提交/改变状态
2. 在singer-detail.vue中的computed中通过mapGetters映射取得'singer'
