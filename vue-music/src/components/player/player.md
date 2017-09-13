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
		- 用vue的动画钩子
		- 使用create-keyframe-animation库