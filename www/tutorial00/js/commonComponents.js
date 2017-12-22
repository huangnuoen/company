/**
 * Created by qkchung on 2017/8/31.
 */
function loadComponent(router,lang) {
	var om2 = Oomi_command_function.create_new();
	var textsObj = {};
	var cn = {
		started: '下一步',
		skip: '跳过',
		got: '知道了！',
        allDone:'完成！',
        findScenesTutorial:'可以在菜单/使用指南，再次打开当前演示。',
        findScenesTutorial:'可以在菜单/使用指南，再次打开场景功能演示。',
        findIQTutorial:'可以在菜单/使用指南，再次打开智能场景功能演示。',
        findMonitorTutorial:'可以在菜单/使用指南，再次打开控制与监测功能演示。',
        restart:'重新演示',
        endDone:'完成'
    };
    var en = {
        started: 'Get started',
        skip: 'Skip tutorial',
        got: 'Got it!',
        allDone:'All done! ',
        findTutorial:'You can find this toutorial again in the tutorials page.',
        restart:'Restart tutorial',
        endDone:'Done'
    };
		syncLanguage('en');
		function syncLanguage(lang) {
            var scriptOBJ = selectLanguage2(lang);
            $.getScript(scriptOBJ.url, function () {
                var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                textsObj = textsOBJ.common;
            });
				// if(lang === 'en') {
				// 	textsObj = en;
				// } else if (lang ==='zh_CN') {
				// 	textsObj = cn;
				// } else {
				// 	textsObj = en;
				// }
		}
		Vue.component('tutorialBody', {
				name:'tutorialBody',
				template: '#tutorialBody',
				props:['body'],
				data:function() {
						return{

						}
				},
				mounted:function(){

				},
				methods:{

				}
		});
//  prompt box
		Vue.component('BottomProp', {
				name:'BottomProp',
				template: '#BottomProp',
				props:['message'],
				data:function() {
						return{

						}
				},
				mounted:function(){
						TweenLite.to('.BottomPropImg', 0.5,{css:{'top':'0'}});
				},
				methods:{
						go:function () {
								router.push(this.$options.propsData.message.go);
						}
				}
		});
		Vue.component('home', {
				name:'home',
				template: '#home',
				props:['home'],
				data: function () {
						return {
								getStarted: textsObj.started,
								skip: textsObj.skip,
								centerUrl: ''
						}
				},
				mounted:function(){
						var currentUrl = window.location.href;
						var splitUrl = currentUrl.split('/');
						var urlLength = splitUrl.length;
						var pathResult = splitUrl[urlLength-2];
						if(pathResult.indexOf('scenseTutorial') > -1) {
								this.centerUrl = 'img/scenesHome.gif';
						} else if(pathResult.indexOf('IQTutorial') > -1) {
								this.centerUrl = 'img/iqHome.gif';
						} else if(pathResult.indexOf('monitorPage') > -1) {
								this.centerUrl = 'img/monitorHome.gif';
						} else {
								this.centerUrl = 'img/homePagePic.svg';
						}
						if(lang === 'zh_CN') {
								$('.getStarted').css('left','45px');
						} else {
								$('.getStarted').css('left','5px');
						}
			$('.back').css('top','0');
				},
				methods:{
						backToMenu:function() {
								document.addEventListener('deviceready', function () {
										om2.exit_edit();
								},false);
						},
						next:function() {
								router.push('page1');
						},
						skipTutorial:function() {
								router.push(this.$options.propsData.home.lastPage);
						}
				}
		});

		Vue.component('end', {
				name:'end',
				template: '#end',
				props:['end'],
				data: function () {
						return {
								style: {},
								m1:textsObj.allDone,
								m2:textsObj.findTutorial,
								m3:textsObj.restart,
								m4:textsObj.endDone
						}
				},
				mounted:function(){
			$('.back').remove();
			$('.exit').remove();
			var currentUrl = window.location.href;
						var splitUrl = currentUrl.split('/');
						var urlLength = splitUrl.length;
						var pathResult = splitUrl[urlLength-2];
						if(lang === 'zh_CN') {
								if(pathResult.indexOf('scenseTutorial') > -1) {
										this.m2 = textsObj.findScenesTutorial;
								} else if(pathResult.indexOf('IQTutorial') > -1) {
										this.m2 = textsObj.findIQTutorial;
								} else if(pathResult.indexOf('monitorPage') > -1) {
										this.m2 = textsObj.findMonitorTutorial;
								} else {
										this.m2 = textsObj.findTutorial;
								}
						} else {
								this.m2 = textsObj.findTutorial;
						}
				},
				methods:{
						again:function() {
								TweenLite.to('.again', 0.1,{css:{background:'#FF9012'}});
								setTimeout(function(){
									router.push('page0');
								},100)
						},
						done:function() {
								TweenLite.to('.done', 0.1,{css:{background:'#FF9012'}});
								document.addEventListener('deviceready', function () {
										om2.exit_edit();
								}, false);
						}
				}
		});

		Vue.component('pagination', {
				name:'pagination',
				template: '#pagination',
				props:['pagination'],
				data: function () {
						return {

						}
				},
				mounted:function(){
			
				},
				methods:{
						back:function() {
						    if(this.$options.propsData.pagination.back) {
                                router.push(this.$options.propsData.pagination.back);
                            } else {
						        this.$emit('back');
                            }
						}
				}
		});
		Vue.component('promptBoxUp', {
				name:'promptBoxUp',
				template: '#promptBoxUp',
				props:['prompt'],
				data: function () {
						return {

						}
				},
				mounted:function(){
			
				},
				methods:{

				}
		});
		Vue.component('promptBoxDown', {
				name:'promptBoxDown',
				template: '#promptBoxDown',
				props:['prompt'],
				data: function () {
						return {

						}
				},
				mounted:function(){
			
				},
				methods:{

				}
		});
		Vue.component('promptBoxGot', {
				name:'promptBoxGot',
				template: '#promptBoxGot',
				props:['prompt'],
				data: function () {
						return {
								got: textsObj.got
						}
				},
				mounted:function(){
			
				},
				methods:{

				}
		});
		Vue.component('promptBoxWhite', {
				name:'promptBoxWhite',
				template: '#promptBoxWhite',
				props:['prompt'],
				data: function () {
						return {
								got: textsObj.got
						}
				},
				mounted:function(){
			TweenLite.to('.whitePromptBox', 0.5,{css:{'bottom':'0'}});
				},
				methods:{

				}
		});
		Vue.component('backAndExit', {
				name:'backAndExit',
				template: '#backAndExit',
				props:['btn'],
				data: function () {
						return {
						}
				},
				mounted:function(){
			TweenLite.fromTo('.back', 0.8, {css:{'left':'92%','width':'0'}},{css:{'left':'85%','width':'8%'},delay:0.3});
						TweenLite.fromTo('.exit', 0.8, {css:{'left':'88%','width':'0'}},{css:{'left':'92%','width':'8%'},delay:0.3});
				},
				methods:{
						back:function () {
								router.push(this.$options.propsData.btn.back);
						},
						exit:function () {
								document.addEventListener('deviceready', function () {
										om2.exit_edit();
								}, false);
						}
				}
		});

	Vue.component('topBack', {
		name:'topBack',
		template: '#topBack',
		props: {
			title: {
				type: String,
				default: ''
			},
			revert: {
				type: String,
				default: ''
			},
			test: {
				type: String,
				default: ''
			},
		},
		data: function () {
			return {
			}
		},
		mounted:function(){},
		methods:{}
		});

	Vue.component('leftAside', {
		name: 'leftAside',
		template: '#leftAside',
		data: function () {
			return {
			    room1: textsObj.room1,
			    room2: textsObj.room2,
			    room3: textsObj.room3,
                device1: textsObj.device1,
                device2: textsObj.device2,
                device3: textsObj.device3,
                device4: textsObj.device4,
                device5: textsObj.device5,
                device6: textsObj.device6,
                device7: textsObj.device7,
			}
		},
		mounted: function() {},
		methods: {}
	});

    Vue.component('pop-up-header', {
        name: 'popUpHeader',
        template: '#popUpHeader',
        props: {
            room: {
                type: String,
                default: textsObj.room1
            },
            device: {
                type: String,
                default: textsObj.device2
            }
         },
        data: function () {
            return {}
        },
        methods: {}
    });

      Vue.component('rgbBar', {
        name: 'rgb-bar',
        template: '#rgbBar',
        props: {
          barColors: {
              type: Array,
              default: []
          }
        },
        data: function () {
          return {
          }
        },
        mounted: function () {
        },
        methods: {}
      });
    Vue.component('sceneAside', {
        name: 'scene-aside',
        template: '#sceneAside',
        data: function () {
            return {
                room1: textsObj.room1,
                addGroup: textsObj.addGroup,
            }
        },
        mounted: function () {
        },
        methods: {}
    });
    Vue.component('sceneList', {
        name: 'scene-list',
        template: '#sceneList',
        data: function () {
            return {
                scene: textsObj.scene,
                desktop: textsObj.desktop,
            }
        },
        mounted: function () {
        },
        methods: {}
    });
}