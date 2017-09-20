### player.vue 播放器组件
actions--mutations--state--getter

1. 注册在app.vue中
2. 从state中getters'fullscreen'和'playlist',控制播放器的显示
3. 当song-list.vue中的li被click时
	- 提交mutations: 设置playlist中，设置currentIndex,播放器全屏显示，设置播放状态
	- 多次提交mutations可以配置actions
	- 派发select事件到父组件music-list.vue，
4. 当song-list.vue中的li被click时
	- 派发select到父组件，并传入item,index，调用了父的selcetItem()
	- 父组件music-list使用mapActions引入selectPlay,并传入list和index后调用
		- list: this.songs整个列表而不是item当前歌曲
5. 播放器开收动画

	5.1 normal-player和mini-player的切换动画
		- 用css可实现
	5.2 小球飞入动画
		- 用vue的动画钩子，cdWrapper从mini唱片移动到cdWrapper位置并放大
		- 使用create-keyframe-animation库
		- 获取mini唱片位置，normal唱片位置
		- 定义动画各位时间段，使用create-keyframe-animation库设置注册动画
		- enter() 定义唱片0%，60%，100%的状态；注册动画move;运行move,结束后调用done
		- afterenter()  注销move动画；清空cdwrapper上的动画
		- leave() 因无须先缩后放效果，直接定义cdwrapper.style.transition和transform；在transitionend触发后执行done
		- afterleave()  清空cdwrapper.style.transition和transform
6. 播放音乐

	6.1 <audio>元素，监听currentSong,启动play()
	6.2 vuex获取state.playing_state和mutation
	6.3 修改了playing_state并监听，根据此来调用play()&pause()
	6.4 修改按钮样式
		- 按钮切换，通过计算和绑定类名
		- 唱片旋转控制，通过计算，绑定类名
	6.5 上下曲切换
7 进度条组件progress-bar.vue

	7.1 进度条变化 
		- props获取父的percent 歌曲进度
		- 监听percent，设定progress的width，设置偏移距离
	7.2 进度条拖动
		- touchstart() 初始化this.touch对象，存储touch位置和现偏移
		- touchmove() 计算移动距离，据此计算偏移距离，并修改样式
		- touchend() 设置进度,计算百分比派发到父，传入百分比，在父中用this.$refs.audio.currentTime设置跳转
	7.3 进度条点击跳转
		- click后，获取点击位置相对目标的位移
		- 派发到父
8 圆形进度条 progress-circle.vue

	8.1 原理：通过<svg>的2个circle实现，内置<slot>可包裹任何dom,
	8.2 用svg元素，内置2个circle元素
		- svg.viewBox=0 0 100 100:视口大小，从(0,0)到(100,100)范围；svg.width和height=32：图形真正的宽度和高度，可通过这个控制图形大小
		- circle.r=50:半径，cx=50,cy=50:圆心在(50,50);stroke-width=8:描边宽度为8；stroke-dasharray=100:画100px的虚线；stroke-dashoffset=100:虚线起始向前偏移量;scale(.9):缩小成圆
		- 实现：当percent变大时，offset变小，array慢慢出现

