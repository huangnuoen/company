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
	- 思路：实时知道滚动位置，根据位置计算区间和对应索引
	- protoType派发实时滚动
	- this.currentIndex记录右栏当前位置，this.scrollY记录左侧滚动的位置
		- watch中监听data，在data渲染完成后执行_calculateHeight(),计算每个list-group的高度
			- this.listHeight存储所有list-group的高度
		- watch中监听scrollY,传入新位置，判断所在区间，给this.currentIndex赋值
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
7. 实现fix-title
	- 思路：新定义<div>定位在顶部，内容为当前索引的title,**由computed实时计算所得**
	- 实现下一个title与fixed-title接触时有一个向上顶的动画
		- watch监听下一个title与fixed-title的差值diff(diff在scrollY变化时计算)
		- 当diff小于title高度时，可用style.transform去改变dom样式
		- 为了不在fixedTop为0时重复渲染dom,要进行一个判断
		```
    if (this.fixedTop === fixedTop) {
      return
    }
		```
8. touchstart和touchmove事件调用的方法要共享一个firsttouch数据（第一个触摸的目标）
	- 要用created()创建touch对象
	- 为什么不用data?因为vue中的data会有一个getter和setter去观测数据变化，而此时并不需要监听