/* 轮播组件
*  @wrap   容器
*  @tab    圆点控件
*  @page   初始版面，每版呈现的图片
*  @rePage 页面宽度变化后的版面
*  @time   切换间隔时间
*/
(function (window,document) {
    var Carousel = function(wrap, tab, page1, page2, time) {
        this.wrap = wrap;//放img的容器
        this.num = this.wrap.children().size();
        this.tab = tab;
        this.index = 0;
        this.time = time || 2000;//每张图片停留时间
        this.page = page1;//当前每版呈现的数量
        this.rePage = page2;//页面变化后版面值
        this.init();
    };
    Carousel.prototype = {
        init: function() {
            this.getWidth();
            this.create();
            if(this.tab) {
                this.btnTab();
            }
            this.autoPlay();
            this.mouseOver();
        },
        getWidth: function() {
            this.width = this.wrap.children().width();
            return this.width;
        },
        create: function() {
            //以便实现无缝过渡
            for(var i = 0; i < this.page; i++) {
                this.wrap.append(this.wrap.children().eq(i).clone());
            }
        },
        //删除clone节点，交换版面值
        remove: function() {
            for(var i = 0; i < this.page; i++) {
                this.wrap.children().last().remove();
            }
            if(this.rePage) {
                //交换值
                var a = this.page;
                this.page = this.rePage;
                this.rePage = a;
            }
        },
        prev: function() {
            this.index--;
            if(this.index < 0) {
                this.index = this.num - 1;//最后一张
            }
            this.wrap.stop().animate({'left': -this.width * (this.index)}, 400);
            this.tab.children().eq(this.index).addClass('on')
                    .siblings()
                    .removeClass('on');
        },
        next: function() {
            this.index++;
            if(this.index > this.num) {
                this.index = 0;
                this.wrap.stop().css('left', 0);//最后一张到第一张无动画过渡
            } else if(this.index === this.num) {
                if(this.tab) {
                    this.tab.children().eq(0).addClass('on')
                            .siblings()
                            .removeClass('on');
                }
                this.wrap.stop().animate({'left': -this.width * (this.index)}, 400);
            } else {
                this.wrap.stop().animate({'left': -this.width*(this.index)}, 400);
                if(this.tab){
                    this.tab.children().eq(this.index).addClass('on')
                            .siblings()
                            .removeClass('on');                    
                }
            }
        },
        //绑定事件到每个tab上
        btnTab: function() {
            var that = this;
            this.tab.children().each(function(i, item) {
                $(this).on('click', function() {
                    clearInterval(that.timer);//避免点击后继续执行队列中的next()
                    $(this).addClass('on').siblings().removeClass('on');
                    if(i === 0 && that.index === 3) {
                        that.wrap.stop().css('left', 0);//播放到clone的最后一张时，点击第一个li，立即将left设为0,无过渡
                    }
                    that.index = i;
                    that.wrap.stop().animate({'left': -i * (that.width)}, 400);
                    that.autoPlay();//再次调用自动播放
                })
            })
        },
        autoPlay: function() {
            var that = this;
            clearInterval(this.timer);//每次执行next()前先清空队列
            this.timer = setInterval(function(){
                console.log(that.index);
                that.next();
            }, that.time);
        },
        mouseOver: function() {
            var that = this;
            this.wrap.parent().on('mouseout', function(){
                that.autoPlay();
            }).on('mouseover', function(){
                clearInterval(that.timer)
            });

            /*this.wrap.parent().hover(function(){
                clearInterval(that.timer);
            }, function(){
                that.autoPlay();
            });*/
            
        }
    }
    window.Carousel = Carousel;//将api赋给插件名
})(window, document);
