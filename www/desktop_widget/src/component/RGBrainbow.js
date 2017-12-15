/**
 * Created by qkchung on 17/3/14.
 */
/**
 * Created by qkchung on 17/2/28.
 */
define(['jquery','util/popupTools','Vue'],
    function($, popupTools ,Vue) {
        var obj = {};
        obj.run = function(nodeID,textsOBJ,commandType,operateID,bus){
            popupTools.ImportTemplates('#_rainbow');
            var sp = 0;
            var transition = 0;
            var canSend = 0;
            var shouldReceive = 0;
            Vue.component('rainbow', {
                name:'rainbow',
                template: '#_rainbow',
                data: function () {
                    return {
                        speed:textsOBJ.speed,
                        Slowest:textsOBJ.slowest,
                        Slow:textsOBJ.slow,
                        Normal:textsOBJ.normal,
                        Fast:textsOBJ.fast,
                        Fastest:textsOBJ.fastest,
                        Transition:textsOBJ.transition,
                        continuous:textsOBJ.continuous,
                        smooth:textsOBJ.smooth,
                        instant:textsOBJ.instant
                    }
                },
                mounted:function(){
                    resetTextPositions();
                    setCurrentSpeedStatus();
                    setCurrentTransitionStatus();
                    initCommands();
                    getDeviceData();
                    listener();
                },
                methods:{
                    s1: function () {
                        highLight('slowest');
                        sp = 0;
                        send()
                    },
                    s2: function () {
                        highLight('slow');
                        sp = 1;
                        send()
                    },
                    s3: function () {
                        highLight('normal');
                        sp = 2;
                        send()
                    },
                    s4: function () {
                        highLight('fast');
                        sp = 3;
                        send()
                    },
                    s5: function () {
                        highLight('fastest');
                        sp = 4;
                        send()
                    },
                    t1:function () {
                        transition = 0;
                        highLightTransition('continuous');
                        send()
                    },
                    t2:function (){
                        transition = 1;
                        highLightTransition('smooth');
                        send()
                    },
                    t3: function () {
                        transition = 2;
                        highLightTransition('instant');
                        send()
                    }
                }
            });

            function initCommands(){
                if(localStorage[nodeID +'RainbowspeedCM']){
                    sp =localStorage[nodeID +'RainbowspeedCM'];
                }else{
                    localStorage[nodeID +'RainbowspeedCM'] = 0;
                    sp = 0;
                }
                if(localStorage[nodeID +'RainbowtransitionCM']){
                    transition = localStorage[nodeID +'RainbowtransitionCM']
                }else{
                    localStorage[nodeID +'RainbowtransitionCM'] = 0;
                    transition = 0;
                }
            }
            function setCurrentSpeedStatus() {
                var clickedSpeed = localStorage[nodeID +'speedRainbowEL'];
                if(clickedSpeed) {
                    highLight(clickedSpeed);
                } else {
                    highLight('slowest');
                }
            }

            function setCurrentTransitionStatus() {
                var clickedTransition = localStorage[nodeID +'transitionRainbowEL'];
                if(clickedTransition != undefined) {
                    highLightTransition(clickedTransition)
                } else {
                    highLightTransition('continuous');
                }
            }

            function highLightTransition(el){
                $('.transi').find('span').css({'border-bottom':'none','color':'#595757'});
                $('.'+el).find('span').css({'border-bottom':'1px solid #E66C25','color':'#E66C25'});
                localStorage[nodeID+'transitionRainbowEL'] = el;
            }
            function highLight(e){
                $('.speed').find('span').css({'border-bottom':'none','color':'#595757'});
                $('.speedTopic span').css('color','#9E9E9F');
                $('.'+e).find('span').css({'border-bottom':'1px solid #E66C25','color':'#E66C25'});
                localStorage[nodeID +'speedRainbowEL'] = e;
            }
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
            // pattern和rainbow模式只发configuration set，但若关之后再打开只会存储上一次的mtlevel也就是0，因此调节颜色的时候要发status否则亮不起来
            function send(){
                syncSend(function () {
                    var command = 'rainbow_'+sp+'_'+transition+'_12345670_'+$('.brightnessValue').text();
                    if($('#onOffButtonSVGPath').attr('class') === 'powerOff'){
                        if (bus){
                            bus.$emit('onOff',{});
                        }
                        localStorage[nodeID +'RainbowspeedCM'] = sp;
                        localStorage[nodeID +'RainbowtransitionCM'] = transition;
                        cordova.exec(null, null, "FTP2PApi", commandType, [nodeID, "binsw01", 'true', "status"]);
                        setTimeout(function () {
                            cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",command,"color"]);
                        },100);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", 'true', "status",operateID]);
                            setTimeout(function(){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", command, "color",operateID]);
                            },100)
                        }
                    } else {
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",command,"color"]);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", command, "color",operateID]);
                        }
                    }

                });
            }
            function resetTextPositions(){
                var h = $('.rainbowSpeed').height();
            }

            function listener(){
                if (operateID !== null){
                    return 1;
                }
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (nodeID === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "color") {
                                    var re = String(result[key]);
                                    renderRainbow(re);
                                }
                            }
                        }
                    }
                }, false);
            }
            function getDeviceData(){
                if (operateID !== null){
                    cordova.exec(function (data) {
                        popupTools.updateUI(data,'color', function (result) {
                            console.log('operateRAINBOW:'+result);
                            renderRainbow(result);
                        });
                    }, null, "FTP2PApi", "querySceneActionStatus", [operateID, "binsw01"]);
                } else {
                    cordova.exec(function (data) {
                        popupTools.updateUI(data,'color', function (result) {
                            renderRainbow(result);
                        });
                    }, null, "FTP2PApi", "getDeviceStatus", [nodeID, "binsw01"]);
                }
            }
            function renderRainbow(re) {
                if(re.indexOf('_')>-1){
                    if(re.indexOf('rainbow')>-1){
                        var val = re.split('_');
                        sp = Number(val[1]);
                        switch (sp){
                            case 0:highLight('slowest');break;
                            case 1:highLight('slow');break;
                            case 2:highLight('normal');break;
                            case 3:highLight('fast');break;
                            case 4:highLight('fastest');break;
                        }
                        transition = Number(val[2]);
                        switch (transition){
                            case 0:highLightTransition('continuous');break;
                            case 1:highLightTransition('smooth');break;
                            case 2:highLightTransition('instant');break;
                        }
                    }
                }
            }
        };
        return obj;
    });