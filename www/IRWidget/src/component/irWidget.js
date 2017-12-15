/**
 * Created by qkchung on 17/4/11.
 * Component
 */

define(['vue','jquery','TweenLite','TimelineLite','AttrPlugin','config'],
    function(Vue,$,TweenLite,TimelineLite,AttrPlugin,config) {
        var obj = {};
        obj.run = function() {
            var deviceInfo = config.device;
            var thisComponent ={};
            var om2 = Oomi_command_function.create_new();
            var Param = om2.resource_data();
            var resourceID=om2.resource_list()[0].ID;
            Vue.component('oomi-ir-widget',{
                template: '#desktopIRWidget',
                data:function() {
                    return {
                        deviceImg: deviceInfo.deviceImg,
                        deviceName: Param['relationName'],
                        OnOff:deviceInfo.OnOff,
                        linearRainbowOrNot: true
                    }
                },
                mounted: function () {
                    var $app = $('#app');
                    var a = 0;
                    if ($app.width() !== 0){
                        resizeComponent();
                    }else {
                        a = setInterval(function () {
                            if($app.width() !== 0){
                                resizeComponent();
                                clearInterval(a);
                            }
                        },1000);
                    }


                    thisComponent = this;
                    document.addEventListener('deviceready',function(){
                        window.addEventListener('ftdevicestatusupdate',function(data){
                            if (data.title === "widgetShake") {
                                if(data.content == 'true'){
                                    shakeThis(true)
                                }else{
                                    shakeThis(false)
                                }
                            }
                        },false);
                    } , false);

                },
                watch: {


                },
                methods: {
                    widgetClicked:function() {
                        var CurrentLocation = window.location.href;
                        var locationHead = "www/IRWidget/"+deviceInfo.fileName+"/popup.html";
                        var locationParams = CurrentLocation.split('#')[1];
                        var splitLocationParams = locationParams.split('&');
                        var currentDeviceName = this.deviceName;
                        for(var i=0; i<splitLocationParams.length; i++) {
                            if(splitLocationParams[i].indexOf('relationName') >= 0) {
                                var getRelationName = splitLocationParams[i];
                                locationParams = locationParams.replace(getRelationName,'relationName='+this.deviceName);
                            }
                            if(splitLocationParams[i].indexOf('language') >= 0) {
                                locationParams = locationParams.replace(splitLocationParams[i],'language='+Param['language']);
                            }
                        }
                        var popupLocation = locationHead + '#' + locationParams;
                        cordova.exec(function (data) {}, null, "FTP2PApi","IRWidgetPopup",[popupLocation]);
                    }
                }
            });

            var app = new Vue({
                el: '#app',
                data:{
                }
            });
            function shakeThis(doShake){
                if(doShake){
                    $('.widgetWrapper').addClass('shakeOn').css({
                        'width':96+'%',
                        'height':90+'%',
                        'left':2+'%',
                        'top':3+'%'
                    });
                }else{
                    $('.widgetWrapper').removeClass('shakeOn');
                    resizeComponent();
                }
            }

            // 调整边框布局
            function resizeComponent() {
                var widgetWrapper =  $('.widgetWrapper');
                var $app = $('#app');
                widgetWrapper.css({
                    'width':($app.width()-3)+'px',
                    'height':($app.height()-3)+'px',
                    'left':0+'px',
                    'top':0+'px'
                })
            }
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if(data.title === "Language"){
                    Param['language'] = data.content;
                }
                if (Param['relationID'] === data.ID) {
                    if(data.title=== "changeName"){
                        thisComponent.deviceName = data.content;
                    }
                }
            }, false);
        };
        return obj;
    });
