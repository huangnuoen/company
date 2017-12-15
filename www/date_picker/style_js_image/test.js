/**
 * Created by qkchung on 15/11/13.
 */
    window.onload = function testStart() {

        var duration = {
            snapDuration:{'hour':50, 'min':50, 'month':50, 'day':50, 'year':50, 'AmPm':50},
            scrollingEffectInterval:100,
            doneAnimationTimeout:200,
            contentHeightDetectInterval:100
        };
        var $done = $('#done');
        var $timeContainer = $('#timeContainer');
        var globalTextsOBJ = {};
        var globalText = {};
        var touchPosition = '';
        var countInterval = 0;
        var didStart = false;
        var initInterval = 0;
        var lang = 'en';
        var date = {'hour':0, 'min':0, 'month':0, 'day':0, 'year':1971, 'AmPm':0, 'is24Hour':true};
        var myScroll = {'hour':0, 'min':0, 'month':0, 'day':0, 'year':0, 'AmPm':0};
        var timeEL = {'hour':'hour', 'min':'min', 'day':'day', 'month':'month', 'year':'year', 'AmPm':'AmPm'};
        var timeFormat = {hour:date['is24Hour']?23:12, min:59, day:getDaysInMonth(date.year,date.month), 'month':12, 'year':2037, 'AmPm':1};
        var intervals = {'hour':0, 'min':0, 'month':0, 'day':0, 'year':0, 'AmPm':0};
        var reuseContents = {'hour':'', 'min':'', 'day':'', 'month':'', 'year':'', 'AmPm':''};
        var reuseNumber = {'hour':3, 'min':3, 'day':3, 'month':3, 'year':3, 'AmPm':5};
        getDate();
        function getDate(){
            cordova.exec(function (data) {
                console.log(data);
                var thisdate = JSON.parse(data)['value'];
                thisdate = thisdate.split(' ');
                var days = thisdate[0].split('-');
                var time = thisdate[1].split('-');
                date.hour = Number(time[0]);
                date.min = Number(time[1]);
                date.year = Number(days[0]);
                date.month = Number(days[1]);
                date.day = Number(days[2]);
                date.is24Hour  = JSON.parse(data)['is24'];
                setTimeout(function () {
                    date.AmPm = date.hour>=12?1:0;
                    timeFormat.hour=date['is24Hour']?23:12;
                    setTimeout(function () {
                        getLangObj();
                    },10);
                },10);
            }, null, "FTP2PApi", "getSystemTime", ['true']);
        }
        function getLangObj(){
            cordova.exec(function (data) {
                var parsedData = JSON.parse(data);
                lang = parsedData['value'];
                setTimeout(function () {
                    languageSwitcher(lang);
                },10);
            }, null, "FTP2PApi", "getLanguage", ['']);
        }
        function languageSwitcher(lang){
            globalTextsOBJ = selectLanguage2(lang);
            $.getScript(globalTextsOBJ.url, function (data) {
                globalText = setAllTextLanguage(globalTextsOBJ.which);
                initPickers();
                setTimeout(function () {
                    $('#done').css('display','inline')
                },100);
            });
        }
        // languageSwitcher(lang);
        function initPickers(){
            initInterval = setInterval(function(){
                if($timeContainer.height() > 0){
                    switchView(timeEL.hour, timeFormat.hour, date.hour,  0);
                    switchView(timeEL.min,  timeFormat.min,  date.min,   0);
                    switchView(timeEL.day,  timeFormat.day, date.day-1,    1);
                    switchView(timeEL.month,timeFormat.month,  date.month-1,     1);
                    switchView(timeEL.year, timeFormat.year, date.year-1970,  1970);
                    switchView(timeEL.AmPm, timeFormat.AmPm, date.AmPm,  0);
                    setTimeout(function () {
                        $('#HourTopic').text(globalText.HOUR_TOPIC);
                        $('#MonthTopic').text(globalText.MONTH_TOPIC);
                        $('#DayTopic').text(globalText.DAY_TOPIC);
                        $('#YearTopic').text(globalText.YEAR_TOPIC);
                        $('#MinTopic').text(globalText.MINUTE_TOPIC);
                        $('#done').text(globalText.DONE);
                        $('#AmPmTopic').text(globalText.AM_PM_TOPIC);
                        set12or24(lang);
                    },0);
                    window.clearInterval(initInterval);
                    initInterval = 0;
                }else {
                    return 1;
                }
            },duration.contentHeightDetectInterval);
        }

        function set12or24(lang){
            var AmPmEl =  $('#AmPm');
            window.clearInterval(intervals['AmPm']);
            if(date['is24Hour']){
                AmPmEl.hide();
                switchTimeTo24(lang);
            }else{
                if(date.hour === 0){
                    resetScrolls('hour',timeFormat.hour,12,1);
                }else if(date.hour === 12){
                    resetScrolls('hour',timeFormat.hour,12,1);
                } else {
                    resetScrolls('hour',timeFormat.hour,date.hour>=12?date.hour-12:date.hour,1);
                }
                AmPmEl.show();
                setTimeout(function () {
                    var scrollWindow = $('#AmPm_select');
                    var toShowheight = (-scrollWindow.height() * (date.hour>=12?1:0));
                    myScroll['AmPm'].scrollTo(0, toShowheight);
                    scrollEffect2(date.hour>=12?1:0,'AmPm');
                },0);
                switchTimeTo12(lang);
            }
            function switchTimeTo24(lang){
                $('.ElementHolder').css('width','15%');
                if(lang === 'zh_CN'){
                    $('#year').css('left','40%');
                    $('#day').css('left','70%');
                    $('#month').css('left','55%');
                    $('#min').css('left','15%');
                    $('#hour').css('left','0');
                }else{
                    $('#year').css('left','70%');
                    $('#day').css('left','55%');
                    $('#month').css('left','40%');
                    $('#min').css('left','15%');
                    $('#hour').css('left','0');
                }

            }
            function switchTimeTo12(lang){
                $('.ElementHolder').css('width','10%');
                if(lang === 'zh_CN'){
                    $('#year').css({'left':'44%','width':'18%'});
                    $('#day').css('left','72%');
                    $('#month').css('left','62%');
                    $('#AmPm').css({'left':'20%','width':'18%'});
                    $('#min').css('left','10%');
                    $('#hour').css('left','0');
                }else{
                    $('#year').css({'left':'64%','width':'18%'});
                    $('#day').css('left','54%');
                    $('#month').css('left','44%');
                    $('#AmPm').css({'left':'20%','width':'18%'});
                    $('#min').css('left','10%');
                    $('#hour').css('left','0');
                }
            }
            function resetScrolls(timeEL, timeFormat, toshow, tostart) {
                myScroll['hour'].destroy();
                switchView(timeEL, timeFormat, toshow - tostart, tostart);
                $('#HourTopic').text(globalText.HOUR_TOPIC);
                window.clearInterval(intervals['hour']);
            }
            function scrollEffect2(toRender, scroll_EL) {
                $('.' + scroll_EL + 'Scroll').removeClass('scrollEffect');
                $('.' + scroll_EL + '_' + toRender).addClass('scrollEffect');
            }
        }
        function switchView(timeEL,timeFormat,ToShow,toStart){
            var $showWindow = $('#timeContainer');
            var $_ElementHolder= $('#'+timeEL);
            myScroll[timeEL] = null;
            $_ElementHolder.remove();
            var data = switchData(timeFormat,timeEL,toStart);
            var template = switchWhichView(timeEL);
            $showWindow.append(Handlebars.compile(template.html())(data[1]));

            $showWindow.onload = callback();
            function callback(){
                //reuseContents[timeEL] = $('#'+timeEL+'_scroll').html();
                switchPicker(timeEL,ToShow,timeFormat-toStart,toStart);
            }
            function switchWhichView(timeEL){
                return  $('#'+timeEL+'Template');
            }
        }

        function switchData(timeFormat,timeEL,toStart){
            return ['TimeFormat24',generateLetterTextData(timeFormat,timeEL,toStart)];
        }

        function generateLetterTextData(timeFormat,timeEL,toStart){
            var data = {};
            data[timeEL+'Text'] = [];
            for(var i = toStart, j = 0; i <= timeFormat;i++,j++){
                data[timeEL+'Text'][j] = {};
                if(timeEL === 'AmPm'){
                    data[timeEL+'Text'][j][timeEL] = globalText[i===0?'AM':'PM'];
                }else{
                    data[timeEL+'Text'][j][timeEL] = i;
                }

                data[timeEL+'Text'][j][timeEL+'Class'] = timeEL+'_'+j;
            }
            return data;
        }

        function switchPicker(timeEL,hourStartToShow,timeFormat,toStart){
            picker(timeEL,hourStartToShow,timeFormat,toStart);
            $('#'+timeEL+'Topic').text();
        }

        function picker(scroll_EL,toShow,scrollHeight,toStart) {
            var scrollContents = $('#' + scroll_EL + '_scroll');
            var scrollWindow = $('#' + scroll_EL + '_select');
            timeFormat[scroll_EL] = scrollHeight;

            reload();
            function reload() {
                //scrollContents.prepend(reuseContents[scroll_EL]);
                //scrollContents.append(reuseContents[scroll_EL]);
                scrollContents.css('height', scrollWindow.height() * (scrollHeight + 1) + 'px');
                $('.scroll').css('line-height', scrollWindow.height() + 'px');
                //console.log($('.scroll:gt(3)'));
            }

            loaded_scroll();
            function loaded_scroll() {
                myScroll[scroll_EL] = new IScroll('#' + scroll_EL + '_select', {
                    scrollX: false,
                    scrollY: true,
                    momentum: true,
                    snap: true,
                    snapSpeed: duration.snapDuration[scroll_EL],
                    keyBindings: true,
                    indicators: null,
                    probeType: 3

                });

                var toShowheight = (-scrollWindow.height() * (toShow));
                //var whichContent = (reuseNumber[scroll_EL]/2>>0);
                //var fullHeightOfContent = (scrollWindow.height()*(scrollHeight+1));
                myScroll[scroll_EL].scrollTo(0, toShowheight);

                scrollEffect2(toShow, scroll_EL);
                function scrollEffect2(toRender, scroll_EL) {
                    $('.' + scroll_EL + 'Scroll').removeClass('scrollEffect');
                    $('.' + scroll_EL + '_' + toRender).addClass('scrollEffect');
                }

                loadEvents();
            }

            function loadEvents() {
                myScroll[scroll_EL].on('scrollCancel', function (e) {
                    var scrollPoint = Number(-myScroll[scroll_EL].y) / scrollWindow.height();
                    var toRender = Math.round(Math.abs(scrollPoint));
                    myScroll[scroll_EL].scrollTo(0, -scrollWindow.height() * (toRender));
                    scrollEffect(scroll_EL);
                }, false);
                myScroll[scroll_EL].on('scrollStart', function (e) {
                    didStart = true;
                    touchPosition = myScroll[scroll_EL].wrapper.id;
                    countInterval = 0;
                    intervals[scroll_EL] = setInterval(function () {
                        scrollEffectForScrolling(scroll_EL);
                        //reload();
                    }, duration.scrollingEffectInterval);
                }, false);

                myScroll[scroll_EL].on('scrollEnd', function (e) {
                    countInterval = 0;
                    didStart = false;
                    window.clearInterval(intervals[scroll_EL]);
                    scrollEffect(scroll_EL);
                    var previousDay = getDaysInMonth(date.year, date.month);
                    var scrollPoint = Number(-myScroll[scroll_EL].y) / scrollWindow.height() % (scrollHeight + 1);
                    if (scroll_EL === 'AmPm') {
                        date[scroll_EL] = Math.abs(scrollPoint);
                        if(date.is24Hour === false){
                            if (date['AmPm'] === 1){
                                date['hour'] = date.hour<12?date.hour+12:date.hour;
                            }else if (date['AmPm'] === 0){
                                date.hour = date.hour>=12?date.hour-12:date.hour;
                            }
                        }
                    }else if(scroll_EL === 'hour'){
                        if (date.is24Hour === false){
                            var currentH = Number($('.' + scroll_EL + '_' + scrollPoint).text());
                            if(currentH === 12){
                                if(date['AmPm'] === 1){
                                    date[scroll_EL] = 12;
                                }else if(date['AmPm'] === 0){
                                    date[scroll_EL] = 0;
                                }
                            }else if(date['AmPm'] === 1){
                                date[scroll_EL] = Number($('.' + scroll_EL + '_' + scrollPoint).text())+12;
                            }else if(date['AmPm'] === 0){
                                date[scroll_EL] = Number($('.' + scroll_EL + '_' + scrollPoint).text());
                            }
                        }else {
                            date[scroll_EL] = Number($('.' + scroll_EL + '_' + scrollPoint).text());
                        }
                    } else {
                        date[scroll_EL] = Number($('.' + scroll_EL + '_' + scrollPoint).text());
                    }

                    if (scroll_EL === 'year' || scroll_EL === 'month') {
                        var dayInCurrentMonth = getDaysInMonth(date.year, date.month);
                        if (previousDay === dayInCurrentMonth) {
                            return 1;
                        }
                        if (dayInCurrentMonth === date.day) {
                            resetScrolls('day', dayInCurrentMonth, date.day, 1);
                        } else if (dayInCurrentMonth > date.day) {
                            resetScrolls('day', dayInCurrentMonth, date.day, 1);
                        } else if (dayInCurrentMonth < date.day) {
                            resetScrolls('day', dayInCurrentMonth, dayInCurrentMonth, 1);
                        }
                    }
                }, false);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            }

            function resetScrolls(timeEL, timeFormat, toshow, tostart) {
                myScroll[timeEL].destroy();
                switchView(timeEL, timeFormat, toshow - tostart, tostart);
                $('#DayTopic').text(globalText.DAY_TOPIC);
                set12or24(lang);
                window.clearInterval(intervals['day']);
            }

            function scrollEffect(scroll_EL) {
                var toRender = (-myScroll[scroll_EL].y) / myScroll[scroll_EL].wrapperHeight;
                toRender = Math.round(Math.abs(toRender)) % (scrollHeight + 1);
                if (toRender > -0.5) {
                    toRender = Math.round(Math.abs(toRender));
                    $('#' + scroll_EL + '_scroll').find('.scrollEffect').removeClass('scrollEffect');
                    var elToRender = $('.' + scroll_EL + '_' + toRender);
                    if (elToRender.length !== 0) {
                        elToRender.addClass('scrollEffect');
                    }
                } else {
                    $('.' + scroll_EL + 'Scroll').removeClass('scrollEffect');
                }
            }

            function scrollEffectForScrolling(scroll_EL) {
                var toRender = (-scrollContents.css('transform').match(/\d+/g)[5]) / myScroll[scroll_EL].wrapperHeight;

                toRender = Math.round(Math.abs(toRender)) % (scrollHeight + 1);
                if (toRender > -0.5) {
                    toRender = Math.round(Math.abs(toRender));
                    $('.' + scroll_EL + 'Scroll').removeClass('scrollEffect');
                    var elToRender = $('.' + scroll_EL + '_' + toRender);
                    if (elToRender.length !== 0) {
                        elToRender.addClass('scrollEffect');
                    }
                } else {
                    $('.' + scroll_EL + 'Scroll').removeClass('scrollEffect');
                }
            }

            function reUse() {
                var dragPosition = (-scrollContents.css('transform').match(/\d+/g)[5]);

                dragPosition = Math.abs(dragPosition);
                console.log(dragPosition);
                var fullHeight = scrollWindow.height() * (scrollHeight + 1) * reuseNumber[scroll_EL];

                if (dragPosition < fullHeight * (1 / 3)) {
                    var toRemove = scrollContents.find(".scroll:gt(" + (scrollHeight * 2) + ")");
                    console.log(toRemove);
                    toRemove.remove();
                    scrollContents.prepend(reuseContents[scroll_EL]);
                    refresh();
                } else if (dragPosition > fullHeight * (2 / 3)) {
                    var toRemove2 = scrollContents.find(".scroll:lt(" + (scrollHeight + (1)) + ")");
                    toRemove2.remove();
                    scrollContents.append(reuseContents[scroll_EL]);
                    refresh();
                }
                function refresh() {
                    scrollContents.css('height', scrollWindow.height() * (scrollHeight + 1) * reuseNumber[scroll_EL] + 'px');
                    $('.scroll').css('line-height', scrollWindow.height() + 'px');
                }
            }
        }

        function getDaysInMonth(year,month){
            month = parseInt(month,10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
            var temp = new Date(year,month,0);
            return temp.getDate();
        }
        $done.click(function(){
            send();
            $done.css({'background-color':'#f16e20','color':'#ffffff','border':'solid #f16e20 2px'});
            setTimeout(function(){
                $done.css({'background-color':'#ffffff','color':'#c7c8c8','border':'solid #c7c8c8 2px'})
            },duration.doneAnimationTimeout);
        });
        function send(){
            cordova.exec(null, null, "BasicFunction", "setTime", [date]);
        }
        // document.addEventListener('deviceready', function () {
        //     window.addEventListener('ftdevicestatusupdate', function (data) {
        //         if(data.title === "SET24Hour"){
        //             console.log(JSON.stringify(data));
        //             if(data.content === "true"){
        //                 data.is24Hour = true;
        //             }else{
        //                 data.is24Hour = false;
        //             }
        //             timeFormat.hour = date['is24Hour']?23:11;
        //             setTimeout(function () {
        //                 set12or24(lang);
        //             },10);
        //         }
        //     }, false);
        // }, false);
    };
