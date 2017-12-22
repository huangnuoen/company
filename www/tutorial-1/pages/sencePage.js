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
    			subtitle2: '创建支持同时控制多个设备的快捷按钮。',
    		},
    		page1:{
    			msg1:'请输入场景名称'
    		},
    		page2:{
    			msg1:'请选择图标',
    		},
    		page3:{
    			msg1:'添加智能设备',
    		},
    		page4:{
    			msg1:'设置智能设备进入此场景期望的状态',
    		},
    		page5:{
    			msg1:'添加第二个智能设备',
    		},
    		page6:{
    			msg1:'添加更多智能设备',
    		},
    		page7:{
    			msg1:'完成设置，保存后退出。',
    		},
    		page8:{
    			msg1:'场景管理',
    		},
    		page9:{
    			msg1:'选择是否创建桌面快捷方式',
    		},
    		page10:{
    			msg1:'修改场景名称或删除场景',
    		}
    };
    var en = {
    		page0:{
    			mainTitle: 'Scenes',
    			subtitle1: 'Meet Scenes',
    			subtitle2: 'Create shortcut buttons for setting lots of devices.',
    		},
    		page1:{
    			msg1:'Click to name your Scene'
    		},
    		page2:{
    			msg1:'Choose an icon',
    		},
    		page3:{
    			msg1:'Add devices to your Scene',
    		},
    		page4:{
    			msg1:'Set your device',
    		},
    		page5:{
    			msg1:'Add more devices',
    		},
    		page6:{
    			msg1:'Add more devices',
    		},
    		page7:{
    			msg1:'Save and exit',
    		},
    		page8:{
    			msg1:'Manage from the Scenes page',
    		},
    		page9:{
    			msg1:'Show or hide on Control Page',
    		},
    		page10:{
    			msg1:'Edit mode for renaming or deleting',
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
		                lastPage: 'page11'
                    }
                },
                currentPage: 'page0'
            }
        },
        mounted:function(){
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
		        			textStyle: {
		        			}
            			}
                },
                style: {},
                textContent: '',
                m1: "Click to name your Scene",
            }
        },
        mounted:function(){
	        	var duration = 1.7;
	        	runText = null;
	        	TweenMax.fromTo('.pagination', 0.5,
	                {top:'150%',opacity:'0'},
	                {top:'85%', opacity:'1'}
           	);
			tutorialCommon.blackBoxAnimation('4%','1%','1%','-1%');
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
            	 		TweenLite.to(line, 1.5, {attr:{x1:'547', x2:"547"}});
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
            			}
                },
                dialogContent: 'Choose an icon',
                iconColor: {
                    stroke: '#B4B3B3'
                }
            }
        },
        mounted:function(){
			tutorialCommon.blackBoxAnimation('-1%','-4%','-4%','-6%');
			tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
                this.iconColor.stroke = '#E66C25';
                var self = this;
                $('.jumpingCircle').fadeOut(200);
                setTimeout(function(){
                    router.push('page3');
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
	                    	back:'page2',
	                    	currentPage:'3',
	                    	totalPage: '11',
                    },
                    prompt:{
	            			msg: textsObj.page3.msg1,
	            			style: {
	            				top: '40.9%',
	            				left: '2.1%',
	            				width: '260px'
	            			},
		        			textStyle: {
		        			}
            			}
                },
                m1: 'Add devices to your Scene',
                lampTitle: 'Lamp'
            }
        },
        mounted:function(){
			tutorialCommon.blackBoxAnimation('3%','0%','0%','-2%');
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
		        			textStyle: {
		        			}
            			}
                },
                m1: 'Set your device',
                lampTitle: 'Lamp'
            }
        },
        mounted:function(){
			tutorialCommon.blackBoxAnimation('0%','-2%','-2%','-4%');
			tutorialCommon.clickAnimation();
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
                    pagination:{
	                    	back:'page4',
	                    	currentPage:'5',
	                    	totalPage: '11',
                    },
                    prompt:{
	            			msg: textsObj.page5.msg1,
	            			style: {
	            				top: '45%',
	            				left: '3%',
	            				width: '240px'
	            			},
		        			textStyle: {
		        			}
            			}
                },
                dialogContent: 'Add more devices',
            }
        },
        mounted:function(){
			tutorialCommon.blackBoxAnimation('-6%','2%','2%','4%');
			tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
            		var merged = $("#scenesMerged");
            		$('.jumpingCircle').fadeOut(200);
            		TweenLite.to(merged, 0.5, {css:{top:'-55%'}});
            		setTimeout(function(){
            			router.push('page6');
            		},800)
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
            			}
                },
                dialogContent: 'Add more devices',
            }
        },
        mounted:function(){
			tutorialCommon.blackBoxAnimation('-5%','3%','3%','5%');
			tutorialCommon.clickAnimation();
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
                },
                dialogContent: 'Save and exit',
            }
        },
        mounted:function(){
        		if(lang === 'zh_CN') {
        			$('.promptText').css('padding-left','10px');
        		} else {
        			$('.promptText').css('padding-left','0px');
        		}
        		$('.promptBoxUp').addClass('promptBoxLeft');
			tutorialCommon.blackBoxAnimation('2.5%','-1.5%','-1.5%','-3.5%');
			tutorialCommon.clickAnimation();
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
	                    	back:'page7',
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
            			}
                },
			    desktopTitle: 'Desktop'                
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxNone');
			tutorialCommon.blackBoxAnimation('-8%','-1%','-1%','1%');
			tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
            		var bar = $('.controlBar');
            		var pointer = $('.controlPointer');
        			$('.jumpingCircle').fadeOut(200);
            		TweenLite.to(bar, 0.3, {attr:{fill:'#DB6929'}});
            		TweenLite.to(pointer, 0.3, {attr:{cx:'1130'}});
            		setTimeout(function(){
            			router.push('page9');
            		},200)
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
                },
                dialogContent: 'Show or hide on Control Page',
			    desktopTitle: 'Desktop'                
            }
        },
        mounted:function(){
        		$('.promptBoxUp').addClass('promptBoxRight');
			tutorialCommon.blackBoxAnimation('4%','1%','1%','-1%');
			tutorialCommon.clickAnimation();
        },
        methods:{
            go:function() {
            		var bar = $('.controlBar');
            		var pointer = $('.controlPointer');
        			$('.jumpingCircle').fadeOut(200);
            		TweenLite.to(bar, 0.3, {attr:{fill:'#DB6929'}});
            		TweenLite.to(pointer, 0.3, {attr:{cx:'1130'}});
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
	            				left: '60.5%',
	            				width: '370px',
	            				height: '120px',
	            			},
	            			textStyle: {
	            				marginTop: '10px',
	            			}
            			 }
	            },
	            dialogContent: 'Edit mode for renaming or deleting',
	            dialogContent1: 'Got it!',     
	        }
	    },
	    mounted:function(){
	    		$('.promptBoxUp').addClass('promptBoxRight');
			tutorialCommon.blackBoxAnimation('2%','-2%','-2%','-4%');
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
    var page10 = { template: '<page10></page10>' };
    var page11 = { template: '<page11></page11>' };
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