/**
 * Created by qkchung on 17/3/2.
 */

define(['Vue','util/popupTools','jquery_touchy'],
    function(Vue,popupTools,jquery_touchy) {
        var obj = {};
        obj.run = function(nodeID,value,deviceType,operateID,bus){
            var thisComponent = {};
            popupTools.ImportTemplates('#_brightnessController');
            var $brightnessController_content = null;
            var clientWidth = null;
            var clientOffsetLeft = null;
            var $BrightnessPointer = null;
            var $brightnessValue = null;
            var canSend = 0;
            var shouldReceive = 0;
            Vue.component('brightness-controller', {
                name:'brightnessController',
                template: '#_brightnessController',
                data: function () {
                    return {
                        //isOn:true
                        brightValue:false,
                        cx:value
                    }
                },
                mounted:function(){
                    thisComponent = this;
                    $brightnessController_content = $('.brightnessController_content');
                    clientWidth = $brightnessController_content.width();
                    clientOffsetLeft = $brightnessController_content.offset().left;
                    $BrightnessPointer = $('.BrightnessPointer');
                    $brightnessValue = $('.brightnessValue');
                    renderPosition(value);
                    bindTouchy();
                    window.addEventListener('ftdevicestatusupdate', function (data) {
                        if (operateID !== undefined){
                            return 1;
                        }
                        if(shouldReceive !== 0) {
                            return 1;
                        }
                        if (nodeID === data.ID) {
                            if (data.title === "DeviceStatus") {
                                var result = JSON.parse(data.content);
                                for (var key in result) {
                                    if (key === "brightness") {
                                        var brightness = Number(result[key]);
                                        renderPosition(brightness);
                                    }
                                    if (key === "mtLevel") {
                                        var brightness2 = Number(result[key]);
                                        renderPosition(brightness2);
                                    }
                                }
                            }
                        }
                    }, false);
                },
                methods:{

                }
            });

            function bindTouchy(){
                $('.BrightnessPointer').bind('touchy-drag', handleTouchyDragX);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                },false);
            }
            var handleTouchyDragX = function (event, phase, $target, data) {
                if(phase === 'start'){
                    //thisComponent.brightValue = true;
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"])
                    clientX2SVGX(data['startPoint'],$target);
                }else if (phase === 'move') {
                    clientX2SVGX(data['movePoint'],$target);
                } else if (phase === 'end') {
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"])
                    thisComponent.brightValue = false;
                    sendToCube()
                }
            };

            var demo = new Vue({
                el: '.brightnessController',
                data:{
                }
            });
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
            function sendToCube(){
                syncSend(function () {
                    var toSendBrightness = Number(thisComponent.cx);
                    if($('#onOffButtonSVGPath').attr('class') === 'powerOff'){
                        if (bus){
                            bus.$emit('onOff',{});
                        }
                        if(toSendBrightness<1){
                            cordova.exec(null,null,"FTP2PApi",deviceType,[nodeID,"mlevel01",1+'',"mtLevel"]);
                        }else if(toSendBrightness>99){
                            cordova.exec(null,null,"FTP2PApi",deviceType,[nodeID,"mlevel01",99+'',"mtLevel"]);
                        }else{
                            cordova.exec(null,null,"FTP2PApi",deviceType,[nodeID,"mlevel01",toSendBrightness+'',"mtLevel"]);
                        }
                        setTimeout(function () {
                             cordova.exec(null, null, "FTP2PApi", deviceType, [nodeID, "binsw01", 'true', "status"]);
                        },100);
                        if (operateID !== undefined){
                            if(toSendBrightness<1){
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",1+'',"mtLevel",operateID]);
                            }else if(toSendBrightness>99){
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",99+'',"mtLevel",operateID]);
                            }else{
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",toSendBrightness+'',"mtLevel",operateID]);
                            }
                             setTimeout(function () {
                                cordova.exec(null, null, "FTP2PApi", 'saveSceneAction', [nodeID, "binsw01", 'true', "status",operateID]);
                             },100);
                        }
                    }else{
                        if(toSendBrightness<1){
                            cordova.exec(null,null,"FTP2PApi",deviceType,[nodeID,"mlevel01",1+'',"mtLevel"]);
                        }else if(toSendBrightness>99){
                            cordova.exec(null,null,"FTP2PApi",deviceType,[nodeID,"mlevel01",99+'',"mtLevel"]);
                        }else{
                            cordova.exec(null,null,"FTP2PApi",deviceType,[nodeID,"mlevel01",toSendBrightness+'',"mtLevel"]);
                        }
                        if (operateID !== undefined){
                            if(toSendBrightness<1){
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",1+'',"mtLevel",operateID]);
                            }else if(toSendBrightness>99){
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",99+'',"mtLevel",operateID]);
                            }else{
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",toSendBrightness+'',"mtLevel",operateID]);
                            }
                        }
                    }

                });
            }
            function clientX2SVGX(e,$target){
                var realPosition = e['x'] - clientOffsetLeft;
                var toRenderPosition = realPosition*200/clientWidth;
                if(toRenderPosition>8&&toRenderPosition<192){
                    $($target).attr('cx',toRenderPosition);
                    $($target).siblings('circle').attr('cx',toRenderPosition);
                    $($target).siblings('text').attr('x',toRenderPosition-5);
                    var x = (toRenderPosition/2);
                    var y = x * 100 / 93 - 3.19;
                    y = Math.floor(y);
                    thisComponent.cx = y;
                }
            }
            function renderPosition(x){
                x = typeof x === "number" ?(x<=0 || isNaN(x) === true ?99:x):99;
                var realPosi = (x+3.19)*93/100 ;
                realPosi = realPosi*2;
                $BrightnessPointer.attr('cx',realPosi);
                thisComponent.cx = x;
            }
        };
        return obj;
    });