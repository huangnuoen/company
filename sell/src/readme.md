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
3. 该组件需要获取父组件的seller
    ```
	<router-view :seller="seller"></router-view>
	```
4. 模板内绑定的属性用连字符，props中要用驼峰命名
5. 引入子组件cartcontral
	- 传入food对象到子组件
	- 子组件通过父组件goods的点击事件，新增了food.count属性，并传给了父组件，selectFoods数组中的food对象也拥有了count属性
6. 计算selectFoods
	- 根据cartcontral返回的food.count, 将被选择的food对象保存在selectFoods中
7. 引入子组件shopcart
	- 传入selectFoods数组，使该子组件可计算出总量，总价等

### 购物车组件
1. 与goods父组件通信，获得selectFoods数组（商品单价和数量），seller对象（配送费，起送价的数据）
2. 获取商品总价,总量
	- selectFoods存放商品单价和数量（selectFoods数组要根据goods的点击情况生成数据）
	- 在goods中点击增加，则selectFoods的数量增加
	- 通过遍历selectFoods的单价和数量计算总价
3. 根据totalCount, totalPrice来绑定类名高亮，div.num根据totalCount来判断是否显示（v-show可以支持表达式）
4. 结算部分部分
	- 通过computed, 根据购物车总价与起送价差值返回不同模板
	- 通过computed, 根据购物车总价与起送价差值，绑定不同类名
5. 小球飞入动画
5.1 定义this.balls数组为5个ball对象(能同时有5个小球进行drop动画)，存放小球以供使用
5.2 需要获得点击按钮的位置，通过$dispatch从goods的子组件cartcontral获得target，在goods的events中传入target,调用方法，再在方法中通过$nextTick回调（在DOM更新好再执行）中再去通过$resf将target传给goods的子组件shopcart
```
  <!-- v-ref:shopcart 注册对子组件的引用，可在vue实例上用$refs访问该子组件 -->
  <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>

  _drop(target) {
    this.$refs.shopcart.drop(target);
  }
```	
5.3 drop方法，点击按钮调用该方法，取得一个show==false的小球，将show设true,并将点击元素储存在ball对象上,将ball储存在dropBalls中，此时开始动画
5.4 编写transition: {} 的drop各种状态的动画
5.4.1 动画开始前
	- 获取show为true的小球，获取ball.el的位置，计算偏移量，写出el.style
5.4.2 动画进行
	- 进行动画：要触发浏览器重绘
	- 除了渲染树的直接变化，当获取一些属性时，浏览器为取得正确的值也会触发重排。这样就使得浏览器的优化失效了。这些属性包括：offsetTop、offsetLeft、offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight、getComputedStyle() (currentStyle in IE)。
	- 重绘的目的：先重绘好开始动画设置好的style，重绘完成后再加载进入动画的style.transform才会有效果
	- 使用this.$nextTick()，将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
5.4.3 动画结束后
	- 结束动画后要执行：dropBalls移除第一个ball，并将该ball的show设为false以便可以再重新利用
	- 用dropBalls存放所有进行动画的小球的目的是，方便移除每个进行过动画的ball，并再将ball.
5.5 css  纵向方向设置运动曲线，先往负方向再往正方向
```
transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
```

### 购物按钮组件
1. 与goods父组件通信，获得food对象
```
// goods, food是在goods对象中获得的
<cartcontral :food="food"></cartcontral>
// cartcontral
props: {
	food: {
		type: Object
	}
}
```
2. 给food对象新增属性count时，直接赋值是无法获取该属性的，需通过Vue.set(this.food, 'count', 1)设置属性
	- 通过父组件goods的点击事件，新增count属性,
3. 增加点击加号的动画, 平移并滚动
	- 外层添加transition="move"属性, 定义.move-transition,.move-enter, .move-leave
	- 动画开始时，外层加上move-enter类，直到到达move-transition指定位置，停止动画；恢复原来位置时，从move-transition到move-leave过渡
	- 该动画进行时，里层元素同时进行滚动(其实也可以让外层元素滚动)
	```
	.cart-decrease
		transition: all .4s linear
		&.move-transition
			opacity: 1
			transform: translate3D(0, 0, 0)
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(0, 160, 220)
				transition: all .4s linear
				transform: rotate(0)
		&.move-enter, &.move-leave
			opacity: 0
			transform: translate3D(24px, 0, 0)
			.inner
				transform: rotate(360deg)
	```
