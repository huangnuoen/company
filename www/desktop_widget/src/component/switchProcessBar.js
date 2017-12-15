/**
 * Created by qkchung on 2017/8/23.
 */

define(['Vue','util/popupTools','TweenLite'],
    function(Vue,popupTools,TweenLite) {
        var obj = {};
        obj.run = function(nodeID,value,status,operateID){
            var thisComponent = {};
            var params = {
                flag: false
            };
            // var direction = '';
            var lastXDir = null;
            var canSend = 0;
            var shouldReceive = 0;
            Vue.component('switch-process-bar', {
                name:'switchProcessBar',
                template: '#_switchProcessBar',
                data: function () {
                    return {
                        switchText: value === 99 ?100 :value,
                        curtainOn: status
                    }
                },
                mounted:function(){
                    thisComponent = this;
                    changeCircle();
                    if(thisComponent.switchText === 0) {
                        btnToGrey();
                        thisComponent.curtainOn = false;
                    }
                    var innerPointer = document.getElementById('innerSwitchPointer'),
                        outerPointer = document.getElementById('outerSwitchPointer'),
                        orangeBar = document.getElementById('orangeBar'),
                        whiteBar = document.getElementById('bar'),
                        startPoint = Number(innerPointer.getAttribute('r')),
                        endPoint = Number(whiteBar.getAttribute('width'));
                    startDrag(innerPointer,outerPointer);
                    initPointer(value,innerPointer,outerPointer,orangeBar,startPoint,endPoint);
                    listen(innerPointer,outerPointer,orangeBar,startPoint,endPoint);
                },
                methods:{
                    curtainBtnClicked:function() {
                        if(thisComponent.curtainOn) {
                            btnToGrey();
                        } else{
                            btnToOrange();
                        }
                        thisComponent.curtainOn = !thisComponent.curtainOn;
                        sendStatusToCube(thisComponent.curtainOn);
                    }
                }
            });


            var demo = new Vue({
                el: '.switchProcessBar',
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


            function btnToGrey() {
                var bar = $('.controllBar');
                var pointer = $('.controllPointer');
                TweenLite.to(bar, 0.3, {attr:{fill:'#8C8C8B'}});
                TweenLite.to(pointer, 0.3, {attr:{cx:'37'}});
            }

            function btnToOrange() {
                var bar = $('.controllBar');
                var pointer = $('.controllPointer');
                TweenLite.to(bar, 0.3, {attr:{fill:'#DB6929'}});
                TweenLite.to(pointer, 0.3, {attr:{cx:'72'}});
            }

            function changeCircle() {
                if(thisComponent.curtainOn) {
                    btnToOrange();
                } else {
                    btnToGrey();
                }
            }

            function sendStatusToCube(status){
                syncSend(function(){
                    var sendSwitchText = Number(thisComponent.switchText);
                    if(status === false) {
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeID, "binsw01", status+'', "status"]);
                        if (operateID !== null){
                            cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",0,"mtLevel",operateID]);
                            setTimeout(function(){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", status+'', "status",operateID]);
                            },100)
                        }
                    } else {
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeID, "binsw01", status+'', "status"]);
                        if (operateID !== null){
                            if(sendSwitchText<1){
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",1,"mtLevel",operateID]);
                            }else if(sendSwitchText>99){
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",99,"mtLevel",operateID]);
                            }else{
                                cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",sendSwitchText,"mtLevel",operateID]);
                            }
                            setTimeout(function(){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", status+'', "status",operateID]);
                            },100)
                        }
                    }
                })
            }

            function setStatus(status) {
                thisComponent.curtainOn = status;
                changeCircle();
            }

            function sendToCube() {
                syncSend(function () {
                    var sendSwitchText = Number(thisComponent.switchText);
                    if(sendSwitchText<1){
                        cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",1,"mtLevel"]);
                    }else if(sendSwitchText>99){
                        cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",99,"mtLevel"]);
                    }else{
                        cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",sendSwitchText,"mtLevel"]);
                    }
                    if (operateID !== null){
                        if(sendSwitchText<1){
                            cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",1,"mtLevel",operateID]);
                        }else if(sendSwitchText>99){
                            cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",99,"mtLevel",operateID]);
                        }else{
                            cordova.exec(null,null,"FTP2PApi",'saveSceneAction',[nodeID,"mlevel01",sendSwitchText,"mtLevel",operateID]);
                        }
                    }
                });
            }

            function initPointer(val,inner,outer,orange,start,end) {
                val = typeof val === "number" ?(val<=0 || isNaN(val) === true ?100:(val === 99 ?100 :val)):100;
                var getInitVal = val*586/100;
                var switchText = document.getElementById('switchText');
                inner.setAttribute('cx',getInitVal);
                outer.setAttribute('cx',getInitVal);
                orange.setAttribute('width',Math.abs(getInitVal));
                switchText.setAttribute('x',getInitVal-20);
                thisComponent.switchText = Math.ceil(val);
                moveSwitchText(switchText);
                fixPointer(inner,outer,orange,start,end);
            }

            // function getDirection(e) {
            //     var curX = e.touches[0].clientX;
            //     if(lastXDir == null) {
            //         lastXDir = curX;
            //     }
            //     if(lastXDir > curX){
            //         direction = 'left';
            //     } else {
            //         direction = 'right';
            //     }
            //     lastXDir = curX;
            //     return direction;
            // }

            function startDrag(inner,outer) {
                outer.addEventListener('touchstart',touch, false);
                document.addEventListener('touchmove',touch, false);
                outer.addEventListener('touchend',touch, false);
                function touch (event){
                    var event = event || window.event;
                    switch(event.type){
                        case "touchstart":
                            cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"])
                            params.flag = true;
                            movePointer(event);
                            break;
                        case "touchend":
                            cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"])
                            thisComponent.curtainOn = true;
                            $('.controllBar').attr('fill','#DB6929');
                            $('.controllPointer').attr('cx','72');
                            if(operateID !== null) {
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", 'true', "status",operateID]);
                            } else {
                                cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeID, "binsw01", 'true', "status"]);
                            }
                            params.flag = false;
                            sendToCube();
                            break;
                        case "touchmove":
                            event.preventDefault();
                            movePointer(event);
                            // getDirection(event);
                            break;
                    }

                }

                function movePointer(ev) {
                    var event = ev ? ev: window.event;
                    if(params.flag) {
                        var nowX = event.touches[0].clientX;
                        var wrapperWidth = $('.switchBarContent').width();
                        var wrapperLeft = $('.switchBarContent').offset().left;
                        var distX = nowX - wrapperLeft;
                        var orangeBar = document.getElementById('orangeBar');
                        var whiteBar = document.getElementById('bar');
                        var switchText = document.getElementById('switchText');
                        var startPoint = Number(inner.getAttribute('r'));
                        var endPoint = Number(whiteBar.getAttribute('width'));
                        var finalPoint = distX*625/wrapperWidth;
                        inner.setAttribute('cx',finalPoint);
                        outer.setAttribute('cx',finalPoint);
                        switchText.setAttribute('x',finalPoint-14);
                        orangeBar.setAttribute('width',Math.abs(finalPoint));
                        thisComponent.switchText = Math.ceil(finalPoint*100/586);
                        moveSwitchText(switchText);
                        fixPointer(inner,outer,orangeBar,startPoint,endPoint);
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        return false;
                    }
                }
            }

            function moveSwitchText(switchText) {
                var currentText = thisComponent.switchText;
                if(currentText <= 3 && currentText >= 1) {
                    switchText.setAttribute('x','17');
                } else if(currentText <= 0) {
                    thisComponent.switchText = 1;
                    switchText.setAttribute('x','12');
                } else if(currentText >= 100) {
                    thisComponent.switchText = 100;
                    switchText.setAttribute('x','558');
                }
            }

            function fixPointer(inner,outer,bar,start,end) {
                if(inner.getAttribute('cx') <= start+1) {
                    inner.setAttribute('cx',start+1);
                    outer.setAttribute('cx',start+1);
                    bar.setAttribute('width',start+1);
                } else if (inner.getAttribute('cx') >= end-1) {
                    inner.setAttribute('cx',end-1);
                    outer.setAttribute('cx',end-1);
                    bar.setAttribute('width',end-1);
                }
            }

            function listen(inner,outer,bar,start,end) {
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (operateID !== null){
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
                                    var switchVal = Number(result[key]);
                                    initPointer(switchVal,inner,outer);
                                    fixPointer(inner,outer,bar,start,end);
                                    if(switchVal === 0) {
                                        setStatus(false);
                                    }else{
                                        setStatus(true)
                                    }
                                }
//                                if (key === "status") {
//                                    var flag = String(result[key]);
//                                    if (flag === 'true') {
//                                        setStatus(true);
//                                    } else if (flag === 'false') {
//                                        setStatus(false);
//                                    } else if (flag === true) {
//                                        setStatus(true);
//                                    } else if (flag === false) {
//                                        setStatus(false);
//                                    }
//                                }
                            }
                        }
                    }
                }, false);
            }

        };
        return obj;
    });