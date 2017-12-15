/**
 * Created by qkchung on 16/12/22.
 */
window.onload = function(){
    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    var globalTextsOBJ = {};
    var myDate = new Date();
    var clickAble= {
        'timer':0
    };
    var blockerEl = {
        'hourStart':$('#hourStartBlock'),
        'minStart':$('#minStartBlock'),
        'AmPmStart':$('#AmPmStartBlock'),
        'hourEnd':$('#hourEndBlock'),
        'minEnd':$('#minEndBlock'),
        'AmPmEnd':$('#AmPmEndBlock')
    };
    var duration = {
        snapDuration:{'hourStart':200, 'minStart':200, 'AmPmStart':200,'hourEnd':200, 'minEnd':200,'AmPmEnd':200,'timeoutDisabling':200},
        scrollingEffectInterval:100,
        doneAnimationTimeout:200,
        contentHeightDetectInterval:100
    };
    var intervals = {'hourStart':0, 'minStart':0, 'hourEnd':0, 'minEnd':0, 'AmPmStart':0, 'AmPmEnd':0};
    var globalData = {
        'hourStart':Number(myDate.getHours()),
        'minStart' :Number(myDate.getMinutes()),
        'AmPmStart':Number(myDate.getHours())>=12?1:0,
        'hourEnd'  :Number(myDate.getHours()),
        'minEnd'   :Number(myDate.getMinutes()),
        'AmPmEnd'  :Number(myDate.getHours())>=12?1:0,
        'is24':false
    };
    var preGlobalData = {
        'hourStart':0,
        'minStart':0,
        'hourEnd':0,
        'minEnd':0,
        'AmPmStart':0,
        'AmPmEnd':0
    };
    var timeEL = {
        'hourStart':'hourStart',
        'minStart':'minStart',
        'hourEnd':'hourEnd',
        'minEnd':'minEnd',
        'AmPmStart':'AmPmStart',
        'AmPmEnd':'AmPmEnd'
    };
    var myScroll = {
        'hourStart':null,
        'minStart':null,
        'hourEnd':null,
        'minEnd':null,
        'AmPmStart':null,
        'AmPmEnd'  :null
    };
    var timeFormat = {
        hour:globalData.is24?24:12,
        min:60,
        AmPm:2,
        hourStart:globalData.is24?24:12,
        minStart:0,
        hourEnd:globalData.is24?24:12,
        minEnd:0,
        AmPmStart:2,
        AmPmEnd:2
    };

    var dataToSendToCube = {
        type:1,
        interval:'00:00',
        days:''
    };
    languageSwitcher(lang);
    function languageSwitcher(lang){
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
            $("#hourStartTopic").text(globalTextsOBJ.hourStartTopic);
            $("#minStartTopic").text(globalTextsOBJ.minStartTopic);
            $("#hourEndTopic").text(globalTextsOBJ.hourEndTopic);
            $("#minEndTopic").text(globalTextsOBJ.minEndTopic);
            $("#AmPmStartTopic").text(globalTextsOBJ.AM_PM_TOPIC);
            $("#AmPmEndTopic").text(globalTextsOBJ.AM_PM_TOPIC);
            DayPicker();
            setTimeout(function () {
                getDate(); //todo
                // initPickers();
            },10);

        });
    }
    function getDate(){
        cordova.exec(function (data) {
            var thisdate = JSON.parse(data)['value'];
            thisdate = thisdate.split(' ');
            var days = thisdate[0].split('-');
            var time = thisdate[1].split('-');
            globalData.hourStart = Number(time[0]);
            globalData.minStart = Number(time[1]);
            globalData.hourEnd = Number(time[0]);
            globalData.minEnd = Number(time[1]);
            globalData.AmPmEnd = Number(time[0])>=12?1:0;
            globalData.AmPmStart = Number(time[0])>=12?1:0;
            globalData.is24 = JSON.parse(data)['is24'];
            timeFormat.hour = globalData.is24?24:12;
            setTimeout(function () {
                listener();
            },10)
        }, null, "FTP2PApi", "getSystemTime", ['']);
    }
    function initPickers(){
        if (globalData.is24){
            switchView('Condition24',timeEL.hourStart, timeFormat.hour, globalData.hourStart,  0);
            switchView('Condition24',timeEL.minStart,  timeFormat.min,  globalData.minStart,   0);
            switchView('Condition24',timeEL.hourEnd,   timeFormat.hour, globalData.hourEnd-globalData.hourStart,    globalData.hourStart);
            switchView('Condition24',timeEL.minEnd,    timeFormat.min,  globalData.minEnd-globalData.minStart,     globalData.minStart);
            switchView('Condition24',timeEL.AmPmEnd,   timeFormat.AmPm, globalData.AmPmEnd,    0);
            switchView('Condition24',timeEL.AmPmStart, timeFormat.AmPm, globalData.AmPmStart,     0);
        }else {
            if (globalData.AmPmEnd === globalData.AmPmStart){
                if (globalData.hourStart === 0 || globalData.hourStart ===12){
                    timeFormat.hourEnd = 12;
                }else {
                    timeFormat.hourEnd = 11;
                }
            }
            switchView('Condition24',timeEL.hourStart, timeFormat.hourStart, globalData.hourStart>12?globalData.hourStart-13:globalData.hourStart-1,  1);
            switchView('Condition24',timeEL.minStart,  timeFormat.min,  globalData.minStart,   0);
            var hourStart = globalData.hourStart>12?globalData.hourStart-12:globalData.hourStart;
            var hourEnd = globalData.hourEnd>12?globalData.hourEnd-12:globalData.hourEnd;
            switchView('Condition24',timeEL.hourEnd,   timeFormat.hourEnd, hourEnd-hourStart,    hourStart);
            switchView('Condition24',timeEL.minEnd,    timeFormat.min,  globalData.minEnd-globalData.minStart,     globalData.minStart);
            switchView('Condition24',timeEL.AmPmEnd,   timeFormat.AmPm, globalData.AmPmEnd-globalData.AmPmStart,    globalData.AmPmStart);
            switchView('Condition24',timeEL.AmPmStart, timeFormat.AmPm, globalData.AmPmStart,     0);
        }

        setTimeout(function () {
            switch1224();
            adjustElements();
        },10);
    }
    function switchView(timeType,timeEL,timeFormat,ToShow,toStart){
        var $showWindow = $('#timeContainer');
        var $_ElementHolder= $('#'+timeEL);
        myScroll[timeEL] = null;
        $_ElementHolder.remove();
        window.clearInterval(intervals[timeEL]);
        var data = ['Condition24',generateLetterTextData(timeType,timeEL,timeFormat,ToShow,toStart)];
        var template = switchWhichView(timeEL);
        $showWindow.append(Handlebars.compile(template.html())(data[1]));
        $showWindow.onload = callback();
        function callback(){
            if (globalData.is24){
                if(timeEL === 'hourEnd'){
                    switchPicker(timeType,timeEL,ToShow,timeFormat-toStart-1);
                }else {
                    switchPicker(timeType,timeEL,ToShow,timeFormat-toStart);
                }
            }else {
                switchPicker(timeType,timeEL,ToShow,timeFormat-toStart);
            }
        }
        function switchWhichView(timeEL){
            return  $('#Condition'+timeEL+'24');
        }
        function generateLetterTextData(timeType,timeEL,timeFormat,ToShow,toStart){
            var data = {};
            data[timeEL+'Text'] = [];
            if (timeEL === 'AmPmEnd' || timeEL === 'AmPmStart'){
                if (toStart === 1){
                    data[timeEL+'Text'][0] = {};
                    data[timeEL+'Text'][0][timeEL] = globalTextsOBJ.pm;
                    data[timeEL+'Text'][0][timeEL+'Class'] = timeEL+'_'+0;
                }else {
                    data[timeEL+'Text'][0] = {};
                    data[timeEL+'Text'][0][timeEL] = globalTextsOBJ.am;
                    data[timeEL+'Text'][0][timeEL+'Class'] = timeEL+'_'+0;
                    data[timeEL+'Text'][1] = {};
                    data[timeEL+'Text'][1][timeEL] = globalTextsOBJ.pm;
                    data[timeEL+'Text'][1][timeEL+'Class'] = timeEL+'_'+1;
                }
            }else {
                for(var i = toStart, j = 0; i <= timeFormat;i++,j++){
                    data[timeEL+'Text'][j] = {};
                    data[timeEL+'Text'][j][timeEL] = i;
                    data[timeEL+'Text'][j][timeEL+'Class'] = timeEL+'_'+j;
                }
            }
            return data;
        }
        function switchPicker(timeType,timeEL,ToShow,timeFormat){
            picker(timeType,timeEL,ToShow,timeFormat);
        }
    }
    function convertDBtoPicker(DBString){
        if(DBString.length === 0){
            return 1;
        }else{
            var DBData = DBString.split('-');
            var Start = DBData[0].split(':');
            var End = DBData[1].split(':');
            var startHour = Number(Start[0]),
                startMin = Number(Start[1]),
                EndHour = Number(End[0]),
                EndMin = Number(End[1]);
            globalData.hourStart = startHour;
            globalData.minStart = startMin;
            globalData.hourEnd = EndHour;
            globalData.minEnd = EndMin;
            var AmPmEnd = EndHour>=12?1:0;
            var AmPmStart = startHour>=12?1:0;
            globalData.AmPmEnd = AmPmEnd;
            globalData.AmPmStart = AmPmStart;
            if (globalData.AmPmEnd === globalData.AmPmStart){
                if (globalData.hourStart === 0 || globalData.hourStart ===12){
                    timeFormat.hourEnd = 12;
                }else {
                    timeFormat.hourEnd = 11;
                }
            }
            if (globalData.is24){
                switchView('Condition24',timeEL.hourStart, timeFormat.hour, startHour,  0);
                switchView('Condition24',timeEL.minStart,  timeFormat.min,  startMin,   0);
                compareTime();
                function compareTime(){
                    if(startHour === EndHour){
                        switchView('Condition24',timeEL.hourEnd, timeFormat.hour, EndHour - startHour, startHour);
                        switchView('Condition24',timeEL.minEnd, timeFormat.min,EndMin - startMin, startMin);
                    }else if(startHour< EndHour){
                        switchView('Condition24',timeEL.hourEnd, timeFormat.hour, EndHour - startHour, startHour);
                        switchView('Condition24',timeEL.minEnd, timeFormat.min, EndMin, 0);
                    }
                }
            }else {
                if (globalData.hourStart === 0 || globalData.hourStart === 12){
                    switchView('Condition24',timeEL.hourStart, timeFormat.hourStart, 11,  1);
                }else {
                    switchView('Condition24',timeEL.hourStart, timeFormat.hourStart, startHour>12?startHour-13:startHour-1,  1);
                }
                switchView('Condition24',timeEL.minStart,  timeFormat.min,  startMin,   0);
                switchView('Condition24',timeEL.AmPmStart,  timeFormat.AmPm,  globalData.AmPmStart,   0);
                compareTime2();
                function compareTime2(){
                    if (AmPmStart === 0){
                        if(AmPmEnd === 0){
                            if(startHour === EndHour){
                                if (globalData.hourEnd === 0 || globalData.hourEnd === 12){
                                    switchView('Condition24',timeEL.hourEnd, 12, 11,  1);
                                }else {
                                    switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, 0, startHour);
                                }
                                switchView('Condition24',timeEL.minEnd, timeFormat.min,EndMin - startMin, startMin);
                            }else if(startHour< EndHour){
                                if (globalData.hourEnd === 0 || globalData.hourEnd === 12){
                                    switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, 11,  1);
                                }else {
                                    switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, EndHour - startHour, startHour);
                                }
                                switchView('Condition24',timeEL.minEnd, timeFormat.min, EndMin, 0);
                            }
                            switchView('Condition24',timeEL.AmPmEnd, timeFormat.AmPm, AmPmEnd,  0);
                        }else if(AmPmEnd === 1){
                            switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, EndHour>=13?EndHour-13:EndHour-1, 1);
                            switchView('Condition24',timeEL.minEnd, timeFormat.min,EndMin, 0);
                            switchView('Condition24',timeEL.AmPmEnd, timeFormat.AmPm, AmPmEnd,  0);
                        }
                    }else if (AmPmStart === 1){
                        if(AmPmEnd === 0){

                        }else if(AmPmEnd === 1){
                            if(startHour === EndHour){
                                if (globalData.hourEnd === 0 || globalData.hourEnd === 12){
                                    switchView('Condition24',timeEL.hourEnd, 12, 11,  1);
                                }else {
                                    switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, 0, startHour-12);
                                }
                                switchView('Condition24',timeEL.minEnd, timeFormat.min,EndMin - startMin, startMin);
                            }else if(startHour< EndHour){
                                if (globalData.hourEnd === 0 || globalData.hourEnd === 12){
                                    switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, 11,  1);
                                }else {
                                    switchView('Condition24',timeEL.hourEnd, timeFormat.hourEnd, EndHour - startHour, startHour-12);
                                }
                                switchView('Condition24',timeEL.minEnd, timeFormat.min, EndMin, 0);
                            }
                            switchView('Condition24',timeEL.AmPmEnd, timeFormat.AmPm, 0,  1);
                        }
                    }
                }
            }
        }
        switch1224();
    }

    function switch1224() {
        var hourStart = $('#hourStart');
        var minStart = $('#minStart');
        var AmPmStart = $('#AmPmStart');
        var hourEnd = $('#hourEnd');
        var minEnd = $('#minEnd');
        var AmPmEnd = $('#AmPmEnd');

        var hourStartTopic = $("#hourStartTopic");
        var minStartTopic  = $("#minStartTopic");
        var hourEndTopic   = $("#hourEndTopic");
        var minEndTopic    = $("#minEndTopic");
        var AmPmStartTopic =  $("#AmPmStartTopic");
        var AmPmEndTopic   = $("#AmPmEndTopic");

        var hourStartBlock = $("#hourStartBlock");
        var minStartBlock = $("#minStartBlock");
        var hourEndBlock = $("#hourEndBlock");
        var minEndBlock = $("#minEndBlock");
        var AmPmStartBlock = $("#AmPmStartBlock");
        var AmPmEndBlock = $("#AmPmEndBlock");

        var timeContainer = $('#timeContainer');
        if(globalData.is24){
            AmPmEnd.hide();
            AmPmStart.hide();
            AmPmStartTopic.hide();
            AmPmEndTopic.hide();
            AmPmStartBlock.hide();
            AmPmEndBlock.hide();
            timeContainer.css({'width':'44%','left':'56%'});
            hourStart.css({'width':'25%','left':'0%'});
            minStart.css({'width':'25%','left':'25%'});
            hourEnd.css({'width':'25%','left':'50%'});
            minEnd.css({'width':'25%','left':'75%'});

            hourStartTopic.css({'width':'25%','left':'0%'});
            minStartTopic.css({'width':'25%','left':'25%'});
            hourEndTopic.css({'width':'25%','left':'50%'});
            minEndTopic.css({'width':'25%','left':'75%'});
            hourStartBlock.css({'width':'25%','left':'0%'});
            minStartBlock.css({'width':'25%','left':'25%'});
            hourEndBlock.css({'width':'25%','left':'50%'});
            minEndBlock.css({'width':'25%','left':'75%'});

        }else {
            AmPmEnd.show();
            AmPmStart.show();
            AmPmStartTopic.show();
            AmPmEndTopic.show();
            AmPmStartBlock.show();
            AmPmEndBlock.show();
            timeContainer.css({'width':'54%','left':'46%'    });
            hourStart.css({'width':'16.666%','left':'0%'     });
            minStart.css({'width':'16.666%', 'left':'16.666%'});
            hourEnd.css({'width':'16.666%',  'left':'49.999%'});
            minEnd.css({'width':'16.666%',   'left':'66.666%'});
            AmPmStart.css({'width':'16.666%','left':'33.333%'});
            AmPmEnd.css({'width':'16.666%',  'left':'83.333%'});


            hourStartTopic.css({'width':'16.666%','left':'0%'     });
            minStartTopic .css({'width':'16.666%','left':'16.666%'});
            hourEndTopic  .css({'width':'16.666%','left':'49.999%'});
            minEndTopic   .css({'width':'16.666%','left':'66.666%'});
            AmPmStartTopic.css({'width':'16.666%','left':'33.333%'});
            AmPmEndTopic  .css({'width':'16.666%','left':'83.333%'});

            hourStartBlock.css({'width':'16.666%','left':'0%'     });
            minStartBlock. css({'width':'16.666%','left':'16.666%'});
            hourEndBlock  .css({'width':'16.666%','left':'49.999%'});
            minEndBlock.   css({'width':'16.666%','left':'66.666%'});
            AmPmStartBlock.css({'width':'16.666%','left':'33.333%'});
            AmPmEndBlock.  css({'width':'16.666%','left':'83.333%'});
        }
    }

    document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});

    function adjustElements(){
        var showtimeHeight = $('.showtime').height();
        $('.scroll').css('line-height',showtimeHeight+'px');
        $('#minStart_scroll').css('height',timeFormat.min*showtimeHeight);
        $('#hourStart_scroll').css('height',timeFormat.hour*showtimeHeight);
        $('#minEnd_scroll').css('height',timeFormat.minEnd*showtimeHeight);
        $('#hourEnd_scroll').css('height',timeFormat.hourEnd*showtimeHeight);
        $('#AmPmEnd_scroll').css('height',timeFormat.AmPmEnd*showtimeHeight);
        $('#AmPmStart_scroll').css('height',timeFormat.AmPmStart*showtimeHeight);
        var dash = $('#dash');
        dash.css('line-height',dash.height()+'px');
    }
    window.onresize = function(){
        adjustElements();
    };
    function picker(resourceTypeID,scroll_EL,toShow,scrollHeight){
        var scrollContents= $('#'+scroll_EL+'_scroll');
        var scrollWindow= $('#'+scroll_EL+'_select');
        if (scroll_EL === 'hourEnd'){
            scrollHeight = scrollHeight + 1;
        }
        timeFormat[scroll_EL] = scrollHeight;
        reload();
        function reload(){
            scrollContents.css('height',scrollWindow.height()*scrollHeight + 'px');
            var topics = $('#'+scroll_EL+'topic');
            topics.css('line-height',topics.height()+'px');
            timeFormat[scroll_EL] = scrollHeight;
        }
        adjustElements();
        loaded_scroll();
        function loaded_scroll() {
            myScroll[scroll_EL] = new IScroll('#'+scroll_EL+'_select', {
                scrollX: false,
                scrollY: true,
                momentum: true,
                snap: true,
                snapSpeed: duration.snapDuration[scroll_EL],
                keyBindings: true,
                indicators: null,
                probeType: 2
            });
            myScroll[scroll_EL].scrollTo(0,-scrollWindow.height()*(toShow));
            var currentT = Number($('.'+scroll_EL+'_'+toShow).text());
            if(scroll_EL === 'AmPmStart' || scroll_EL === 'AmPmEnd'){
                if (globalData.AmPmStart === 1){
                    globalData.AmPmEnd = 1;
                }else {
                    globalData.AmPmEnd = toShow;
                }
            }else if(scroll_EL === 'hourStart'){
                if (globalData.is24){
                    globalData[scroll_EL] = currentT;
                }else{
                    if (globalData.AmPmStart === 1){
                        if (currentT === 0 || currentT === 12){
                            globalData[scroll_EL] = 12;
                        }else {
                            globalData[scroll_EL] = currentT+12;
                        }
                    }else if (globalData.AmPmStart === 0){
                        if (currentT === 0 || currentT === 12){
                            globalData[scroll_EL] = 0;
                        }else {
                            globalData[scroll_EL] = currentT;
                        }
                    }
                }
            }else if( scroll_EL === 'hourEnd'){
                if (globalData.is24){
                    globalData[scroll_EL] = currentT;
                }else{
                    if (globalData.AmPmEnd === 1){
                        console.log(scroll_EL+currentT,toShow)
                        if (currentT === 0 || currentT === 12){
                            globalData[scroll_EL] = 12;
                        }else {
                            globalData[scroll_EL] = currentT+12;
                        }
                    }else if (globalData.AmPmEnd === 0){
                        if (currentT === 0 || currentT === 12){
                            globalData[scroll_EL] = 0;
                        }else {
                            globalData[scroll_EL] = currentT;
                        }
                    }
                }
            }else {
                globalData[scroll_EL] = currentT;
            }
            scrollEffect2(toShow,scroll_EL);
            function scrollEffect2(toRender,scroll_EL){
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                $('.'+scroll_EL+'_'+toRender).addClass('scrollEffect');
            }
            loadEvents();
        }
        function loadEvents() {
            myScroll[scroll_EL].on('scrollCancel', function (e) {
                timeoutDisabling();
                window.clearInterval(intervals[scroll_EL]);
                var scrollPoint = Number(-myScroll[scroll_EL].y) / scrollWindow.height();
                var toRender = Math.round(Math.abs(scrollPoint));
                myScroll[scroll_EL].scrollTo(0,-scrollWindow.height()*(toRender));
                scrollEffect(scroll_EL);
            }, false);
            myScroll[scroll_EL].on('scrollStart', function (e) {
                disablingClick(scroll_EL);
                preGlobalData.hourStart = globalData.hourStart;
                preGlobalData.minStart = globalData.minStart;
                preGlobalData.minEnd = globalData.minEnd;
                preGlobalData.hourEnd = globalData.hourEnd;
                preGlobalData.AmPmEnd = globalData.AmPmEnd;
                preGlobalData.AmPmStart = globalData.AmPmStart;
                intervals[scroll_EL] = setInterval(function(){
                    scrollEffectForScrolling(scroll_EL);
                },duration.scrollingEffectInterval);
            }, false);
            myScroll[scroll_EL].on('scrollEnd', function (e) {
                timeoutDisabling();
                scrollEffect(scroll_EL);
                window.clearInterval(intervals[scroll_EL]);
                var scrollPoint = Math.abs(Number(-myScroll[scroll_EL].y) / scrollWindow.height());
                if (globalData.is24){
                    globalData[scroll_EL] = Number($('.'+scroll_EL+'_'+scrollPoint).text());
                }else {
                    var currentTime = Number($('.'+scroll_EL+'_'+scrollPoint).text());
                    if (scroll_EL === 'hourStart' ){
                        if (globalData.AmPmStart === 0){
                            if (currentTime === 12){
                                globalData[scroll_EL] = 0;
                                timeFormat.hourEnd = 12;
                            }else {
                                globalData[scroll_EL] = currentTime;
                                timeFormat.hourEnd = 11;
                            }
                        }else {
                            if (currentTime === 12){
                                globalData[scroll_EL] = 12;
                                timeFormat.hourEnd = 12;
                            }else {
                                globalData[scroll_EL] = currentTime + 12;
                                timeFormat.hourEnd = 11;
                            }
                        }
                    }else if(scroll_EL === 'hourEnd'){
                        if (globalData.AmPmEnd === 0){
                            if (currentTime === 12){
                                globalData[scroll_EL] = 0;
                            }else {
                                globalData[scroll_EL] = currentTime;
                            }
                        }else {
                            if (currentTime === 12){
                                globalData[scroll_EL] = 12;
                            }else {
                                globalData[scroll_EL] = currentTime + 12;
                            }
                        }
                    }else if (scroll_EL === 'AmPmStart' || scroll_EL === 'AmPmEnd'){
                        globalData[scroll_EL] = scrollPoint;
                        if (globalData.AmPmStart === 0){
                            if (globalData.hourStart>=12){
                                globalData.hourStart = globalData.hourStart - 12;
                            }
                            if (globalData.AmPmEnd === 0){
                                if (globalData.hourEnd>=12){
                                    globalData.hourEnd = globalData.hourEnd - 12;
                                }
                                if(globalData.hourStart === 0 || globalData.hourStart === 12){
                                    timeFormat.hourEnd = 12;
                                }else {
                                    timeFormat.hourEnd = 11;
                                }
                            }else if(globalData.AmPmEnd === 1){
                                if (globalData.hourEnd<12){
                                    globalData.hourEnd = globalData.hourEnd + 12;
                                }
                                timeFormat.hourEnd = 12;
                            }
                        }else if(globalData.AmPmStart === 1){
                            if (globalData.hourStart<12){
                                globalData.hourStart = globalData.hourStart + 12;
                            }
                            if (globalData.AmPmEnd === 0){
                                if (globalData.hourEnd>=12){
                                    globalData.hourEnd = globalData.hourEnd - 12;
                                }
                            }else if(globalData.AmPmEnd === 1){
                                if (globalData.hourEnd<12){
                                    globalData.hourEnd = globalData.hourEnd + 12;
                                }
                            }
                            if(globalData.hourStart === 0 || globalData.hourStart === 12){
                                timeFormat.hourEnd = 12;
                            }else {
                                timeFormat.hourEnd = 11;
                            }
                        }
                    }else {
                        globalData[scroll_EL] = currentTime;
                    }
                }
                console.log(globalData);
                if(scroll_EL === timeEL.hourStart || scroll_EL === timeEL.minStart){
                    compareTime();
                    function compareTime(){
                        if(globalData.is24 === false){
                            if(globalData.AmPmStart === 0){
                                if(globalData.AmPmEnd === 1){
                                    return 1;
                                }
                            }
                        }
                        if(globalData[timeEL.hourStart]>globalData[timeEL.hourEnd]){
                            resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourStart],globalData[timeEL.hourStart]);
                            if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd,timeFormat.min,globalData[timeEL.minStart],globalData[timeEL.minStart]);
                            }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart])
                            }else if(globalData[timeEL.minStart]=globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart])
                            }
                        }else if(globalData[timeEL.hourStart] === globalData[timeEL.hourEnd]){
                            if(scroll_EL === timeEL.hourStart){
                                resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourStart],globalData[timeEL.hourStart]);
                            }
                            if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd,timeFormat.min,globalData[timeEL.minStart],globalData[timeEL.minStart]);
                            }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart]);
                            }else if(globalData[timeEL.minStart] === globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart]);
                            }
                        }else if(globalData[timeEL.hourStart]<globalData[timeEL.hourEnd]){
                            if(scroll_EL === timeEL.hourStart){
                                resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourEnd],globalData[timeEL.hourStart]);
                                if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }
                            }else if(scroll_EL === timeEL.minStart){
                                if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }
                            }
                        }else if (globalData[timeEL.hourStart] === 0 || globalData[timeEL.hourStart] === 12){
                            resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourEnd],1);
                        }
                    }
                }
                if(scroll_EL === timeEL.hourEnd ){
                    compareTime2();
                    function compareTime2(){
                        if(globalData.is24 === false){
                            if(globalData.AmPmStart === 0){
                                if(globalData.AmPmEnd === 1){
                                    return 1;
                                }
                            }
                        }
                        if(globalData[timeEL.hourStart] === globalData[timeEL.hourEnd]){
                            if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd,timeFormat.min , globalData[timeEL.minStart],globalData[timeEL.minStart]);
                            }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart]);
                            }else if(globalData[timeEL.minStart] === globalData[timeEL.minEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart]);
                            }
                        }else if(globalData[timeEL.hourStart]<globalData[timeEL.hourEnd]){
                            if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                            }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                            }
                        }
                    }
                }
                if(scroll_EL === timeEL.AmPmStart ){
                    if (globalData.is24 === false){
                        compareTime3();
                    }
                    function compareTime3(){
                        if(globalData.AmPmStart === 0){
                            if(preGlobalData.AmPmStart === 1){
                                resetScrolls(timeEL.AmPmEnd,timeFormat.AmPm , globalData.AmPmEnd,0);
                                resetScrolls(timeEL.hourEnd,timeFormat.hourEnd , globalData.hourEnd,1);
                                resetScrolls(timeEL.minEnd, timeFormat.min   , globalData.minEnd,0);
                            }
                        }if(globalData.AmPmStart === 1){
                            globalData.AmPmEnd = 1;
                            resetScrolls(timeEL.AmPmEnd,timeFormat.AmPm , globalData.AmPmEnd,1);
                            if(globalData[timeEL.hourStart]>globalData[timeEL.hourEnd]){
                                resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourStart],globalData[timeEL.hourStart]);
                                if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                    resetScrolls(timeEL.minEnd,timeFormat.min,globalData[timeEL.minStart],globalData[timeEL.minStart]);
                                }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart])
                                }else if(globalData[timeEL.minStart]=globalData[timeEL.minEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart])
                                }
                            }else if(globalData[timeEL.hourStart] === globalData[timeEL.hourEnd]){
                                resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourStart],globalData[timeEL.hourStart]);
                                if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                    resetScrolls(timeEL.minEnd,timeFormat.min,globalData[timeEL.minStart],globalData[timeEL.minStart]);
                                }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart]);
                                }else if(globalData[timeEL.minStart] === globalData[timeEL.minEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart]);
                                }
                            }else if(globalData[timeEL.hourStart]<globalData[timeEL.hourEnd]){
                                resetScrolls(timeEL.hourEnd,timeFormat.hour,globalData[timeEL.hourEnd],globalData[timeEL.hourStart]);
                                if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }
                                if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                }
                            }
                        }
                    }
                }
                if(scroll_EL === timeEL.AmPmEnd ){
                    if (globalData.is24 === false){
                        compareTime4();
                    }
                    function compareTime4(){
                        if(globalData.AmPmStart === 0){
                            if(globalData.AmPmEnd === 1){
                                resetScrolls(timeEL.hourEnd,timeFormat.hourEnd , globalData.hourEnd,0);
                                resetScrolls(timeEL.minEnd, timeFormat.min   , globalData.minEnd,0);
                            }else if(globalData.AmPmEnd === 0){
                                if(globalData[timeEL.hourStart]>globalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourStart],globalData[timeEL.hourStart]);
                                    if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                        resetScrolls(timeEL.minEnd,timeFormat.min,globalData[timeEL.minStart],globalData[timeEL.minStart]);
                                    }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart])
                                    }else if(globalData[timeEL.minStart]=globalData[timeEL.minEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart])
                                    }
                                }else if(globalData[timeEL.hourStart] === globalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.hourEnd,timeFormat.hourEnd,globalData[timeEL.hourStart],globalData[timeEL.hourStart]);
                                    if(globalData[timeEL.minStart]>globalData[timeEL.minEnd]){
                                        resetScrolls(timeEL.minEnd,timeFormat.min,globalData[timeEL.minStart],globalData[timeEL.minStart]);
                                    }else if(globalData[timeEL.minStart]<globalData[timeEL.minEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd] ,globalData[timeEL.minStart]);
                                    }else if(globalData[timeEL.minStart] === globalData[timeEL.minEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minStart] ,globalData[timeEL.minStart]);
                                    }
                                }else if(globalData[timeEL.hourStart]<globalData[timeEL.hourEnd]){
                                    resetScrolls(timeEL.hourEnd,timeFormat.hour,globalData[timeEL.hourEnd],globalData[timeEL.hourStart]);
                                    if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                    }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                    }
                                    if(preGlobalData[timeEL.hourStart]>preGlobalData[timeEL.hourEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                    }else if(preGlobalData[timeEL.hourStart] === preGlobalData[timeEL.hourEnd]){
                                        resetScrolls(timeEL.minEnd, timeFormat.min , globalData[timeEL.minEnd],0);
                                    }
                                }
                            }
                        }
                    }
                }
                setTimeout(function () {
                    sendToCube();
                },1000);
            }, false);
            document.addEventListener('touchmove', function (e) {
                e.preventDefault();

            },false);
        }

        function disablingClick(thisEl) {
            if(thisEl === 'hourStart'){
                blockerEl.minStart.css('visibility','visible');
                blockerEl.hourEnd.css('visibility','visible');
                blockerEl.minEnd.css('visibility','visible');
                blockerEl.AmPmEnd.css('visibility','visible');
                blockerEl.AmPmStart.css('visibility','visible');
            }else if (thisEl === 'minStart'){
                blockerEl.hourStart.css('visibility','visible');
                blockerEl.hourEnd.css('visibility','visible');
                blockerEl.minEnd.css('visibility','visible');
                blockerEl.AmPmEnd.css('visibility','visible');
                blockerEl.AmPmStart.css('visibility','visible');
            }else if(thisEl === 'hourEnd'){
                blockerEl.minEnd.css('visibility','visible');
                blockerEl.hourStart.css('visibility','visible');
                blockerEl.minStart.css('visibility','visible');
                blockerEl.AmPmEnd.css('visibility','visible');
                blockerEl.AmPmStart.css('visibility','visible');
            }else if (thisEl === 'minEnd'){
                blockerEl.hourEnd.css('visibility','visible');
                blockerEl.hourStart.css('visibility','visible');
                blockerEl.minStart.css('visibility','visible');
                blockerEl.AmPmEnd.css('visibility','visible');
                blockerEl.AmPmStart.css('visibility','visible');
            }else if (thisEl === 'AmPmEnd'){
                blockerEl.minStart.css('visibility','visible');
                blockerEl.hourEnd.css('visibility','visible');
                blockerEl.minEnd.css('visibility','visible');
                blockerEl.AmPmStart.css('visibility','visible');
                blockerEl.hourStart.css('visibility','visible');
            }
            else if (thisEl === 'AmPmStart'){
                blockerEl.minStart.css('visibility','visible');
                blockerEl.hourEnd.css('visibility','visible');
                blockerEl.minEnd.css('visibility','visible');
                blockerEl.AmPmEnd.css('visibility','visible');
                blockerEl.hourStart.css('visibility','visible');
            }
        }
        function timeoutDisabling() {
            window.clearTimeout(clickAble.timer);
            clickAble.timer = setTimeout(function () {
                blockerEl.hourEnd.css('visibility','hidden');
                blockerEl.hourStart.css('visibility','hidden');
                blockerEl.minEnd.css('visibility','hidden');
                blockerEl.minStart.css('visibility','hidden');
                blockerEl.AmPmStart.css('visibility','hidden');
                blockerEl.AmPmEnd.css('visibility','hidden');
                window.clearTimeout(clickAble.timer);
            },duration.snapDuration['timeoutDisabling']);
        }
        function resetScrolls(timeEL,timeFormat,toshow,tostart){
            myScroll[timeEL].destroy();
            window.clearInterval(intervals[scroll_EL]);
            var currentToShow = toshow-tostart;
            if(timeEL === 'hourEnd'){
                if (globalData.is24 === false){
                    if (toshow > 12){
                        toshow = toshow -12;
                    }
                    if (tostart >= 12){
                        tostart = tostart -12;
                    }
                    if (tostart === 0){
                        tostart = 1;
                    }
                    currentToShow = toshow-tostart;
                    if(currentToShow === -1){
                        currentToShow = 0;
                    }
                }else {
                    timeFormat = 24;
                }
            }
            switchView('Condition24',timeEL,timeFormat,currentToShow,tostart);
            adjustElements();
            switch1224();
        }
        function scrollEffect(scroll_EL){
            var toRender =Math.abs((-myScroll[scroll_EL].y)/myScroll[scroll_EL].wrapperHeight);
            if(toRender>-0.5){
                toRender = Math.round(Math.abs(toRender));
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect2');
                var elToRender = $('.'+scroll_EL+'_'+toRender);
                if(elToRender.length !== 0){
                        if(scroll_EL === 'AmPmStart' ||scroll_EL === 'EndStart'){
                            elToRender.addClass('scrollEffect2');
                        }else{
                            elToRender.addClass('scrollEffect');
                        }
                    }
            }else{
                if(scroll_EL === 'AmPmStart' ||scroll_EL === 'EndStart'){
                    $('.'+scroll_EL+'Scroll').removeClass('scrollEffect2');
                }else{
                    $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                }
            }
        }
        function scrollEffectForScrolling(scroll_EL){
            var toRender = (-scrollContents.css('transform').match(/\d+/g)[5])/myScroll[scroll_EL].wrapperHeight;
            toRender = Math.round(Math.abs(toRender))%(scrollHeight+1);
            if(toRender>-0.5){
                toRender = Math.round(Math.abs(toRender));
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect2');
                var elToRender = $('.'+scroll_EL+'_'+toRender);
                if(elToRender.length !== 0){
                    if(scroll_EL === 'AmPmStart' ||scroll_EL === 'EndStart'){
                        elToRender.addClass('scrollEffect2');
                    }else{
                        elToRender.addClass('scrollEffect');
                    }
                }
            }else{
                if(scroll_EL === 'AmPmStart' ||scroll_EL === 'EndStart'){
                    $('.'+scroll_EL+'Scroll').removeClass('scrollEffect2');
                }else{
                    $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                }
            }
        }
    }


    var DaysMap = {
        Sun:'Sun',
        Mon:'Mon',
        Tue:'Tue',
        Wed:'Wed',
        Thu:'Thu',
        Fri:'Fri',
        Sat:'Sat'
    };
    var DaysStatusMap = {
        Sun:true,
        Mon:true,
        Tue:true,
        Wed:true,
        Thu:true,
        Fri:true,
        Sat:true
    };
    function DayPicker(){
        setText();
        initDays();
        function setText(){
            var DaysEl = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ];
            for(var b = 0 ; b < 7 ; b++){
                var  currentEl = $('#'+DaysEl[b]);
                currentEl.find('text').text(globalTextsOBJ[DaysEl[b]]).attr({
                    'font-size':globalTextsOBJ['font_size'],
                    'transform':globalTextsOBJ[DaysEl[b]+'Transform']});
            }
        }
        $('.selectedDay').click(function(){
            var self = $(this);
            var selectedDay = self.attr('id');
            if(DaysStatusMap[selectedDay] == true){
                RenderDeSelected(self);
                DaysStatusMap[selectedDay] = false;
            }else{
                RenderSelected(self);
                DaysStatusMap[selectedDay] = true;
            }
            var didNotSelect = 0;
            for(var b in DaysStatusMap){
                if(DaysStatusMap[b] == true){
                    didNotSelect++;
                }
            }
            if(didNotSelect == 0){
                RenderSelected(self);
                DaysStatusMap[selectedDay] = true;
            }
            sendDaysStatus();
        });

        function sendDaysStatus(){
            var toSend = [];
            for(var a in DaysStatusMap){
                if(DaysStatusMap[a] == true){
                    toSend.push(DaysMap[a]);
                }
            }
            dataToSendToCube.days = toSend;
            sendToCube();
        }

        function initDays(){
            var toSend2 = [];
            for(var a in DaysStatusMap){
                if(DaysStatusMap[a] == true){
                    toSend2.push(DaysMap[a]);
                }
            }
            dataToSendToCube.days = toSend2;
        }
    }

    function setSelectedDay(){
        for(var a in DaysStatusMap){
                if(DaysStatusMap[a] == true){
                    var self = $('#'+a);
                    RenderSelected(self);
                }
        }
    }
    function RenderSelected(self){
        self.find('.selectedRect').attr({'fill':"#f16e20","stroke":"transparent"});
        self.find('.selectedText').attr('fill',"#FFFFFF");
    }
    function RenderDeSelected(self){
        self.find('.selectedRect').attr({'fill':"transparent","stroke":"#c7c8c8"});
        self.find('.selectedText').attr('fill',"#c7c8c8");
    }
    function renderDays(daysFromDB){
        for(var a in DaysStatusMap){
            DaysStatusMap[a] = false;
        }
        for(var c = 0 ; c <daysFromDB.length ; c++){
            DaysStatusMap[daysFromDB[c]] = true;
        }
        var toSend = [];
        for(var b in DaysStatusMap){
            if(DaysStatusMap[b] == true){
                toSend.push(DaysMap[b]);
            }
        }
        dataToSendToCube.days = toSend;
        setSelectedDay()
    }
    function sendToCube(){
        var str=Param['widgetId'];
        var array=str.split('_');
        var nodeid=array[1];
        var sendHourStart = '';
        var sendminStart = '';
        var sendhourEnd = '';
        var sendminEnd = '';

        if(globalData['hourStart']+''.length === 1){
            sendHourStart = '0'+globalData['hourStart'];
        }else{
            sendHourStart = globalData['hourStart'] + '';
        }
        if(globalData['minStart']+''.length === 1){
            sendminStart = '0'+globalData['minStart'];
        }else{
            sendminStart = globalData['minStart'];
        }
        if(globalData['hourEnd']+''.length === 1){
            sendhourEnd = '0'+globalData['hourEnd'];
        }else{
            sendhourEnd = globalData['hourEnd'] + '';
        }
        if(globalData['minEnd']+''.length === 1){
            sendminEnd = '0'+globalData['minEnd'];
        }else{
            sendminEnd = globalData['minEnd'];
        }
        dataToSendToCube.interval = sendHourStart+':'+sendminStart+'-'+sendhourEnd+':'+sendminEnd;
        var dataToSendToCube2 = dataToSendToCube;
        if(dataToSendToCube.days.length === 0){
            dataToSendToCube2.days = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ];
        }
        console.log(JSON.stringify(dataToSendToCube2));
        cordova.exec(null, null, "FTP2PApi", "saveIQConditions", [nodeid,'time', 'time',Param['operateID'],6,dataToSendToCube2]);
    }

    function listener(){
        document.addEventListener('deviceready', function (){
            getIQConditionStatus();
            function getIQConditionStatus() {
                cordova.exec(function (data) {
                    console.log(data);
                    var myNewData = stringToJson(data);
                    myNewData = myNewData['value']['time'];
                    if($.isEmptyObject(myNewData)){
                        setSelectedDay();
                        initPickers();
                        sendToCube();
                    }else{
                        renderDays(myNewData['days']);
                        convertDBtoPicker(myNewData['interval']);
                    }
                }, null, "FTP2PApi", "getIQConditionsStatus", [Param.operateID]);
            }
            function stringToJson(data){
                var result = '';

                result = data.replace('\"[','[');
                result = result.replace(']\"',']');
                result = result.replace('\"{','{');
                result = result.replace('}\"','}');
                result = result.replace('"{','{');
                result = result.replace('}"','}');

                return JSON.parse(result);
            }
            window.addEventListener('ftdevicestatusupdate', function (data) {

            }, false);
        },false);
    }

};