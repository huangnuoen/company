/**
 * Created by qkchung on 15/11/13.
 */
window.onload = function testStart() {
    //alert(window.location.href);
    //var om = Oomi_common_functions.createNew(null,null);
    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    var deiveID = Param['deviceId'];
    var pageid =  Param['pageId'];
    var operateID = Param['operateID'];
    languageSwitcher(lang);
    function languageSwitcher(lang){
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            var textsOBJ = setAllTextLanguage(scriptOBJ.which);
            $('#topicMin').text(textsOBJ.MINUTE_TOPIC);
            $('#topicSec').text(textsOBJ.SEC_TOPIC);
        });
    }
    var effectInterval = {
        hour:0,
        min:0
    };
    var effectStopper = {
        hour:0,
        min:0
    };
    var date = {
        'hour':0,
        'min':1

    };
    var myScroll = {
        'hour':0,
        'min':0,
        'month':0,
        'day':0,
        'year':0,
        'AmPm':0
    };
    var slide_EL = {
        'hour':0,
        'min':0,
        'month':0,
        'day':0,
        'year':0,
        'AmPm':0
    };
    var touchPosition = null;

    // date_picker(1,0,59,'hour',30);
    // date_picker(1,0,59,'min',0);
    document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});
    function date_picker(step_param,min,max_param,scroll_EL,toShow){
        var scroll = $('#'+scroll_EL+'_scroll');
        //scroll.children().remove();
        var configs = {
            step:step_param,
            max:max_param,
            min:min
        };
        if(configs.step !== 0) {
            var count = (configs.max - configs.min) / configs.step;
        }else {
            count = 1;
            //console.log('warning step = 0');
        }
        var step = configs.step;
        var _select = $('#'+scroll_EL+'_select');
        init();
        setTimeout(function () {
            loaded_scroll();
        },300);
        function init(){
            for(var i = 0; i <= count; i++){
                var divs = $('<div>');
                divs.appendTo(scroll);
                divs.attr({class:scroll_EL+'slide swiper-slide', id:scroll_EL+'_select_'+i}).css('height',_select.css('height'));
                divs.css({'line-height':_select.css('height')});
                var text = i*step+min+'';
                if((i*step+min).toString().length === 1 && scroll_EL !== 'year'){
                    text ='0'+(i*step+min);
                }
                divs.text(text);
            }
            slide_EL[scroll_EL] = scroll.find('.'+scroll_EL+'slide');
        }
        function loaded_scroll() {
            function render(){
                slide_EL[scroll_EL].css({'color':'#737373','font-size':'larger'});
                var scrollY = scroll.css('transform').match(/\d+/g)[5]/slide_EL[scroll_EL][0].clientHeight;
                scrollY =  Math.round(scrollY);
                $('#'+scroll_EL+'_select_'+scrollY).css({'color':'#F26F21','font-size':'x-large'});
                send();
            }
            myScroll[scroll_EL] = new Swiper('#'+scroll_EL+'_select',{
                autoplay:false,
                direction:'vertical',
                width: '100%',
                loop:false,
                speed:1000,
                initialSlide:toShow,
                freeMode:true,
                freeModeMomentum:true,
                freeModeMomentumRatio:1,
                freeModeMomentumVelocityRatio:1,
                preventClicks:true,
                freeModeMinimumVelocity:0.1,
                on:{
                    touchStart: function(event){
                        window.clearInterval(effectInterval[scroll_EL]);
                        window.clearTimeout(effectStopper[scroll_EL]);
                        effectInterval[scroll_EL] = setInterval(function () {
                            render();
                        },100);
                    },
                    touchEnd:function (event) {
                        date[scroll_EL] = Number(myScroll[scroll_EL].activeIndex);
                        effectStopper[scroll_EL] = setTimeout(function () {
                            window.clearInterval(effectInterval[scroll_EL]);
                            date[scroll_EL] = Number(myScroll[scroll_EL].activeIndex);
                            myScroll[scroll_EL].slideTo(myScroll[scroll_EL].activeIndex, 100, false);
                            render();
                        },1200);
                        myScroll[scroll_EL].slideTo(myScroll[scroll_EL].activeIndex, 100, false);
                        render();
                    },
                    tap: function(){
                        window.clearInterval(effectInterval[scroll_EL]);
                        window.clearTimeout(effectStopper[scroll_EL]);
                        myScroll[scroll_EL].slideTo(myScroll[scroll_EL].activeIndex, 100, false);
                        render();
                    },
                    click: function(){
                        window.clearInterval(effectInterval[scroll_EL]);
                        window.clearTimeout(effectStopper[scroll_EL]);
                        myScroll[scroll_EL].slideTo(myScroll[scroll_EL].activeIndex, 100, false);
                        render();
                    }
                }
            });
            setTimeout(function () {
                render();
            },300);
        }
    }
    function send(){
        var delaySec = parseInt(date.min)+parseInt(date.hour*60);
        if(pageid === '000005'){
            cordova.exec(null, null, "FTP2PApi", "saveDelayAction", [deiveID, "binsw01", delaySec, "delay",operateID]);
        }else{
            cordova.exec(null, null, "FTP2PApi", "saveIQConditions", [deiveID,'delay', 'delay',operateID,0,delaySec]);
        }

    }

        document.addEventListener('deviceready', function (){
            if(pageid == '000005'){
                querySceneActionStatus();
            }else if(pageid == '000007'){
                getIQConditionsStatus();
            }

            function getIQConditionsStatus() {
                cordova.exec(function (data) {
                    var obj = stringToJson(data);
                    var value = obj.value;
                    if (value.length > 0) {
                        var min = parseInt(Number(value[0].delay) / 60);
                        var sec = parseInt(Number(value[0].delay) % 60);
                        date.hour =  Number(min);
                        date.min =  Number(sec);
                        setTimeout(function () {
                            date_picker(1, 0, 59, 'hour', date.hour);
                            date_picker(1, 0, 59, 'min', date.min);
                        },100)
                    } else {
                        date_picker(1, 0, 59, 'hour', 0);
                        date_picker(1, 0, 59, 'min', 1);
                        cordova.exec(null, null, "FTP2PApi", "saveIQConditions", [deiveID, 'delay', 'delay',operateID, 0, 1]);
                    }
                }, null, "FTP2PApi", "getIQConditionsStatus", [operateID]);
            }
            function querySceneActionStatus() {
                cordova.exec(function (data) {
                    var obj = stringToJson(data);
                    var value = obj.value;
                    if (value.length > 0) {
                        var min = parseInt(Number(value[0].delay) / 60);
                        var sec = parseInt(Number(value[0].delay) % 60);
                        date.hour =  Number(min);
                        date.min =  Number(sec);
                        setTimeout(function () {
                            date_picker(1, 0, 59, 'hour', date.hour);
                            date_picker(1, 0, 59, 'min', date.min);
                        },100)
                    } else {
                        date_picker(1, 0, 59, 'hour', 0);
                        date_picker(1, 0, 59, 'min', 1);
                        cordova.exec(null, null, "FTP2PApi", "saveDelayAction", [deiveID, "binsw01", 1, "delay", Param.operateID]);
                    }
                }, null, "FTP2PApi", "querySceneActionStatus", [operateID]);
            }


        function stringToJson(data){
            var result = '';
            if(data.indexOf('\"[{')>0){
                var str = data.replace('\"[','[');
                result = str.replace(']\"',']');
            }else if(data.indexOf('\"[')>0){
                var str2 = data.replace('\"[','[');
                result = str2.replace(']\"',']');
            }else if(data.indexOf('\"{')>0){
                var str3 = data.replace('\"{','{');
                result = str3.replace('}\"','}');
            }else{
                return null;
            }
            return JSON.parse(result);
        }

    },false);

    window.addEventListener('ftdevicestatusupdate', function (data) {
        if(data.title === "Language"){
            languageSwitcher(data.content);
        }
    }, false);


};
