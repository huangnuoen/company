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
7. 进度条组件progress-bar.vue

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

8. 圆形进度条 progress-circle.vue

	8.1 原理：通过<svg>的2个circle实现，内置<slot>可包裹任何dom,

	8.2 用svg元素，内置2个circle元素
	- svg.viewBox=0 0 100 100:视口大小，从(0,0)到(100,100)范围；svg.width和height=32：图形真正的宽度和高度，可通过这个控制图形大小
	- circle.r=50:半径，cx=50,cy=50:圆心在(50,50);stroke-width=8:描边宽度为8；stroke-dasharray=100:画100px的虚线；stroke-dashoffset=100:虚线起始向前偏移量;scale(.9):缩小成圆
	- 实现：当percent变大时，offset变小，array慢慢出现

9. 播放模式切换
	9.1 点击后改变mode,通过vuex提交到state,绑定类名修改样式
	9.2 修改播放列表
	- vuex:设置playlist,currentIndex
	- 随机播放时
		- 更新了playlist,而currentIndex不变，会立即切换播放当前index的歌曲;
		- 所以需要在修改playlist前更新currentIndex，即当前歌曲在新列表的位置,因为playlist一更新，currentsong会跟着更新
		- 采用findIndex()找到当前歌曲索引
		- 为什么进度能保持？可能因为audio的src没有来得及改变吧

10. music-list.vue的随机播放按钮功能

	10.1 点击按钮后
	- 通过vuex的actions创建一系列mutations:修改播放模式，原始列表，生成随机列表，当前索引为0，全屏，播放状态
	- 点击按钮后，再点击music-list中的歌曲时，会调用selectPlay,此时playlist为顺序列表，故而要增加判断
		- 若在随机模式下，重新洗牌，修改playlist
		- 将计算点击歌曲的在新列表的索引，更新currenIndex
11. 歌词处理

	11.1 调用song.getLyric(),返回resolve(this.lyric)的Promise对象，通过then()回调处理歌词

	11.2 使用lyric-parser库处理歌词
	- new Lyric(lyric, this.handleLyric),传入lyric和回调函数（每句歌词改变时就会回调一次），返回处理好的歌词对象，包括lines等信息
	- 处于播放状态时，开启歌词播放
	- this.handleLyric({lineNum, txt}),歌词处理函数要传入lines对象，此处用解构赋值
		- 将lineNum当前行数赋值给this.currentLineNum
		- 在<p>中，当this.currentLineNum===index时，绑定active类高亮当前行

	11.3 唱片歌词左右滑动切换
	- 添加this.currentShow标识当前显示
	- created中，this.touch存储触摸点的信息
	- middleTouchStart()
		- 触摸开启...initiated
		- ...startX = ...pageX 横距
		- ...startY = ...pageY 纵距
	- middleTouchMove()
		- deltaX 位移
		- deltaY 位移，当纵向位移大于横向位移，则左右不移动，判断为歌词纵向滚动
		- left middle-r最终位置(2种情况)
		- offsetWidth middle-r偏移量计算是当前位置+手指位移,且在[-window.innerwidth,0]间
		- ...percent 存储偏移量和屏宽比值，即偏移比例
		- 设置middle-r的style.transform
	- middleTouchEnd()
		- 当前是cd页面时
			- 偏移比例大于10%时，直接到达最终位置，更新this.currentShow
		- lyric页面时
		 - 右滑比例大于0.1，即middle-r占屏宽小于90%时，直接到达最终位置，更新this.currentShow