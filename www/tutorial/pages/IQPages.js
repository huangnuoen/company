/**
 * Created by qkchung on 2017/8/30.
 */
/**
 * Created by qkchung on 2017/8/30.
 */
window.onload = function () {
    var router = {};
    var textsObj = {};
    var lang = null;
    var cn = {
    		page0:{
    			mainTitle: '智能场景',
    			subtitle1: '智能场景功能演示',
    			subtitle2: '设置预设事件，使智能设备支持自动化作业功能。',
    		},
    		page1:{
    			msg1:'用于触发智能设备进入自动化工作模式'
    		},
    		page2:{
    			msg1:'调整触发事件',
    		},
    		page3:{
    			msg1:'添加第二个触发事件',
    		},
    		page4:{
    			msg1:'注意：任何一个事件发生时，都会触发智能设备进入自动化工作模式。',
    		},
    		page5:{
    			msg1:'设置启动智能场景的附加条件',
    		},
    		page6:{
    			msg1:'添加“时间”条件',
    		},
    		page7:{
    			msg1:'触发事件只有在周一至周五早上6点至11点发生时，此智能场景才会启动。',
    		},
    		page8:{
    			msg1:'当设置了多个附加条件时，所有附加条件都必须满足才能启动智能场景。',
    		},
    		page9:{
    			msg1:'设置Oomi在满足触发事件与所有附加条件后，需要做的事务？',
    		},
    		page10:{
    			msg1:'添加智能设备',
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
    			mainTitle: 'Automations',
    			subtitle1: 'Meet Automations',
    			subtitle2: 'Set your home to do things automatically.',
    		},
    		page1:{
    			msg1:'Triggers will start your automation'
    		},
    		page2:{
    			msg1:'Adjust your trigger',
    		},
    		page3:{
    			msg1:'Add another trigger',
    		},
    		page4:{
    			msg1:'Only one trigger needs to happen to start your automation.',
    		},
    		page5:{
    			msg1:'Conditions limit when automations happen',
    		},
    		page6:{
    			msg1:'Add a time condition',
    		},
    		page7:{
    			msg1:'This automation will only happen if it’s a weekday from 6am to 11am. ',
    		},
    		page8:{
    			msg1:'If you have two conditions, BOTH must be true for your automation to happen.',
    		},
    		page9:{
    			msg1:'Actions tell Oomi what to do',
    		},
    		page10:{
    			msg1:'Add a device',
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
    syncLanguage('en');
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
                        lastPage: 'page15'
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
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page1.png', back:'page0'},
                    pagination:{
	                    	back:'page0',
	                    	currentPage:'1',
	                    	totalPage: '15',
            			},
            			prompt:{
	            			msg: textsObj.page1.msg1,
	            			style: {
	            				top: '54%',
	            				left: '2%',
	            				width: '370px'
	            			},
		        			textStyle: {
		        			}
            			}
                },
                
                style: {},
                m1:'MultiSensor',
            }
        },
        mounted:function(){
        		TweenMax.fromTo('.pagination', 0.5,
	                {top:'150%',opacity:'0'},
	                {top:'85%', opacity:'1'}
           	);
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                TweenLite.to('.multiAni', 0.3,{css:{'top':'0'}});
                setTimeout(function(){
                		router.push('page2');
                },500)

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
                    body:{src:'img/IQPage/IQ_page2.png', back:'page1'},
                    pagination:{
                    	back:'page1',
                    	currentPage:'2',
                    	totalPage: '15',
            		},
            		prompt:{
            			msg: textsObj.page2.msg1,
            			style: {
            				top: '51.5%',
            				left: '59.7%',
            				width: '230px'
            			},
            			triangleStyle: {
            				top: '49.9%',
            				left:'71.2%'
            			}
            		}
                },
                style: {},
            }
        },
        mounted:function(){
            tutorialCommon.blackBoxAnimation('7%','4%','4%','2%');
      		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
            		var textNo = $("#changeNo");
            		var textYes = $('#changeYes');
            		TweenLite.to(textNo, 0.5, {attr:{y:'300','fill':'#B2B1B1','font-size':'21'}});
            		TweenLite.to(textYes, 0.5, {attr:{y:'353.3647','fill':'#FF9012','font-size':'25'}});
            		setTimeout(function(){
            			router.push('page3');
            		},1000)
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
                    body:{src:'img/IQPage/IQ_page3.png', back:'page2'},
                    pagination:{
                    	back:'page2',
                    	currentPage:'3',
                    	totalPage: '15',
            		},
            		prompt:{
            			msg: textsObj.page3.msg1,
            			style: {
            				top: '60%',
            				left: '3.5%',
            				width: '230px'
            			},
            			triangleStyle: {
            				top: '58.9%',
            				left:'14.95%'
            			}
            		}
                },
                style: {},
                m2:'Front Door',
                m1:'Add another trigger'
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('0%','3%','3%','1%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
            		TweenLite.to('.frontDoor', 0.3,{css:{'top':'58%'}});
            		setTimeout(function(){
            			router.push('page4');
            		},500)
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
                    body:{src:'img/IQPage/IQ_page4.png', back:'page3'},
                    pagination:{
	                    	back:'page3',
	                    	currentPage:'4',
	                    	totalPage: '15',
                		},
                		prompt:{
	            			msg: textsObj.page4.msg1,
	            			style: {
	            				top: '31%',
	            				left: '40%',
	            				width: '350px',
	            				height: '150px'
	            			},
	            			textStyle: {
	            				marginTop: '10px',
	            				paddingLeft: '12px'
	            			}
            			}
                },
                m1:'Any of these action will trigger your Automation',
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        },
        methods:{
            next:function () {
                router.push('page5')
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
                    body:{src:'img/IQPage/IQ_page5.png', back:'page4'},
                    pagination:{
	                    	back:'page4',
	                    	currentPage:'5',
	                    	totalPage: '15',
                		},
	            		prompt:{
	            			msg: textsObj.page5.msg1,
	            			style: {
	            				top: '15%',
	            				left: '27.3%',
	            				width: '430px'
	            			},
	            			triangleStyle: {
	            				top: '13.9%',
	            				left:'48.8%'
	            			}
	            		}
                },
                style: {},
                m1:'Conditions',
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                router.push('page6')
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
                    body:{src:'img/IQPage/IQ_page6.png', back:'page8'},
                    pagination:{
	                    	back:'page5',
	                    	currentPage:'6',
	                    	totalPage: '15',
            			},
                		prompt:{
            				msg: textsObj.page6.msg1,
	            			style: {
	            				top: '40%',
	            				left: '1.1%',
	            				width: '230px'
            			}
                },
            		},
                style: {},
                m1:'Add a time condition',
                m2:'Time'
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('-4%','-1%','-1%','1%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                TweenLite.to('.conditionTime', 0.3,{css:{'top':'24%'}});
                setTimeout(function(){
                		router.push('page7');
                },500)
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
                    body:{src:'img/IQPage/IQ_page7.png', back:'page6'},
                    pagination:{
	                    	back:'page6',
	                    	currentPage:'7',
	                    	totalPage: '15',
            			},
            			prompt:{
	            			msg: textsObj.page7.msg1,
	            			style: {
	            				top: '61%',
	            				left: '54%',
	            				width: '380px',
	            				height: '150px',
	            			},
	            			textStyle: {
	            				marginTop: '10px',
	            				paddingLeft: '5px'
	            			}
            			}
                },
                style: {},
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                router.push('page8');
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
                    body:{src:'img/IQPage/IQ_page8.png', back:'page7'},
                    pagination:{
	                    	back:'page7',
	                    	currentPage:'8',
	                    	totalPage: '15',
            			},
            			prompt:{
	            			msg: textsObj.page8.msg1,
	            			style: {
	            				top: '27.5%',
	            				left: '48%',
	            				width: '400px',
	            				height: '150px',
	            			},
	            			textStyle: {
	            				marginTop: '10px',
	            				paddingLeft: '5px'
	            			}
            			}
                },
                style: {},
                m1:'ALL conditions must be true for your Automation to happen',
                m2:'If you have two conditions, BOTH must ',
                m3:'be true for your automation to happen.',
                m4:'Got it!'
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                router.push('page9')
            }
        }
    });
    Vue.component('page9', {
        name:'page9',
        template: '#page9',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page9.png', back:'page8'},
                    pagination:{
	                    	back:'page8',
	                    	currentPage:'9',
	                    	totalPage: '15',
            			},
                		prompt:{
            				msg: textsObj.page9.msg1,
	            			style: {
	            				top: '16%',
	            				left: '50%',
	            				width: '300px'
	            			},
	            			triangleStyle: {
	            				top: '15%',
	            				left:'65%'
	            			}
                		},
                },
                m1:'Actions',
                m2:'Actions tell Oomi what to do'
            }
        },
        mounted:function(){
	        	tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                router.push('page10')
            }
        }
    });
    Vue.component('page10', {
        name:'page10',
        template: '#page10',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page10.png', back:'page9'},
                    pagination:{
	                    	back:'page9',
	                    	currentPage:'10',
	                    	totalPage: '15',
            			},
                		prompt:{
            				msg: textsObj.page10.msg1,
	            			style: {
	            				top: '39%',
	            				left: '6.2%',
	            				width: '170px'
	            			},
	            			triangleStyle: {
	            				top: '48%',
	            				left:'14.6%'
	            			}
                		},
                },
                style: {},
                m1:'Add a device',
                m2:'Ceiling Lights'
            }
        },
        mounted:function(){
        		tutorialCommon.blackBoxAnimation('-4%','-1%','-1%','1%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                TweenLite.to('.ceilingLight', 0.3,{css:{'top':'23%'}});
                setTimeout(function(){
                		 router.push('page11');
                },500)
            }
        }
    });
    Vue.component('page11', {
        name:'page11',
        template: '#page11',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page11.png', back:'page10'},
                    pagination:{
	                    	back:'page10',
	                    	currentPage:'11',
	                    	totalPage: '15',
            			},
                		prompt:{
            				msg: textsObj.page11.msg1,
	            			style: {
	            				top: '15%',
	            				left: '3.9%',
	            				width: '180px'
	            			}
                		},
                },
                style: {},
                m1:'Save and exit'
            }
        },
        mounted:function(){
        		if(lang === 'zh_CN') {
        			$('.promptText').css('padding-left','10px');
        		} else {
        			$('.promptText').css('padding-left','0px');
        		}
        		$('.promptBoxUp').addClass('promptBoxLeft');
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                router.push('page12')
            }
        }
    });
    Vue.component('page12', {
        name:'page12',
        template: '#page12',
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page12.png', back:'page11'},
                    pagination:{
	                    	back:'page11',
	                    	currentPage:'12',
	                    	totalPage: '15',
            			},
            			prompt:{
	            			msg: textsObj.page12.msg1,
	            			style: {
	            				top: '25%',
	            				left: '27.5%',
	            				width: '45%',
	            				height: '50%',
	            				color: '#FF9012'
	            			}
            			}
                		
                },
                style: {},
                m1: 'Manage from the Automations page',
                m2: 'Got it!'
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxNone');
            tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        },
        methods:{
        		next:function () {
                router.push('page13')
            }
        }
    });
    Vue.component('page13', {
        name:'page13',
        template: '#page13',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page13.png', back:'page12'},
                    pagination:{
	                    	back:'page12',
	                    	currentPage:'13',
	                    	totalPage: '15',
            			},
                		prompt:{
            				msg: textsObj.page13.msg1,
	            			style: {
	            				top: '28%',
	            				left: '50.5%',
	            				width: '380px'
	            			},
	            			textStyle: {
	            				paddingLeft: '13px'
	            			}
                		},
                },
                style: {},
                m1:'Active',
                m2:'If an automation is turned off,',
                m3:'it will be disabled and won’t run.',
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxRight');
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                var bar = $('.controlBar');
	        		var pointer = $('.controlPointer');
	        		TweenLite.to(bar, 0.3, {attr:{fill:'#DB6929'}});
	        		TweenLite.to(pointer, 0.3, {attr:{cx:'1130'}});
	        		setTimeout(function(){
	        			router.push('page14');
	        		},500)
            }
        }
    });
    Vue.component('page14', {
        name:'page14',
        template: '#page14',
        tween:{},
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page14.png', back:'page13'},
                    pagination:{
	                    	back:'page13',
	                    	currentPage:'14',
	                    	totalPage: '15',
            			},
            			prompt:{
	            			msg: textsObj.page14.msg1,
	            			style: {
	            				top: '14%',
	            				left: '60.5%',
	            				width: '370px',
	            				height: '120px',
	            			},
	            			textStyle: {
	            				marginTop: '10px',
	            			}
            			}
                },
                style: {},
                m1:'Edit mode for renaming or deleting',
                m2:'Got it!'
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxRight');
        		tutorialCommon.blackBoxAnimation('1%','-2%','-2%','-4%');
        		tutorialCommon.clickAnimation();
        },
        methods:{
            next:function () {
                router.push('page15')
            }
        }
    });
    Vue.component('page15', {
        name:'page15',
        template: '#page15',
        data: function () {
            return {
                pageData:{
                    body:{src:'img/IQPage/IQ_page14.png'},
                }
            }
        },
        mounted:function(){
        },
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
    var page12 = { template: '<page12></page12>' };
    var page13 = { template: '<page13></page13>' };
    var page14 = { template: '<page14></page14>' };
    var page15 = { template: '<page15></page15>' };

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
            { path: '/page10', name: 'page10', component: page10},
            { path: '/page11', name: 'page11', component: page11},
            { path: '/page12', name: 'page12', component: page12},
            { path: '/page13', name: 'page13', component: page13},
            { path: '/page14', name: 'page14', component: page14},
            { path: '/page15', name: 'page15', component: page15},
        ]
    });
    loadComponent(router,'en');

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