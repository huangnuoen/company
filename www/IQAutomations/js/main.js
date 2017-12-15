/**
 * Created by qkchung on 15/11/13.
 */
    window.onload = function testStart() {
        var om2 = Oomi_command_function.create_new();
        var Param = om2.resource_data();
        var lang = Param.language;
        var globalTextsOBJ = null;
        var globalWhichType = Param.iqValueType;
        var globalTypeName = 0;
        var touchPosition = null;
        var tempUnit = 0;
        var globalData = {
            'single':0,
            'front':0,
            'back':0
        };
        var myScroll = {
            'single':null,
            'front':null,
            'back':null
        };
        languageSwitcher(lang);
        function languageSwitcher(lang){
            var scriptOBJ = selectLanguage2(lang);
            $.getScript(scriptOBJ.url, function () {
                globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
                listener();
            });
        }

        function switchView(resourceTypeID,toShowValType,toShowStatus){
            var $showWindow = $('#showWindow');
            var $_scroller = $('._scroller');
            myScroll = {
                'single':null,
                'front':null,
                'back':null
            };
            $_scroller.remove();
            var data = switchData(resourceTypeID);
            var template = switchWhichView(data[0]);
            $showWindow.append(Handlebars.compile(template.html())(data[1]));
            $showWindow.onload = callback();
            function callback(){
                switchPicker(resourceTypeID,toShowValType,toShowStatus);
            }
            function switchWhichView(viewType){
                return  $('#'+viewType+'-template');
            }
        }

        function switchData(resourceTypeID){
            switch (resourceTypeID){
                case 'temperature01':
                    return ['double',generateLetterTextData_double(['>=','<='],-50,51,false)];
                    break;
                case 'binsw01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_STATE_ON,globalTextsOBJ.IQ_STATE_OFF])];
                    break;
                case 'pir01':
                    //var model = Param.model.split('-')[0];
                    //if(model == 'FT112'){
                    //    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_D_W_OPEN,globalTextsOBJ.IQ_D_W_CLOSE])];
                    //}else{
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_MOTION_YES,globalTextsOBJ.IQ_MOTION_NO])];
                    //}
                    break;
                case 'lum01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_BRIGHT,globalTextsOBJ.IQ_DARK])];
                    break;
                case 'hum01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_MOTION_YES,globalTextsOBJ.IQ_MOTION_NO])];
                    break;
                case 'magnet01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_D_W_OPEN,globalTextsOBJ.IQ_D_W_CLOSE])];
                    break;
                case 'sensor01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_D_W_OPEN,globalTextsOBJ.IQ_D_W_CLOSE])];
                    break;
                case 'rgbbulb01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_STATE_ON,globalTextsOBJ.IQ_STATE_OFF])];
                    break;
                case 'mlevel01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_STATE_ON,globalTextsOBJ.IQ_STATE_OFF])];
                    break;
                case 'water01':
                    return ['single',generateLetterTextData_single([globalTextsOBJ.IQ_LEAK,globalTextsOBJ.IQ_NOLEAK])];
                    break;
            }
        }

        function switchPicker(resourceTypeID,toShowValType,toShowStatus){
            var str=Param.widgetId;
            var array=str.split('_');
            var pageid=array[3];
            switch (resourceTypeID){
                case 'temperature01':
                    pickerDouble('front',toShowValType,resourceTypeID,'temperature',pageid);
                    pickerDouble('back',toShowStatus,resourceTypeID,'temperature',pageid);
                    globalTypeName = 'temperature';
                    break;
                case 'binsw01':
                    picker('single',toShowStatus,resourceTypeID,'status',pageid);
                    globalTypeName = 'status';
                    break;
                case 'pir01':
                    picker('single',toShowStatus,resourceTypeID,'status',pageid);
                    globalTypeName = 'status';
                    break;
                case 'lum01':
                    picker('single',toShowValType,resourceTypeID,'illuminance',pageid);
                    globalTypeName = 'illuminance';
                    break;
                case 'hum01':
                    picker('single',toShowStatus,resourceTypeID,'humidity',pageid);
                    globalTypeName = 'humidity';
                    break;
                case 'magnet01':
                    picker('single',toShowStatus,resourceTypeID,'status',pageid);
                    globalTypeName = 'status';
                    break;
                case 'sensor01':
                    picker('single',toShowStatus,resourceTypeID,'status',pageid);
                    globalTypeName = 'status';
                    break;
                case 'rgbbulb01':
                    picker('single',toShowValType,resourceTypeID,'brightness',pageid);
                    globalTypeName = 'brightness';
                    break;
                case 'mlevel01':
                    picker('single',toShowStatus,resourceTypeID,'mtLevel',pageid);
                    globalTypeName = 'status';
                    break;
                case 'water01':
                    picker('single',toShowStatus,resourceTypeID,'status',pageid);
                    globalTypeName = 'status';
                    break;
            }
        }

        function generateNumberTextData_single(start,end){
            var lenth = end - start;
            var data = {scrollText:[]};
            if(tempUnit===0){
                for(var k = 0 ; k < lenth ;k++){
                    data.scrollText[k] = {'text':start+k+'°C','id':'n'+(k)};
                }
                return data;
            }else{
                for(var l = 0 ; l < lenth ;l++){
                    var tempText = ((start+l)*1.8+32).toFixed(1);
                    data.scrollText[l] = {'text':tempText+'°F','id':'n'+(l)};
                }
                return data;
            }

        }

        function generateLetterTextData_single(strings){
            var data = {scrollText:[]};
            for(var i = 0 ; i < strings.length ;i++){
                data.scrollText[i] = {'text':strings[i],'id':'s'+i};
            }
            return data;
        }

        function generateLetterTextData_double(strings,start,end){
            var data = {scrollText:[],scrollText2:[]};
            data.scrollText = generateLetterTextData_single(strings).scrollText;
            data.scrollText2 = generateNumberTextData_single(start,end).scrollText;
            return data;
        }

        document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});

        function picker(scroll_EL,toShow,resourceTypeID,typeName,pageid){
            var scroll = $('#'+scroll_EL+'_scroll');
            var _select = $('#'+scroll_EL+'_select');
            reload();
            function reload(){
                var cells = $('.scrollCell');
                cells.css({'height':_select.height(),'line-height':_select.css('height')});
                scroll.css('height',_select.height()*cells.length);
            }
            loaded_scroll();
            function loaded_scroll() {
                myScroll[scroll_EL] = new IScroll('#'+scroll_EL+'_select', {
                    scrollX: false,
                    scrollY: true,
                    momentum: true,
                    snap: true,
                    snapSpeed: 100,
                    keyBindings: true,
                    indicators: null
                });
                if(typeName == 'illuminance'){
                    if(toShow == 2){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(1));
                    }else if(toShow == 4){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(0));
                    }
                }else if(typeName == 'brightness'){
                    if(toShow == 1){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(0));
                    }else if(toShow == 3){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(1));
                    }
                } else{
                    if(toShow == 'true'){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(0));
                    }else if(toShow == 'false'){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(1));
                    }else if(toShow == 0){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(0));
                    }
                }
            }
            myScroll[scroll_EL].on('scrollEnd',function (e) {
                var slides = $('.scrollCell');
                var scrollY = scroll.css('transform').match(/\d+/g)[5];
                globalData.single = Math.round(scrollY / slides[0].clientHeight);
                if(pageid == '000006'){
                    if(typeName == 'illuminance'){
                        sendIlluminance();
                    }else if(typeName == 'brightness' || typeName == 'mtLevel'){//todo
                        sendbrightness();
                    }else{
                        send();
                    }
                }else if(pageid == '000007'){
                    if(typeName == 'illuminance'){
                        sendIlluminance2();
                    }else if(typeName == 'brightness' || typeName == 'mtLevel'){//todo
                        sendbrightness2();
                    }else{
                        send2();
                    }
                }
            }, false);
            function send(){
                if(globalData.single == 0){
                    saveIQTriggers(0,true,resourceTypeID,typeName);
                }else if(globalData.single == 1){
                    saveIQTriggers(0,false,resourceTypeID,typeName);
                }
            }
            function send2(){
                if(globalData.single == 0){
                    saveIQConditions(0,true,resourceTypeID,typeName);
                }else if(globalData.single == 1){
                    saveIQConditions(0,false,resourceTypeID,typeName);
                }
            }
            function sendIlluminance(){
                if(globalData.single == 0){
                    saveIQTriggers(4,40,resourceTypeID,typeName);
                }else if(globalData.single == 1){
                    saveIQTriggers(2,40,resourceTypeID,typeName);
                }
            }
            function sendIlluminance2(){
                if(globalData.single == 0){
                    saveIQConditions(4,40,resourceTypeID,typeName);
                }else if(globalData.single == 1){
                    saveIQConditions(2,40,resourceTypeID,typeName);
                }
            }
            function sendbrightness(){
                if(globalData.single == 0){
                    saveIQConditions(1,0,resourceTypeID,typeName);
                }else if(globalData.single == 1){
                    saveIQConditions(3,0,resourceTypeID,typeName);
                }
            }
            function sendbrightness2(){
                if(globalData.single == 0){
                    saveIQConditions(1,0,resourceTypeID,typeName);
                }else if(globalData.single == 1){
                    saveIQConditions(3,0,resourceTypeID,typeName);
                }
            }
        }
        function pickerDouble(scroll_EL,toShow,resourceTypeID,typeName,pageid){
            var _select = $('#double_select_'+scroll_EL);
            var scroll = $('#double_scroll_'+scroll_EL);
            reload();
            function reload(){
                var cells = 0;
                if(scroll_EL == 'front'){
                    cells = scroll.find('.scrollCell1');
                }else{
                    cells = scroll.find('.scrollCell2');
                }

                cells.css({'height':_select.height(),'line-height':_select.css('height')});
                scroll.css('height',_select.height()*cells.length);
            }
            loaded_scroll();
            function loaded_scroll() {
                myScroll[scroll_EL] = new IScroll('#double_select_'+scroll_EL, {
                    scrollX: false,
                    scrollY: true,
                    momentum: true,
                    snap: true,
                    snapSpeed: 100,
                    keyBindings: true,
                    indicators: null
                });
                if(scroll_EL == 'front'){
                    if(toShow == 3){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(1));
                        globalData.front = toShow;
                    }else if(toShow == 4){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(0));
                        globalData.front = toShow;
                    }else if(toShow == 0){
                        myScroll[scroll_EL].scrollTo(0,-_select.height()*(Number(toShow)));
                        globalData.front = 4;
                    }
                }else{
                    myScroll[scroll_EL].scrollTo(0,-_select.height()*(Number(toShow)+50));
                    globalData.back = toShow;
                }

            }
            myScroll[scroll_EL].on('scrollStart', function (e) {
                var body = $('body');
                if(touchPosition == null) {
                    if (this.pointX <= body.width() * 0.5) {
                        touchPosition = 'front';
                    } else if (this.pointX > body.width() * 0.5) {
                        touchPosition = 'back';
                    }
                }
            }, false);
            myScroll[scroll_EL].on('scrollEnd',function (e) {
                switch (touchPosition){
                    case 'front':render('front');
                        break;
                    case 'back':render('back');
                        break;
                }
                function render(el) {
                    if (touchPosition != el) {
                        return;
                    }
                    var slides = 0;
                    if(el == 'front'){
                        slides = $('.scrollCell1');
                    }else{
                        slides = $('.scrollCell2');
                    }
                    var scrollY = scroll.css('transform').match(/\d+/g)[5];
                    var slideY = Math.round(scrollY / slides[0].clientHeight);
                    if(el == 'front'){
                        if(slideY == 0){
                            globalData.front = 4;
                        }else{
                            globalData.front = 3;
                        }
                        if(pageid == '000006'){
                            saveIQTriggers(globalData.front,globalData.back,resourceTypeID,typeName);
                        }else if(pageid == '000007'){
                            saveIQConditions(globalData.front,globalData.back,resourceTypeID,typeName);
                        }
                    }else{
                        globalData.back = slides[slideY].innerHTML.replace(/[^0-9\-\.]/ig,'');
                        if(pageid == '000006'){
                            send();
                        }else if(pageid == '000007'){
                            send2();
                        }
                    }

                }
                touchPosition = null;
            }, false);

            function send(){
                if(tempUnit == 0){
                    saveIQTriggers(globalData.front,globalData.back,resourceTypeID,typeName);
                }else{
                    var tempT = (Number(globalData.back) - 32)/(1.8);
                    tempT = tempT.toFixed(2);
                    tempT = Math.round(tempT);
                    tempT = tempT>>0;
                    saveIQTriggers(globalData.front,tempT,resourceTypeID,typeName);
                }
            }
            function send2(){
                if(tempUnit == 0){
                    saveIQConditions(globalData.front,globalData.back,resourceTypeID,typeName);
                }else{
                    var tempT2 = (Number(globalData.back) - 32)/(1.8);
                    tempT2 = tempT2.toFixed(2);
                    tempT2 = Math.round(tempT2);
                    tempT2 = tempT2>>0;
                    saveIQConditions(globalData.front,tempT2,resourceTypeID,typeName);
                }
            }
        }

        function saveIQTriggers(condition,data,resourceTypeID,typeName){
            var str=Param.widgetId;
            var array=str.split('_');
            var nodeid=array[1];
            cordova.exec(null, null, "FTP2PApi", "saveIQTriggers", [nodeid,resourceTypeID,typeName,Param.operateID,condition,data]);
        }

        function saveIQConditions(condition,data,resourceTypeID,typeName){
            var str=Param.widgetId;
            var array=str.split('_');
            var nodeid=array[1];
            cordova.exec(null, null, "FTP2PApi", "saveIQConditions", [nodeid,resourceTypeID,typeName,Param.operateID,condition,data]);
        }

        function INITSaveIQTriggers(globalWhichType){
            switch (globalWhichType){
                case 'temperature01':
                    saveIQTriggers(4,0,globalWhichType,'temperature');
                    break;
                case 'binsw01':
                    saveIQTriggers(0,true,globalWhichType,'status');
                    break;
                case 'pir01':
                    saveIQTriggers(0,true,globalWhichType,'status');
                    break;
                case 'lum01':
                    saveIQTriggers(4,40,globalWhichType,'illuminance');
                    break;
                case 'hum01':
                    saveIQTriggers(0,0,globalWhichType,'humidity');
                    break;
                case 'magnet01':
                    saveIQTriggers(0,true,globalWhichType,'status');
                    break;
                case 'sensor01':
                    saveIQTriggers(0,true,globalWhichType,'status');
                    break;
                case 'rgbbulb01':
                    saveIQTriggers(1,0,globalWhichType,'brightness');
                    break;
                case 'mlevel01':
                    saveIQTriggers(1,0,globalWhichType,'mtLevel');
                    break;
                case 'water01':
                    saveIQTriggers(0,true,globalWhichType,'status');
                    break;
            }
            switchView(globalWhichType,0,0);
        }
        function INITSaveIQConditions(globalWhichType){
            switch (globalWhichType){
                case 'temperature01':
                    saveIQConditions(4,0,globalWhichType,'temperature');
                    break;
                case 'binsw01':
                    saveIQConditions(0,true,globalWhichType,'status');
                    break;
                case 'pir01':
                    saveIQConditions(0,true,globalWhichType,'status');
                    break;
                case 'lum01':
                    saveIQConditions(4,40,globalWhichType,'illuminance');
                    break;
                case 'hum01':
                    saveIQConditions(0,true,globalWhichType,'humidity');
                    break;
                case 'magnet01':
                    saveIQConditions(0,true,globalWhichType,'status');
                    break;
                case 'sensor01':
                    saveIQConditions(0,true,globalWhichType,'status');
                    break;
                case 'rgbbulb01':
                    saveIQConditions(1,0,globalWhichType,'brightness');
                    break;
                case 'mlevel01':
                    saveIQConditions(1,0,globalWhichType,'mtLevel');
                    break;
                case 'water01':
                    saveIQConditions(0,true,globalWhichType,'status');
                    break;
            }
            switchView(globalWhichType,0,0);
        }
        function listener(){
            document.addEventListener('deviceready', function (){
                var str=Param.widgetId;
                var array=str.split('_');
                var nodeid=array[1];
                var pageid=array[3];
                cordova.exec(function (data1) {
                    var obj=JSON.parse(data1);
                    var value=obj.value;
                    if(value==="false"){
                        tempUnit = 0;
                    }else{
                        tempUnit = 1;
                    }
                },null,"FTP2PApi","getUnit",[""]);
                if(pageid == '000006'){
                    getIQTriggersStatus();
                }else if(pageid == '000007'){
                    getIQConditionsStatus();
                }
                function getIQConditionsStatus(){
                    cordova.exec(function (data) {
                        var obj = stringToJson(data);
                        var value = obj.value;
                        var num=0;
                        for(var ee in value ){num++;}
                        if(num != 0) {
                            var resTypeId = value['resTypeId'];
                            var valueType = value['valueType'];
                            for(var i in value){
                                var status = value[i];
                            }
                            switchView(resTypeId,valueType,status);
                        }else{
                            INITSaveIQConditions(globalWhichType);
                        }
                    }, null, "FTP2PApi", "getIQConditionsStatus", [Param.operateID]);
                }
                function getIQTriggersStatus(){
                    cordova.exec(function (data) {
                        var obj = stringToJson(data);
                        var value = obj.value;
                        var num=0;
                        for(var ee in value ){num++;}
                        if(num != 0) {
                            var resTypeId = value['resTypeId'];
                            var valueType = value['valueType'];
                            for(var i in value){
                                var status = value[i];
                            }
                            switchView(resTypeId,valueType,status);
                        }else{
                            INITSaveIQTriggers(globalWhichType);
                        }
                    }, null, "FTP2PApi", "getIQTriggersStatus", [Param.operateID]);
                }
                cordova.exec(function (data1) {
                    var obj=JSON.parse(data1);
                    var value=obj.value;
                    if(value==="false"){
                        tempUnit = 0;
                    }else{
                        tempUnit = 1;
                    }
                },null,"FTP2PApi","getUnit",[""]);
                function stringToJson(data){
                    var result = '';
                    if(data.indexOf('\"{')>0){
                        var str = data.replace('\"{','{');
                        result = str.replace('}\"','}');
                    }else{
                        return {'value':{}};
                    }
                    return JSON.parse(result);
                }

                window.addEventListener('ftdevicestatusupdate', function (data) {
                    var str=Param.widgetId;
                    var array=str.split('_');
                    var nodeid=array[1];
                    var pageid=array[3];
                    if(data.title === "Language"){

                    }
                    if(data.title === 'IQTriggersOrConditions'){

                        if(data.ID === Param.operateID){
                            var result = data.content;
                            globalWhichType = result;
                            switchView(result,0,0);
                            if(pageid == '000006'){
                                INITSaveIQTriggers(result);
                            }else if(pageid == '000007'){
                                INITSaveIQConditions(result)
                            }
                        }
                    }
                }, false);
            },false);
        }
    };