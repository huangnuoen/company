/**
 * Created by qkchung on 17/3/6.
 */
define(['jquery','util/popupTools','TweenLite','TimelineLite','Vue','jquery_touchy'],
    function($  ,      popupTools ,TweenLite,TimelineLite, Vue,jquery_touchy) {
        var obj = {};
        obj.run = function (nodeID,textsOBJ,commandType,operateID,bus) {
            popupTools.ImportTemplates('#_chooseRGB');
            var currentTarget = {
                colorBox:null,
                saveColorBox:null
            };
            var thisComponent = {};
            var RGB = null;
            var canvas = null;
            var graphics = null;
            var coordinateRefer = {
                left:0,
                top:0,
                canvasHeight:0,
                canvasWidth:0
            };
            var canSend = 0;
            var shouldReceive = 0;
            Vue.component('choose-rgb', {
                name:'chooseRGB',
                template: '#_chooseRGB',
                mounted:function(){
                    thisComponent = this;
                    canvas = document.getElementById("rainbowCanvas");
                    graphics = canvas.getContext("2d");
                    reRenderProgressBarPosition(canvas);
                    setTimeout(function () {
                        drawRainbow();
                        bindTouchy();
                        setTimeout(function () {
                            initColorsNPoint();
                        },40);
                    },40);
                    $('.chooseRGBRingTitle').text(textsOBJ.chooseRGBTitle);
                    $('.SavedColorTitle').text(textsOBJ.saveTitle);
                },
                data: function () {
                    return generateDATA();
                },
                methods:{
                    save: function () {
                        var a =  $('#innerCircle').attr('fill');
                        addSaveColor(a,a)
                    },
                    deleteBox: function () {
                        deleteSaveColor();
                    }
                }
            });
            function initColorsNPoint(){
                $('.chooseCircle').css({fill:'#fff',stroke:'#9E9E9F'});
                if(localStorage[nodeID+'ChoosePointerx'] && localStorage[nodeID+'ChoosePointery']){
                    renderColorPoniterX(localStorage[nodeID+'ChoosePointerx']);
                    renderColorPoniterY(localStorage[nodeID+'ChoosePointery']);
                    setColor(localStorage[nodeID+'ChoosePointerCx'],localStorage[nodeID+'ChoosePointerCy']);
                }else{
                    var $body_content = $('.chooseRGBRing');
                    var rainbowCanvasx = $('#rainbowCanvas');
                    var toRenderTop = ($body_content.height() - rainbowCanvasx.height())/2;
                    var toRenderLeft = ($body_content.width() - rainbowCanvasx.width())/2;
                    var posi = rainbowCanvasx.width()*62/300;
                    renderColorPoniterX(posi+toRenderLeft);
                    renderColorPoniterY(posi+toRenderTop);
                    setColor(62,62);
                }
                getDeviceData();
                if(localStorage[nodeID+'saveColor'] !== undefined || localStorage[nodeID+'commandColor'] !== undefined){
                    if(localStorage[nodeID+'saveColor'].split(',')>7){
                        localStorage[nodeID+'commandColor'] = [];
                        localStorage[nodeID+'saveColor'] = [];
                    }
                }else{
                    localStorage[nodeID+'commandColor'] = [];
                    localStorage[nodeID+'saveColor'] = [];
                }
                makeSaveColor();
            }
            function makeSaveColor(){
                $('.saveColorBox').unbind('touchy-drag');
                var w = $('.main_content').width()/13;
                var saveColor = [];
                var commandColor = [];
                if(localStorage[nodeID+'saveColor']){
                    saveColor = localStorage[nodeID+'saveColor'].split(',');
                }
                if(localStorage[nodeID+'commandColor']){
                    commandColor = localStorage[nodeID+'commandColor'].split(',');
                }
                var data = [];
                for(var i = 0 ; i < saveColor.length;i++){
                    data[i] = {command: commandColor[i],
                        styleOBJ: {'background-color':'#'+ saveColor[i],
                            left:0,
                            width:w+'px',
                            height:32+'%',
                            top:34+'%'
                        }};
                }
                pushLeft2();
                function pushLeft2(){
                    var barColorsLength = data.length;
                    for(var k =0;k<barColorsLength;k++){
                        data[k].styleOBJ.left = k*w+'px';
                    }
                }
                thisComponent.savedColors = data;
                setTimeout(function () {
                    $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
                },100);
            }
            function deleteSaveColor() {
                $('.saveColorBox').unbind('touchy-drag');
                var currentBoxIndex = $(currentTarget['saveColorBox']).attr('index');
                var tempData = thisComponent.savedColors;
                tempData.splice(currentBoxIndex,1);
                var commands = '';
                for(var k = 0 ; k < tempData.length ; k ++){
                    commands += tempData[k]['command'];
                    if(k !== tempData.length - 1){
                        commands += ',';
                    }
                }
                if(commands.length !== 0){
                    localStorage[nodeID+'saveColor'] = commands;
                    localStorage[nodeID+'commandColor'] = commands;
                }else{
                    localStorage.removeItem(nodeID+'saveColor');
                    localStorage.removeItem(nodeID+'commandColor')
                }
                pushLeft3();
                function pushLeft3(){
                    var gap = $('.main_content').width()/13;
                    var barColorsLength = tempData.length;
                    for(var i =0;i<barColorsLength;i++){
                        tempData[i].styleOBJ.left = i*gap+'px';
                        tempData[i].styleOBJ.width  = gap +'px';
                    }
                }
                thisComponent.savedColors = tempData;
                recoverSavedBox();
                thisComponent.showAdd = true;
                setTimeout(function () {
                    $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
                },100);
            }
            function addSaveColor(color,Command){
                var w = $('.main_content').width()/13;
                $('.saveColorBox').unbind('touchy-drag');
                color = color.split('#')[1];
                Command = Command.split('#')[1];
                var saveColor = [];
                var commandColor = [];
                if(localStorage[nodeID+'saveColor']){
                    saveColor = localStorage[nodeID+'saveColor'].split(',');
                }
                if(localStorage[nodeID+'commandColor']){
                    commandColor = localStorage[nodeID+'commandColor'].split(',');
                }
                var originalColor = saveColor;
                for(var i=0; i<originalColor.length; i++) {
                    if(originalColor[i] === color) {
                        $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
                        return 1;
                    }
                }
                saveColor = prepend(saveColor,color);
                commandColor = prepend(commandColor,Command);
                if(saveColor.length>7){
                    saveColor.pop();
                    commandColor.pop();
                }
                localStorage[nodeID+'saveColor']=saveColor;
                localStorage[nodeID+'commandColor']=commandColor;
                var data = [];
                for(var l = 0 ; l < saveColor.length;l++){
                    data[l] = {
                        command: commandColor[l],
                        styleOBJ: {'background-color':'#'+saveColor[l],
                            left:0,
                            width:w+'px',
                            height:32+'%',
                            top:34+'%'
                        }};
                }
                pushLeft2();
                function pushLeft2(){
                    var barColorsLength = data.length;
                    for(var k =0;k<barColorsLength;k++){
                        data[k].styleOBJ.left = k*w+'px';
                    }
                }
                thisComponent.savedColors = data;
                setTimeout(function () {
                    $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
                    highLightRGB(color);
                },100);
                function prepend(arr, item) {
                    return [item].concat(arr);

                }
                function rgb2hex(rgb){
                    rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
                    return (rgb && rgb.length === 4) ? "" +
                    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
                }
            }
            function bindTouchy(){
                $('#drag_thing').bind('touchy-drag', handleTouchyDragX);
                $('#rainbowDragger').bind('touchy-drag', handleTouchyDragX);
                $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                },false);
            }

            function recoverSavedBox() {
                TweenLite.to($('.saveColorBox'), 0.3, {css:{height:"32%", top:"34%"}, ease:Bounce.easeOut});
                $(currentTarget['saveColorBox']).find('.bulbClickedIcon').hide();
                currentTarget['saveColorBox'] = null;
            }

            var handleTouchyDragX = function (event, phase, $target, data) {
                if(phase === 'start'){
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                    if(thisComponent.showAdd === false) {
                        thisComponent.showAdd = true;
                        recoverSavedBox();
                    }
                    getPixelOfPoint(data['startPoint']);
                    sendTo(RGB);
                    highLightRGB(RGB);
                }else if (phase === 'move') {
                    getPixelOfPoint(data['movePoint']);
                } else if (phase === 'end') {
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                    sendTo(RGB);
                    highLightRGB(RGB);
                }
            };
            var handleTouchyDrag2 = function (event, phase, $target, data) {
                if(phase === 'start'){
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                    thisComponent.showAdd = false;
                    handleTouchyStart(data['startPoint'],$target,'saveColorBox');
                }else if (phase === 'move') {
                    handleTouchyMove(data['movePoint'],$target,'saveColorBox');
                } else if (phase === 'end') {
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                    sendTo($(currentTarget['saveColorBox']).attr('command'))
                }
            };

            function highLightRGB(res) {
                if($('.chooseRGB'+res).length>0) {
                    TweenLite.to($('.chooseRGB'+res), 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                    addTick($('.chooseRGB'+res));
                    currentTarget['saveColorBox'] = $('.chooseRGB'+res);
                } else {
                    TweenLite.to($('.saveColorBox'), 0.3, {css:{height:"32%", top:"34%"},delay:0, ease:Bounce.easeOut});
                    $('.saveColorBox').find('.bulbClickedIcon').hide();
                }
            }

            function renderColorPoniterX(x){
                localStorage[nodeID+'ChoosePointerx'] = x;
                var choosePointer = $(".choosePointer");
                choosePointer.css('left', (x-15)+'px');
            }
            function renderColorPoniterY(y){
                localStorage[nodeID+'ChoosePointery']= y;
                var choosePointer = $(".choosePointer");
                choosePointer.css('top', (y-15)+'px');
            }
            function convertTOClientX(x,borderR){
                return (x+(150-borderR))*coordinateRefer.canvasWidth/300+coordinateRefer.left-coordinateRefer.pointerLeft

            }
            function convertTOClientY(y,borderR){
                return (y+(150-borderR))*coordinateRefer.canvasHeight/300+coordinateRefer.top-coordinateRefer.pointerTop
            }
            function getPixelOfPoint(event){
                var borderR = 126;
                var innerBorderR = 122;
                var clientX = event['x']-coordinateRefer.left;
                var clientY = event['y']-coordinateRefer.top;
                var pointerClientX = event['x']-coordinateRefer.pointerLeft;
                var pointerClientY = event['y']-coordinateRefer.pointerTop;
                var x = clientX*300/coordinateRefer.canvasWidth;
                var y = clientY*300/coordinateRefer.canvasHeight;

                var VcoordinateX = x-150;
                var VcoordinateY = -(y-150);
                var VcoordinateZ = Math.sqrt(Math.pow(Math.abs(VcoordinateX),2) + Math.pow(Math.abs(VcoordinateY),2));
                if(VcoordinateZ === 0 ){
                    return;
                }
                var sinA = VcoordinateY/VcoordinateZ;
                var cosA = VcoordinateX/VcoordinateZ;
                var showX =Number(cosA*(borderR-2));
                var showY =Number(sinA*(borderR-2));
                var innerShowX =Number(cosA*(innerBorderR));
                var innerShowY =Number(sinA*(innerBorderR));
                setBorder();
                function setBorder(){
                    if(VcoordinateX>=0&&VcoordinateY>=0){
                        if(VcoordinateX<=showX && VcoordinateY<=showY){
                            if(VcoordinateX>=innerShowX && VcoordinateY>=innerShowY){
                                renderColorPoniterX(pointerClientX);
                                renderColorPoniterY(pointerClientY);
                                setColor(x,y);

                            }else{
                                renderColorPoniterX(convertTOClientX(innerShowX+innerBorderR,innerBorderR));
                                renderColorPoniterY(convertTOClientY(innerBorderR-innerShowY,innerBorderR));
                                setColor(showX+150,150-showY);
                            }
                        }else {
                            renderColorPoniterX(convertTOClientX(showX+borderR,borderR));
                            renderColorPoniterY(convertTOClientY(-showY+borderR,borderR));
                            setColor(showX+150,150-showY);
                        }
                    }
                    if(VcoordinateX>=0&&VcoordinateY<0){
                        if(VcoordinateX<=showX && VcoordinateY>=showY){
                            if(VcoordinateX>=innerShowX && VcoordinateY<=innerShowY){
                                renderColorPoniterX(pointerClientX);
                                renderColorPoniterY(pointerClientY);
                                setColor(x,y);
                            }else{
                                renderColorPoniterX(convertTOClientX(innerShowX+innerBorderR,innerBorderR));
                                renderColorPoniterY(convertTOClientY(innerBorderR-innerShowY,innerBorderR));
                                setColor(showX+150,150-showY);
                            }
                        }else {
                            renderColorPoniterX(convertTOClientX(showX+borderR,borderR));
                            renderColorPoniterY(convertTOClientY(-showY+borderR,borderR));
                            setColor(showX+150,150-showY);
                        }
                    }
                    if(VcoordinateX<0&&VcoordinateY<=0){
                        if(VcoordinateX>=showX && VcoordinateY>=showY){
                            if(VcoordinateX<=innerShowX && VcoordinateY<=innerShowY){
                                renderColorPoniterX(pointerClientX);
                                renderColorPoniterY(pointerClientY);
                                setColor(x,y);
                            }else{
                                renderColorPoniterX(convertTOClientX(innerShowX+innerBorderR,innerBorderR));
                                renderColorPoniterY(convertTOClientY(innerBorderR-innerShowY,innerBorderR));
                                setColor(150+showX,150-showY);
                            }
                        }else {
                            renderColorPoniterX(convertTOClientX(showX+borderR,borderR));
                            renderColorPoniterY(convertTOClientY(-showY+borderR,borderR));
                            setColor(150+showX,150-showY);
                        }
                    }
                    if(VcoordinateX<0&&VcoordinateY>=0){
                        if(VcoordinateX>=showX && VcoordinateY<=showY){
                            if(VcoordinateX<=innerShowX && VcoordinateY>=innerShowY){
                                renderColorPoniterX(pointerClientX);
                                renderColorPoniterY(pointerClientY);
                                setColor(x,y);
                            }else{
                                renderColorPoniterX(convertTOClientX(innerShowX+innerBorderR,innerBorderR));
                                renderColorPoniterY(convertTOClientY(-innerShowY+innerBorderR,innerBorderR));
                                setColor(150+showX,150-showY);
                            }
                        }else {
                            renderColorPoniterX(convertTOClientX(showX+borderR,borderR));
                            renderColorPoniterY(convertTOClientY(-showY+borderR,borderR));
                            setColor(150+showX,150-showY);
                        }
                    }
                }
            }

            function setColor(x, y){
                localStorage[nodeID+'ChoosePointerCx'] = x;
                localStorage[nodeID+'ChoosePointerCy'] = y;
                var colorData = graphics.getImageData(x, y, 1, 1).data;
                var r = colorData[0].toString(16);
                var g = colorData[1].toString(16);
                var b = colorData[2].toString(16);
                r.length===1?r='0'+r:'';
                g.length===1?g='0'+g:'';
                b.length===1?b='0'+b:'';
                var colorHex ='#'+r+g+b;
                $('#innerCircle').attr('fill',colorHex);
                RGB = r+g+b;
            }
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
            function sendTo(rgb){
                syncSend(function () {
                    if($('#onOffButtonSVGPath').attr('class') === 'powerOff'){
                        if (bus){
                            bus.$emit('onOff',{});
                        }
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",rgb,"color"]);
                        setTimeout(function () {
                            cordova.exec(null, null, "FTP2PApi", commandType, [nodeID, "binsw01", 'true', "status"]);
                        },100);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", rgb, "color",operateID]);
                            setTimeout(function () {
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", 'true', "status",operateID]);
                            },100);
                        }
                    }else{
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",rgb,"color"]);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", rgb, "color",operateID]);
                        }
                    }

                });
            }
            function drawRainbow(){
                canvas.height = 300;
                canvas.width = 300;
                var CX = canvas.width / 2,
                    CY = canvas.height/ 2,
                    sx = CX,
                    sy = CY;

                //for(var i = 0; i < 360; i+=0.30){
                //    var rad = i * (2*Math.PI) / 360;
                //    graphics.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";
                //    graphics.beginPath();
                //    graphics.moveTo(CX + sx*0.60 * Math.cos(rad), CY + sy*0.60 * Math.sin(rad));
                //    graphics.lineTo(CX + (sx-2) * Math.cos(rad), CY + (sy-2) * Math.sin(rad));
                //    graphics.stroke();
                //}
                var img = new Image();
                img.src = "../src/assets/img/RGBrainbow.png";
                img.onload = function(){
                    graphics.drawImage(img,0,0,300,300);
                    graphics.beginPath();
                    graphics.arc(CX, CY, sx*0.664, 0, 2 * Math.PI, false);
                    graphics.lineWidth = 3;
                    graphics.strokeStyle = '#9E9E9F';
                    graphics.stroke();
                    graphics.beginPath();
                    graphics.arc(CX, CY, sx-2, 0, 2 * Math.PI, false);
                    graphics.lineWidth = 3;
                    graphics.strokeStyle = '#9E9E9F';
                    graphics.stroke();
                };
            }

            function generateDATA(){
                var data = {
                    savedColors:[
                        //{command: '1', styleOBJ: {'background-color': '#00CC00',left:0}},
                        //{command: '2', styleOBJ: {'background-color': '#FFFF00'  ,left:0}},
                        //{command: '3', styleOBJ: {'background-color':'#FF007F' ,left:0}},
                        //{command: '4', styleOBJ: {'background-color':'#7F00FF',left:0}},
                        //{command: '5', styleOBJ: {'background-color':'#F6FBFE'  ,left:0}}
                    ],
                    showAdd: true,
                    saveText: textsOBJ.saveText
                };

                pushLeft2();
                function pushLeft2(){
                    var barColorsLength = data.savedColors.length;
                    var gap = 100/12;
                    for(var i =0;i<barColorsLength;i++){
                        data.savedColors[i].styleOBJ.left = i*gap+'%';
                    }
                }
                return data;
            }

            var handleTouchyMove = function (event,$target,thisEl) {
                if(window.screen.availHeight<=event['y'] || event['y']<=0){
                    return 1;
                }
                if(window.screen.availWidth<=event['x'] || event['x']<=0){
                    return 1;
                }
                if($target[0]['className']!==thisEl){
                    return 1;
                }
                var locationX = event['x'];
                var locationY = event['y'];
                var realTarget = document.elementFromPoint(locationX, locationY);
                if(realTarget.className!==thisEl){
                    return 1;
                }
                if(realTarget === currentTarget[thisEl]){
                    return 1;
                }
                TweenLite.to(realTarget, 0.3, {css:{height:"60%", top:"20%"}, ease:Bounce.easeOut});
                TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"32%", top:"34%"},delay:0, ease:Bounce.easeOut});
                currentTarget[thisEl] = realTarget;
                addTick(currentTarget[thisEl]);
            };
            var handleTouchyStart = function (event,$target,thisEl) {
                var locationX = event['x'];
                var locationY = event['y'];
                if(currentTarget[thisEl]){
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"32%", top:"34%"}, ease:Bounce.easeOut});
                }
                currentTarget[thisEl] = document.elementFromPoint(locationX, locationY);
                TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                sendTo($(currentTarget['saveColorBox']).attr('command'));
                addTick(currentTarget[thisEl]);
                return 1;
            };
            function addTick(el){
                if(el){
                    $(el).siblings().find('.bulbClickedIcon').css('display','none');
                    $(el).find('.bulbClickedIcon').css('display','block');
                }else{

                }
            }

            function reRenderProgressBarPosition(canvas){
                var $body_content = $('.chooseRGBRing');
                var rainbowCanvas = $('#rainbowCanvas');
                var innerCircle = $('.innerCircleSVG');
                var gap = $body_content.height() - $body_content.width();
                var toUse = $body_content.height();
                if(gap>0){
                    toUse = $body_content.width()
                }
                canvas.style.height = toUse*0.8+'px';
                canvas.style.width = toUse*0.8+'px';
                innerCircle.css({'height':toUse*0.25+'px','width':toUse*0.25+'px'});
                var toRenderTop = ($body_content.height() - rainbowCanvas.height())/2;
                var toRenderLeft = ($body_content.width() - rainbowCanvas.width())/2;
                var toRenderTop2 = ($body_content.height() - innerCircle.height())/2;
                var toRenderLeft2 = ($body_content.width() - innerCircle.width())/2;
                canvas.style.top = toRenderTop+'px';
                canvas.style.left = toRenderLeft+'px';
                innerCircle.css({'top':toRenderTop2+'px','left':toRenderLeft2+'px'});
                var offset = rainbowCanvas.offset();
                coordinateRefer = {
                    left:Math.floor(offset.left),
                    top:Math.floor(offset.top),
                    canvasHeight:Math.floor(rainbowCanvas.height()),
                    canvasWidth:Math.floor(rainbowCanvas.width()),
                    pointerLeft : $body_content.offset().left,
                    pointerTop : $body_content.offset().top
                };

            }
            function getDeviceData(){
                cordova.exec(function (data) {
                    var re = true;
                    var val = 'ffffff';
                    popupTools.updateUI(data,'color', function (result) {
                        val = result;
                        var reg = /^[0-9a-fA-F]{6}$/;
                        var s = reg.test(val+'');
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
                        if(commandColor[val+'']){
                            $('#innerCircle').attr('fill','#'+commandColor[val+'']);
                        }else if(s){
                            $('#innerCircle').attr('fill','#'+val);
                            TweenLite.to($('.chooseRGB'+val), 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                            addTick($('.chooseRGB'+val));
                            currentTarget['saveColorBox'] = $('.chooseRGB'+val);
                        }else{
                            if(localStorage[nodeID+'ChoosePointerx'] && localStorage[nodeID+'ChoosePointery']){
                                setColor(localStorage[nodeID+'ChoosePointerCx'],localStorage[nodeID+'ChoosePointerCy']);
                            } else {
                                $('#innerCircle').attr('fill','#'+'00CC00');
                            }
                        }
                    });
                }, null, "FTP2PApi", "getDeviceStatus", [nodeID, "rgbbulb01"]);
            }
        };
        return obj;
    });