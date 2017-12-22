/**
 * Created by qkchung on 2017/8/30.
 */
window.onload = function () {
    var router = {};
    var om2 = Oomi_command_function.create_new();
    var lang = null;
    var textsObj = {};
    var cn = {
    		page0:{
    			mainTitle: '智能化控制与监测',
    			subtitle1: 'Oomi是对家进行智能化控制与监测的家庭助理',
    			subtitle2: '让我们学习了解Oomi是如何工作的。',
    		},
    		page1:{
			msg1: '功能演示',
    			msg1_1:'操控页面',
    			msg2: '此页面用于控制智能设备、场景、安防的工作状态，以及设置Oomi系统的功能。'
    		},
    		page2:{
    			use:'使用',
    			widgets: '快捷方式',
    			control: '控制设备',
    			tap: '单击',
    			hold: '长按',
    			onOff: '开/关',
    			options: '高级功能'
    		},
    		page3:{
    			msg1:'安防设置',
    		},
    		page4:{
    			msg1:'工具栏：菜单支持设置系统高级功能；添加设备、创建场景；以及查看系统信息。',
    		},
    		page5:{
    			msg1:'向右滑动，进入监测页面',
    		},
    		page6:{
    			msg1: '功能演示',
    			msg1_1:'监测页面',
    			msg2: '此页面用于查看各类传感器的测量值，如温湿度、监控视频、耗电量等。'
    		},
    		page7:{
    			msg1:'查看Oomi系统的概况',
    		},
    		page8:{
    			msg1:'查看详细的家庭环境、能耗、以及安防监控信息。',
    		},
    		page9:{
    			msg1:'选择是否创建桌面快捷方式',
    		},
    		page10:{
    			msg1:'修改场景名称或删除场景',
    		},
    		page11:{
    			msg1:'完成设置，保存后退出。',
    		},
    		page12:{
    			msg1:'智能场景管理',
    		},
    		page13:{
    			msg1: '选择激活或暂停智能场景功能。'
    		},
    		page14:{
    			msg1: '修改智能场景名称或删除智能场景'
    		}
    };
    var en = {
    		page0:{
    			mainTitle: 'Control and Monitoring Pages',
    			subtitle1: 'Oomi is organized into Control and Monitoring',
    			subtitle2: 'Let’s learn how it works.',
    		},
    		page1:{
    			msg1:'Meet your',
    			msg1_1: 'Control Page',
    			msg2: 'Devices that do things, like bulbs and plugs, are controlled from here.',
    		},
    		page2:{
    			use:'Use',
    			widgets: 'Widgets',
    			control: 'to control devices',
    			tap: 'Tap',
    			hold: 'Hold',
    			onOff: 'for On/Off',
    			options: 'for more options'
    		},
    		page3:{
    			msg1:'Set your home security',
    		},
    		page4:{
    			msg1:'Menu, Add, and Notifications',
    		},
    		page5:{
    			msg1:'Swipe to go to your Monitoring page',
    		},
    		page6:{
    			msg1: 'Meet your',
    			msg1_1:'Monitoring Page',
    			msg2: 'All sensor information, like temperature and cameras, are combined here.'
    		},
    		page7:{
    			msg1:'See an overview of your home',
    		},
    		page8:{
    			msg1:'See details about the Environment, Energy usage, and Security.',
    		},
    		page9:{
    			msg1:'Show or hide on Control Page',
    		},
    		page10:{
    			msg1:'Edit mode for renaming or deleting',
    		},
    		page11:{
    			msg1:'Save and exit',
    		},
    		page12:{
    			msg1:'Manage from the Automations page',
    		},
    		page13:{
    			msg1: 'If an automation is turned off, it will be disabled and won’t run.'
    		},
    		page14:{
    			msg1: 'Edit mode for renaming or deleting'
    		}
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
            var parsedData = JSON.parse(data);
            lang = parsedData['value'];
            setTimeout(function () {
                syncLanguage(lang);
                loadComponent(router,lang);
			    startRouter();
            },10);
        }, null, "FTP2PApi", "getLanguage", ['']);
    }
    syncLanguage('zh_CN');
    loadComponent(router,'zh_CN');
    startRouter();
    function syncLanguage(lang) {
    		if(lang === 'en') {
    			textsObj = en;
    		} else if (lang ==='zh_CN') {
    			textsObj = cn;
    		} else {
    			textsObj = en;
    		}
    }
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
		                lastPage: 'page9'
                    }
                },
            }
        },
        mounted:function(){
            $('.mainHolder').addClass('changeBg');
        },
    });
    Vue.component('page1', {
        name:'page1',
        template: '#page1',
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/monitorPage/monitor_page1.png',
                        currentParams: 'page1'
                    },
            			prompt:{
	            			msg1: textsObj.page1.msg1,
	            			msg1_1: textsObj.page1.msg1_1,
	            			msg2: textsObj.page1.msg2,
            			},
            			btn: {
            				back:'page0',
            			}
                },
                title1: 'Meet your',
        	        title2: 'Control Page',
                title3: 'Devices that do things, like bulbs and plugs, are controlled from here.',
                title4: 'Got it!'
            }
        },
        mounted:function(){
        		$('.back').css('top','50%');
        		$('.exit').css('top','50%');
        		TweenLite.to('.bottomPop', 0.5,{css:{'top':'1px'}});
        },
        methods:{
        		back:function() {
        			router.push('page0');
        		},
			go:function() {
				router.push('page2');
			},
			exit:function() {
				om2.exit_edit();
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
                        src:'img/monitorPage/monitor_page1.png',
                        currentParams: 'page2'
                    },
            			prompt:{
	            			style: {
	            				width: '50%',
	            				height: '55%',
	            				left: '32%',
	            				top: '24%'
	            			},
	            			msg2:textsObj.page2.use,
		        			msg3: textsObj.page2.tap,
		                msg4: textsObj.page2.hold,
		                msg5: textsObj.page2.onOff,
		                msg6: textsObj.page2.options,
		                msg7: textsObj.page2.widgets,
		                msg8: textsObj.page2.control,
            			},
            			btn: {
            				back:'page1',
            			}
                },
                
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxLeftMid');
        		TweenLite.fromTo('.messageDialog', 0.2, {css:{'left':'-20%'}},{css:{'left':'0'},delay:0.1});
	        	setTimeout(function(){
	        		this.tween = TweenMax.fromTo('.messageDialog', 0.75,
		                {top:'0'},
		                {top:'6px', repeat: -1, yoyo: true}
	            	);
	        	},300)
        },
        methods:{
        		back:function() {
        			router.push('page1');
        		},
			go:function() {
				router.push('page3');
			},
			exit:function() {
				om2.exit_edit();
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
                        src:'img/monitorPage/monitor_page1.png',
                        currentParams: 'page3'
                    },
                    prompt:{
	            			msg: textsObj.page3.msg1,
	            			style: {
	            				width: '250px',
	            				height: '111px',
	            				top: '16%',
	            				left: '69%'
	            			},
		        			textStyle: {
		        				marginTop: '10px'
		        			}
            			},
            			btn: {
            				back:'page2',
            			}
                },
                disarmed: 'Disarmed',
                setSecurity: 'Set your home security'
                
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxRight');
        		TweenLite.fromTo('.messageDialog', 0.2, {css:{'top':'-12%'}},{css:{'top':'0'},delay:0.1});
	        	setTimeout(function(){
	        		this.tween = TweenMax.fromTo('.messageDialog', 0.75,
		                {top:'0'},
		                {top:'6px', repeat: -1, yoyo: true}
	            	);
	        	},300)
        },
        methods:{
        		back:function() {
        			router.push('page2');
        		},
			go:function() {
				router.push('page4');
			},
			exit:function() {
				om2.exit_edit();
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
                        src:'img/monitorPage/monitor_page1.png',
                        currentParams: 'page4'
                    },
                    prompt:{
	            			msg: textsObj.page4.msg1,
	            			style: {
	            				width: '355px',
	            				height: '150px',
	            				top: '16%',
	            				left: '10%'
	            			},
	            			textStyle: {
	            				marginTop: '15px',
	            			}
            			},
            			btn: {
            				back:'page3',
            			}
                },
                menu: 'Menu, Add, and ',
                notifications: 'Notifications',
                got: 'Got it!'
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxLeft');
        		TweenLite.fromTo('.messageDialog', 0.2, {css:{'top':'-12%'}},{css:{'top':'0'},delay:0.1});
	        	setTimeout(function(){
	        		this.tween = TweenMax.fromTo('.messageDialog', 0.75,
		                {top:'0'},
		                {top:'6px', repeat: -1, yoyo: true}
	            	);
	        	},300)
        },
        methods:{
        		back:function() {
        			router.push('page3');
        		},
			go:function() {
				router.push('page5');
			},
			exit:function() {
				om2.exit_edit();
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
                        src:'img/monitorPage/monitor_page6.png',
                        currentParams: 'page5'
                    },
                    prompt:{
	            			msg: textsObj.page5.msg1,
	            			style: {
	            				width: '355px',
	            				top: '55%',
	            				left: '31%'
	            			}
            			},
            			btn:{
            				back:'page4',
            			}
                },
            }
        },
        mounted:function(){
        		var startx, starty;
        		var slideBG = $('#turnToMonitor');
        		var move = $(".moveFinger");
        		var moveEle = document.getElementsByClassName('moveFinger')[0];
      		    TweenMax.fromTo(move, 2,
	                {left:'0'},
	                {left:'25%', repeat: -1}
                );
      		    TweenLite.fromTo('.messageDialog', 0.2, {css:{'top':'-12%'}},{css:{'top':'0'},delay:0.1});
	        		setTimeout(function(){
		        		this.tween = TweenMax.fromTo('.messageDialog', 0.75,
			                {top:'0'},
			                {top:'6px', repeat: -1, yoyo: true}
		            	);
	        		},300)
	        		// 获得角度
                function getAngle(angx, angy) {
                    return Math.atan2(angy, angx) * 180 / Math.PI;
                };
                //根据起点终点返回方向
                function getDirection(startx, starty, endx, endy) {
                    var angx = endx - startx;
                    var angy = endy - starty;
                    var result = 0;
                    //如果滑动距离太短
                    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                        return result;
                    }
                    var angle = getAngle(angx, angy);
                    if (angle >= -45 && angle <= 45) {
                        result = 1;
                    }

                    return result;
                }
                //手指接触屏幕
                moveEle.addEventListener("touchstart", function(e) {
                    var e = event || window.event;
                    startx = e.touches[0].pageX;
                    starty = e.touches[0].pageY;
                }, false);
                moveEle.addEventListener("touchmove", function(e) {
                    var e = event || window.event;
			        var endx, endy;
			        endx = e.changedTouches[0].pageX;
			        endy = e.changedTouches[0].pageY;
			        var direction = getDirection(startx, starty, endx, endy);
			        switch (direction) {
		        			  case 0:
		        			  	break;
		            		  case 1:
		            		  	 TweenLite.to(slideBG, 1, {css:{left:'0'}});
		            		  	 TweenLite.to('.messageDialog', 1, {css:{'opacity':'0','left':'100%'}});
		            		  	 TweenLite.to('.moveFinger', 1, {css:{'opacity':'0','left':'100%'}});
		            		  	 $('#turnToMonitor').css('top','0.7%');
		            		  	 setTimeout(function(){
								router.push('page6');
							},1500)
				             break;
                            default:
			        }
			    }, false);
			    
        },
        methods:{
        		back:function() {
        			router.push('page4');
        		},
			exit:function() {
				om2.exit_edit();
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
                        src:'img/monitorPage/monitor_page6.png',
                        currentParams: 'page6'
                    },
                    prompt:{
	            			msg1: textsObj.page6.msg1,
	            			msg1_1: textsObj.page6.msg1_1,
	            			msg2: textsObj.page6.msg2,
	            			
            			},
            			btn: {
            				back:'page5',
            			}
                }
            }
        },
        mounted:function(){
        		$('.back').css('top','50%');
        		$('.exit').css('top','50%');
        		TweenLite.to('.bottomPop', 0.5,{css:{'top':'1px'}});
        },
        methods:{
        		back:function() {
        			router.push('page5');
        		},
			go:function() {
				router.push('page7');
			},
			exit:function() {
				om2.exit_edit();
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
                        src:'img/monitorPage/monitor_page6.png',
                        currentParams: 'page7'
                    },
                    prompt:{
	            			msg: textsObj.page7.msg1,
	            			style: {
	            				width: '309px',
	            				height:'118px',
	            				top: '55.5%',
	            				left: '35%'
	            			},
	            			textStyle: {
	            				marginTop: '10px'
	            			}
            			},
            			btn: {
            				back:'page6',
            			}
                },
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxLeftMid');
        		TweenLite.fromTo('.messageDialog', 0.2, {css:{'left':'-20%'}},{css:{'left':'0'},delay:0.1});
	        	setTimeout(function(){
	        		this.tween = TweenMax.fromTo('.messageDialog', 0.75,
		                {top:'0'},
		                {top:'6px', repeat: -1, yoyo: true}
	            	);
	        	},300)
        },
        methods:{
        		back:function() {
        			router.push('page6');
        		},
			go:function() {
				router.push('page8');
			},
			exit:function() {
				om2.exit_edit();
			}
        }
    });
    Vue.component('page8', {
        name:'page8',
        template: '#page8',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{
                        src:'img/monitorPage/monitor_page6.png',
                        currentParams: 'page8'
                    },
                    prompt:{
	            			msg: textsObj.page8.msg1,
	            			style: {
	            				width: '326px',
	            				height:'150px',
	            				top: '16%',
	            				left: '48.5%'
	            			},
	            			textStyle: {
	            				marginTop: '15px'
	            			}
            			},
            			btn: {
            				back:'page7',
            			}
                },
                seeDetails: 'See details about the Environment',
                usage: 'Energy usage, and Security',
                got: 'Got it!'
            }
        },
        mounted:function(){
        		TweenLite.fromTo('.messageDialog', 0.2, {css:{'top':'-12%'}},{css:{'top':'0'},delay:0.1});
	        	setTimeout(function(){
	        		this.tween = TweenMax.fromTo('.messageDialog', 0.75,
		                {top:'0'},
		                {top:'6px', repeat: -1, yoyo: true}
	            	);
	        	},300)
        },
        methods:{
        		back:function() {
        			router.push('page7');
        		},
			go:function() {
				router.push('page9');
			},
			exit:function() {
				om2.exit_edit();
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
	                    src:'img/monitorPage/monitor_page6.png',
	                }
	            }
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
    router =  new VueRouter({
        routes: [
            { path: '/page0', name: 'page0', component: page0},
            { path: '/page1', name: 'page1', component: page1},
            { path: '/page2', name: 'page2', component: page2},
            { path: '/page3', name: 'page3', component: page3},
            { path: '/page4', name: 'page4', component: page4},
            { path: '/page5', name: 'page5', component: page5},
            { path: '/page6', name: 'page6', component: page6},
            { path: '/page7', name: 'page7', component: page7},
            { path: '/page8', name: 'page8', component: page8},
            { path: '/page9', name: 'page9', component: page9},
        ]
    });
};