/**
 * Created by qkchung on 2017/8/30.
 */
window.onload = function () {
    var router = {};
    var runText = null;
    var lang = null;
    var textsObj = {};
    var cn = {
        page0:{
            mainTitle: '场景',
            subtitle1: '场景功能演示',
            subtitle2: '创建支持同时控制多个设备的快捷按钮。'
        },
        page1:{
            msg1:'请输入场景名称',
            msg2: '请为您的场景命名',
            msg3: '请为您的场景设置图标',
            topTitle: '场景'
        },
        page2:{
            msg1:'请选择图标',
            msg2: '请为您的场景命名',
            msg3: '请为您的场景设置图标',
            topTitle: '场景'
        },
        page3:{
            msg1:'添加智能设备',
            topTitle: 'Reading Time'
        },
        page4:{
            msg1:'设置智能设备进入此场景期望的状态',
            topTitle: 'Reading Time'
        },
        page5:{
            msg1:'添加第二个智能设备',
            topTitle: 'Reading Time'
        },
        page6:{
            msg1:'添加更多智能设备',
            topTitle: 'Reading Time'
        },
        page7:{
            msg1:'完成设置，保存后退出。',
            topTitle: 'Reading Time'
        },
        page8:{
            msg1:'场景管理',
            topTitle: '场景'
        },
        page9:{
            msg1:'选择是否创建桌面快捷方式',
            topTitle: '场景'
        },
        page10:{
            msg1:'修改场景名称或删除场景',
            topTitle: '场景'
        },
        test:'测试',
        revert:'重新设置',
        desktop: '桌面快捷方式',

    };
    var en = {
        page0:{
            mainTitle: 'Scenes',
            subtitle1: 'Meet Scenes',
            subtitle2: 'Create shortcut buttons for setting lots of devices.'
        },
        page1:{
            msg1:'Click to name your Scene',
            msg2: 'Give your Scene a name',
            msg3: 'Pick an icon',
            topTitle: 'Scenes'
        },
        page2:{
            msg1:'Choose an icon',
            msg2: 'Give your Scene a name',
            msg3: 'Pick an icon',
            topTitle: 'Scenes'
        },
        page3:{
            msg1:'Add devices to your Scene',
            topTitle: 'Reading Time'
        },
        page4:{
            msg1:'Set your device',
            topTitle: 'Reading Time'
        },
        page5:{
            msg1:'Add more devices',
            topTitle: 'Reading Time'
        },
        page6:{
            msg1:'Add more devices',
            topTitle: 'Reading Time'
        },
        page7:{
            msg1:'Save and exit',
            topTitle: 'Reading Time'
        },
        page8:{
            msg1:'Manage from the Scenes page',
            topTitle: 'Scenes'
        },
        page9:{
            msg1:'Show or hide on Control Page',
            topTitle: 'Scenes'
        },
        page10:{
            msg1:'Edit mode for renaming or deleting',
            topTitle: 'Scenes'
        },
        test:'test',
        revert:'reset',
        desktop: 'Desktop',
    };
    tutorialCommon.importCommonHtml();
    function startRouter() {
    		setTimeout(function () {
	        var rout = new Vue({
	            router: router,
	            template:'#Rout',
	            mounted:function(){
	                router.push('page0');
	            },
	            created: function () {
	            },
	            data:{
	
	            },
	            methods:{
	
	            }
	        }).$mount('#start');
	    },10);
    }
     // getLangObj();
	function getLangObj(){
        cordova.exec(function (data) {
            console.log("getLanguage:"+JSON.stringify(data));
            var parsedData = JSON.parse(data);
            lang = parsedData['value'];
            setTimeout(function () {
                syncLanguage(lang);
                loadComponent(router,lang);
			    startRouter();
            },10);
        }, null, "FTP2PApi", "getLanguage", ['']);
    }
    syncLanguage('en');
    function syncLanguage(lang) {
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            var textsOBJ = setAllTextLanguage(scriptOBJ.which);
            textsObj = textsOBJ.scene;
        });
        // if(lang === 'en') {
        // 	textsObj = en;
        // } else if (lang ==='zh_CN') {
        // 	textsObj = cn;
        // } else {
        // 	textsObj = en;
        // }
    }

    // page3-page7 is page5
    Vue.component('page0', {
        name:'page0',
        template: '#page0',
        data: function () {
            return {
                pageData:{
                    home:{
                    tutorialTitle: textsObj.page0.mainTitle,
                    tutorialTitle1: textsObj.page0.subtitle1,
		                tutorialTitle2: textsObj.page0.subtitle2,
		                lastPage: 'page11'
                    }
                },
                currentPage: 'page0'
            }
        },
        mounted:function(){
            // console.log(textsOBJ);
            $('.mainHolder').addClass('changeBg');
        }
    });
    Vue.component('page1', {
        name:'page1',
        template: '#page1',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page2.png',
                        currentParams: 'page1',
                        pageNumber: '1'
                    },
                    type:{
                        textField:''
                    },
                    pagination:{
	                    	back:'page0',
	                    	currentPage:'1',
	                    	totalPage: '11',
                    },
                    prompt:{
                        msg: textsObj.page1.msg1,
                        style: {
                            top: '36.2%',
                            left: '36.3%',
                            width: '250px'
                        },
                        textStyle: {}
                    },
                    top: {
                        topTitle: textsObj.page1.topTitle
                    },
                    mainText: {
                        text1: textsObj.page1.msg2,
                        text2: textsObj.page1.msg3,
                    }
                },
                style: {},
                textContent: '',
                m1: "Click to name your Scene"
            }
        },
        mounted:function(){
	        	var duration = 1.7;
	        	runText = null;
	        	TweenMax.fromTo('.pagination', 0.5,
	                {top:'150%',opacity:'0'},
	                {top:'85%', opacity:'1'}
           	);
			// tutorialCommon.blackBoxAnimation('4%','1%','1%','-1%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
                var index = 0;
                var textContent = 'Reading Time';
                var length = textContent.length;
                var el = $('.mainText');
                var line = $('.textLine');
                var time = false;
                $('.jumpingCircle').fadeOut(200);
                if(runText !== null) {
                		return 1;
                } else {
            	 	TweenLite.to(line, 1.8, {attr:{x1:'577', x2:"577"}});
	                runText = setInterval(function() {
                        el.append(textContent.charAt(index));
                        if(index++ === length) {
                            clearInterval(runText);
                            index = 0;
                            setTimeout(function(){
                                router.push('page2');
                            },400)
                        }
                    },100);
                }  
            }
        }
    });
    Vue.component('page2', {
        name:'page2',
        template: '#page2',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page3.png',
                        back:'page1',
                        currentParams: 'page2',
                        pageNumber: '2'
                    },
                    pagination:{
	                    	back:'page1',
	                    	currentPage:'2',
	                    	totalPage: '11',
                    },
                    prompt:{
                        msg: textsObj.page2.msg1,
                        style: {
                            top: '69.2%',
                            left: '47.3%',
                            width: '230px'
                        },
                        textStyle: {
                        }
                    },
                    top: {
                        topTitle: textsObj.page2.topTitle
                    },
                    mainText: {
                        text1: textsObj.page1.msg2,
                        text2: textsObj.page1.msg3,
                    }

                },
                dialogContent: 'Choose an icon',
                iconColor: {
                    stroke: '#B4B3B3'
                }
            }
        },
        mounted:function(){
			// tutorialCommon.blackBoxAnimation('-1%','-4%','-4%','-6%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
              this.iconColor.stroke = '#E66C25';
                var self = this;
                $('.jumpingCircle').fadeOut(200);
                setTimeout(function(){
                    router.push('page5');
                },200);
            }
        }
    });
    Vue.component('page3', {
        name:'page3',
        template: '#page3',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page4.png',
                        back:'page2',
                        currentParams: 'page3',
                        pageNumber: '3'
                    },
                    pagination:{
                        // back:'page2',
                        currentPage:'3',
                        totalPage: '11',
                    },
                    prompt:{
                        msg: textsObj.page3.msg1,
                        style: {
                            top: '41.9%',
                            left: '0.1%',
                            width: '260px'
                        },
                        textStyle: {
                        }
                    },
                    top: {
                        topTitle: textsObj.page3.topTitle,
                        test: textsObj.test,
                        revert: textsObj.revert
                    },
                    follow: textsObj.follow,
                },
                m1: 'Add devices to your Scene',
                lampTitle: 'Lamp',
                hasBtn: 1
            }
        },
        mounted:function(){
			    // tutorialCommon.blackBoxAnimation('3%','0%','0%','-2%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
        			TweenLite.to('#scenesLamp', 0.3, {css:{top:'23%', opacity:"1"}});
        			$('.jumpingCircle').fadeOut(200);
            		setTimeout(function(){
            			router.push('page4');
            		},400)
            }
        }
    });
    Vue.component('page4', {
        name:'page4',
        template: '#page4',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page6.png',
                        back:'page3',
                        currentParams: 'page4',
                        pageNumber: '4'
                    },
                    pagination:{
                        back:'page3',
                        currentPage:'4',
                        totalPage: '11',
                    },
                    prompt:{
                        msg: textsObj.page4.msg1,
                        style: {
                            top: '48%',
                            left: '46.5%',
                            width: '240px'
                        },
                        textStyle: {}
                    },
                    top: {
                        topTitle: textsObj.page4.topTitle,
                        test: textsObj.test,
                        revert: textsObj.revert
                    },
                    follow: textsObj.follow,
                    room1: textsObj.room1,
                    room2: textsObj.room2,
                    device2: textsObj.device2,
                    device4: textsObj.device4,
                    rout: textsObj.rout,
                    presets: textsObj.presets,
                    myColor: textsObj.myColor,
                },
                m1: 'Set your device',
                lampTitle: 'Lamp',
                barColors: [
                    {command: 'coolWhite', styleOBJ: {'background-color':'#CAE9FB'}},
                    {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE',border:'solid 1px #C7C8C8'}},
                    {command: 'warmWhite', styleOBJ: {'background-color':'#FFDCA6'}},
                    {command: '78FF00', styleOBJ: {'background-color':'#80FF00'}},
                    {command: '003000', styleOBJ: {'background-color':'#00CC00'}},
                    {command: '008080', styleOBJ: {'background-color':'#00FFFF'}},
                    {command: 'FFC700', styleOBJ: {'background-color':'#FFFF00'}},
                    {command: '000040', styleOBJ: {'background-color':'#0000FF'}},
                    {command: 'FF3800', styleOBJ: {'background-color':'#FF8000'}},
                    {command: '270010', styleOBJ: {'background-color':'#FF007F'}},
                    {command: 'FF0000', styleOBJ: {'background-color':'#FF0000'}},
                    {command: '080010', styleOBJ: {'background-color':'#7F00FF'}}
                ],
                saveColors: [
                    {command: '003000', styleOBJ: {'background-color': '#00CC00'}},
                    {command: 'FFC700', styleOBJ: {'background-color': '#FFFF00'  }},
                    {command: '270010', styleOBJ: {'background-color':'#FF007F' }},
                    {command: '080010', styleOBJ: {'background-color':'#7F00FF'}},
                    {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE'}}
                ]
            }
        },
        mounted:function(){
			// tutorialCommon.blackBoxAnimation('0%','-2%','-2%','-4%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
			// tutorialCommon.scrollToTop('300', '0');
        },
        methods:{
            go:function() {
                var brightnessPointer = $('.brightnessPointer');
                $('.jumpingCircle').fadeOut(200);
                TweenLite.to(brightnessPointer, 1, {attr:{cx:'773',ease:Linear.easeNone}});
                setTimeout(function(){
                    router.push('page5');
                },1200)
            }
        }
    });
    Vue.component('page5', {
        name:'page5',
        template: '#page5',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page6.png',
                        back:'page4',
                        currentParams: 'page5',
                        pageNumber: '5'
                    },
                    pagination3:{
                        back:'page2',
                        currentPage:'3',
                        totalPage: '11',
                    },
                    pagination4:{
                        // back:'page3',
                        currentPage:'4',
                        totalPage: '11',
                    },
                    pagination5:{
                        // back:'page4',
                        currentPage:'5',
                        totalPage: '11',
                    },
                    pagination6:{
                        // backTo: ,
                        currentPage:'6',
                        totalPage: '11',
                    },
                    pagination7:{
                        // backTo:'page4',
                        currentPage:'7',
                        totalPage: '11',
                    },
                    prompt3:{
                        msg: textsObj.page3.msg1,
                        style: {
                            top: '41.9%',
                            left: '0.1%',
                            width: '260px'
                        },
                        textStyle: {
                        }
                    },
                    prompt4:{
                        msg: textsObj.page4.msg1,
                        style: {
                            top: '48%',
                            left: '46.5%',
                            width: '240px'
                        },
                        textStyle: {}
                    },
                    prompt5:{
                        msg: textsObj.page5.msg1,
                        style: {
                            top: '45%',
                            left: '3%',
                            width: '240px'
                        },
                        textStyle: {}
                    },
                    prompt6: {
                        msg: textsObj.page6.msg1,
                        style: {
                            top: '54.5%',
                            left: '3.1%',
                            width: '240px'
                        }
                    },
                    prompt7: {
                        msg: textsObj.page7.msg1,
                        style: {
                            top: '14.5%',
                            left: '3.8%',
                            width: '180px'
                        }
                    },
                    top: {
                        topTitle: textsObj.page5.topTitle,
                        test: textsObj.test,
                        revert: textsObj.revert
                    },
                    follow: textsObj.follow,
                    room1: textsObj.room1,
                    room2: textsObj.room2,
                    device2: textsObj.device2,
                    device4: textsObj.device4,
                    rout: textsObj.rout,
                    presets: textsObj.presets,
                    myColor: textsObj.myColor,
                    on: textsObj.on,
                    off: textsObj.off,
                },
                dialogContent: 'Add more devices',
                barColors: [{command: 'coolWhite', styleOBJ: {'background-color':'#CAE9FB'}},
                {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE',border:'solid 1px #C7C8C8'}},
                {command: 'warmWhite', styleOBJ: {'background-color':'#FFDCA6'}},
                {command: '78FF00', styleOBJ: {'background-color':'#80FF00'}},
                {command: '003000', styleOBJ: {'background-color':'#00CC00'}},
                {command: '008080', styleOBJ: {'background-color':'#00FFFF'}},
                {command: 'FFC700', styleOBJ: {'background-color':'#FFFF00'}},
                {command: '000040', styleOBJ: {'background-color':'#0000FF'}},
                {command: 'FF3800', styleOBJ: {'background-color':'#FF8000'}},
                {command: '270010', styleOBJ: {'background-color':'#FF007F'}},
                {command: 'FF0000', styleOBJ: {'background-color':'#FF0000'}},
                {command: '080010', styleOBJ: {'background-color':'#7F00FF'}}],
                saveColors: [
                {command: '003000', styleOBJ: {'background-color': '#00CC00'}},
                {command: 'FFC700', styleOBJ: {'background-color': '#FFFF00'  }},
                {command: '270010', styleOBJ: {'background-color':'#FF007F' }},
                {command: '080010', styleOBJ: {'background-color':'#7F00FF'}},
                {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE'}}
              ],
                p3: true,
                p4: false,
                p5: false,
                p6: false,
                p7: false
            }
        },
        mounted:function(){
			// tutorialCommon.blackBoxAnimation('-6%','2%','2%','4%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
            tutorialCommon.scrollToTop('400', '400');
        },
        methods:{
            goP4: function () {
                this.p4 = true;
                this.p3 = false;
                tutorialCommon.scrollToTop('400', '0');
            },
            goP5: function () {
                this.p4 = false;
                this.p5 = true;
                var brightnessPointer = $('.brightnessPointer');
                // $('.jumpingCircle').fadeOut(200);
                TweenLite.to(brightnessPointer, 0.45, {attr:{cx:'773',ease:Linear.easeNone}});
            },
            goP6:function() {
                tutorialCommon.scrollToTop('0', '-170');
                this.p5 = false;
                this.p6 = true;
                // var merged = $("#scenesMerged");
                // $('.jumpingCircle').fadeOut(200);
                // TweenLite.to(merged, 0.5, {css:{top:'-55%'}});
                // setTimeout(function(){
                //     router.push('page6');
                // },800)
            },
            goP7: function () {
                tutorialCommon.scrollToTop('-170', '-300');
                this.p6 = false;
                this.p7 = true;
                if(lang === 'zh_CN') {
                    $('.promptText').css('padding-left','10px');
                } else {
                    $('.promptText').css('padding-left','0px');
                }
                $('.promptBoxUp').addClass('promptBoxLeft');

            },
            goP8: function () {
                $('.jumpingCircle').fadeOut(200);
                    router.push('page8');
            },
            backP3: function () {
                this.p3 = true;
                this.p4 = false;
                // tutorialCommon.blackBoxAnimation('3%','0%','0%','-2%');
                tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
                tutorialCommon.scrollToTop('0', '400');
            },
            backP4: function () {
                this.p4 = true;
                this.p5 = false;
                var brightnessPointer = $('.brightnessPointer');
                // $('.jumpingCircle').fadeOut(200);
                // tutorialCommon.blackBoxAnimation('0%','-2%','-2%','-4%');
                tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
                TweenLite.set(brightnessPointer, {attr:{cx:'482'}});
            },
            backP5: function () {
                this.p5 = true;
                this.p6 = false;
                // tutorialCommon.blackBoxAnimation('-6%','2%','2%','4%');
                tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
                tutorialCommon.scrollToTop('-170', '0');
            },
            backP6: function () {
                this.p6 = true;
                this.p7 = false;
                // tutorialCommon.blackBoxAnimation('-5%','3%','3%','5%');
                tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
                tutorialCommon.scrollToTop('-300', '-170');
            }
        }
    });
    Vue.component('page6', {
        name:'page6',
        template: '#page6',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page6.png',
                        back:'page5',
                        currentParams: 'page6',
                        pageNumber: '6'
                    },
                    pagination:{
	                    	back:'page5',
	                    	currentPage:'6',
	                    	totalPage: '11',
                    },
                    prompt:{
	            			msg: textsObj.page6.msg1,
	            			style: {
	            				top: '54.5%',
	            				left: '3.1%',
	            				width: '240px'
	            			},
		        			textStyle: {
		        			}
            			},
                    top: {
                        topTitle: textsObj.page5.topTitle,
                        test: textsObj.test,
                        revert: textsObj.revert
                    }
                },
                dialogContent: 'Add more devices',
                barColors: [{command: 'coolWhite', styleOBJ: {'background-color':'#CAE9FB'}},
                    {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE',border:'solid 1px #C7C8C8'}},
                    {command: 'warmWhite', styleOBJ: {'background-color':'#FFDCA6'}},
                    {command: '78FF00', styleOBJ: {'background-color':'#80FF00'}},
                    {command: '003000', styleOBJ: {'background-color':'#00CC00'}},
                    {command: '008080', styleOBJ: {'background-color':'#00FFFF'}},
                    {command: 'FFC700', styleOBJ: {'background-color':'#FFFF00'}},
                    {command: '000040', styleOBJ: {'background-color':'#0000FF'}},
                    {command: 'FF3800', styleOBJ: {'background-color':'#FF8000'}},
                    {command: '270010', styleOBJ: {'background-color':'#FF007F'}},
                    {command: 'FF0000', styleOBJ: {'background-color':'#FF0000'}},
                    {command: '080010', styleOBJ: {'background-color':'#7F00FF'}}],
                saveColors: [
                    {command: '003000', styleOBJ: {'background-color': '#00CC00'}},
                    {command: 'FFC700', styleOBJ: {'background-color': '#FFFF00'  }},
                    {command: '270010', styleOBJ: {'background-color':'#FF007F' }},
                    {command: '080010', styleOBJ: {'background-color':'#7F00FF'}},
                    {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE'}}]
            }
        },
        mounted:function(){
			// tutorialCommon.blackBoxAnimation('-5%','3%','3%','5%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
            // tutorialCommon.scrollToTop('0', '-170');
        },
        methods:{
            go:function() {
            		var merged = $("#scenesMerged1");
        			$('.jumpingCircle').fadeOut(200);
            		TweenLite.to(merged, 0.5, {css:{top:'-135%'}});
            		setTimeout(function(){
            			router.push('page7');
            		},800)
            }
        }
    });
    Vue.component('page7', {
        name:'page7',
        template: '#page7',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page6.png',
                        back:'page6',
                        currentParams: 'page7',
                        pageNumber: '7'
                    },
                    pagination:{
	                    	back:'page6',
	                    	currentPage:'7',
	                    	totalPage: '11',
                    },
                		prompt:{
            				msg: textsObj.page7.msg1,
	            			style: {
	            				top: '14.5%',
	            				left: '3.8%',
	            				width: '180px'
	            			}
                		},
                    top: {
                        topTitle: textsObj.page5.topTitle,
                        test: textsObj.test,
                        revert: textsObj.revert
                    }
                },
                dialogContent: 'Save and exit',
                barColors: [{command: 'coolWhite', styleOBJ: {'background-color':'#CAE9FB'}},
                    {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE',border:'solid 1px #C7C8C8'}},
                    {command: 'warmWhite', styleOBJ: {'background-color':'#FFDCA6'}},
                    {command: '78FF00', styleOBJ: {'background-color':'#80FF00'}},
                    {command: '003000', styleOBJ: {'background-color':'#00CC00'}},
                    {command: '008080', styleOBJ: {'background-color':'#00FFFF'}},
                    {command: 'FFC700', styleOBJ: {'background-color':'#FFFF00'}},
                    {command: '000040', styleOBJ: {'background-color':'#0000FF'}},
                    {command: 'FF3800', styleOBJ: {'background-color':'#FF8000'}},
                    {command: '270010', styleOBJ: {'background-color':'#FF007F'}},
                    {command: 'FF0000', styleOBJ: {'background-color':'#FF0000'}},
                    {command: '080010', styleOBJ: {'background-color':'#7F00FF'}}],
                saveColors: [
                    {command: '003000', styleOBJ: {'background-color': '#00CC00'}},
                    {command: 'FFC700', styleOBJ: {'background-color': '#FFFF00'  }},
                    {command: '270010', styleOBJ: {'background-color':'#FF007F' }},
                    {command: '080010', styleOBJ: {'background-color':'#7F00FF'}},
                    {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE'}}
                ]
            }
        },
        mounted:function(){
        		if(lang === 'zh_CN') {
        			$('.promptText').css('padding-left','10px');
        		} else {
        			$('.promptText').css('padding-left','0px');
        		}
        		$('.promptBoxUp').addClass('promptBoxLeft');
			// tutorialCommon.blackBoxAnimation('2.5%','-1.5%','-1.5%','-3.5%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
			// tutorialCommon.scrollToTop('-170', '-300');
        },
        methods:{
            go:function() {
        			$('.jumpingCircle').fadeOut(200);
            		router.push('page8');
            }
        }
   });
    Vue.component('page8', {
        name:'page8',
        template: '#page8',
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page11_1.png',
                        back:'page7',
                        currentParams: 'page8',
                        pageNumber: '8'
                    },
                    pagination:{
	                    	// back:'page7',
	                    	currentPage:'8',
	                    	totalPage: '11',
                    },
                    prompt:{
                        msg: textsObj.page8.msg1,
                        style: {
                            top: '25%',
                            left: '27.5%',
                            width: '45%',
                            height: '50%',
                            color: '#FF9012'
                        }
                    },
                    top: {
                        topTitle: textsObj.page8.topTitle
                    },
                    desktop: textsObj.desktop
                },
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxNone');
			// tutorialCommon.blackBoxAnimation('-8%','-1%','-1%','1%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
                var bar = $('.controlBar');
                var pointer = $('.controlPointer');
                $('.jumpingCircle').fadeOut(200);
                // TweenLite.to(bar, 0.3, {attr:{fill:'#DB6929'}});
                // TweenLite.to(pointer, 0.3, {attr:{cx:'1130'}});
                setTimeout(function(){
                    router.push('page9');
                },200)
            },
            backP7: function () {
                router.push('page5');
            }
        }
    });
    Vue.component('page9', {
        name:'page9',
        template: '#page9',
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/scenesPage/scenes_page11.png',
                        back:'page8',
                        currentParams: 'page9',
                        pageNumber: '9'
                    },
                    pagination:{
	                    	back:'page8',
	                    	currentPage:'9',
	                    	totalPage: '11',
                    },
                    prompt:{
            				msg: textsObj.page9.msg1,
	            			style: {
	            				top: '25.3%',
	            				left: '55.3%',
	            				width: '350px'
	            			}
                		},
                    top: {
                        topTitle: textsObj.page4.topTitle
                    },
                    desktop: textsObj.desktop

                },
                dialogContent: 'Show or hide on Control Page',
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxRight');
			// tutorialCommon.blackBoxAnimation('4%','1%','1%','-1%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
            		var bar = $('.controlBar');
            		var pointer = $('.controlPointer');
        			$('.jumpingCircle').fadeOut(200);
            		TweenLite.to(bar, 0.3, {attr:{fill:'#DB6929'}});
            		TweenLite.to(pointer, 0.3, {attr:{cx:'57'}});
            		setTimeout(function(){
            			router.push('page10');
            		},200)
            }
        }
    });
    Vue.component('page10', {
	    name:'page10',
	    template: '#page10',
	    data: function () {
	        return {
	            pageData:{
	                body:{
	                    src:'img/scenesPage/scenes_page13.png',
	                    back:'page9',
	                    currentParams: 'page10',
	                    pageNumber: '10'
	                },
	                pagination:{
	                    	back:'page9',
	                    	currentPage:'10',
	                    	totalPage: '11',
                   	},
                    prompt:{
	            			msg: textsObj.page10.msg1,
	            			style: {
	            				top: '15%',
	            				left: '61%',
	            				width: '370px',
	            				height: '120px',
	            			},
	            			textStyle: {
	            				marginTop: '10px',
	            			}
            			 },
                    top: {
                        topTitle: textsObj.page10.topTitle
                    },
                    desktop: textsObj.desktop
	            },
	            dialogContent: 'Edit mode for renaming or deleting',
	            dialogContent1: 'Got it!',     
	        }
	    },
	    mounted:function(){
	    		$('.promptBoxUp').addClass('promptBoxRight');
			// tutorialCommon.blackBoxAnimation('2%','-2%','-2%','-4%');
			tutorialCommon.blackBoxAnimation(1, -2, -2, -5);
            tutorialCommon.clickAnimation();
	    },
	    methods:{
	        go:function() {
	        		$('.jumpingCircle').fadeOut(200);
	        		router.push('page11');
	        }
	    }
    });
    Vue.component('page11', {
	    name:'page11',
	    template: '#page11',
	    data: function () {
	        return {
	            pageData:{
	                body:{
	                    src:'img/scenesPage/scenes_page13.png',
	                    pageNumber: '11'
	                },
                    top: {
                        topTitle: textsObj.page10.topTitle
                    }
	            },
	        }
	    },
	    mounted:function(){
			
	    },
	    methods:{
	       
	    }
    });
    var page0 = { template: '<page0></page0>' };
    var page1 = { template: '<page1></page1>' };
    var page2 = { template: '<page2></page2>' };
    var page3 = { template: '<page3></page3>' };
    var page4 = { template: '<page4></page4>' };
    var page5 = { template: '<page5></page5>' };
    var page6 = { template: '<page6></page6>' };
    var page7 = { template: '<page7></page7>' };
    var page8 = { template: '<page8></page8>' };
    var page9 = { template: '<page9></page9>' };
    var page10 = { template: '<page10></page10>' };
    var page11 = { template: '<page11></page11>' };
    router =  new VueRouter({
        routes: [
            { path: '/page0', name: 'page0', component: page0},
            { path: '/page1', name: 'page1', component: page1, meta: { keepAlive: false }},
            { path: '/page2', name: 'page2', component: page2, meta: { keepAlive: false }},
            { path: '/page3', name: 'page3', component: page3, meta: { keepAlive: false }},
            { path: '/page4', name: 'page4', component: page4, meta: { keepAlive: false }},
            { path: '/page5', name: 'page5', component: page5, meta: { keepAlive: true }},
            { path: '/page6', name: 'page6', component: page6},
            { path: '/page7', name: 'page7', component: page7},
            { path: '/page8', name: 'page8', component: page8},
            { path: '/page9', name: 'page9', component: page9},
            { path: '/page10', name: 'page10', component: page10},
            { path: '/page11', name: 'page11', component: page11},
        ]
    });

   loadComponent(router,'zh_CN');
   setTimeout(function () {
       var rout = new Vue({
           router: router,
           template:'#Rout',
           mounted:function(){
               router.push('page0');
           },
           created: function () {
           },
           data:{

           },
           methods:{

           }
       }).$mount('#start');
   },10);
};