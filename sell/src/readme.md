### vue-router
1. 配置
	- 将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。
	1.1 使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
	1.2 实例化 new VueRouter()
	1.3 在a中设置v-link="{path: '/goods'}"跳转路径
	1.3 router.map()配置路由
		- 定义路径的组件
		```
		router.map({
			'/goods': {
				component: goods
			}
		});
		```
	1.4 挂钩到文档相应位置
	```
	router.start(app, '#app');

	```


### vue-source
- 用于前后端通信
1. 在main.js引入vue-source
2. 在app.vue中
	- 方法，请求后端数据，用回调函数处理数据
	```
	created() {
	  this.$http.get('/api/seller').then((response) => {
	    response = response.body;
	    if (response.errno === ERR_OK) {
	      this.seller = response.data;
	      console.log(this.seller);
	    }
	  });
	},
	```


### header.vue
1. 绑定父组件数据到子组件
	1.1 父组件的tem中，“seller1”会传到子组件
	<v-header v-bind:seller="seller1"></v-header>
	1.2 子组件中，用props获取父组件信息
			props: {
				seller: {
					type: Object
				}
			}
	1.3 子组件中的元素属性要引用props获得的数据，必须要用:绑定，元素内容的引用可直接引用
	```
	<img :src="seller.avatar" width="64" height="64">
	<span>{{seller.name}}</span>
	```
2. 编写header.vue的模板
3. 弹出层
	3.1 根据点击判断弹出层是否显示
	3.2 弹出层底部关闭按钮固定
	3.3 引入子组件————星级评分组件

### star组件
1. v-for 通过星星总数循环生成相应数量的<span>，并通过分数生成相应类名itemClass(on, off, half)
2. Vue
	2.1 props获取父组件size, score
	2.2 computed 计算属性
3. 样式
	3.1 根据size，定制类名(.star-48, .star-36, star-24),编写每种类样式
	3.2 编写星星3种状态样式，每个样式有2种分辨率(引入mixin.styl)