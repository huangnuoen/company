## 轮播图组件 slider.vue

#### 功能：自动轮播
 可由外部设置轮播是否循环，播放间隔，是否自动播放
#### <slot></slot> 可在该处插入父组件的dom
	- 需要用到父组件的数据，可直接在父组件中书写，也方便slider.vue的抽象化和复用

#### 思路
1. 在$el挂载后调用mounted方法，用setTimeout()保证方法在dom渲染后再调用，并监听window.onresize事件
2. setTimeout()依次调用this._setSliderWidth()设置轮播图宽度,this._initDots生成圆点,this._initSlider()初始化组件
	-  _setSliderWidth()，_initDots,_initSlider()都在methods中定义

#### this._setSliderWidth()
1. 获得该组轮播的图片数组
2. 获得轮播图视口宽度
3. 遍历图片数组，设置类名，设置图片宽度=视品宽度
4. 首次设置宽度且循环为true的，要再加2个slider的宽度

#### this._initDots()
1. 生成相应数量的圆点
2. 切换图片时改变圆点样式

#### this._initSlider()

