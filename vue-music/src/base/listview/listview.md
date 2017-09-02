### listview.vue
1. 左侧歌手列表
2. 右侧快速入口栏
3. 引入scroll组件，全局会有touchmove事件
4. 实现触摸时左侧显示到相应位置
	- touchstart事件
5. 实现触摸移动时左侧也做相应的移动
	- @touchmove要阻止默认父元素的touchmove事件
	``` 
	@touchmove.stop.prevent="onShortcutTouchMove($event)"
	```
6. touchstart和touchmove事件调用的方法要共享一个firsttouch数据（第一个触摸的目标）
	- 要用created()
	- 为什么不用data?