### 推荐组件
1. 引入子组件slider.vue
2. 在<slider>里写dom

### 轮播图组件 slider.vue

#### 功能：自动轮播
 可由外部设置轮播是否循环，播放间隔，是否自动播放
#### <slot></slot> 可在该处插入父组件的dom
	- 需要用到父组件的数据，可直接在父组件中书写，也方便slider.vue的抽象化和复用

#### 思路
	1. 在$el挂载后调用mounted方法，用setTimeout()保证方法在dom渲染后再调用
	2. setTimeout()依次调用this._setSliderWidth()设置轮播图宽度,this._initDots生成圆点,this._initSlider()初始化组件
	3. _setSliderWidth()，this._initDots,_initSlider()都在methods中定义
5. this._setSliderWidth()
5.1 获得该组轮播的图片数组
5.2 获得轮播图视口宽度
5.3 遍历图片数组，设置类名，设置图片宽度=视品宽度
6. this._initDots()
6.1 
7. this._setSliderWidth()

### 公用js
1. dom.js 所有对dom的操作方法
1.1 类名操作