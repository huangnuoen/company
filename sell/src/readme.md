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
2. 在app.vue输出
	- 方法
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