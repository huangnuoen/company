/**
 * Created by qkchung on 17/3/3.
 */
define(['jquery','util/popupTools','TweenLite','TimelineLite','Vue','jquery_touchy'],
    function($  ,      popupTools ,TweenLite,TimelineLite, Vue,jquery_touchy) {
        var obj = {};
        obj.run = function (nodeID,Wtype,textsOBJ,commandType,operateID,bus,model) {
            popupTools.ImportTemplates('#_solidCommon');
            var currentTarget = {
                colorBox:null,
                saveColorBox:null
            };
            var canSend = 0;
            var shouldReceive = 0;
            var thisComponent = {};
            Vue.component('solid-common', {
                name:'solidCommon',
                template: '#_solidCommon',
                mounted:function(){
                    thisComponent = this;
                    reset();
                    if(localStorage[nodeID+'saveColor'] != undefined || localStorage[nodeID+'commandColor'] != undefined){
                        if(localStorage[nodeID+'saveColor'].split(',')>7){
                            localStorage[nodeID+'commandColor'] = [];
                            localStorage[nodeID+'saveColor'] = [];
                        }
                    }else{
                        localStorage[nodeID+'commandColor'] = [];
                        localStorage[nodeID+'saveColor'] = [];
                    }
                    makeSaveColor();
                    setTimeout(function () {
                        bindTouchy();
                        getDeviceData();
                        listener();
                    },200);
                    $('.solidCommonTitle').text(textsOBJ.chooseTitle);
                    $('.SavedColorTitle').text(textsOBJ.saveTitle);
                },
                data: function () {
                    return generateDATA();
                },
                methods:{

                }
            });
            function generateDATA(){
                var data = {};
                if(model === 'FT169'){
                    data = {
                        barColors:[
                            // {command: 'coolWhite', styleOBJ: {'background-color':'#CAE9FB',left:0}},
                            {command: 'FFFFFF', styleOBJ: {'background-color':'#F6FBFE',left:0 ,border:'solid 1px #C7C8C8'}},
                            // {command: 'warmWhite', styleOBJ: {'background-color':'#FFDCA6',left:0}},
                            {command: '78FF00', styleOBJ: {'background-color':'#80FF00',left:0}},
                            {command: '003000', styleOBJ: {'background-color':'#00CC00',left:0}},
                            {command: '008080', styleOBJ: {'background-color':'#00FFFF',left:0}},
                            {command: 'FFC700', styleOBJ: {'background-color':'#FFFF00',left:0}},
                            {command: '000040', styleOBJ: {'background-color':'#0000FF',left:0}},
                            {command: 'FF3800', styleOBJ: {'background-color':'#FF8000',left:0}},
                            {command: '270010', styleOBJ: {'background-color':'#FF007F',left:0}},
                            {command: 'FF0000', styleOBJ: {'background-color':'#FF0000',left:0}},
                            {command: '080010', styleOBJ: {'background-color':'#7F00FF',left:0}}],

                        savedColors:[
                            //{command: '003000', styleOBJ: {'background-color': '#00CC00',left:0}},
                            //{command: 'FFC700', styleOBJ: {'background-color': '#FFFF00'  ,left:0}},
                            //{command: '270010', styleOBJ: {'background-color':'#FF007F' ,left:0}},
                            //{command: '080010', styleOBJ: {'background-color':'#7F00FF',left:0}},
                            //{command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE'  ,left:0}}
                        ]
                    };
                }else {
                    data = {
                        barColors:[
                            {command: Wtype==='widgetLedStrip'?"FFFFFF":'coolWhite', styleOBJ: {'background-color':'#CAE9FB',left:0}},
                            {command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE',left:0 ,border:'solid 1px #C7C8C8'}},
                            {command: 'warmWhite', styleOBJ: {'background-color':'#FFDCA6',left:0}},
                            {command: '78FF00', styleOBJ: {'background-color':'#80FF00',left:0}},
                            {command: '003000', styleOBJ: {'background-color':'#00CC00',left:0}},
                            {command: '008080', styleOBJ: {'background-color':'#00FFFF',left:0}},
                            {command: 'FFC700', styleOBJ: {'background-color':'#FFFF00',left:0}},
                            {command: '000040', styleOBJ: {'background-color':'#0000FF',left:0}},
                            {command: 'FF3800', styleOBJ: {'background-color':'#FF8000',left:0}},
                            {command: '270010', styleOBJ: {'background-color':'#FF007F',left:0}},
                            {command: 'FF0000', styleOBJ: {'background-color':'#FF0000',left:0}},
                            {command: '080010', styleOBJ: {'background-color':'#7F00FF',left:0}}],

                        savedColors:[
                            //{command: '003000', styleOBJ: {'background-color': '#00CC00',left:0}},
                            //{command: 'FFC700', styleOBJ: {'background-color': '#FFFF00'  ,left:0}},
                            //{command: '270010', styleOBJ: {'background-color':'#FF007F' ,left:0}},
                            //{command: '080010', styleOBJ: {'background-color':'#7F00FF',left:0}},
                            //{command: 'pureWhite', styleOBJ: {'background-color':'#F6FBFE'  ,left:0}}
                        ]
                    };
                }

                pushLeft();
                function pushLeft(){
                    var barColorsLength = data.barColors.length;
                    var gap = 100/12;
                    for(var i =0;i<barColorsLength;i++){
                        data.barColors[i].styleOBJ.left = i*gap+'%';
                    }
                }
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
            function makeSaveColor(){
                var saveColor = localStorage[nodeID+'saveColor'].split(',');
                var commandColor = localStorage[nodeID+'commandColor'].split(',');
                var data = [];
                for(var i = 0 ; i < saveColor.length;i++){
                    data[i] = {command: commandColor[i], styleOBJ: {'background-color':'#'+ saveColor[i],left:0}};
                }
                pushLeft2();
                function pushLeft2(){
                    var barColorsLength = data.length;
                    var gap = 100/12;
                    for(var k =0;k<barColorsLength;k++){
                        data[k].styleOBJ.left = k*gap+'%';
                    }
                }
                thisComponent.savedColors = data;
            }
            function addSaveColor(color,Command){//需求原因，没有用
                $('.saveColorBox').unbind('touchy-drag');
                color = rgb2hex(color);
                Command = rgb2hex(Command);
                var saveColor = localStorage[nodeID+'saveColor'].split(',');
                var commandColor = localStorage[nodeID+'commandColor'].split(',');
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
                        styleOBJ: {'background-color':'#'+saveColor[l],left:0}};
                }
                pushLeft2();
                function pushLeft2(){
                    var barColorsLength = data.length;
                    var gap = 100/12;
                    for(var j =0;j<barColorsLength;j++){
                        data[j].styleOBJ.left = j*gap+'%';
                    }
                }


                thisComponent.savedColors = data;
                setTimeout(function () {
                    $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
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

            function reset(){
                var BoxH = $('.colorBox').height();
                //$('.saveColorBox').css('height',BoxH+'px');
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
            // basic set和颜色switch set
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
                    }else {
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",rgb,"color"]);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", rgb, "color",operateID]);
                        }
                    }
                },300)
            }
            function bindTouchy(){
                $('.colorBox').bind('touchy-drag', handleTouchyDrag);
                $('.saveColorBox').bind('touchy-drag', handleTouchyDrag2);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                },false);
            }

            var handleTouchyDrag = function (event, phase, $target, data) {
                if(phase === 'start'){
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                    handleTouchyStart(data['startPoint'],$target,'colorBox');
                }else if (phase === 'move') {
                    handleTouchyMove(data['movePoint'],$target,'colorBox',data['startPoint']);
                } else if (phase === 'end') {
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                    sendTo($(currentTarget['colorBox']).attr('command'));
                }
            };

            var handleTouchyDrag2 = function (event, phase, $target, data) {
                if(phase === 'start'){
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                    handleTouchyStart(data['startPoint'],$target,'saveColorBox');
                }else if (phase === 'move') {
                    handleTouchyMove(data['movePoint'],$target,'saveColorBox',data['startPoint']);
                } else if (phase === 'end') {
                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                    sendTo($(currentTarget['saveColorBox']).attr('command'));
                }
            };

            var handleTouchyMove = function (event,$target,thisEl,event2) {
                if(window.screen.availHeight<=event['y'] || event['y']<=0){
                    return 1;
                }
                if(window.screen.availWidth<=event['x'] || event['x']<=0){
                    return 1;
                }
                if($target[0]['className']!=thisEl){
                    return 1;
                }
                var locationX = event['x'];
                var locationY = event['y'];
                var realTarget = document.elementFromPoint(locationX , event2['y']);
                if(realTarget.className!=thisEl){
                    return 1;
                }
                if(realTarget == currentTarget[thisEl]){
                    return 1;
                }
                if(thisEl == 'saveColorBox'){
                    TweenLite.to(realTarget, 0.3, {css:{height:"100%", top:"0"}, ease:Bounce.easeOut});
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"50%", top:"25%"},delay:0, ease:Bounce.easeOut});
                }else{
                    TweenLite.to(realTarget, 0.3, {css:{height:"60%", top:"20%"}, ease:Bounce.easeOut});
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"25%", top:"37.5%"},delay:0, ease:Bounce.easeOut});
                }
                currentTarget[thisEl] = realTarget;
                addTick(currentTarget[thisEl]);
            };
            function addTick(el){
                if(el){
                    $(el).siblings().find('.bulbClickedIcon').css('display','none');
                    $(el).find('.bulbClickedIcon').css('display','block');
                }else{

                }
            }
            function removeTick(el) {
                if(el) {
                    $(el).find('.bulbClickedIcon').hide();
                }
            }
            var handleTouchyStart = function (event,$target,thisEl) {
                var locationX = event['x'];
                var locationY = event['y'];
                if(currentTarget[thisEl]){
                    if(thisEl == 'saveColorBox'){
                        TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"50%", top:"25%"},delay:0, ease:Bounce.easeOut});
                    }else{
                        TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                    }
                }
                currentTarget[thisEl] = document.elementFromPoint(locationX, locationY);
                if(thisEl == 'saveColorBox'){
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"100%", top:"0"},delay:0, ease:Bounce.easeOut});
                    sendTo($(currentTarget['saveColorBox']).attr('command'));
                    addTick(currentTarget['saveColorBox']);
                    TweenLite.to($('.RGBBar .colorBox'), 0.3, {css:{height:"25%", top:"37.5%"},delay:0, ease:Bounce.easeOut});
                    removeTick(currentTarget['colorBox']);
                    currentTarget['colorBox'] = null;
                }else{
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                    sendTo($(currentTarget['colorBox']).attr('command'));
                    addTick(currentTarget['colorBox']);
                    TweenLite.to($('.SavedColor .saveColorBox'), 0.3, {css:{height:"50%", top:"25%"},delay:0, ease:Bounce.easeOut});
                    removeTick(currentTarget['saveColorBox']);
                    currentTarget['saveColorBox'] = null;
                    //addSaveColor($(currentTarget['colorBox']).css('background-color'),$(currentTarget['colorBox']).attr('command'))
                }

                return 1;
            };
            function getDeviceData(){
                if(operateID !== null) {
                    cordova.exec(function (data) {
                        var val = 'ffffff';
                        popupTools.updateUI(data,'color', function (result) {
                            val = result;
                            highLightSolid(val);
                        });
                    }, null, "FTP2PApi", "querySceneActionStatus", [operateID, "binsw01"]);
                } else {
                    cordova.exec(function (data) {
                        var val = 'ffffff';
                        popupTools.updateUI(data,'color', function (result) {
                            val = result;
                            highLightSolid(val);
                        });
                    }, null, "FTP2PApi", "getDeviceStatus", [nodeID, "binsw01"]);
                }
            }
            function highLightSolid(val){
                    var reg = /^[0-9a-fA-F]{6}$/;
                    var s = reg.test(val+'');
                    var commandColor = {
                        'coolWhite':'coolWhite',
                        'pureWhite':'pureWhite',
                        'warmWhite':'warmWhite',
                        'FFFFFF':'FFFFFF',
                        '78FF00':'78FF00',
                        '003000':'003000',
                        '008080':'008080',
                        'FFC700':'FFC700',
                        '000040':'000040',
                        'FF3800':'FF3800',
                        '270010':'270010',
                        'FF0000':'FF0000',
                        '080010':'080010',
                        '7864064':'78FF00',
                        '12288':'003000',
                        '-32896':'008080',
                        '-80128':'FFC700',
                        '64':'000040',
                        '-51200':'FF3800',
                        '2555920':'270010',
                        '-65536':'FF0000',
                        '524304':'080010'
                    };
                if(currentTarget['colorBox'] != null){
                    TweenLite.to(currentTarget['colorBox'], 0.3, {css:{height:"25%", top:"37.5%"},delay:0, ease:Bounce.easeOut});
                }
                if(currentTarget['saveColorBox'] != null){
                    TweenLite.to(currentTarget['saveColorBox'], 0.3, {css:{height:"50%", top:"25%"},delay:0, ease:Bounce.easeOut});
                }
                if (commandColor[val+'']){
                    TweenLite.to($('.'+commandColor[val+'']), 0.3, {css:{height:"100%", top:"0%"},delay:0, ease:Bounce.easeOut});
                    TweenLite.to($('#'+commandColor[val+'']), 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                    addTick($('#'+commandColor[val+'']));
                    addTick($('.'+commandColor[val+'']));
                    currentTarget['colorBox'] = $('#'+commandColor[val+'']);
                    currentTarget['saveColorBox'] = $('.'+commandColor[val+''])
                }else {
                    TweenLite.to($('.'+val), 0.3, {css:{height:"100%", top:"0%"},delay:0, ease:Bounce.easeOut});
//                    TweenLite.to($('#'+commandColor['FFFFFF']), 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
//                    addTick($('#'+commandColor['FFFFFF']));
                    addTick($('.'+val));
//                    currentTarget['colorBox'] = $('#'+commandColor['FFFFFF']);
                    currentTarget['saveColorBox'] = $('.'+val);
                }
            }
            function listener(){
                if (operateID !== null){
                    return 1;
                }
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (nodeID === data.ID) {
                        if (data.title === "DeviceStatus") {
                            if(shouldReceive !== 0) {
                                return 1;
                            };
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "color") {
                                    var re = String(result[key]);
                                    var val = re.split('_')[0];
                                    highLightSolid(val);
                                }
                            }
                        }
                    }
                }, false);
            }
        };
        return obj;
    });