/**
 * Created by qkchung on 2017/8/9.
 */
    window.onload = function() {
        var om2 = Oomi_command_function.create_new();
        var Param = om2.resource_data();
        var lang = Param.language;
        var textsOBJ = null;
        var alertTitle = $('.alertTitle');
        var firstOptions = $('.alertOptions1');
        var secondOptions = $('.alertOptions2');
        var alertTips = $('#alertTips');
        var canSend = 0;
        var shouldReceive = 0;
        var mySwiper = new Swiper('#alertType',{
            direction: 'vertical',
            onTouchStart:function() {
                // 避免与touch冲突
                cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
            },
            onSliderMove:function(swiper,event) {
                // 避免与touch冲突
                // cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                var clickedElets = event.target;
                var translate = mySwiper.translate;
                if(translate <= -swiper.slides[0].scrollHeight/2) {
                    secondOptionsStyle();
                }else {
                    firstOptionsStyle();
                }
            },
            onTouchEnd:function(swiper,event) {
                var translate = mySwiper.translate;
                if(textsOBJ !== null) {
                    if(firstOptions.hasClass('swiper-slide-active')) {
                        sendToCube('notification');
                        alertTips.text(textsOBJ.IQ_ALERT_TIPS_Notification);
                    } else {
                        sendToCube('pop-up');
                        alertTips.text(textsOBJ.IQ_ALERT_TIPS_Popup);
                    }
                }
            },
            onTransitionEnd:function(swiper) {
                $('.swiper-slide-active').css({"transition":"all 1s","color":"#F26F21","font-size":"20px"});
                $('.swiper-slide-active').siblings().css({"transition":"all 1s","color":"#9E9E9F","font-size":"18px"});
            }
        })

        // 翻译
        languageSwitcher(lang);
        function languageSwitcher(lang){
            var scriptOBJ = selectLanguage2(lang);
            $.getScript(scriptOBJ.url, function () {
                textsOBJ = setAllTextLanguage(scriptOBJ.which);
                initText(textsOBJ);
            });
        }

        function secondOptionsStyle() {
            firstOptions.css({"transition":"all 1s","color":"#9E9E9F","font-size":"18px"});
            secondOptions.css({"transition":"all 1s","color":"#F26F21","font-size":"20px"});
        }

        function firstOptionsStyle() {
            firstOptions.css({"transition":"all 1s","color":"#F26F21","font-size":"20px"});
            secondOptions.css({"transition":"all 1s","color":"#9E9E9F","font-size":"18px"});
        }

        function initText(textsOBJ) {
            alertTitle.text(textsOBJ.IQ_ALERT_TITLE);
            firstOptions.text(textsOBJ.IQ_ALERT_POP);
            secondOptions.text(textsOBJ.IQ_ALERT_Notification);
        }

        // 初始化获取类型
        function getType(res) {
            if(textsOBJ !== null || textsOBJ !== 'null') {
                if(res === 'pop-up') {
                    mySwiper.slideTo(0);
                    alertTips.text(textsOBJ.IQ_ALERT_TIPS_Popup);
                    firstOptionsStyle();
                } else if(res === 'notification') {
                    mySwiper.slideTo(1);
                    alertTips.text(textsOBJ.IQ_ALERT_TIPS_Notification);
                    secondOptionsStyle();
                } else {
                    mySwiper.slideTo(0);
                    alertTips.text(textsOBJ.IQ_ALERT_TIPS_Popup);
                    firstOptionsStyle();
                }
            } else {
                alertTips.text(textsOBJ.IQ_ALERT_TIPS_Popup);
            }
        }

        // 防止暴击
        function syncSend(fun) {
            window.clearTimeout(canSend);
            canSend = setTimeout(function () {
                window.clearTimeout(shouldReceive);
                shouldReceive = setTimeout(function () {
                    window.clearTimeout(shouldReceive);
                    shouldReceive = 0;
                },5000);
                if(fun){
                    fun();
                }
                window.clearTimeout(canSend);
                canSend = 0;
            },300);
        }
        // 滑动事件
        function sendToCube(type) {
            var str=Param.widgetId;
            var array=str.split('_');
            var nodeid=array[1];
            syncSend(function(){
                cordova.exec(null, null, "FTP2PApi", "alertType", [nodeid, type, 'type', Param['operateID']]);
            })
        }

        function updateUI(data, find, fun) {
                var obj = stringToJson(data);
                var arry = obj.value;
                if (arry.length > 0) {
                    for (var i in arry) {
                        if(typeof arry[i] === 'object') {
                            if (arry[i] !== null && arry[i] !== 'null'){
                                for (var j in arry[i]) {
                                    if (j === 'type') {
                                        if (fun){
                                            fun(arry[i][j]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    if (fun){
                        fun(null);
                    }
                }
                return (arry.length>0);
                function stringToJson(data) {
                    var result = '';
                    if (data.indexOf('\"[') > 0 || data.indexOf(']\"') > 0) {
                        var str3 = data.replace('\"[', '[');
                        result = str3.replace(']\"', ']');
                    }
                    return JSON.parse(result);
                }
            };

        // Get data
        document.addEventListener('deviceready', function (){
//            document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});
            getData();
            function getData() {
                cordova.exec(function (data) {
                    updateUI(data, 'alertType', function plugUpdate(result) {
                        if(result === 'null' || result === null) {
                            sendToCube('pop-up');
                            alertTips.text(textsOBJ.IQ_ALERT_TIPS_Popup);
                        } else {
                            getType(result);
                        }
                    });
                }, null, "FTP2PApi", "querySceneActionStatus", [Param.operateID]);
            }
        },false);

        // 监听语言切换
        window.addEventListener('ftdevicestatusupdate', function (data) {
            if(data.title === "Language"){
                languageSwitcher(data.content);
            }
        }, false);
    }
