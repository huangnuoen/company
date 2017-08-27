### 推荐组件
1. 引入子组件slider.vue
2. 在<slider>里写dom

### 轮播图组件 slider.vue
1. 功能：自动轮播，
2. 可由外部设置轮播是否循环，播放间隔，是否自动播放
3. <slot></slot> 可在该处插入父组件的dom
	- 需要用到父组件的数据，可直接在父组件中书写，也方便slider.vue的抽象化和复用
4. 思路
4.1 在$el挂载后调用mounted方法，用setTimeout()保证方法在dom渲染后再调用
4.2 setTimeout()依次调用this._setSliderWidth()设置轮播图宽度,this._initSlider()初始化组件
4.3 _setSliderWidth(),_initSlider()都在methods中定义