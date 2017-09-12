### player.vue 播放器组件
1. 注册在app.vue中
2. 从state中getters'fullscreen'和'playlist'
3. 当song-list.vue中的li被click时
	- 提交mutations: 设置playlist中，设置currentIndex,播放器全屏显示，设置播放状态
	- 多次提交mutations可以配置actions
	- 派发select事件到父组件music-list.vue，
4. 当song-list.vue中的li被click时
	- 派发select到父组件，并传入item,index，调用了父的selcetItem()
	- 父组件music-list使用mapActions引入selectPlay,并调用