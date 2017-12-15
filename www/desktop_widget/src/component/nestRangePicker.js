/**
 * Created by qkchung on 17/2/28.
 */
define(['jquery','util/popupTools','Vue','jquery_touchy'],
    function($, popupTools ,Vue,jquery_touchy) {
        var obj = {};
        obj.run = function(nodeID,bus){
            popupTools.ImportTemplates('#_nestRangePicker');
            var offsetLeft = 0;
            var offsetTop = 0;
            var thisComponent = {};
            var CurrentT = 9;
            var currentRange = {
                max:1,
                min:0
            };
            var mode = 0;
            Vue.component('nestRangePicker', {
                name:'nestRangePicker',
                template: '#_nestRangePicker',
                data: function () {
                    return {

                    }
                },
                mounted:function(){
                    reMakeNest();
                    setTimeout(function () {
                        bindTouchy();
                    },200);
                    thisComponent = this;
                    switchMode();
                    listenValChange();
                },
                methods:{

                }
            });
            var demo = new Vue({
                el: '.body_content'
            });

            function listenValChange(){
                bus.$on('test2', function (msg) {
                    var thisMin = Math.round(99*(msg.min-9)/23);
                    var thisMax = Math.round(99*(msg.max-9)/23);
                    var thisHCMax = Math.round(99*(msg.HCMax-9)/23);
                    switch(mode){
                        case 0:
                            unbind();
                            bindTouchy();
                            convertToDeg(99-thisMin,99-thisMax);
                            break;
                        case 1:
                            convertToDeg(99-thisMin,99-thisMax);
                            break;
                        case 2:
                            unbind();
                            bindTouchyHeatCool();
                            convertToDeg(99-CurrentT,99-thisHCMax);
                            break;
                        case 3:
                            unbind();
                            bindTouchyHeatCool();
                            convertToDeg(99-CurrentT,99-thisHCMax);
                            break;
                        case 4:

                            break;
                    }
                });
            }

            function switchMode(){
                var MaxEl = $('#MaxDragThing');
                var MinEl = $('#MinDragThing');
                var MaxEl2 = $('#MaxDragThing2');
                var MinEl2 = $('#MinDragThing2');
                bus.$on('forMode',function (thisMode) {
                    var thisMin = Math.round(99 * (thisMode.min - 9) / 23);
                    var thisMax = Math.round(99 * (thisMode.max - 9) / 23);
                    CurrentT = Math.round(99 * (thisMode.current - 9) / 23);
                    mode = thisMode.mode;
                    switch (thisMode.mode) {
                        case 0:
                            MaxEl.css('display', 'block');
                            MinEl.css('display', 'block');
                            MaxEl2.css('display', 'block');
                            MinEl2.css('display', 'block');
                            unbind();
                            bindTouchy();
                            convertToDeg(99 - thisMin, 99 - thisMax);
                            break;
                        case 1:
                            MaxEl.css('display', 'none');
                            MinEl.css('display', 'none');
                            MaxEl2.css('display', 'none');
                            MinEl2.css('display', 'none');
                            convertToDeg(99 - thisMin, 99 - thisMax);
                            break;
                        case 2:
                            MaxEl.css('display', 'block');
                            MinEl.css('display', 'none');
                            MaxEl2.css('display', 'block');
                            MinEl2.css('display', 'none');
                            unbind();
                            bindTouchyHeatCool();
                            convertToDeg(99 - CurrentT, 99 - thisMax);
                            break;
                        case 3:
                            MaxEl.css('display', 'block');
                            MinEl.css('display', 'none');
                            MaxEl2.css('display', 'block');
                            MinEl2.css('display', 'none');
                            unbind();
                            bindTouchyHeatCool();
                            convertToDeg(99 - CurrentT, 99 - thisMax);
                            break;
                        case 4:
                            MaxEl.css('display', 'none');
                            MinEl.css('display', 'none');
                            MaxEl2.css('display', 'none');
                            MinEl2.css('display', 'none');
                            convertToDeg(99 - CurrentT, 99 - CurrentT);
                            break;
                    }
                    setCurrent(99 - CurrentT);
                });
            }
            function reMakeNest(){
                var $nestRangePicker = $('#nestRangePicker');
                var $body_content = $('.body_content');

                var nHeight = $nestRangePicker.height();
                var nWidth = $nestRangePicker.width();
                var bHeight = $body_content.height();
                var bWidth = $body_content.width();
                var $dragMin = $('#dragMin');
                var $dragMax = $('#dragMax');
                var $dragCurrent = $('#dragCurrent');
                if(nHeight>nWidth){
                    $nestRangePicker.css('height',nWidth+'px');
                    $nestRangePicker.css('top',(bHeight-nWidth)/2+'px');
                }else{
                    $nestRangePicker.css('width',nHeight+'px');
                    $nestRangePicker.css('left',(bWidth-nWidth)/2+'px');
                }
                nHeight = $nestRangePicker.height();
                $dragMin.css('top',nHeight/2-2+'px');
                $dragMax.css('top',nHeight/2-2+'px');
                $dragCurrent.css('top',nHeight/2-2+'px');
                offsetLeft = $nestRangePicker.offset().left;
                offsetTop = $nestRangePicker.offset().top;
            }
            function bindTouchy(){
                $('#MaxDragThing').bind('touchy-drag', handleTouchyDragMax);
                $('#MinDragThing').bind('touchy-drag', handleTouchyDragMin);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();

                },false);
            }
            function bindTouchyHeatCool(){
                $('#MaxDragThing').bind('touchy-drag', handleTouchyDragMaxHeatCool);
                $('#MinDragThing').bind('touchy-drag');
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();

                },false);
            }
            function unbind(){
                $('#MaxDragThing').unbind('touchy-drag');
                $('#MinDragThing').unbind('touchy-drag');
            }
            var handleTouchyDragMax = function (event, phase, $target, data) {
                if(phase === 'start'){
                    handleTouchyDragMaxStart(data['startPoint']);
                }else if (phase === 'move') {
                    handleTouchyDragMaxMove(data['movePoint']);
                } else if (phase === 'end') {

                }
            };
            var handleTouchyDragMaxHeatCool = function (event, phase, $target, data) {
                if(phase === 'start'){
                    handleTouchyDragMaxStart(data['startPoint']);
                }else if (phase === 'move') {
                    handleTouchyDragMaxMoveHeatCool(data['movePoint']);
                } else if (phase === 'end') {

                }
            };
            var handleTouchyDragMaxStart = function (event) {
                return 1;
            };
            var handleTouchyDragMaxMoveHeatCool = function (event) {
                if(window.screen.availHeight<=event['y'] || event['y']<=0){
                    return 1;
                }
                if(window.screen.availWidth<=event['x'] || event['x']<=0){
                    return 1;
                }
                var $nestRangePicker = $('#nestRangePicker');
                var locationX = event['x'];
                var locationY = event['y'];
                var touchX =  locationX - offsetLeft;
                var touchY =  locationY - offsetTop;

                var nHeight = $nestRangePicker.height();
                var nWidth = $nestRangePicker.width();
                var CordX = touchX - nWidth / 2;
                var CordY = touchY - nHeight / 2;
                var R2D = 180 / Math.PI;
                var deg = Math.atan2(CordY, CordX)*R2D;
                var dragMax = $('#dragMax');
                if(deg>123){
                    currentRange.max = deg-360-56;
                }else{
                    currentRange.max = deg-56;
                }
                    if(deg<56||deg>124) {
                        dragMax.css('-webkit-transform', 'rotate(' + deg + 'deg)');
                        dragMax.css('transform', 'rotate(' + deg + 'deg)');
                        highLightBetween(true);
                    }
            };
            var handleTouchyDragMaxMove = function (event) {
                if(window.screen.availHeight<=event['y'] || event['y']<=0){
                    return 1;
                }
                if(window.screen.availWidth<=event['x'] || event['x']<=0){
                    return 1;
                }
                var $nestRangePicker = $('#nestRangePicker');
                var locationX = event['x'];
                var locationY = event['y'];
                var touchX =  locationX - offsetLeft;
                var touchY =  locationY - offsetTop;

                var nHeight = $nestRangePicker.height();
                var nWidth = $nestRangePicker.width();
                var CordX = touchX - nWidth / 2;
                var CordY = touchY - nHeight / 2;
                //console.log(CordX,CordY);
                var R2D = 180 / Math.PI;
                var deg = Math.atan2(CordY, CordX)*R2D;
                var dragMax = $('#dragMax');
                if(deg>123){
                    currentRange.max = deg-360-56;
                }else{
                    currentRange.max = deg-56;
                }
                if(currentRange.max>currentRange.min+6){
                    if(deg<56||deg>124) {
                        dragMax.css('-webkit-transform', 'rotate(' + deg + 'deg)');
                        dragMax.css('transform', 'rotate(' + deg + 'deg)');
                        highLightBetween(false);
                    }
                }
            };

            var handleTouchyDragMin = function (event, phase, $target, data) {
                if(phase === 'start'){
                    handleTouchyDragMinStart(data['startPoint']);
                }else if (phase === 'move') {
                    handleTouchyDragMinMove(data['movePoint']);
                } else if (phase === 'end') {

                }
            };
            var handleTouchyDragMinStart = function (event) {
                var locationX = event['x'];
                var locationY = event['y'];
                return 1;
            };
            var handleTouchyDragMinMove = function (event) {
                if(window.screen.availHeight<=event['y'] || event['y']<=0){
                    return 1;
                }
                if(window.screen.availWidth<=event['x'] || event['x']<=0){
                    return 1;
                }
                var $nestRangePicker = $('#nestRangePicker');
                var locationX = event['x'];
                var locationY = event['y'];
                var touchX =  locationX - offsetLeft;
                var touchY =  locationY - offsetTop;
                var nHeight = $nestRangePicker.height();
                var nWidth = $nestRangePicker.width();
                var CordX = touchX - nWidth / 2;
                var CordY = touchY - nHeight / 2;
                var R2D = 180 / Math.PI;
                var deg = Math.atan2(CordY, CordX)*R2D;
                var dragMin = $('#dragMin');
                if(deg>123){
                    currentRange.min = deg-360-56;
                }else{
                    currentRange.min = deg-56;
                }
                if(currentRange.max>currentRange.min+6){
                    if(deg<56||deg>124){
                        dragMin.css('-webkit-transform','rotate('+deg+'deg)');
                        dragMin.css('transform','rotate('+deg+'deg)');
                        highLightBetween();
                    }
                }

            };

            function highLightBetween(isSingle){
                var ElMin = Math.abs(currentRange.min*99/292);
                var ElMax = Math.abs(currentRange.max*99/292);
                ElMin = Math.ceil(99-ElMin);
                ElMax = Math.ceil(99-ElMax);
                var lineArry = $('.nestLiner');
                lineArry.attr('stroke','#C8C9CA');
                if(ElMax<ElMin){
                    lineArry = lineArry.slice(ElMax,ElMin);
                }else{
                    lineArry = lineArry.slice(ElMin,ElMax);
                }
                lineArry.attr('stroke','#E76D26');
                var textMin = ElMin*23/99+9;
                var textMax = ElMax*23/99+9;
                    bus.$emit('test', {
                        max:textMax,
                        min:textMin,
                        isSingle:isSingle
                    })
            }
            function highLightBetween2(x,y){

                var ElMin = Math.abs((x-56)*99/292);
                var ElMax = Math.abs((y-56)*99/292);
                ElMin = Math.ceil(99-ElMin);
                ElMax = Math.ceil(99-ElMax);
                var lineArry = $('.nestLiner');
                lineArry.attr('stroke','#C8C9CA');
                if(ElMax<ElMin){
                    lineArry = lineArry.slice(ElMax,ElMin);
                }else{
                    lineArry = lineArry.slice(ElMin,ElMax);
                }
                lineArry.attr('stroke','#E76D26');
            }
            function convertToDeg(x,y){
                var a = -x*292/99+56;
                var b = -y*292/99+56;
                currentRange.min = (a-56);
                currentRange.max = (b-56);
                var dragMin = $('#dragMin');
                var dragMax = $('#dragMax');
                dragMin.css('-webkit-transform','rotate('+a+'deg)');
                dragMin.css('transform','rotate('+a+'deg)');
                dragMax.css('-webkit-transform','rotate('+b+'deg)');
                dragMax.css('transform','rotate('+b+'deg)');
                highLightBetween2(a,b);
            }
            function setCurrent(x){
                var a = -x*292/99+56;
                var dragCurrent = $('#dragCurrent');
                dragCurrent.css('-webkit-transform','rotate('+a+'deg)');
                dragCurrent.css('transform','rotate('+a+'deg)');
            }

        };
        return obj;
    });