/**
 * Created by qkchung on 17/2/28.
 */
define(['util/popupTools','TweenLite','TimelineLite','AttrPlugin','Vue'],
    function( popupTools , TweenLite,  TimelineLite, AttrPlugin, Vue) {
        var obj = {};
        obj.run = function(nodeID,textsOBJ,modes){
            var canSend = 0;
            var shouldReceive = 0;
            var thiComponent = null;
            Vue.component('ac', {
                name:'ac',
                template: '#_AC',
                highLighter: null,
                textLighter: null,
                data: function () {
                    return {
                        isOn:true,
                        onOff:textsOBJ.AC_off,
                        enSave:textsOBJ.AC_energySave,
                        sCool:textsOBJ.AC_StrongCool,
                        cool:textsOBJ.AC_cool,
                        warm:textsOBJ.AC_warm
                    }
                },
                mounted:function(){
                    this.highLighter = $('.highLighter');
                    this.textLighter = $('.texts');
                    thiComponent = this;
                    initLearningStatus(modes);
                    listen();
                },
                methods:{
                    power : function () {
                        this.highEffect('power',1);
                    },
                    energySave : function () {
                        this.highEffect('energySave',2);
                    },
                    strongCool : function () {
                        this.highEffect('strongCool',3);
                    },
                    coolx : function () {
                        this.highEffect('cool',4);
                    },
                    warmx : function () {
                        this.highEffect('warm',5);
                    },
                    highEffect: function(button,mode){
                        if($('#'+button).css('opacity') !== '1'){
                            cordova.exec(null, null, "FTP2PApi", "learnModes", [nodeID,mode]);
                        } else {
                            TweenLite.to(this.highLighter, 0.3, {attr:{stroke:"#B1B0B0"}});
                            TweenLite.to(this.textLighter, 0.3, {css:{color:"#585757"}});
                            TweenLite.to('.' + button + 'HighLighter', 0.5, {attr:{stroke:"#F26F21"}});
                            TweenLite.to('.' + button + 'texts', 0.5, {css:{color:"#F26F21"}});
                            syncSend(function () {
                                cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeID, "IRBlaster01", mode, "sendkey"]);
                            });
                        }
                    }
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

            function initLearningStatus(learnedModes) {
                var modesArry = learnedModes;
                var map = {
                    1 : 'power',
                    2 : 'energySave',
                    3 : 'strongCool',
                    4 : 'cool',
                    5 : 'warm'
                };
                for(var i=0; i<modesArry.length; i++) {
                    $('#'+map[modesArry[i]]).css('opacity',1);
                }
            }
            function listen() {
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (nodeID === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            var currentR = false;
                            for (var key in result) {
                                if (key === "learnstatus") {
                                    if (result[key] === 'true'){
                                        currentR = true;
                                    }
                                }
                            }
                            setTimeout(function () {
                                for (var key2 in result) {
                                    if (key2 === "learnkey") {
                                        if(currentR === true){
                                            initLearningStatus([Number(result[key2])]);
                                            currentR = false;
                                        }
                                    }
                                }
                            },100)
                        }
                    }
                }, false);
            }
            var demo = new Vue({
                el: '.AC_content'
            })
        };
        return obj;
    });