/**
 * Created by Margaret on 2017/3/1.
 * Define
 */
        window.onload = function () {
            var OomiParams = Oomi_command_function.create_new().resource_data();
            var thisComponent = {};
            var baseUrl ='../assets/img/';
            var originalName = OomiParams['relationName'];
            var iconArray = ["scence_dog",
                "scence_tv",
                "scence_leaving_home",
                "scence_coming_home",
                "scence_sunset",
                "scence_work",
                "scence_study",
                "scence_hourglass",
                "scence_dance",
                "scence_cooking",
                "scence_heart",
                "scence_bath",
                "scence_toothbrush",
                "scence_star",
                "scence_raining",
                "scence_power",
                "scence_holiday",
                "scence_pumpkin",
                "scence_basketball",
                "scence_soccer_ball",
                "scence_football",
                "scence_hockey_tick",
                "scence_dj_booth",
                "scence_violin",
                "scence_piano",
                "scence_phone",
                "scence_candle",
                "scence_camera",
                "scence_baby",
                "scence_bathroom",
                "scence_dining_time",
                "scence_painting",
                "scence_music",
                "scence_party",
                "scence_game",
                "scence_pet",
                "scence_alarm_clock",
                "scence_relax",
                "scence_electronicorgan",
                "scence_celebrate",
                "scence_moivetime",
                "scence_evening",
                "scence_bedtime",
                "scence_travel",
                "scence_day",
                "scence_sunrise",
                "scence_holiday_light",
                "scence_wreath",
                "scence_snowman",
                "scence_snow",
                "scence_sun",
                "scence_partly_cloudy",
                "scence_smile_face",
                "scence_sleepy_face",
                "scence_cloudy",
                "scence_lightening"
            ];
            Vue.component('oomi-scene-widget',{
                template:'#_scene_Widget',
                data:function() {
                    return {
                        sceneName: OomiParams['relationName']+'',
                        sceneImgSrc: baseUrl+iconArray[OomiParams['iconId']?OomiParams['iconId']:0]+'.svg'
                    }
                },
                mounted: function() {
                    thisComponent = this;
                    listen();
                    initView();
                },
                watch:{
                    sceneName:function() {
                    }
                },
                methods: {
                    sceneClicked:function() {
                        makeBlocker(600);
                        animationOn();
                        setTimeout(function(){
                            animationOff();
                        },300);
                        sendScene();
                    }
                }
            });

            var app = new Vue({
                el:'#app'
            });

            function initView() {
                setTimeout(function () {
                    runner();
                },10);
                function runner() {
                    resizeComponent();
                    setTimeout(function () {
                        var p1 = $('#sceneNameP1');
                        var p2 = $('#sceneNameP2');
                        var sceneName = $('#sceneName');
                        if (104<p1.width()){
                            thisComponent.sceneName = originalName+'    ';
                            setTimeout(function () {
                                sceneName.css('width',p1.width()+'px');
                                p1.css('position','absolute');
                                p1.addClass('marquee');
                                p2.addClass('marquee2');
                            },100);
                        }else {
                            p1.removeClass('marquee');
                            p2.removeClass('marquee2');
                            p1.css('position','static');
                            sceneName.css('width','100%');
                            thisComponent.sceneName = originalName;
                        }
                    },10);
                }
            }

            function marquee() {
                var p1 = $('#sceneNameP1');
                var p2 = $('#sceneNameP2');
                var sceneName = $('#sceneName');
                if (sceneName.width()>0){
                    runner();
                }else {
                    var a = setInterval(function () {
                        resizeComponent();
                        if (sceneName.width()>0){
                            runner();
                            window.clearInterval(a);
                        }
                    },1000);
                }
                function runner() {
                    resizeComponent();
                    setTimeout(function () {
                        if (104<p1.width()){
                            thisComponent.sceneName = originalName+'    ';
                            setTimeout(function () {
                                sceneName.css('width',p1.width()+'px');
                                p1.css('position','absolute');
                                p1.addClass('marquee');
                                p2.addClass('marquee2');
                            },100);
                        }else {
                            p1.removeClass('marquee');
                            p2.removeClass('marquee2');
                            p1.css('position','static');
                            sceneName.css('width','100%');
                            thisComponent.sceneName = originalName;
                        }
                    },10);
                }
            }
            function marqueePause() {
                var sceneName = $('#sceneName');
                var p1 = $('#sceneNameP1');
                var p2 = $('#sceneNameP2');
                p1.removeClass('marquee');
                p2.removeClass('marquee2');
                p1.css('position','static');
                sceneName.css('width','100%');
                thisComponent.sceneName = originalName;
            }
            function marqueeResume() {
                marquee();
            }
            function makeBlocker(timer){
                var blocker = $('.blocker');
                blocker.css('visibility','visible');
                setTimeout(function () {
                    blocker.css('visibility','hidden');
                },timer);
            }
            function switchImgOn(i){
                thisComponent.sceneImgSrc = baseUrl + iconArray[i]+'_white'+'.svg';
            }

            function switchImgOff(i){
                thisComponent.sceneImgSrc = baseUrl + iconArray[i]+'.svg';
            }

            function animationOn(){
                switchImgOn(Number(OomiParams['iconId']?OomiParams['iconId']:0));
                TweenLite.to('#rect_background', 0.3, {attr:{y:"-100"},ease:Bounce.easeOut});
                TweenLite.to('#SVGID_1_', 0.3, {attr:{x1:"200",y1:"0", x2:"200", y2:"200",delay:0.3},ease:Bounce.easeOut});
                TweenLite.to('#sceneName', 0.3, {css:{color:"#FFFFFF"}});
            }

            function animationOff(){
                switchImgOff(Number(OomiParams['iconId']?OomiParams['iconId']:0));
                TweenLite.to('#rect_background', 0.3, {attr:{y:"-385"}});
                TweenLite.to('#SVGID_1_', 0.3, {attr:{x1:"200",y1:"200", x2:"0", y2:"200",delay:0.3}});
                TweenLite.to('#sceneName', 0.3, {css:{color:"#595757"}});
            }

            function sendScene(){
                cordova.exec(null,null,"FTP2PApi","sendScene",[OomiParams['deviceId']]);
            }

            function shakeThis(doShake){
                if(doShake){
                    $('#oomiScene').addClass('shakeOn').css({
                        'width':96+'%',
                        'height':94+'%',
                        'left':2+'%',
                        'top':3+'%'
                    });
                }else{
                    $('#oomiScene').removeClass('shakeOn');
                    resizeComponent();
                }
            }
            function resizeComponent() {
                var $oomiDeviceHolder = $('#oomiScene');
                var $app = $('#app');
                $oomiDeviceHolder.css({
                    'width':($app.width()-3)+'px',
                    'height':($app.height()-3)+'px',
                    'left':0,
                    'top':0
                })
            }
            function listen(){
                document.addEventListener('deviceready',function(){
                    window.addEventListener('ftdevicestatusupdate',function(data){
                        if (data.title === "widgetShake") {
                            if(data.content === 'true'){
                                shakeThis(true);
                            }else{
                                shakeThis(false);
                            }
                        }
                        if (data.title === "sceneMarquee") {
                            if(data.content === 'true'){
                                marqueeResume();
                            }else{
                                marqueePause();
                            }
                        }
                        if(OomiParams['deviceId'] === data.ID){
                            if(data.title === "changeName" ) {
                                thisComponent.sceneName = data.content+'';
                                originalName = data.content+'';
                                marquee();
                            }
                            if (data.title === "changeRoomName") {
                                // thisComponent.sceneName = data.content+'    ';
                            }
                            if (data.title === "changeRoom") {
                                // thisComponent.sceneName = data.content+'    ';
                            }
                            if (data.title === 'changeSceneIcon'){
                                OomiParams['iconId'] = data.content+'';
                                thisComponent.sceneImgSrc = baseUrl+iconArray[OomiParams['iconId']?OomiParams['iconId']:0]+'.svg'
                            }
                        }
                    },false);
                } , false);
            }
        };