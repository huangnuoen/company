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
            var OomiParams = config.getParams();
            var om2 = Oomi_command_function.create_new();
            var Param = om2.resource_data();
            Vue.component('oomi-second-widget',{
                template: '#desktopSecondWidget',
                data:function() {
                    return {
                        deviceImg: deviceInfo.deviceImg,
                        deviceName: deviceInfo.deviceName,
                        deviceRoom: deviceInfo.deviceRoom,
                        nestValue: deviceInfo.nestValue,
                        signOrNot:false,
                        //linearRainbowOrNot: true,
                        airStatus: true
                    }
                },
                mounted: function () {
                    resizeComponent();
                    findCircleWrapperPosition();
                    showSign();
                    thisComponent = this;
                    $('#desktopSecondWidget').remove();
                    listen();
                },
                methods: {
                    widgetClicked:function() {
                        var CurrentLocation = window.location.href;
                        var locationHead = "www/desktop_widget/"+deviceInfo.fileName+"/popup.html";
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

            function listen(){
                getDeviceName();
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (data.title === "widgetShake") {
                        if(data.content == 'true'){
                            shakeThis(true)
                        }else{
                            shakeThis(false)
                        }
                    }
                    if (OomiParams['deviceId'] === data.ID) {
                        if (data.title === "changeName") {
                            thisComponent['deviceName'] =  data.content;
                        }
                        if (data.title === "changeRoomName") {
                            thisComponent['deviceRoom'] =  data.content;
                        }
                        if (data.title === "changeRoom") {
                            thisComponent['deviceRoom'] =  data.content;
                        }
                    }
                    if (data.title === "changeIcon") {
                        var iconId = data.content+'';
                        var icon = '';
                        switch (iconId){
                            case '0':icon='wshutter0';break;
                            case '1':icon='wshutter1';break;
                            case '2':icon='wshutter2';break;
                            case '3':icon='wshutter3'; break;
                            case '4':icon='wshutter4'; break;
                            case '5':icon='wshutter5';break;
                            default: icon='wshutter0';
                        }
                        thisComponent.deviceImg = '../src/assets/img/'+icon+'.svg';
                    }
                }, false);
            }
            function getDeviceName(){
                cordova.exec(function (data) {
                    var myData = JSON.parse(data);
                    thisComponent['deviceName'] =  myData['value'];
                    thisComponent['deviceRoom'] = myData['roomName'];
                }, null, "FTP2PApi", "getDeviceName", [OomiParams['deviceId']]);
            }

            function showSign() {
                if(thisComponent.deviceName == 'Nest Thermostat') {
                    thisComponent.signOrNot = true;
                } else {
                    thisComponent.signOrNot = true;
                }
            }

            // 调整边框布局
            function resizeComponent() {
                var $oomiDeviceHolder = $('.widgetWrapper');
                var $app = $('#app');
                $oomiDeviceHolder.css({
                    'width':($app.width()-2)+'px',
                    'height':($app.height()-2)+'px',
                    'left':'0',
                    'top':'0'
                })
            }

            // 固定动画圆心
            function findCircleWrapperPosition() {
                var $app = $('#app');
                var CircleWrapper = $('.circleWrapper');
                CircleWrapper.css({'width':$app.width()+'px','height':$app.height()+'px'});
                if($app.height()<$app.width()){
                    var toRenderTop = ($app.width() - $app.height())/2;
                    CircleWrapper.css({'height':$app.width()+'px','top':-toRenderTop+'px'});
                }else {
                    CircleWrapper.css({'width':$app.height()+'px'});
                }
            }
            function shakeThis(doShake){
                if(doShake){
                    $('#widgetWrapper').addClass('shakeOn').css({
                        'width':96+'%',
                        'height':90+'%',
                        'left':2+'%',
                        'top':3+'%'
                    });
                }else{
                    $('#widgetWrapper').removeClass('shakeOn');
                    resizeComponent();
                }
            }
            // 压缩页面时
            window.onresize = function(){
                resizeComponent();
                findCircleWrapperPosition();
                // setPercentageValue(70);
                // setLeafValue(55);
            };

            // 获取deviceName
            function setDeviceName(deviceName) {
                thisComponent.deviceName = deviceName;
            }

            // 获取deviceRoom
            function setDeviceRoom(deviceRoom) {
                thisComponent.deviceRoom = deviceRoom;
            }

            // 获取sign状态
            function getSignStatus() {

            }

            //function switchStatus(){
            //    if(thisComponent.OnOff) {
            //        thisComponent.linearRainbowOrNot = false;
            //    } else {
            //        thisComponent.linearRainbowOrNot = true;
            //    }
            //}
        };
        return obj;
    });
