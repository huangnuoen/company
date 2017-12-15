/**
 * Created by qkchung on 17/3/1.
 */
/**
 * Created by qkchung on 17/2/27.
 */
define(['jquery', 'util/popupTools','Vue'],
    function($  ,       popupTools ,Vue) {
        var obj = {};
        obj.run = function(value,listenLevel,lang){
            var currentProcess = {};
            var isProcessing = false;
            var animationInterval = 0;
            var preProgress = 0.001;
            var ringColors = ['green2yellow','green2red','green','yellow2green','yellow2red','yellow','red2green','red2yellow','red'];
            var whichRingColors = 2;
            var lEV1 = 0.45;
            var LEV2 = 0.8;
            var Ratemax = 2000;
            popupTools.ImportTemplates('#_processBar');
            Vue.component('process-bar', {
                name:'processBar',
                template: '#_processBar',
                mounted:function(){
                    reRenderProgressBarPosition();
                    currentProcess = this;
                    window.onresize = function () {
                        reRenderProgressBarPosition();
                    };
                    listenLevel(function (data) {
                        currentProcess.watts = data;
                        setTimeout(function () {
                            reRenderProgressBarPosition();
                        },300);
                        progress(data/Ratemax);
                    });
                    setTimeout(function () {
                        progress(value/Ratemax)
                    },300);
                    if(lang != 'en'){
                        $('.wattsTitle').text('瓦');
                    }
                },
                data: function () {
                    return {
                        newD:'M 0 -43 A 43 43 1 0 1 0.27 -43',
                        watts:value,
                        ringColor:ringColors[whichRingColors]
                    }
                },
                methods:{

                }
            });
            var demo = new Vue({
                el: '.processBar',
                data:{}
            });

            function progress(progress){
                if(isProcessing){
                    return;
                }
                isProcessing = true;
                if(progress>=1){
                    progress = 0.999;
                }

                if(progress <= 0){
                    progress = 0.01
                }
                chooseColor(RunProgress);

                function RunProgress(){
                    if(preProgress>progress){
                        animationInterval = setInterval(function(){
                            preProgress = preProgress-0.01;
                            currentProcess.newD = getD(preProgress);
                            if(preProgress<progress){
                                clear();
                            }
                        },20);
                    }else{
                        animationInterval = setInterval(function(){
                            preProgress = preProgress+0.01;
                            if(preProgress >=1){
                                clear();
                            }
                            currentProcess.newD = getD(preProgress);
                            if(preProgress>progress){
                                clear();
                            }
                        },20);
                    }
                }

                function clear(){
                    preProgress = progress;
                    window.clearInterval(animationInterval);
                    animationInterval = 0;
                    isProcessing = false;
                }

                function getD(thisProgress){
                    var r=43;
                    var degrees = thisProgress * 360;
                    var rad = degrees* (Math.PI / 180);
                    var x = (Math.sin(rad) * r).toFixed(2);
                    var y = -(Math.cos(rad) * r).toFixed(2);
                    var lenghty = window.Number(degrees > 180);
                    var descriptions = ['M', 0, -r, 'A', r, r, 1, lenghty, 1, x, y];
                    return descriptions.join(' ');
                }

                function chooseColor(RunProgress){
                    if(preProgress<=lEV1){
                        if(progress>lEV1&&progress<=LEV2){
                            whichRingColors = 0;
                        }else if(progress>LEV2){
                            whichRingColors = 1;
                        }else{
                            whichRingColors = 2;
                        }
                    }else if(preProgress>lEV1&&preProgress<=LEV2){
                        if(progress<=lEV1){
                            whichRingColors = 3;
                        }else if(progress>LEV2){
                            whichRingColors = 4;
                        }else{
                            whichRingColors = 5
                        }
                    }else if(preProgress>LEV2){
                        if(progress<=lEV1){
                            whichRingColors = 6;
                        }else if(progress>lEV1&&progress<=LEV2){
                            whichRingColors = 7;
                        }else{
                            whichRingColors = 8;
                        }
                    }
                    currentProcess.ringColor = ringColors[whichRingColors];
                    if(RunProgress){
                        RunProgress();
                    }
                }
            }

            function reRenderProgressBarPosition(){
                var $body_content = $('.body_content');
                var $processBar = $('.processBar');
                var $wattsHolder = $('.wattsHolder');
                var $processBar_content = $('.processBar_content');
                var gap = $body_content.height() - $body_content.width();
                var toUse = $body_content.height();
                if(gap>0){
                    toUse = $body_content.width()
                }
                $processBar.css({
                    'width':toUse*0.6+'px',
                    'height':toUse*0.6+'px'
                });

                var toRenderTop = ($body_content.height() - $processBar.height())/2;
                var toRenderLeft = ($body_content.width() - $processBar.width())/2;

                var wattsRenderTop = ($processBar_content.height() - $wattsHolder.height())/2;
                var wattsRenderLeft = ($processBar_content.width() - $wattsHolder.width())/2;
                $wattsHolder.css({'left':wattsRenderLeft+'px',
                    'top':wattsRenderTop+'px'
                });
                $processBar.css({
                    'left':toRenderLeft+'px',
                    'top':toRenderTop+'px'
                });
            }
        };

        return obj;
});