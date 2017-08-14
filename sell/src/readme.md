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
	1.1 父组件的tem中，seller的信息是“seller1”，会传到子组件中
	<v-header v-bind:seller="seller1"></v-header>
	1.2 子组件中，用props声明它期待获得的数据————父组件信息
	```
	props: {
		// 声明想从父组件得到seller的信息
		seller: {
			type: Object
		}
	}
	```
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
	3.4 加入过渡动画 transition="fade"

### star组件
1. v-for 
	- 通过星星总数循环生成相应数量的<span>，并通过分数生成相应类名itemClass(on, off, half)
	- 使用track-by="$index"属性提供一个提示，这将强制v-for进入就地更新模式：片段不再移动，他们只需在相应索引处使用新值刷新。此模式还可以处理源数组中的重复值。
	- 这可以使阵列更换非常有效，但它是一个权衡。因为DOM节点不再被移动以反映顺序的变化，像DOM输入值和组件私有状态这样的临时状态可能会失去同步。所以，使用时要小心，track-by="$index"如果v-for块包含表单输入元素或子组件。
2. Vue
	2.1 props获取父组件size, score
	2.2 computed 计算属性
3. 样式
	3.1 根据size，定制类名(.star-48, .star-36, star-24),编写每种类样式
	3.2 编写星星3种状态样式，每个样式有2种分辨率(引入mixin.styl)

### goods组件
1. 布局
	1.1 绝对定位，设定top=header+tab 和bottom=购物车
	1.2 flex布局，左栏固定宽，右侧自适应
2. 滚动
	2.1 依赖库better-scroll
	2.2 根据右侧滚动情况给左侧相应元素加样式
		- 获取右侧每个列表的高度累加，存为数组
		- 获取滚动的位置scrollY, 文档从顶部开始滚动过的像素值
		- 将scrollY 换成左侧对应栏目的索引值
		```
		currentIndex() {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];
				if (this.scrollY > height1 && this.scrollY < height2) {
					return i;
				};
			}
		}
		```	
		- 根据返回的i值，判断是否加类current, currentIndex === $index为true，则加上current
		```
		<li v-for="item in goods" class="menu-item" :class="{'current': currentIndex === $index}">
		```
