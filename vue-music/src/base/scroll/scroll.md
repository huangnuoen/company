### scroll.vue
1. 将BScroll的初始化抽象成组件
2. 可向该组件传入配置信息
3. <slot>可随意在父组件中插入要scroll的DOM
4. watch实时监听data的变化
	- data从父组件中传递过来，当父组件的data通过异步加载获取后，data发生改变，随即调用refresh()方法加载
5. 将better-scroll的方法再次封装，方便父组件通过$refs调用
6. _initScroll() 初始化
7. 配置上拉刷新选项
	- 当触发滚动结束时，判断是否滚动到底部
	```
	if (this.scroll.y <= (this.scroll.maxScrollY + 50) ...
	```
	- 将'scrollToEnd'派发给父组件sourceLoader