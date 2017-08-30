## 主要组件
1. m-header.vue
2. tab.vue 导航
3. recommend.vue
	- 引入子组件slider.vue
	- 在<slider>里写dom

## 公用js
1. dom.js 所有对dom的操作方法
	- 类名操作

## 基础vue组件
1. slider.vue
2. scroll.vue
	- 将BScroll的初始化抽象成组件
	- 可向该组件传入配置信息
	- <slot>可随意在父组件中插入要scroll的DOM
	- watch实时监听data的变化

## API接口
1. recommend.js 获取推荐数据

## 后端请求
1. dev-server.js 用express, axios库请后端请求数据
2. express.Router()实例，向后端请求数据
3. axios.get()重新配置header, params信息
4. 

### app.vue
1. 用<keep-alive>保存当前路由状态