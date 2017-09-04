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
6. 实现左右联动
	- protoType派发实时滚动
	- this.currentIndex记录右栏当前位置，this.scrollY记录左侧滚动的位置
	6.1 watch中监听data，在data渲染完成后执行_calculateHeight(),计算每个list-group的高度
		- this.listHeight存储所有list-group的高度
	6.2 watch中监听scrollY,传入新位置，判断所在区间，给this.currentIndex赋值
		- 滚动到顶部时
		- 在中部滚动时
		- 滚动到底部时
		```
	  scrollY(newY) {
	    const listHeight = this.listHeight
	    // 判断位置
	    // 当滚动到顶部，newY>0
	    if (newY > 0) {
	      this.currentIndex = 0
	    }
	    // 在中间部分滚动
	    for (let i = 0; i < listHeight.length - 1; i++) {
	      let height1 = listHeight[i]
	      let height2 = listHeight[i + 1]
	      if ((-newY) >= height1 && (-newY) <= height2) {
	        this.currentIndex = i
	        return
	      }
	    }
	    // 当滚动到底部，且-newY大于最后一个的上限
	    this.currentIndex = listHeight.length - 2
	  }
	}
	```

7. touchstart和touchmove事件调用的方法要共享一个firsttouch数据（第一个触摸的目标）
	- 要用created()创建touch对象
	- 为什么不用data?因为vue中的data会有一个getter和setter去观测数据变化，而此时并不需要监听