/**
 * Created by qkchung on 2017/10/10.
 */
define(['Vue','util/popupTools'],
    function(Vue,popupTools) {
        var obj = {};
        obj.run = function(nodeID,operateID){
            var thisComponent = {};
            // popupTools.ImportTemplates('#_brightnessController');
            var canSend = 0;
            var shouldReceive = 0;
            var shutterCode = 0;
            Vue.component('shutter-button', {
                name:'shutterButton',
                template: '#_shutterButton',
                data: function () {
                    return {

                    }
                },
                mounted:function(){
                    thisComponent = this;
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
                                    if (key === "mtLevel") {
                                        // var brightness2 = Number(result[key]);
                                        // renderPosition(brightness2);
                                    }
                                }
                            }
                        }
                    }, false);
                },
                methods:{
                    start:function() {
                        shutterCode = 'start';
                        sendToCube();
                    },
                    end:function() {
                        shutterCode = 'end';
                        sendToCube();
                    },
                    stop:function() {
                        shutterCode = 'stop';
                        sendToCube();
                    }
                }
            });


            var demo = new Vue({
                el: '.shutterButton',
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
                    if(shutterCode === 'start'){
                        cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",0+'',"mtLevel"]);
                    }else if(shutterCode === 'end'){
                        cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",99+'',"mtLevel"]);
                    }else if(shutterCode === 'stop'){
                        cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",1000+'',"mtLevel"]);
                    }
                });
            }
        };
        return obj;
    });