/**
 * Created by qkchung on 16/12/22.
 */
window.onload = function(){
    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    var globalTextsOBJ = {};
    var touchPosition = '';
    var countInterval = 0;
    var didStart = false;
    var duration = {
        snapDuration:1000,
        scrollingEffectInterval:100,
        doneAnimationTimeout:200,
        contentHeightDetectInterval:100
    };
    var date = {
        'hour':0,
        'min':0,
        'month':0,
        'day':0,
        'year':0,
        'old_day':0,
        'AmPm':0,
        'is24Hour':false
    };
    var myScroll = {
        'hour':null,
        'min':null,
        'AmPm':null
    };
    var timeFormat = {
        hour:date['is24Hour']?24:12,
        min:60
    };
    var timeData = {
        numbers12:['hour',12],
        numbers24:['hour',date['is24Hour']?24:12],
        numbers60:['min',59],
        AmPm:['am','pm']
    };
    var dataToSendToCube = {
        type:0,
        point:'00:00',
        days:''
    };
    var intervals = {'hour':0, 'min':0, 'month':0, 'day':0, 'year':0, 'AmPm':0};
    languageSwitcher(lang);
    function languageSwitcher(lang){
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
            $('#hourTopic').text(globalTextsOBJ.hourTopic);
            $('#minTopic').text(globalTextsOBJ.minTopic);
            $('#AmPmTopic').text(globalTextsOBJ.AM_PM_TOPIC);
            DayPicker();
            getDate();
        });
    }
    function adjustElements(){
        var showtimeHeight = $('.showtime').height();
        $('.scroll').css('line-height',showtimeHeight+'px');
        $('#min_scroll').css('height',timeFormat.min*showtimeHeight);
        $('#hour_scroll').css('height',timeFormat.hour*showtimeHeight);
    }
    // window.onresize = function(){
    //     adjustElements();
    // };
    function convertDBtoPicker(DBString){
        if(DBString.length === 0){
            return 1;
        }else{
            var DBData = DBString.split(':');
            date.hour = Number(DBData[0]);
            date.min = Number(DBData[1]);
            date.AmPm = date.hour>=12?1:0;
            if (date.is24Hour){
                switchView(date.hour,date.min,date.AmPm);
            }else {
                if (date.hour === 0){
                    switchView(11,date.min,date.AmPm);
                }else {
                    switchView(date.hour>12?date.hour-13:date.hour-1,date.min,date.AmPm);
                }
            }
        }
    }

    function getDate(){
        cordova.exec(function (data) {
            var thisdate = JSON.parse(data)['value'];
            thisdate = thisdate.split(' ');
            var days = thisdate[0].split('-');
            var time = thisdate[1].split('-');
            date.hour = Number(time[0]);
            date.min = Number(time[1]);
            date.year = Number(days[0]);
            date.month = Number(days[1]);
            date.day = Number(days[2]);
            date.AmPm = date.hour>12?1:0;
            date.is24Hour = JSON.parse(data)['is24'];
            timeFormat = {
                hour:date['is24Hour']?24:12,
                min:60
            };
            timeData = {
                numbers12:['hour',12],
                numbers24:['hour',date['is24Hour']?24:12],
                numbers60:['min',59],
                AmPm:['am','pm']
            };
            listener();
        }, null, "FTP2PApi", "getSystemTime", ['']);
    }

    function switchView(hourToShow,minToShow,AmPmToShow){
        var $showWindow = $('#timeContainer');
        var $_ElementHolder= $('.ElementHolder');
        if (myScroll.hour){
            myScroll.hour.destroy();
        }
        if (myScroll.min){
            myScroll.min.destroy();
        }
        if (myScroll.AmPm){
            myScroll.AmPm.destroy();
        }
        myScroll = {
            'hour':null,
            'min':null,
            'AmPm':null
        };
        $_ElementHolder.remove();
        var data = switchData();
        var template = switchWhichView(data[0]);
        $showWindow.append(Handlebars.compile(template.html())(data[1]));
        $showWindow.onload = callback();
        function callback(){
            switchPicker(hourToShow,minToShow,AmPmToShow);
        }
        function switchWhichView(viewType){
            return  $('#'+viewType);
        }
        function switchData(){
            return ['trigger24',generateLetterTextData([timeData.numbers24,timeData.numbers60,timeData.AmPm])];
        }
        function switchPicker(hourToShow,minToShow,AmPmToShow){
            picker('hour',hourToShow,date['is24Hour']?24:12);
            picker('min',minToShow,60);
            picker('AmPm',AmPmToShow,2);
        }
        function generateLetterTextData(timeData){
            var data = {};
            for(var i = 0 ; i < timeData.length ;i++){
                if(timeData[i][0] === 'am'){
                    data.AmPmText = [];
                    data.AmPmText[0]={'AmPm':globalTextsOBJ.am,'AmPmClass':'AmPm_0'};
                    data.AmPmText[1]={'AmPm':globalTextsOBJ.pm,'AmPmClass':'AmPm_1'};
                }else if(timeData[i][0] === 'hour'){
                    if (date.is24Hour){
                        var name2 = timeData[i][0];
                        data[name2+'Text'] = [];
                        var timeCount2 =  timeData[i][1];
                        for(var k = 0; k < timeCount2;k++){
                            data[name2+'Text'][k] = {};
                            data[name2+'Text'][k][name2+'Class'] = name2+'_'+k;
                            data[name2+'Text'][k][name2] = k;
                        }
                    }else {
                        var name1 = timeData[i][0];
                        data[name1+'Text'] = [];
                        var timeCount1 =  timeData[i][1];
                        for(var l = 1; l <= timeCount1;l++){
                            data[name1+'Text'][l] = {};
                            data[name1+'Text'][l][name1+'Class'] = name1+'_'+(l-1);
                            data[name1+'Text'][l][name1] = l;
                        }
                    }
                }else{
                    var name = timeData[i][0];
                    data[name+'Text'] = [];
                    var timeCount =  timeData[i][1];
                    for(var j = 0; j <= timeCount;j++){
                        data[name+'Text'][j] = {};
                        data[name+'Text'][j][name+'Class'] = name+'_'+j;
                        data[name+'Text'][j][name] = j;
                    }
                }
            }
            return data;
        }
        setTimeout(function () {
            switch1224()
        },10);
    }

    function switch1224(){
        var hour =  $('#hour');
        var min =  $('#min');
        var AmPm =  $('#AmPm');
        var hourT =  $('#hourTopic');
        var minT =  $('#minTopic');
        var AmPmT =  $('#AmPmTopic');
        var timeContainer = $('#timeContainer');
        if(date.is24Hour){
            timeContainer.css({'width':'34%','left':'66%'});
            hour.css({'width':'50%','left':'0%'});
            min.css({'width':'50%','left':'50%'});
            hourT.css({'width':'50%','left':'0%'});
            minT.css({'width':'50%','left':'50%'});
            AmPm.hide();
            AmPmT.hide();
        }else {
            AmPm.show();
            AmPmT.show();
            timeContainer.css({'width':'44%','left':'56%'});
            hour.css({'width':'33.333%','left':'0%'});
            min.css ({'width':'33.333%','left':'33.333%'});
            AmPm.css({'width':'33.333%','left':'66.666%'});
            hourT.css({'width':'33.333%','left':'0%'});
            minT.css({'width':'33.333%','left':'33.333%'});
            AmPmT.css({'width':'33.333%','left':'66.666%'});
        }
    }

    document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});

    function picker(scroll_EL,toShow,scrollHeight){
        var scrollContents= $('#'+scroll_EL+'_scroll');
        var scrollWindow= $('#'+scroll_EL+'_select');
        timeFormat[scroll_EL] = scrollHeight;
        adjustElements();
        reload();
        function reload(){
            scrollContents.css('height',scrollWindow.height()*scrollHeight + 'px');
            var topics = $('#'+scroll_EL+'topic');
            topics.css('line-height',topics.height()+'px');
        }
        loaded_scroll();
        function loaded_scroll() {
            myScroll[scroll_EL] = new IScroll('#'+scroll_EL+'_select', {
                scrollX: false,
                scrollY: true,
                momentum: true,
                snap: true,
                snapSpeed: duration.snapDuration,
                keyBindings: true,
                indicators: null,
                probeType: 2
            });
            myScroll[scroll_EL].scrollTo(0,-scrollWindow.height()*(toShow));
            scrollEffect2(toShow,scroll_EL);
            function scrollEffect2(toRender,scroll_EL){
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                $('.'+scroll_EL+'_'+toRender).addClass('scrollEffect');
            }
        }
        myScroll[scroll_EL].on('scrollCancel', function (e) {
            var scrollPoint = Number(-myScroll[scroll_EL].y) / scrollWindow.height();
            var toRender = Math.round(Math.abs(scrollPoint));
            myScroll[scroll_EL].scrollTo(0,-scrollWindow.height()*(toRender));
            scrollEffect(scroll_EL);
        }, false);
        myScroll[scroll_EL].on('scrollStart',function (e) {
            didStart = true;
            touchPosition = myScroll[scroll_EL].wrapper.id;
            countInterval = 0;
            intervals[scroll_EL] = setInterval(function(){
                scrollEffectForScrolling(scroll_EL);
                //reload();
            },duration.scrollingEffectInterval);
        }, false);

        myScroll[scroll_EL].on('scrollEnd',function (e) {
            window.clearInterval(intervals[scroll_EL]);
            countInterval = 0;
            didStart = false;
            scrollEffect(scroll_EL);

            if (scroll_EL === 'hour'){
                var a = Math.abs(Number(-myScroll[scroll_EL].y/scrollWindow.height()));
                if (date.is24Hour === false){
                    a=a+1;
                    if(date.AmPm === 0){
                        if (a === 12){
                            date['hour'] = 0;
                        }else {
                            date['hour'] = a
                        }
                    } else {
                        if (a === 0){
                            date['hour'] = 12;
                        }else if (a === 12){
                            date['hour'] = a;
                        } else {
                            date['hour'] = a +12
                        }
                    }
                }else {
                    date['hour'] = a;
                }
            }else if (scroll_EL === 'AmPm'){
                date['AmPm'] = Math.abs(Number(-myScroll[scroll_EL].y/scrollWindow.height()));
                if (date.is24Hour === false){
                    if(date.AmPm === 0){
                        if (date['hour'] === 12){
                            date['hour'] = 0;
                        }else {
                            date['hour'] = date['hour']>=12?date['hour']-12:date['hour'];
                        }
                    } else {
                        if (date['hour'] === 0){
                            date['hour'] = 12;
                        }else{
                            date['hour'] = date['hour']<13?date['hour']+12:date['hour'];
                        }
                    }
                }
            }else {
                date[scroll_EL] = Math.abs(Number(-myScroll[scroll_EL].y/scrollWindow.height()));
            }
            sendToCube();
            console.log(JSON.stringify(date));
        }, false);

        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        },false);

        function scrollEffect(scroll_EL){
            var toRender = (-myScroll[scroll_EL].y)/myScroll[scroll_EL].wrapperHeight;
            if(toRender>-0.5){
                toRender = Math.round(Math.abs(toRender));
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                var elToRender = $('.'+scroll_EL+'_'+toRender);
                if(elToRender.length !== 0){
                    elToRender.addClass('scrollEffect');
                }
            }else{
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
            }
        }
        function scrollEffectForScrolling(scroll_EL){
            var toRender = (-scrollContents.css('transform').match(/\d+/g)[5])/myScroll[scroll_EL].wrapperHeight;

            toRender = Math.round(Math.abs(toRender))%(scrollHeight+1);
            if(toRender>-0.5){
                toRender = Math.round(Math.abs(toRender));
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
                var elToRender = $('.'+scroll_EL+'_'+toRender);
                if(elToRender.length !== 0){
                    elToRender.addClass('scrollEffect');
                }
            }else{
                $('.'+scroll_EL+'Scroll').removeClass('scrollEffect');
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
            if(DaysStatusMap[selectedDay] === true){
                RenderDeSelected(self);
                DaysStatusMap[selectedDay] = false;
            }else{
                RenderSelected(self);
                DaysStatusMap[selectedDay] = true;
            }
            var didNotSelect = 0;
            for(var b in DaysStatusMap){
                if(DaysStatusMap[b] === true){
                    didNotSelect++;
                }
            }
            if(didNotSelect === 0){
                RenderSelected(self);
                DaysStatusMap[selectedDay] = true;
            }
            sendDaysStatus();
        });

        function sendDaysStatus(){
            var toSend = [];
            for(var a in DaysStatusMap){
                if(DaysStatusMap[a] === true){
                    toSend.push(DaysMap[a]);
                }
            }
            dataToSendToCube.days = toSend;
            sendToCube();
        }

        function initDays(){
            var toSend2 = [];
            for(var a in DaysStatusMap){
                if(DaysStatusMap[a] === true){
                    toSend2.push(DaysMap[a]);
                }
            }
            dataToSendToCube.days = toSend2;
            //setSelectedDay();
        }
    }

    function setSelectedDay(){
        for(var a in DaysStatusMap){
                if(DaysStatusMap[a] === true){
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
                if(DaysStatusMap[b] === true){
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
        var sendHour = '';
        var sendMin = '';
        if(date['hour'].toString().length === 1){
            sendHour = '0'+date['hour'];
        }else{
            sendHour = date['hour'] + '';
        }
        if(date['min'].toString().length === 1){
            sendMin = '0'+date['min'];
        }else{
            sendMin = date['min'];
        }
        dataToSendToCube.point = sendHour+':'+sendMin;
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
        cordova.exec(null, null, "FTP2PApi", "saveIQTriggers", [nodeid,'time', 'time',Param['operateID'],0,dataToSendToCube2]);
    }

    function listener(){
        document.addEventListener('deviceready', function (){
            getIQTriggersStatus();
            function getIQTriggersStatus() {
                cordova.exec(function (data) {
                    var myNewData = stringToJson(data);
                    myNewData = myNewData['value']['time'];
                    if($.isEmptyObject(myNewData)){
                        setSelectedDay();
                        if (data.is24Hour){
                            switchView(date.hour,date.min,date.AmPm);
                        }else {
                            convertDBtoPicker(date.hour+':'+date.min);
                        }

                        setTimeout(function () {
                            sendToCube();
                        },1)
                    }else{
                        renderDays(myNewData['days']);
                        convertDBtoPicker(myNewData['point']);
                    }
                }, null, "FTP2PApi", "getIQTriggersStatus", [Param['operateID']]);
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