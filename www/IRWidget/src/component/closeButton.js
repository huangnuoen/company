/**
 * Created by Margaret on 17/3/2017.
 */
define(['util/popupTools','Vue'],
    function( popupTools ,Vue) {
        var obj = {};
        obj.run = function(sendCommand,initvalue,listenValue){
            popupTools.ImportTemplates('#_closeButton');
            Vue.component('close-button', {
                name:'closeButton',
                template: '#_closeButton',
                data: function () {
                    return {

                    }
                },
                mounted:function(){
                    //$('#_onOffButton').remove();

                },
                methods:{
                    clickOff:function() {
                        var a = setTimeout(function(){
                            cordova.exec(null, null, "FTP2PApi", "exitPopupWidget", ['close']);
                        },300)

                    }
                }
            });
            var demo = new Vue({
                el: '.closeIconSide',
                data:{
                }
            })
        };
        return obj;
    });