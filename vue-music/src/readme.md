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
	- bgimg和歌曲列表
	- 头像用padding-top先占位
	- div.layer层，用于歌曲列表向上滚动时，用translate3d遮住bgImage
		- 监听滚动事件，获取滚动位移
		- 设置一个最大滚动距离，在watch: scrollY(newY)，实时translateY,当layer未达到指定位置时，translateY取newY,否则取最大滚动距离
		- 滚动到顶部时，剩余的bgImage应覆盖在列表上，且height为40px,padding-top为0
		- 回滚时，应复原
7. player.vue 播放器组件
8. disc.vue 歌单详情页 
	- 二级路由，在router中配置
	- 引入子组件music-list
		- 传入bgimg,title,songs即可
	- songs: 处理获取的res.cdlist[0].songlist数据
		- 遍历每个musicData,将它重新整合，新生成一个song类
9. rank.vue
10. search.vue
	- 引入search-box,suggest
	- 从search-box中$emit获取query,传入suggest中
	- shorcut-wrapper和search-result用query是否存在来控制v-show
	- 设置二级路由，singerDetail
11. suggest.vue
	- 显示搜索结果
	- 调用search()获取搜索结果数据
	- 处理数据
		- 数据中有歌手时，添加zhida和type标识，推送到result
		- 将song.list数组用concat(),连接到result后
		- result存储了歌手信息和歌曲信息
	- 根据result显示数据
		- 有type标识的添加不同类
	- props:query,并监听,调用search()
	- 上拉刷新
		- scrollToEnd触发时，执行searchmore()
			- this.result改变，传回scroll组件，refresh()
		- hasMore标识是否还有更多,_checkMore()检查是否还有更多，
		- this.page控制请求第几页
		- loading放在li后，用hasMore控制v-show
	- 点击搜索结果会跳转到/search/:id二级路由
		- 歌手：跳转到singer-detail页面
			- new Singer，新建singer对象，更新state.singer,以便singer-detail获取渲染
		- 歌曲：跳转到播放页面
			- 点击歌曲后，将歌曲添加到当前列表，要修改playlist,suqencelist,currentindex等
12. playlist
	- 播放列表
	- 控制显示
	- 获取sequencelist，并渲染
	- 添加scroll组件
	- 实现点击播放，删除，清空功能
	- 设置相应的actions
	- 当列表为空时，要隐藏
	- 清空功能会出现弹出层
13. add-song  添加歌曲到列表弹出层
	- 搜索功能
	- 最近播放历史显示，点击歌曲可添加到当前列表
	- 在suggest点击添加歌曲后,search-list不能滚动？？？
		- 解决：监听query变化刷新
14. user-center  用户中心 一级路由
	- 在m-header设置一级路由进入
	- 标记我喜欢听的


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
	- 节流函数debounce()
6. mixin.js 放置混合组件
	- 播放器适配底部：const playlistMixin = {}
		- 在该Mixin中完成：当playlist存在时，$refs.list设置新bottom,并refresh()
	- 播放器和播放列表的共有功能：播放模式切换，播放状态切换，播放模式样式切换，重置当前索引，设置播放列表
	- 搜索共有功能和数据:失焦功能，查找词改变，添加查找词，保存搜索历史
7. cache.js 浏览器缓存

## 基础vue组件
1. slider.vue
2. scroll.vue
	- 将BScroll的初始化抽象成组件
	- 可向该组件传入配置信息
	- <slot>可随意在父组件中插入要scroll的DOM
	- 初次bscroll时，用mounted调用，父组件可能还没完全渲染好样式，需要传入data数据(推荐和歌单资源)监听，
	- watch实时监听data的变化
	- 适当时候派发事件
3. song-list.vue  歌曲列表组件
	- 点击li派发select事件
	- props:rank,根据些判断是否增加排行样式
4. search-box
	- input双向绑定
	- 清空按钮
	- 监听query，并传回父组件
	- setQuery方法，可在父中通过$refs调用
	- 父组件传入占位符
5. search-list 显示搜索历史列表
	- 派发触发点击添加，删除事件
6. confirm 弹出层
	- props接收text,confirmBtnText...
	- 通过showflag来控制显示
	- 提供一些方法供父组件使用
7. switches.vue 开关切换组件,可自定义不同内容和数量
8. top-tip.vue 顶部提示
	- 父组件控制显示隐藏，可传入slot

## API接口
1. recommend.js 获取推荐数据
	- 获取轮播推荐数据
	- 获取推荐歌单列表
	- 获取推荐歌单歌曲列表,返回promise对象
2. singer.js 获取歌手数据
3. song.js  获取歌词
	- axios从本地服务器获取
	- dev-server.js中,用axios配置头部信息
4. rank.js 
	- 获取排行榜列表
	- 获取排行榜歌单列表
5. search.js
	- 获取搜索热词
	- 获取搜索结果数据
	- 存储搜索历史

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
2. 设置一级路由和二级路由

### 引入库
1. fastclick
	- 解决移动端延迟300ms的问题
	- 与better-scroll冲突，在有点击功能的元素上添加needsclick类

### vuex
- 将所有状态存储在state中，通过mutations去改变状态，getters去获取状态
1. 在singer.vue的methods中通过mapMutations映射setSinger方法，调用setSinger(singer)方法提交/改变状态
2. 在singer-detail.vue中的computed中通过mapGetters映射取得'singer'
3. actions

### 编译打包
1. npm run build 编译
2. 根目录新建prod.server.js
	- 利用express写服务，用axios请求资源
	- 设置静态资源目录
	- 配置端口，监听请求资源
3. node prod.server.js
4. 利用vue-router和webpack的import()提供的异步入口对组件做懒加载处理