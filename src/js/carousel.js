//模块化
(function (window,document) {
	var Carousel = function(wrap, tab) {
		this.wrap = wrap;//放img的容器
		this.num = this.wrap.children().size();
		this.width = this.wrap.children().width();
        this.clone = this.wrap.children().first().clone();
		this.tab = tab;
		this.index = 0;
		this.time = 3000;
		this.init();
	};
	Carousel.prototype = {
		init: function() {
			console.log(this.wrap[0].innerHTML);
            this.create();
			this.btnTab();
			this.autoPlay();
		},
        create: function() {
            this.wrap.append(this.clone);//以便实现无缝过渡
        },
		prev: function() {
			this.index--;
			if(this.index < 0) {
				this.index = this.num - 1;//最后一张
			}
			this.wrap.stop().animate({'left': -this.width*(this.index)}, 400);
			this.tab.children().eq(this.index).addClass('on')
					.siblings()
					.removeClass('on');
		},
		next: function() {
			this.index++;
			if(this.index > this.num) {
				this.index = 0;
				this.wrap.css('left', 0);//最后一张到第一张无动画过渡
			} else if(this.index === this.num) {
                this.tab.children().eq(0).addClass('on')
                        .siblings()
                        .removeClass('on');
                        this.wrap.stop().animate({'left': -this.width*(this.index)}, 400);
            } else {
                this.wrap.stop().animate({'left': -this.width*(this.index)}, 400);
                this.tab.children().eq(this.index).addClass('on')
                        .siblings()
                        .removeClass('on');
            }
		},
		//绑定事件到每个tab上
		btnTab: function() {
			var that = this;
			this.tab.children().each(function(i, item) {
				$(this).on('click', function() {
					$(this).addClass('on').siblings().removeClass('on');
					console.log(i);
					that.wrap.stop().animate({'left': -i* (that.width)});
				})
			})
		},
		autoPlay: function() {
			var that = this;
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				that.next();
			}, that.time);
		},
		mouseOver: function() {}
	}
	window.Carousel = Carousel;//将api赋给插件名
})(window, document);
/*//轮播图组件
;(function($, window, document, undefined){

    //定义一个构造函数对象 Seesee 
    var Seesee = function(ele,opt){

        this.$ele = $(ele); //ID定义

        //基本DOM选择器配置
        this.CONFIG = {
            'titleNav': this.$ele.find(".title-nav li"), //标题显示
            'sliderPrev': this.$ele.find(".slider-prev"), //左箭头
            'slidernext': this.$ele.find(".slider-next"), ////右箭头
            'icoNav': this.$ele.find(".slider-nav li"), //图标导航
            'numNav': this.$ele.find(".num-nav b"), //数字显示
            'sliderMain': this.$ele.find(".slider-main"), //图片列表
            'index': 0 //当前索引号
        };

        //定义用户可更改的默认值
        this.defaults = {
            'width': 395, //视口或图片宽度
            'speed': 10, //速度
            'imgNum': 4 //图片数量
        };

        //定义并接受合成设置的值
        this.settings = $.extend({}, this.defaults, opt);

    };

    //Seesee 的方法
    Seesee.prototype = {
        initialize: function(){
            var _this = this;

            //默认开始播放 （改变index）
            this.play();

            //下一个按钮点击事件 （改变index）
            this.CONFIG.slidernext.click(function(){
                _this.getIndex()();
                _this.slidernextBtn(_this.CONFIG.index);
                _this.byIndex(_this.CONFIG.index);
            });

            //上一个按钮点击事件 （改变index）
            this.CONFIG.sliderPrev.click(function(){
                _this.getIndexMin()();
                _this.byIndex(_this.CONFIG.index);
                _this.sliderPrevBtn(_this.CONFIG.index);
            });

            //图标导航，点击事件
            this.CONFIG.icoNav.click(function(){
                _this.byIndexInto(_this.CONFIG.index, $(this).attr("data-src"));
            });

            //定义鼠标移入移出停止开始播放
            this.$ele.hover(
                function(){
                    _this.stop();
                },function(){
                    _this.play();
                }
            );

            //debugger

        },
        byIndex: function(index){

            this.titleNav(this.CONFIG.titleNav, index);
            this.icoNav(this.CONFIG.icoNav, index);
            this.numNav(this.CONFIG.numNav, index);
        },
        getIndex: function(){
            //索引号获取控制
            var _this = this;
            var currentIndex = function(){
                if(_this.CONFIG.index < (_this.settings.imgNum - 1)){
                    ++_this.CONFIG.index;
                }else{
                    _this.CONFIG.index = 0;
                }

                return _this.CONFIG.index;
            };

            return currentIndex;

        },
        getIndexMin: function(){
            //索引号获取控制,索引号递减
            var _this = this;
            var currentIndex = function(){
                if(_this.CONFIG.index > 0){
                    --_this.CONFIG.index;
                }else{
                    _this.CONFIG.index = (_this.settings.imgNum - 1);
                }

                return _this.CONFIG.index;
            };

            return currentIndex;

        },
        play: function(){
            //自动播放

            var _this = this;

            timer = setInterval(function(){

                _this.getIndex()(); //动态生成当前索引号的index的值

                //当前索引号传入以下方法执行多个显示效果
                _this.byIndex(_this.CONFIG.index);
                _this.slidernextBtn(_this.CONFIG.index);

            }, 2000);

        },
        stop: function(){
            //停止自动播放
            clearInterval(timer);
        },
        showOne: function(obj, index){
            //显示一个其他元素都隐藏不显示

            //让所有指定选择符元素群组的各个元素都隐藏
            for(var i=0; i<this.settings.imgNum; i++){
                $(obj[i]).removeClass("slider-selected");
            }

            //指定当前索引index的元素显示
            $(obj[index]).addClass("slider-selected");


        },
        sport: function(setw){
            //设置运动过渡效果

            this.CONFIG.sliderMain.animate({left: setw}, "slow");

        },
        sliderPrevBtn: function(index){
            //上一个按钮操作

            var setw = -(index * this.settings.width) + "px";

            //执行运动方法
            this.sport(setw);

        },
        slidernextBtn: function(index){
            //下一个按钮操作


            var setw = -(index * this.settings.width) + "px";

            //执行运动方法
            this.sport(setw);

        },
        titleNav: function(obj, index){
            this.showOne(obj, index); //显示当前图标
        },
        icoNav: function(obj, index){
            this.showOne(obj, index);
        },
        numNav: function(obj, index){
            this.showOne(obj, index);
        },
        byIndexInto: function(index, clickIndex){
            //参数说明： index 当前索引号，clickIndex 点击对象的索引号

            if(clickIndex > index){
                this.slidernextBtn(clickIndex);
                this.byIndex(clickIndex);
            }else{
                this.sliderPrevBtn(clickIndex);
                this.byIndex(clickIndex);
            }
        }

    };

    //定义一个插件并命名
    $.fn.playsee = function(option){
        var seesee = new Seesee(this, option);
        return seesee.initialize();
    }

})(jQuery, window, document);*/