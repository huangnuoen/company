/**
 * Created by qkchung on 17/2/21.
 * Component
 */

define(['vue','jquery','TweenLite','TimelineLite','AttrPlugin','CSSPlugin','config'],
    function(Vue,$,TweenLite,TimelineLite,AttrPlugin,CSSPlugin,config) {
        var obj = {};
        obj.run = function() {
            var deviceInfo = config.device;
            var thisComponent ={};
            var OomiParams = config.getParams();
            var canSend = 0;
            var shouldReceive = 0;
            Vue.component('oomi-desktop-widget',{
                template: '#desktopWidget',
                data:function() {
                    return {
                        deviceImg: '../src/assets/img/'+deviceInfo.deviceImg+'-on.svg',
                        deviceName: deviceInfo.deviceName,
                        deviceRoom: deviceInfo.deviceRoom,
                        leafData: deviceInfo.leafData,
                        percentage: deviceInfo.percentageData,
                        roomOrNot: true,
                        leafColor: {
                            fill: '#B81C25'
                        },
                        percentColor: {
                            fill: 'transparent',
                            stroke: 'transparent'
                        },
                        leafStatus: deviceInfo.status.leaf,
                        percentStatus: deviceInfo.status.percentage,
                        warningStatus: deviceInfo.status.warn,
                        OnOff:deviceInfo.OnOff
                    }
                },
                mounted: function () {
                    resizeComponent();
                    findCircleWrapperPosition();
                    thisComponent = this;
                    $('#desktopWidget').remove();
                    config.listener(OomiParams['deviceId'],setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,setPercentageValue,shakeThis,percentageColor,changeIcon);
                },
                watch: {
                    // 当leafData大于1时且为plug widget时， 出现叶子标志，压缩页面实现变色
                    leafData: function() {
                        this.watchLeafStatus();
                        this.changeLeafColor();
                    },
                    // 当percentagedata大于1时且为bulb和colorStrip widget时出现百分比能量标志
                    percentage: function() {
                        this.watchPercentStatus();
                        this.changePercentColor();
                    }
                },
                methods: {
                    watchLeafStatus:function() {
                        switchToLeaf();
                    },

                    changeLeafColor:function() {
                        leafColor(this.leafData);
                    },
                    watchPercentStatus:function() {
                        switchToPercentage();
                    },
                    changePercentColor:function() {
                        //percentageColor();
                    },

                    widgetClicked:function() {
                        if(this.warningStatus == true){
                            return;
                        }
                        //makeBlocker(600);
                        var getLockedStatus = localStorage.getItem('isLocked'+OomiParams['deviceId']);
                        var outCircle = document.getElementsByClassName('outCircle');
                        var inCircle = document.getElementsByClassName('inCircle');
                        if(this.leafStatus == true && getLockedStatus == 'true') {
                            return 1;
                        } else {
                            TweenLite.to(outCircle, 0.3, {attr:{r:"350", opacity:"0.4"}});
                            TweenLite.to(inCircle, 0.3, {attr:{r:"175", opacity:"0.6"}});
                            TweenLite.to(outCircle, 0.3, {attr:{r:"0", opacity:"0.1"},delay:0.3, ease:Bounce.easeOut});
                            TweenLite.to(inCircle, 0.3, {attr:{r:"0", opacity:"0.1"}, delay:0.3,ease:Bounce.easeOut});
                            //}
                            thisComponent.OnOff =!thisComponent.OnOff;
                            // 同步RGB Group
                            if(OomiParams['operationtype']) {
                                localStorage.setItem('groupStatus'+OomiParams['operationtype'],thisComponent.OnOff);
                            }
                            if(this.leafStatus == true) {
                                if(thisComponent.OnOff == false) {
                                    leafColor('turnGray');
                                } else if(thisComponent.OnOff == true){
                                    leafColor(this.leafData);
                                }
                            }
                            switchImg();
                            sendToCube();
                        }
                    }
                }
            });

            var app = new Vue({
                el: '#app',
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
                    config.sendCommand(OomiParams['deviceId'],thisComponent.OnOff);
                })
            }
            // 调整边框布局
            function resizeComponent() {
                var $oomiDeviceHolder = $('#widgetWrapper');
                var $app = $('#app');
                $oomiDeviceHolder.css({
                    'width':($app.width()-3)+'px',
                    'height':($app.height()-3)+'px',
                    'left':0,
                    'top':0
                })
            }

            function makeBlocker(timer){
                var blocker = $('.blocker');
                blocker.css('visibility','visible');
                setTimeout(function () {
                    blocker.css('visibility','hidden');
                },timer);
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

            function setStatus(status){
                if(shouldReceive !== 0){
                    return 1;
                }
                thisComponent.OnOff = status;
                switchImg();
                if (status === false){
                    if(thisComponent.leafStatus === true) {
                        if(thisComponent.OnOff === false) {
                            setTimeout(function () {
                                leafColor('turnGray');
                            },100);
                        }
                    }
                } else if(status === true){
                    if(thisComponent.leafStatus === true) {
                        if(thisComponent.OnOff == true){
                            leafColor(thisComponent.leafData);
                        }
                    }
                }
            }
            // 获取deviceRoom
            function setDeviceRoom(deviceRoom) {
                thisComponent.deviceRoom = deviceRoom;
            }

            // 获取百分比值
            function setPercentageValue(value) {
                var getValue = Number(value);
                if(getValue){
                    if(getValue == 0){
                        return 1;
                    }else if(getValue == 99){
                        thisComponent.percentage = 100;
                    } else {
                        thisComponent.percentage = getValue;
                    }
                }
            }

            // 获取叶子能量值
            function setLeafValue(value) {
                thisComponent.leafData = value;

            }



            // 根据百分比数值大小更改颜色
            function percentageColor(color) {
                thisComponent.percentColor.stroke = "#C7C8C8";
                var reg = /^[0-9a-fA-F]{6}$/;
                var s = reg.test(color+'');
                var commandColor = {
                    'coolWhite':'CAE9FB',
                    'pureWhite':'F6FBFE',
                    'warmWhite':'FFDCA6',
                    '78FF00':'80FF00',
                    '003000':'00CC00',
                    '008080':'00FFFF',
                    'FFC700':'FFFF00',
                    '000040':'0000FF',
                    'FF3800':'FF8000',
                    '270010':'FF007F',
                    'FF0000':'FF0000',
                    '080010':'7F00FF',
                    '7864064':'80FF00',
                    '12288':'00CC00',
                    '-32896':'00FFFF',
                    '-80128':'FFFF00',
                    '64':'0000FF',
                    '-51200':'FF8000',
                    '2555920':'FF007F',
                    '-65536':'FF0000',
                    '524304':'7F00FF'
                };
                if(commandColor[color+'']){
                    thisComponent.percentColor.fill = '#'+commandColor[color+''];
                }else if(s){
                    thisComponent.percentColor.fill = '#'+color;
                }else if(color.indexOf('random') > -1) {
                    thisComponent.percentColor.fill = '#'+color.split('random')[1];
                }else{
                    thisComponent.percentColor.fill = '#'+'FFFFFF';
                }
            }

            // 当叶子能量大于1且为plug device时出现叶子能量标志
            function switchToLeaf() {
                //if(thisComponent.deviceImg == 'plug') {
                    thisComponent.leafStatus = true;
                    thisComponent.percentStatus = false;
                    thisComponent.warningStatus = false;
                //}
            }

            // 根据叶子数值大小变色
            function leafColor(level) {
                if(level > 1600) {
                    thisComponent.leafColor.fill = '#B81C25';
                } else if(level > 900) {
                    thisComponent.leafColor.fill = '#FAED00';
                } else {
                    if(level === 'turnGray') {
                        thisComponent.leafColor.fill = '#9E9E9F';
                    } else {
                        thisComponent.leafColor.fill = '#88B928';
                    }
                }
            }

            // 当后台百分比数值大于1%且为bulb和colorStrip device时出现百分比标志
            function switchToPercentage() {
                if(thisComponent.deviceImg == 'bulb') {
                    thisComponent.percentStatus = true;
                    thisComponent.leafStatus= false;
                    thisComponent.warningStatus= false;
                }
            }

            // plug故障时
            function switchToWarning() {
                thisComponent.leafStatus= false;
                thisComponent.percentStatus= false;
                thisComponent.warningStatus= true;
                thisComponent.deviceImg = "../src/assets/img/"+deviceInfo.deviceImg+"-error.svg";
                thisComponent.warningStatus = true;
                $('#deviceName').css({'color':'#B5B5B6'});
                $('#deviceRoom').css({'color':'#C9CACA'});
            }

            // 根据后台的设备状态当点击plug,bulb,colorStrip,allLamps时进行图片开关切换
            function switchImg(){
                //if(deviceInfo.deviceImg=='plug' || deviceInfo.deviceImg=='bulb')
                    thisComponent.deviceImg = thisComponent.OnOff?
                    "../src/assets/img/"+deviceInfo.deviceImg+"-on.svg":
                    "../src/assets/img/"+deviceInfo.deviceImg+"-off.svg";
            }

            function changeIcon(icon){
                deviceInfo.deviceImg = icon;
                switchImg();
            }
            function switchToNone() {
                thisComponent.leafStatus= false;
                thisComponent.percentStatus= false;
                thisComponent.warningStatus= false;
            }

            // 同步RGB Group
            window.addEventListener('storage',function(e) {
                if(OomiParams['operationtype']) {
                    var getGroupStatus = localStorage.getItem('groupStatus'+OomiParams['operationtype']);
                    if(getGroupStatus == 'true') {
                       thisComponent.OnOff = true;
                    } else if(getGroupStatus == 'false') {
                       thisComponent.OnOff = false;
                    } else {
                       thisComponent.OnOff = true;
                    }
                    switchImg();
                }
            })
        };
        return obj;
    });
