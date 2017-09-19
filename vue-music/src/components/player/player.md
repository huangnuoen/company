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
7 进度条组件pro
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

