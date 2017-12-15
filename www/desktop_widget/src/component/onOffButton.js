/**
 * Created by qkchung on 17/2/28.
 */
define(['util/popupTools','Vue'],
    function( popupTools ,Vue) {
        var obj = {};
        obj.run = function(sendCommand,initvalue,listenValue,nodeID,bus){
            popupTools.ImportTemplates('#_onOffButton');
            var canSend = 0;
            var shouldReceive = 0;
            var thiComponent = null;
            var oomiParams = Oomi_command_function.create_new().resource_data();
            Vue.component('on-off-button', {
                name:'onOffButton',
                template: '#_onOffButton',
                data: function () {
                    return {
                        isOn:initvalue
                    }
                },
                mounted:function(){
                    //$('#_onOffButton').remove();
                    thiComponent = this;
                    if(oomiParams['operationtype']) {
                        var getGroupStatus = localStorage.getItem('groupStatus'+nodeID);
                        if(getGroupStatus == 'true') {
                            thiComponent.isOn = true;
                        } else if(getGroupStatus == 'false'){
                            thiComponent.isOn = false;
                        } else {
                            thiComponent.isOn = true;
                        }
                    }
                    if(listenValue){
                        listenValue(function(data){
                            thiComponent.isOn = data;
                        })
                    }
                    if(bus){
                        bus.$on('onOff',function (data) {
                            thiComponent.isOn = true;
                        });
                    }
                },
                methods:{
                    onOffClick : function () {
                        var getLockedStatus = localStorage.getItem('isLocked'+nodeID);
                        if(getLockedStatus == 'true') {
                            return 1;
                        } else {
                            thiComponent.isOn = !thiComponent.isOn;
                            if(sendCommand){
                                syncSend(function () {
                                    sendCommand(thiComponent.isOn);
                                });

                            }
                            if(oomiParams['operationtype']) {
                                localStorage.setItem('groupStatus'+nodeID,thiComponent.isOn);
                            }
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
            var demo = new Vue({
                el: '.onOffButton'
            })
        };
        return obj;
    });