
/**
 * Created by qkchung on 17/2/28.
 */
define(['jquery','util/popupTools','Vue','TweenLite','TimelineLite','jquery_touchy'],
    function($, popupTools ,Vue,TweenLite,TimelineLite,jquery_touchy) {
        var obj = {};
        var thisComponent = {};
        var commandNum = '';
        var sp = 0;
        var transition = 0;
        var canSend = 0;
        var shouldReceive = 0;
        obj.run = function(nodeID,textsOBJ,commandType,operateID,bus){
            var currentTarget = {
                colorBox:null,
                saveColorBox:null
            };
            var commandColorMap = {
                '1':'FF0000',
                '2':'FF8000',
                '3':'FFFF00',
                '4':'00FF00',
                '5':'00FFFF',
                '6':'0000FF',
                '7':'8000FF',
                '8':'FF00FF'
            };
            Vue.component('RGBPattern', {
                name:'RGBPattern',
                template: '#_pattern',
                data: function () {
                    return {
                        speed:textsOBJ.speed,
                        Slowest:textsOBJ.slowest,
                        Slow:textsOBJ.slow,
                        Normal:textsOBJ.normal,
                        Fast:textsOBJ.fast,
                        Fastest:textsOBJ.fastest,
                        Transition:textsOBJ.transition,
                        continuous:textsOBJ.continuous,
                        smooth:textsOBJ.smooth,
                        instant:textsOBJ.instant,
                        pattern:textsOBJ.popPattern,
                        patternTitle:textsOBJ.patternTitle,
                        patternTur:textsOBJ.patternTur,
                        bars:generateDATA(),
                        showAdd : false,
                        showDel: false,
                        showAddOrDelWrapper: false,
                        addOrDelete: '../src/assets/img/patternAdd.svg',
                        tickShowOrNot: false
                    }
                },
                mounted:function(){
                    thisComponent = this;
                    var lastColorBox = $('.editPatternBoxes>div:last-child');
                    thisComponent.commandNum = lastColorBox == '' ? 1 :parseInt(lastColorBox.attr('command'))+1;
                    setEditPosition();
                    resetPatternLineHeight();
                    bindTouchy();
                    setCurrentSpeedStatus();
                    setCurrentTransitionStatus();
                    initAddDelPosition();
                    initCommands();
                    getDeviceData();
                    listener();
                },
                methods:{
                    editPattern : function a() {
                        TweenLite.to('.editPattern', 0.3, {css:{'left':'0%',opacity:'1',display:'block'}});

                    },
                    exitPattern : function () {
                        TweenLite.to('.editPattern', 0.3, {css:{'left':'100%',opacity:'0',display:'none'}});
                    },
                    addBox : function () {
                        $('.colorBox').unbind('touchy-drag');
                        triggerAdd();
                        setAddDelPosition('right');
                    },
                    removeColorBox: function() {
                        deleteColorBox();
                    },
                    s1: function () {
                        highLight('slowest');
                        sp = 0;
                        send()
                    },
                    s2: function () {
                        highLight('slow');
                        sp = 1;
                        send()
                    },
                    s3: function () {
                        highLight('normal');
                        sp = 2;
                        send()
                    },
                    s4: function () {
                        highLight('fast');
                        sp = 3;
                        send()
                    },
                    s5: function () {
                        highLight('fastest');
                        sp = 4;
                        send()
                    },
                    t1:function () {
                        transition = 0;
                        highLightTransition('continuous');
                        send()
                    },
                    t2:function (){
                        transition = 1;
                        highLightTransition('smooth');
                        send()
                    },
                    t3: function () {
                        transition = 2;
                        highLightTransition('instant');
                        send()
                    }
                }
            });

            var vm = new Vue({
                el: ''
            });

            function initCommands(){
                if(localStorage[nodeID +'PatternspeedCM']){
                    sp =localStorage[nodeID +'PatternspeedCM'];
                }else{
                    localStorage[nodeID +'PatternspeedCM'] = 0;
                    sp = 0;
                }
                if(localStorage[nodeID +'PatterntransitionCM']){
                    transition = localStorage[nodeID +'PatterntransitionCM']
                }else{
                    localStorage[nodeID +'PatterntransitionCM'] = 0;
                    transition = 0;
                }
            }

            function initAddDelPosition(){
                var patternSave = localStorage[nodeID +'patternSave'];
                patternSave = patternSave.replace('0','');
                var PatternSVG = $('#PatternSVG');
                var PatternAddDelete = $('.PatternAddDelete');
                var barColorsWidth = $('.colorBox').width();
                var left = Number(PatternSVG.css('left').split('px')[0]);
                var toMove = barColorsWidth*(patternSave.length+1.5) +'px';
                TweenLite.to(PatternAddDelete, 0, {css:{left:toMove}});
            }

            function setCurrentSpeedStatus() {
                var clickedSpeed = localStorage[nodeID +'speedPatternEL'];
                if(clickedSpeed) {
                    highLight(clickedSpeed);
                } else {
                    highLight('slowest');
                }
            }

            function setCurrentTransitionStatus() {
                var clickedTransition = localStorage[nodeID +'transitionPatternEL'];
                if(clickedTransition) {
                    highLightTransition(clickedTransition)
                } else {
                    highLightTransition('continuous');
                }
            }

            function highLightTransition(el){
                $('.transi').find('span').css({'border-bottom':'none','color':'#595757'});
                $('.'+el).find('span').css({'border-bottom':'1px solid #E66C25','color':'#E66C25'});
                localStorage[nodeID +'transitionPatternEL'] = el;
            }
            function highLight(e){
                $('.speed').find('span').css({'border-bottom':'none','color':'#595757'});
                $('.speedTopic span').css('color','#9E9E9F');
                $('.'+e).find('span').css({'border-bottom':'1px solid #E66C25','color':'#E66C25'});
                localStorage[nodeID +'speedPatternEL'] = e;
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
            // pattern和rainbow模式只发configuration set，但若关之后再打开只会存储上一次的mtlevel也就是0，因此调节颜色的时候要发status否则亮不起来
            function send(){
                syncSend(function () {
                    var command = 'pattern_'+sp+'_'+transition+'_'+getPatternCommand()+'_'+$('.brightnessValue').text();
                    if($('#onOffButtonSVGPath').attr('class') === 'powerOff'){
                        if (bus){
                            bus.$emit('onOff',{});
                        }
                        localStorage[nodeID +'PatternspeedCM'] = sp;
                        localStorage[nodeID +'PatterntransitionCM'] = transition;
                        cordova.exec(null, null, "FTP2PApi", commandType, [nodeID, "binsw01", 'true', "status"]);
                        setTimeout(function () {
                            cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",command,"color"]);
                        },100);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", 'true', "status",operateID]);
                            setTimeout(function(){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", command, "color",operateID]);
                            },100)
                        }
                    }else{
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",command,"color"]);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", command, "color",operateID]);
                        }
                    }

                });
            }

            function generateDATA(){
                if(localStorage[nodeID +'patternSave'] == undefined){
                    localStorage[nodeID +'patternSave'] = '1234';
                }
                var patternSave = localStorage[nodeID +'patternSave'];
                var tempSaved = [];
                var ii = 0;

                for(;ii<patternSave.length;) {
                    if (patternSave[ii] != 0) {
                        tempSaved[ii] = {
                            command: patternSave[ii],
                            styleOBJ: {'background-color':'#'+ commandColorMap[patternSave[ii]], left: 0}
                        }
                    }
                    ii = ii+1;
                }
                var data = {
                    barColors:[
                        {command: '1', styleOBJ: {'background-color':'#FF0000',left:0}},
                        {command: '2', styleOBJ: {'background-color':'#FF8000',left:0}},
                        {command: '3', styleOBJ: {'background-color':'#FFFF00',left:0}},
                        {command: '4', styleOBJ: {'background-color':'#00FF00',left:0}},
                        {command: '5', styleOBJ: {'background-color':'#00FFFF',left:0}},
                        {command: '6', styleOBJ: {'background-color':'#0000FF',left:0}},
                        {command: '7', styleOBJ: {'background-color':'#8000FF',left:0}},
                        {command: '8', styleOBJ: {'background-color':'#FF00FF',left:0}}],

                    savedColors:tempSaved
                };

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
                    var main_content = $('.main_content');
                    var barColorsLength = data.savedColors.length;
                    var gap = (main_content.width()-(main_content.width()*0.1))/12;
                    for(var i =0;i<barColorsLength;i++){
                        data.savedColors[i].styleOBJ.left = i*gap+'px';
                        data.savedColors[i].styleOBJ.width  = gap +'px';
                    }
                }
                return data;
            }

            function getPatternCommand(){
                var data = thisComponent.bars.savedColors;
                var toSendList = '';
                for(var i = 0 ; i < data.length ; i ++){
                    var c = data[i]['command'];
                    toSendList= toSendList + c;
                }
                switch (data.length){
                    case 3:toSendList= toSendList+'00000';break;
                    case 4:toSendList= toSendList+'0000';break;
                    case 5:toSendList= toSendList+'000';break;
                    case 6:toSendList= toSendList+'00';break;
                    case 7:toSendList= toSendList+'0';break;
                }
                return toSendList;
            }

            function sendTo(){
                // 反选点击也能换色
                if(currentTarget['colorBox'] == null){
                    return 1;
                }
                var currentBoxIndex = $(currentTarget['colorBox']).attr('index');
                var c =  $(currentTarget['PatternSaveColorBox']).attr('command');
                if(currentBoxIndex!=undefined){
                    currentBoxIndex = Number(currentBoxIndex);
                    var tempData = thisComponent.bars.savedColors;
                    tempData[currentBoxIndex]['command'] = c;
                    thisComponent.bars.savedColors =tempData;
                }
                var rgb = $(currentTarget['PatternSaveColorBox']).css('background-color');
                TweenLite.to($(currentTarget['colorBox']), 0.6, {css:{'background-color':rgb}});
                changeColor();
            }
            function changeColor(){
                var clickedSavedColor = $(currentTarget['PatternSaveColorBox']).css('background-color');
                var clickedIndex = $(currentTarget['colorBox']).attr('index');
                var tempData = thisComponent.bars.savedColors;
                tempData[Number(clickedIndex)]['styleOBJ']['background-color'] = clickedSavedColor;
                thisComponent.bars.savedColors = tempData;
                if(currentTarget['colorBox'] != null) {
                    TweenLite.to($(currentTarget['colorBox']), 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                    $(currentTarget['colorBox']).find('.bulbClickedIcon').hide();
                    currentTarget['colorBox'] = null;
                }
                localStorage[nodeID+'patternSave'] = getPatternCommand();
            }

            function sendBack(rgb) {

            }

            function setEditPosition() {
                var $body_content = $('.body_content');
                var $routing_content = $('.routing_content');
                var $editPattern = $('.editPattern');
                var $navigationHolder = $('.navigationHolder');
                $editPattern.css('height',$body_content.height()+$routing_content.height()+'px');
                $editPattern.css('top',-($body_content.height()+$navigationHolder.height())+'px');
            }

            function resetPatternLineHeight() {
                var $editPatternBoxes = $('.editPatternBoxes');
                var $PatternAddDelete = $('.PatternAddDelete');
                $editPatternBoxes.css('line-height',$editPatternBoxes.height()+'px');
                $PatternAddDelete.css('line-height',$PatternAddDelete.height()+'px');
                $('.PatternSaveColorBox').css('height','25%');
            }

            function bindTouchy(){
                $('.colorBox').bind('touchy-drag', colorBoxDrag);
                $('.PatternSaveColorBox').bind('touchy-drag', saveColorBoxDrag);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                },false);
            }

            function deleteColorBox(){
                var currentBoxIndex = $(currentTarget['colorBox']).attr('index');
                var tempData = thisComponent.bars.savedColors;
                var boxWidth = $('.colorBox').width();
                tempData.splice(currentBoxIndex,1);
                pushLeft3();
                function pushLeft3(){
                    var main_content = $('.main_content');
                    var gap = (main_content.width()-(main_content.width()*0.1))/12;
                    var barColorsLength = tempData.length;
                    for(var i =0;i<barColorsLength;i++){
                        tempData[i].styleOBJ.left = i*gap+'px';
                        tempData[i].styleOBJ.width  = gap +'px';
                    }
                }
                thisComponent.bars.savedColors = tempData;
                setAddDelPosition('left');
                if(thisComponent.bars.savedColors.length <= 4) {
                    thisComponent.showAddOrDelWrapper = false;
                }
                TweenLite.to($('.colorBox'), 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                $(currentTarget['colorBox']).find('.bulbClickedIcon').hide();
                currentTarget['colorBox'] = null;
                thisComponent.showAddOrDelWrapper = false;
                localStorage[nodeID+'patternSave'] = getPatternCommand();
            }

            function triggerAdd() {
                if(currentTarget['colorBox'] != null) {
                    TweenLite.to($(currentTarget['colorBox']), 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                    $(currentTarget['colorBox']).find('.bulbClickedIcon').hide();
                    currentTarget['colorBox'] = null;
                }
                var clickedSavedColor = $(currentTarget['PatternSaveColorBox']).css('background-color');
                var clickedCommand = $(currentTarget['PatternSaveColorBox']).attr('command');
                var colorBoxLength = thisComponent.bars.savedColors.length;
                var main_content = $('.main_content');
                if(thisComponent.showAdd) {
                    thisComponent.bars.savedColors.push({
                        command: clickedCommand,
                        styleOBJ: {
                            'background-color':clickedSavedColor,
                            left:colorBoxLength*(main_content.width()- (main_content.width()*0.1))/ 12+'px',
                            width:(main_content.width()- (main_content.width()*0.1))/ 12 +'px'
                        }
                    });
                }
                if(thisComponent.bars.savedColors.length >= 8){
                    thisComponent.showAdd = false;
                    $('.PatternSaveColorBox').css({'height':'25%','top':'37.5%'});
                    $(currentTarget['PatternSaveColorBox']).find('.bulbClickedIcon').hide();
                    currentTarget['PatternSaveColorBox'] = null;
                }
                if(currentTarget['PatternSaveColorBox'] != null) {
                    TweenLite.to($(currentTarget['PatternSaveColorBox']), 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                    $(currentTarget['PatternSaveColorBox']).find('.bulbClickedIcon').hide();
                    currentTarget['PatternSaveColorBox'] = null;
                }
                setTimeout(function () {
                    $('.colorBox').bind('touchy-drag', colorBoxDrag);
                },100);
                thisComponent.showAddOrDelWrapper = false;
                localStorage[nodeID+'patternSave'] = getPatternCommand();
            }

            // 监听加删除符号位置移动
            var setAddDelPosition = function (direction) {
                var PatternSVG = $('#PatternSVG');
                var PatternAddDelete = $('.PatternAddDelete');
                var barColorsWidth = $('.colorBox').width();
                var left = Number(PatternSVG.css('left').split('px')[0]);
                var toMove = 0;
                if(direction == 'left'){
                    toMove = left-barColorsWidth +'px';
                }else if(direction == 'right'){
                    toMove = left+barColorsWidth +'px';
                }

                TweenLite.to(PatternSVG, 0.3, {css:{left:toMove}});
            };

            var colorBoxDrag = function (event, phase, $target, data) {
                if(phase === 'start'){
                    if(thisComponent.bars.savedColors.length <= 8 && thisComponent.bars.savedColors.length >4) {
                        thisComponent.showAddOrDelWrapper = true;
                        thisComponent.showDel = true;
                        thisComponent.showAdd = false;
                    } else {
                        thisComponent.showAddOrDelWrapper = false;
                    }
                    colorBoxDragStart(data['startPoint'],$target,'colorBox');
                }else if (phase === 'move') {
                    handleTouchyMove(data['movePoint'],$target,'colorBox');
                } else if (phase === 'end') {
                    sendBack($(currentTarget['colorBox']).css('background-color'));
                }
            };

            var saveColorBoxDrag = function (event, phase, $target, data) {
                if(phase === 'start'){
                    if(thisComponent.bars.savedColors.length < 8 && thisComponent.bars.savedColors.length >=4) {
                        thisComponent.showAddOrDelWrapper = true;
                        thisComponent.showAdd = true;
                        thisComponent.showDel = false;
                    } else {
                        thisComponent.showAddOrDelWrapper = false;
                    }
                    //$(currentTarget['PatternSaveColorBox']).children().css('display','block').parent('div').siblings().children().css('display','none');
                    saveColorBoxDragStart(data['startPoint'],$target,'PatternSaveColorBox');
                }else if (phase === 'move') {
                    handleTouchyMove(data['movePoint'],$target,'PatternSaveColorBox');
                } else if (phase === 'end') {
                    sendTo($(currentTarget['PatternSaveColorBox']).css('background-color'));
                }
            };

            function addTick(el){
                if(el){
                    $(el).siblings().find('.bulbClickedIcon').css('display','none');
                    $(el).find('.bulbClickedIcon').css('display','block');
                }else{

                }
            }
            var handleTouchyMove = function (event,$target,thisEl) {
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
                var realTarget = document.elementFromPoint(locationX, locationY);
                if(realTarget.className!=thisEl){
                    return 1;
                }
                if(realTarget == currentTarget[thisEl]){
                    return 1;
                }
                TweenLite.to(realTarget, 0.3, {css:{height:"60%", top:"20%"}, ease:Bounce.easeOut});
                TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"25%", top:"37.5%"},delay:0, ease:Bounce.easeOut});
                currentTarget[thisEl] = realTarget;
                addTick(currentTarget[thisEl]);
            };
            var saveColorBoxDragStart = function (event,$target,thisEl) {
                var locationX = event['x'];
                var locationY = event['y'];
                if(currentTarget[thisEl]){
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                }
                currentTarget[thisEl] = document.elementFromPoint(locationX, locationY);
                TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                addTick(currentTarget[thisEl]);
                sendTo();
                return 1;
            };
            var colorBoxDragStart = function (event,$target,thisEl) {
                var locationX = event['x'];
                var locationY = event['y'];
                if(currentTarget[thisEl]){
                    TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"25%", top:"37.5%"}, ease:Bounce.easeOut});
                }
                currentTarget[thisEl] = document.elementFromPoint(locationX, locationY);
                TweenLite.to(currentTarget[thisEl], 0.3, {css:{height:"60%", top:"20%"},delay:0, ease:Bounce.easeOut});
                addTick(currentTarget[thisEl]);
                return 1;
            };

            function listener(){
                if (operateID !== null){
                    return 1;
                }
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (nodeID === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "color") {
                                    var re = String(result[key]);
                                    renderRainbow(re);
                                }
                            }
                        }
                    }
                }, false);
            }
            function getDeviceData(){
                if (operateID !== null){
                    cordova.exec(function (data) {
                        popupTools.updateUI(data,'color', function (result) {
                            renderRainbow(result);
                        });
                    }, null, "FTP2PApi", "querySceneActionStatus", [operateID, "binsw01"]);
                } else {
                    cordova.exec(function (data) {
                        popupTools.updateUI(data,'color', function (result) {
                            renderRainbow(result);
                        });
                    }, null, "FTP2PApi", "getDeviceStatus", [nodeID, "binsw01"]);
                }
            }
            function renderRainbow(re) {
                if(re.indexOf('_')>-1){
                    if(re.indexOf('pattern')>-1){
                        var val = re.split('_');
                        sp = Number(val[1]);
                        switch (sp){
                            case 0:highLight('slowest');break;
                            case 1:highLight('slow');break;
                            case 2:highLight('normal');break;
                            case 3:highLight('fast');break;
                            case 4:highLight('fastest');break;
                        }
                        transition = Number(val[2]);
                        switch (transition){
                            case 0:highLightTransition('continuous');break;
                            case 1:highLightTransition('smooth');break;
                            case 2:highLightTransition('instant');break;
                        }
                    }
                }
            }
        };
        return obj;
    });