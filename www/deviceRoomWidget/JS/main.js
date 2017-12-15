/**
 * Created by M on 17/7/13.
 */
(function() {
    function getCurrentFileName(){
        var CurrentUrl = window.document.location.pathname;
        var files = CurrentUrl.split('/');
        return files[files.length - 2];
    }
    renderOomiDevice();
    function renderOomiDevice(){
        var om = Oomi_command_function.create_new();
        var Param = om.resource_data();
        var model = Param.model.split('-')[0];
        // model ='FT100';
        // console.log('model:'+model);
        var model_EL = {
            'FT101':'Cube', // cube FT102-Touch
            'FT098':'RGB', // OOMI_RGB_BULB
            'FT096':'Plug', // Plug
            'FT139':'Plug', // OOMI_IN_WALL_SWITCH
            'FT100':'MultisensorR', // OOMI_MULTISENSOR
            'FT111':'Dimmer', // OOMI_IN_WALL_DIMMER
            'FT113':'Camera',
            // "FT109":'Air', // OOMI_AIR
            'FT112':'Door_window', // OOMI_DOORWINDOWSENSOR
            "FT118":'RANGE_EXTENDER', // OOMI_RANGE_EXTENDER
            "FT115":'Dock', // OOMI_DOCK
            'FT104':'OOMI_STREAMER',
            'FT121':'RGB', // OOMI_LED_STRIP
            'FT169':'RGB', // OOMI_LED_STRIP
            'FT149':'Plug', // OOMI_SIREN
            'TPD16':'Plug', // SWITCH_BINARY
            'TPD17':'Dimmer', // SWITCH_MULTILEVEL
            'TPD64':'Doorlock', // ENTRY_CONTROL
            'TPD32OC':'NewMotion', // SENSOR_BINARY_OC
            'NEST01':'', // NEST01
            'PHILIPS02':'RGB', // PHLight
            'TPD32MO':'NewMotion', // SENSOR_BINARY_MO
            'TPD32':'NewMotion', // SENSOR_BINARY_32
            'TPD07':'NewMotion', // TPD_DOORWINDOWSENSOR
            'FT014':'Dimmer', // OOMI_MOTOR_CONTROLLER
            'FT145':'Plug', // OOMI_PLUG_CN
            'FT122':'NewMotion', // WATER_SENSOR
            'FT057':'ac', // ac
            'FT143':'Curtain', // curtain
            'FT070':'Curtain',
            'FT153':'wallSwitch', // OOMI_TOUCH_PANNEL
            'FT156':'wallSwitch',
            'FT157':'wallSwitch',
            'FT154':'wallSwitch',
            'FT155':'wallSwitch',
            'FT116':'wallSwitch',
            'FT132':'wallSwitch',
            'FT140':'wallSwitch',
            'FT163':'Siren', // OOMI_SIREN，
            'FT147':'Plug', // Power Socket
            'FT141':'wallShutter', // In-Wall Shutter
        };
        var whichNotToRemove = model_EL[model];
        for (var i in model_EL){
            var el = $('#'+model_EL[i]);
            if(model_EL[i] !== whichNotToRemove){
                el.remove();
            }
        }
        $('#'+model_EL[model]).show();
        eval(model_EL[model]+'(Param,model)');
        fastClick('#'+model_EL[model],null);
    }

    function setSameConfig() {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                store:'libs/store',
                OOMICommand: 'libs/Oomi-command',
                OOMICommon:'libs/Oomi-common-min',
                jquery_touchy:'libs/jquery.touchy',
                LangSel:'internationalization/LanguageSelector',
                ListenerSender: 'deviceRoomWidget/JS/ListenerSender'
            }
        });
    }
    function wallShutter(Param,thismodel) {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                OOMICommon: 'libs/Oomi-common-min',
                OOMICommand: 'libs/Oomi-command',
                fastClick: 'libs/fastclick2',
                store:'libs/store',
                util:'desktop_widget/src/util',
                Vue:'libs/vue',
                TweenLite:'libs/TweenMax.min',
                TimelineLite:'libs/TimelineMax.min',
                CSSPlugin:'libs/CSSPlugin.min',
                shutterButton: 'desktop_widget/src/component/shutterButton',
            },
            shim:{

            }

        });
        requirejs(['jquery','shutterButton','OOMICommand','fastClick','util/popupTools','Vue'],
            function   ($ ,shutterButton,OOMICommand,fastClick,popupTools,Vue) {
                // popupTools.deviceRoomAjaxHTML();
                fastClick.attach(document.body);
                var params = Oomi_command_function.create_new().resource_data();
                var nodeID =  params['deviceId'];
                var operateID = Param['operateID'];
                var hasoperateID = (Param.hasOwnProperty('operateID') && Param['operateID'] !== undefined && Param['operateID'] !== null);
                if (hasoperateID){
                    getScenesData(nodeID,operateID);
                }else {
                    getDeviceData(nodeID,operateID);
                }
                function getDeviceData(nodeID,operateID) {
                    var thisComponent = {};
                    // popupTools.ImportTemplates('#_brightnessController');
                    var canSend = 0;
                    var shouldReceive = 0;
                    var shutterCode = 0;
                    Vue.component('shutter-button', {
                        name:'shutterButton',
                        template: '#_shutterButton',
                        data: function () {
                            return {
                                changeStart: {
                                    fill:'#B3B2B3'
                                },
                                changeEnd: {
                                    fill:'#B3B2B3'
                                },
                                changeStop: {
                                    fill :'#B3B2B3'
                                }
                            }
                        },
                        mounted:function(){
                            thisComponent = this;
                        },
                        methods:{
                            start:function() {
                                shutterCode = 'start';
                                this.changeStart.fill = '#E66C25';
                                setTimeout(function(){
                                    thisComponent.changeStart.fill = '#B3B2B3';
                                },300)
                                sendToCube();
                            },
                            end:function() {
                                shutterCode = 'end';
                                this.changeEnd.fill = '#E66C25';
                                setTimeout(function(){
                                    thisComponent.changeEnd.fill = '#B3B2B3';
                                },300)
                                sendToCube();
                            },
                            stop:function() {
                                shutterCode = 'stop';
                                this.changeStop.fill = '#E66C25';
                                setTimeout(function(){
                                    thisComponent.changeStop.fill = '#B3B2B3';
                                },300)
                                sendToCube();
                            }
                        }
                    });

                    var demo = new Vue({
                        el: '#wallShutter',
                        data:{
                        }
                    });
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
                    function sendToCube(){
                        syncSend(function () {
                            if(shutterCode === 'start'){
                                cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",0+'',"mtLevel"]);
                            }else if(shutterCode === 'end'){
                                cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",99+'',"mtLevel"]);
                            }else if(shutterCode === 'stop'){
                                cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",1000+'',"mtLevel"]);
                            }
                        });
                    }
                }
                function getScenesData(nodeID,operateID) {
                    var thisComponent = {};
                    // popupTools.ImportTemplates('#_brightnessController');
                    var canSend = 0;
                    var shouldReceive = 0;
                    var shutterCode = 0;
                    var val = 0;
                    Vue.component('shutter-button', {
                        name:'shutterButton',
                        template: '#_shutterButton',
                        data: function () {
                            return {
                                changeStart: {
                                    fill:'#B3B2B3'
                                },
                                changeEnd: {
                                    fill:'#B3B2B3'
                                },
                                changeStop: {
                                    fill :'#B3B2B3'
                                }
                            }
                        },
                        mounted:function(){
                            thisComponent = this;
                            cordova.exec(function (data) {
                                var stringifyData = JSON.stringify(data);
                                if(stringifyData.indexOf('mtLevel') != -1) {
                                    popupTools.updateUI(data, 'mtLevel', function (result) {
                                        val = Number(result);
                                        highLightStatus(val);
                                    });
                                }else{
                                    if(hasoperateID) {
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 0+'', "mtLevel",operateID]);
                                    }
                                }
                            }, null, "FTP2PApi", "querySceneActionStatus", [operateID, "binsw01"]);
                        },
                        methods:{
                            start:function() {
                                shutterCode = 'start';
                                this.changeStart.fill = '#E66C25';
                                this.changeEnd.fill = '#B3B2B3';
                                this.changeStop.fill = '#B3B2B3';
                                sendToCube();
                            },
                            end:function() {
                                shutterCode = 'end';
                                this.changeStart.fill = '#B3B2B3';
                                this.changeEnd.fill = '#E66C25';
                                this.changeStop.fill = '#B3B2B3';
                                sendToCube();
                            },
                            stop:function() {
                                shutterCode = 'stop';
                                this.changeStart.fill = '#B3B2B3';
                                this.changeEnd.fill = '#B3B2B3';
                                this.changeStop.fill = '#E66C25';
                                sendToCube();
                            }
                        }
                    });

                    var demo = new Vue({
                        el: '#wallShutter',
                        data:{
                        }
                    });
                    function highLightStatus(res) {
                        if(res === 0) {
                            thisComponent.changeStart.fill = '#E66C25';
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 0+'', "mtLevel",operateID]);
                        } else if(res === 99) {
                            thisComponent.changeEnd.fill = '#E66C25';
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 99+'', "mtLevel",operateID]);
                        } else if(res === 1000) {
                            thisComponent.changeStop.stroke = '#E66C25';
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 1000+'', "mtLevel",operateID]);
                        }
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
                    function sendToCube(){
                        syncSend(function () {
                            if(shutterCode === 'start'){
                                cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",0+'',"mtLevel"]);
                                if(hasoperateID) {
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 0+'', "mtLevel",operateID]);
                                }
                            }else if(shutterCode === 'end'){
                                cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",99+'',"mtLevel"]);
                                if(hasoperateID) {
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 99+'', "mtLevel",operateID]);
                                }
                            }else if(shutterCode === 'stop'){
                                cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeID,"mlevel01",1000+'',"mtLevel"]);
                                if(hasoperateID) {
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "mlevel01", 1000+'', "mtLevel",operateID]);
                                }
                            }
                        });
                    }
                }
        });
    }
    function wallSwitch(Param,thismodel,hasoperateID) {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                OOMICommand: 'libs/Oomi-command',
                OOMICommon:'libs/Oomi-common-min',
                util:'desktop_widget/src/util',
                Vue:'libs/vue',
                ListenerSender: 'deviceRoomWidget/JS/ListenerSender',
                wallS:'desktop_widget/src/component/wallSwitch',
                LangSel:'internationalization/LanguageSelector',
            },
            shim:{

            }
        });
        requirejs(['jquery','OOMICommand','util/popupTools','fastClick','wallS','LangSel'],
            function   ($,OOMICommand,popupTools,fastClick,wallS,LangSel) {
                popupTools.deviceRoomAjaxHTML();
                fastClick.attach(document.body);
                getLangScript();
                function getLangScript() {
                    var scriptOBJ = selectLanguage2(Param['language']);
                    scriptOBJ.which = 'deviceRoomWidget';
                    $.getScript(scriptOBJ.url, function () {
                        var globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
                        setTimeout(function () {
                            wallS.run(Param['deviceId'],Param['model'],Param['operateID'],globalTextsOBJ,true);
                        },1);
                    });
                }
            });
    }

    function Curtain(Param,thismodel) {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                store:'libs/store',
                OOMICommand: 'libs/Oomi-command',
                TweenLite:'libs/TweenMax.min',
                util:'desktop_widget/src/util',
                Vue:'libs/vue',
                switchProcessBar: 'desktop_widget/src/component/switchProcessBar',
            }
        });
        requirejs(['jquery','switchProcessBar','OOMICommand','util/popupTools','fastClick','store'],
            function   ($,switchProcessBar,OOMICommand,popupTools,fastClick,Store) {
                popupTools.deviceRoomAjaxHTML();
                fastClick.attach(document.body);
                var params = Oomi_command_function.create_new().resource_data();
                var hasoperateID = (Param.hasOwnProperty('operateID') && Param['operateID'] !== undefined && Param['operateID'] !== null);
                if (hasoperateID){
                    getScenesData();
                }else {
                    getDeviceData();
                }
                function getDeviceData(){
                    cordova.exec(function (data) {
                        var val = 99;
                        var stringifyData = JSON.stringify(data);
                        var renderResult = true;
                        if(stringifyData.indexOf('mtLevel') != -1) {
                            popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                                val = Number(result);
                            });
                            if(hasoperateID) {
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                            }
                        } else {
                            if(hasoperateID) {
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                            }
                        }

                        if(stringifyData.indexOf('status') != -1) {
                            popupTools.updateUI(data, 'status', function plugUpdate(result) {
                                if (result){
                                    if (result === 'true') {
                                        renderResult = true;
                                    } else if (result === 'false') {
                                        renderResult = false;
                                    } else if (result === false) {
                                        renderResult = false;
                                    } else if (result === true) {
                                        renderResult = true;
                                    } else {
                                        renderResult = true;
                                    }
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", renderResult, "status",Param['operateID']]);
                                    }
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", renderResult, "status",Param['operateID']]);
                            }
                        }
                        switchProcessBar.run(params['deviceId'],val,renderResult,Param['operateID']);
                    }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
                }
                function getScenesData() {
                    cordova.exec(function (data) {
                        var val = 99;
                        var renderResult = true;
                        if (popupTools.updateUI(data,'',null) === false){
                            getDeviceData();
                            return 1;
                        }
                        popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                            val = Number(result);
                        });
                        popupTools.updateUI(data, 'status', function plugUpdate(result) {
                            if (result){
                                if (result === 'true') {
                                    renderResult = true;
                                } else if (result === 'false') {
                                    renderResult = false;
                                } else if (result === false) {
                                    renderResult = false;
                                } else if (result === true) {
                                    renderResult = true;
                                } else {
                                    renderResult = true;
                                }
                            }
                        });
                        switchProcessBar.run(params['deviceId'],val,renderResult,Param['operateID']);
                    }, null, "FTP2PApi", "querySceneActionStatus", [params['operateID'], "binsw01"]);
                }
        });
    }

    function ac(params) {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                OOMICommand: 'libs/Oomi-command',
                util:'desktop_widget/src/util',
                TweenLite:'libs/TweenMax.min',
                TimelineLite:'libs/TimelineMax.min',
                CSSPlugin:'libs/CSSPlugin.min',
                iscroll:'libs/iscroll',
                Vue:'libs/vue',
                LangSel:'internationalization/LanguageSelector'
            }
        });
        requirejs(['util/popupTools', 'jquery','fastClick','LangSel','TweenLite','CSSPlugin','iscroll','Vue'],main);
        function main(popupTools,     $,        fastClick,  LangSel,  TweenLite,  CSSPlugin,  iscroll,  Vue) {
            var om2 = Oomi_command_function.create_new();
            var Param = om2.resource_data();
            var lang = Param.language;
            var pageId = Param['pageId'];
            var nodeID = Param['deviceId'];
            var operateID = Param['operateID'];
            var model = Param['model'];
            var globalTextsOBJ = null;
            var hasoperateID = (Param.hasOwnProperty('operateID') && Param['operateID'] !== undefined && Param['operateID'] !== null);
            getLangScript();
            function getLangScript() {
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
                    setTimeout(function () {
                        document.addEventListener('deviceready', function () {
                            // OomiRunpicker(1);
                            document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});
                            if (hasoperateID){
                                getScenesData();
                            }else {
                                getDeviceData();
                            }
                        }, false);
                    },0);
                });
            }
            function getDeviceData() {
                cordova.exec(function (data) {
                    var stringifyData = JSON.stringify(data);
                    console.log(stringifyData);
                    var val = 1;
                    var status = true;
                    if(stringifyData.indexOf('status') !== -1) {
                        popupTools.updateUI(data, 'status', function plugUpdate(result) {

                            if (result){
                                if (result === 'true') {
                                    status = true;
                                } else if (result === 'false') {
                                    status = false;
                                } else if (result === false) {
                                    status = false;
                                } else if (result === true) {
                                    status = true;
                                } else {
                                    status = true;
                                }
                                if (hasoperateID){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", status, "status",operateID]);
                                }
                            }else {
                                if (hasoperateID){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", status, "status",operateID]);
                                }
                            }
                        });
                    } else {
                        if (hasoperateID){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction",[nodeID, "binsw01", status, "status",operateID]);
                        }
                    }
                    setTimeout(function () {
                        if(stringifyData.indexOf('modes') !== -1) {
                            popupTools.updateUI(data, 'modes', function plugUpdate(result) {
                                if (result){
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "IRBlaster01", 1, "sendkey",operateID]);
                                    }
                                }else {
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "IRBlaster01", 1, "sendkey",operateID]);
                                    }
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "IRBlaster01", val, "sendkey",operateID]);
                            }
                        }
                    },200);
                    OomiRunpicker(0,status);
                }, null, "FTP2PApi", "getOldACStatus", [nodeID, "IRBlaster01"]);
            }

            function getScenesData() {
                cordova.exec(function (data) {
                    var stringifyData = JSON.stringify(data);
                    console.log(stringifyData);
                    var val2 = true;
                    var val3 = 1;
                    if(stringifyData.indexOf('status') === -1) {
                        getDeviceData();
                        return 1;
                    }
                    if(stringifyData.indexOf('status') !== -1) {
                        popupTools.updateUI(data, 'status', function plugUpdate(result) {
                            if (result){
                                if (result === 'true') {
                                    val2 = true;
                                } else if (result === 'false') {
                                    val2 = false;
                                } else if (result === false) {
                                    val2 = false;
                                } else if (result === true) {
                                    val2 = true;
                                } else {
                                    val2 = true;
                                }
                            }
                        });
                    }
                    if(stringifyData.indexOf('sendkey') !== -1) {
                        popupTools.updateUI(data, 'sendkey', function plugUpdate(result) {
                            if (result){
                                val3 = Number(result);
                            }
                        });
                    }
                    OomiRunpicker(val3-1,val2);
                }, null, "FTP2PApi", "querySceneActionStatus", [operateID, "IRBlaster01"]);
            }
            document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});
            function OomiRunpicker(val,OnOff) {
                var thisComponent = {};
                Vue.component('picker', {
                    name:'picker',
                    thisInterval:0,
                    rootEl : {},
                    els:{},
                    scrollCellHolder:{},
                    template: '#_ACPicker',
                    data:function thisData() {
                        return {
                            cellInfo:[
                                {text:globalTextsOBJ.AC_off,       type:'val',command:'1',style:{top:'0'}},
                                {text:globalTextsOBJ.AC_energySave,type:'val',command:'2',style:{top:'20%'}},
                                {text:globalTextsOBJ.AC_StrongCool,type:'val',command:'3',style:{top:'40%'}},
                                {text:globalTextsOBJ.AC_cool,      type:'val',command:'4',style:{top:'60%'}},
                                {text:globalTextsOBJ.AC_warm,      type:'val',command:'5',style:{top:'80%'}}
                        ],
                            style:{width:'50.00%', left:'50.00%'},
                            myid:'ac_',
                            mode:globalTextsOBJ.AC_mode,
                            status:OnOff?globalTextsOBJ.OnOffOn:globalTextsOBJ.OnOffOff,
                            OnOff:OnOff
                        };
                    },
                    myScroll : {},
                    mounted:function(){
                        thisComponent = this;
                        var length = this.cellInfo.length;
                        this.rootEl =  $('#'+this.myid);
                        this.scrollCellHolder = this.rootEl.find('.scrollCellHolder');
                        this.els = this.scrollCellHolder.find('.scrollCell');
                        this.rootEl.find('.scrollCellHolder').css('height',length*100+'%');
                        this.rootEl.find('.scrollCell').css('height',100/length+'%');
                        $('.mode').css('line-height',this.rootEl.height() + 'px');
                        $('.scrollCell').css('line-height',this.rootEl.height() + 'px');
                        $('.acPlugStatus').css('line-height',this.rootEl.height()*3 + 'px');
                        var acPlugStatus = $('.acPlugStatus');
                        if (this.OnOff){
                            acPlugStatus.css('color','#EC591A');
                        }else {
                            acPlugStatus.css('color','#9B9B9B');
                        }
                        this.pickerDouble();
                    },
                    methods:{
                        pickerDouble:function pickerDouble(){
                            thisComponent.myScroll = new IScroll('#'+thisComponent.myid, {
                                scrollX: false,
                                scrollY: true,
                                momentum: true,
                                snap: true,
                                snapSpeed: 200,
                                keyBindings: true,
                                indicators: null
                            });
                            setTimeout(function () {
                                thisComponent.initEffects();
                            },1);
                            thisComponent.myScroll.on('scrollCancel', function (e) {
                                cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                                clearInterval(thisComponent.thisInterval);
                            }, false);
                            thisComponent.myScroll.on('scrollStart', function () {
                                cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                                thisComponent.thisInterval = setInterval(function () {
                                    thisComponent.effects();
                                },100);
                            }, false);
                            thisComponent.myScroll.on('scrollEnd',function (e) {
                                cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                                thisComponent.effects();
                                clearInterval(thisComponent.thisInterval);
                                thisComponent.send();
                            }, false);
                        },
                        effects:function () {
                            var scrollY = this.scrollCellHolder.css('transform').match(/\d+/g)[5];
                            var slideY = Math.round(scrollY / this.rootEl.height());
                            TweenLite.to(thisComponent.els,            0.2, {css:{'font-size':'12px',color:'#9B9B9B'}});
                            TweenLite.to(thisComponent.els.eq(slideY), 0.2, {css:{'font-size':'18px',color:'#EC591A'}});
                        },
                        initEffects:function () {
                            thisComponent.myScroll.scrollTo(0,-thisComponent.rootEl.height()*val);
                            setTimeout(function () {
                                thisComponent.effects();
                            },1);
                        },
                        send:function () {
                            var scrollY =Number(this.scrollCellHolder.css('transform').match(/\d+/g)[5]);
                            var slideY = Math.round(scrollY / this.rootEl.height())+1;
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", this.OnOff, "status",operateID]);
                            }
                            setTimeout(function () {
                                cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeID, "IRBlaster01", slideY+'', "sendkey"]);
                                if (hasoperateID){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "IRBlaster01", slideY+'', "sendkey",operateID]);
                                }
                            },300)

                        },
                        toggleClick:function () {
                            this.OnOff = !this.OnOff;
                            var acPlugStatus = $('.acPlugStatus');
                            if (this.OnOff){
                                this.status = globalTextsOBJ.OnOffOn;
                                acPlugStatus.css('color','#EC591A');
                            }else {
                                this.status = globalTextsOBJ.OnOffOff;
                                acPlugStatus.css('color','#9B9B9B');
                            }
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeID, "binsw01", thisComponent.OnOff, "status"]);
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", thisComponent.OnOff, "status",operateID]);
                            }
                            setTimeout(function () {
                                var scrollY = Number(this.scrollCellHolder.css('transform').match(/\d+/g)[5]);
                                var slideY = Math.round(scrollY / this.rootEl.height())+1;
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "IRBlaster01", slideY+'', "sendkey",operateID]);
                                    }
                            },300);
                        }
                    }
                });
                var demo = new Vue({
                    el: '#main_content'
                });
            }
        }
    }
    
    function Plug(Param,thismodel) {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                store:'libs/store',
                OOMICommand: 'libs/Oomi-command',
                OOMICommon:'libs/Oomi-common-min',
                jquery_touchy:'libs/jquery.touchy',
                LangSel:'internationalization/LanguageSelector',
                ListenerSender: 'deviceRoomWidget/JS/ListenerSender',
                util:'desktop_widget/src/util'
            }
        });
        requirejs(['util/popupTools', 'fastClick','ListenerSender','LangSel'],
            function (popupTools, fastClick, ListenerSender,LangSel) {
                popupTools.deviceRoomAjaxHTML();
                fastClick.attach(document.body);
                var params = Oomi_command_function.create_new().resource_data();
                languageSwitcher(params['language']);
                function languageSwitcher(lang){
                    var scriptOBJ = selectLanguage2(lang);
                    $.getScript(scriptOBJ.url, function () {
                        var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                        runPlug(textsOBJ);
                    });
                }
                function runPlug(textsOBJ) {
                    var set = ListenerSender.setPlug.create_new(Param);
                    var powerIsOn = false;
                    var nodeID = Param.deviceId;
                    var textOn = textsOBJ.OnOffOn;
                    var textOff = textsOBJ.OnOffOff;
                    var plugStatus = $('.OnOffstatus');
                    var $c_el =  $('.OnOff_button');
                    var getPlugLockStatus = localStorage.getItem('isLocked'+nodeID);
                    plugStatus.text(textOn);
                    $('#Plug').click(function () {
                        if(getPlugLockStatus === 'true') {
                            return 1;
                        } else {
                            setPower();
                        }
                    });
                    function setPower(){
                        if(powerIsOn === true){
                            UISETFalse();
                            set.sendtoP2P("false");
                        }else if(powerIsOn === false ){
                            UISETTrue();
                            set.sendtoP2P("true");
                        }
                    }
                    function getPower(on_off){
                        if(on_off === false){
                            UISETFalse();
                        }else if( on_off === true){
                            UISETTrue();
                        }
                    }
                    function UISETFalse(){
                        $c_el.attr('stroke','#595758');
                        plugStatus.css('color','#AFAEAE');
                        plugStatus.text(textOff);
                        powerIsOn = false;
                    }
                    function UISETTrue(){
                        $c_el.attr('stroke','#D0672B');
                        plugStatus.css('color','#D0672B');
                        plugStatus.text(textOn);
                        powerIsOn = true;
                    }
                    set.Listener(setPower,getPower);
                }

            })
    }

    function RGB(Param,thismodel){
        requirejs.config({
            baseUrl: '../',
            paths: getPathForBulb(thismodel),
            shim:{
                'VueRouter':{
                    deps:['Vue'],
                    exports:'VueRouter'
                },
                'CSSPlugin':{
                    deps:['TweenLite'],
                    exports:'CSSPlugin'
                },
                'jquery_touchy':{
                    deps:['jquery'],
                    exports:'jquery_touchy'
                }
            }
        });
        function getPathForBulb(model) {
            var obj = {};
            if(model === 'PHILIPS02') {
                obj = {
                      jquery: 'libs/jquery-1.11.3',
                      fastClick: 'libs/fastclick2',
                      store:'libs/store',
                      OOMICommand: 'libs/Oomi-command',
                      OOMICommon:'libs/Oomi-common-min',
                      util:'desktop_widget/src/util',
                      TweenLite:'libs/TweenMax.min',
                      TimelineLite:'libs/TimelineMax.min',
                      CSSPlugin:'libs/CSSPlugin.min',
                      VueRouter:'libs/vue-router',
                      Vue:'libs/vue',
                      onOffButton:'desktop_widget/src/component/onOffButton',
                      BrightnessController:'desktop_widget/src/component/BrightnessController',
                      RGBRouting:'desktop_widget/src/component/RGBRoutingForHue',
                      solidCommon:'desktop_widget/src/component/solidCommon',
                      ChooseRGB:'desktop_widget/src/component/ChooseRGB',
                      RGBRainbow:'desktop_widget/src/component/RGBrainbow',
                      RGBrandom:'desktop_widget/src/component/RGBrandom',
                      jquery_touchy:'libs/jquery.touchy',
                      LangSel:'internationalization/LanguageSelector',
                      ListenerSender: 'deviceRoomWidget/JS/ListenerSender'
                  }
            } else {
                obj = {
                      jquery: 'libs/jquery-1.11.3',
                      fastClick: 'libs/fastclick2',
                      store:'libs/store',
                      OOMICommand: 'libs/Oomi-command',
                      OOMICommon:'libs/Oomi-common-min',
                      util:'desktop_widget/src/util',
                      TweenLite:'libs/TweenMax.min',
                      TimelineLite:'libs/TimelineMax.min',
                      CSSPlugin:'libs/CSSPlugin.min',
                      VueRouter:'libs/vue-router',
                      Vue:'libs/vue',
                      onOffButton:'desktop_widget/src/component/onOffButton',
                      BrightnessController:'desktop_widget/src/component/BrightnessController',
                      RGBRouting:'desktop_widget/src/component/RGBRouting',
                      solidCommon:'desktop_widget/src/component/solidCommon',
                      ChooseRGB:'desktop_widget/src/component/ChooseRGB',
                      RGBRainbow:'desktop_widget/src/component/RGBrainbow',
                      RGBrandom:'desktop_widget/src/component/RGBrandom',
                      RGBPattern: 'desktop_widget/src/component/RGBPattern',
                      jquery_touchy:'libs/jquery.touchy',
                      LangSel:'internationalization/LanguageSelector',
                      ListenerSender: 'deviceRoomWidget/JS/ListenerSender'
                  }
            }
            return obj;
        }
        requirejs(['jquery','Vue','util/popupTools','onOffButton','BrightnessController', 'RGBRouting','OOMICommand','store','LangSel','fastClick','ListenerSender'],
            function   ($,Vue,popupTools,onOffButton, BrightnessController  ,RGBRouting,OOMICommand,Store,LangSel,fastClick,ListenerSender) {
                popupTools.deviceRoomAjaxHTML();
                fastClick.attach(document.body);
                var params = Oomi_command_function.create_new().resource_data();
                var hasoperateID = (Param.hasOwnProperty('operateID') && Param['operateID'] !== undefined && Param['operateID'] !== null);
                var bus = new Vue();
                languageSwitcher(params['language']);
                function languageSwitcher(lang){
                    var scriptOBJ = selectLanguageForRoom(lang,'RGB');
                    $.getScript(scriptOBJ.url, function () {
                        var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                        if (hasoperateID){
                            getScenesData(textsOBJ);
                        }else {
                            getDeviceData(textsOBJ);
                        }
                    });
                }
                function sendCommand(value){
                    if(value === true){
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", 'true', "status"]);
                    }else{
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", 'false', "status"]);
                    }
                    if (hasoperateID){
                        if(value === true){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", 'true', "status",Param['operateID']]);
                        }else{
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", 'false', "status",Param['operateID']]);
                        }
                    }
                }
                function getDeviceData(textsOBJ) {
                    cordova.exec(function (data) {
                        var renderResult = true;
                        var val = 99;
                        var col = 'ffffff';
                        var stringifyData = JSON.stringify(data);
                        if(stringifyData.indexOf('status') != -1) {
                            popupTools.updateUI(data, 'status', function plugUpdate(result) {
                                if (result){
                                    if (result === 'true') {
                                        renderResult = true;
                                    } else if (result === 'false') {
                                        renderResult = false;
                                    } else if (result === false) {
                                        renderResult = false;
                                    } else if (result === true) {
                                        renderResult = true;
                                    } else {
                                        renderResult = true;
                                    }
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", renderResult, "status",Param['operateID']]);
                                    }
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", renderResult, "status",Param['operateID']]);
                            }
                        }
                        if(stringifyData.indexOf('brightness') != -1) {
                            popupTools.updateUI(data, 'brightness', function plugUpdate(result) {
                                if (result){
                                    val = Number(result);
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                                    }
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                            }
                        }
                        if(stringifyData.indexOf('mtLevel') != -1) {
                            popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                                if (result){
                                    val = Number(result);
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                                    }
                                }

                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                            }
                        }
                        if(stringifyData.indexOf('color') != -1) {
                            popupTools.updateUI(data, 'color', function plugUpdate(result) {
                                if (result){
                                    col = result;
                                    if (hasoperateID){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "rgbbulb01", col, "color",Param['operateID']]);
                                    }
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "rgbbulb01", col, "color",Param['operateID']]);
                            }
                        }
                        onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId'],bus);
                        BrightnessController.run(params['deviceId'],val,'deviceControl',Param['operateID'],bus);
                        RGBRouting.run(params['deviceId'],thismodel === 'FT121'?'widgetLedStrip':'RGB',textsOBJ,'deviceControl',col,Param['operateID'],bus,thismodel);
                    }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
                }
                function getScenesData(textsOBJ) {
                    cordova.exec(function (data) {
                        var renderResult = true;
                        var val = 99;
                        var col = 'ffffff';
                        if (popupTools.updateUI(data,'',null) === false){
                            getDeviceData(textsOBJ);
                            return 1;
                        }
                        popupTools.updateUI(data, 'status', function plugUpdate(result) {
                            if (result){
                                if (result === 'true') {
                                    renderResult = true;
                                } else if (result === 'false') {
                                    renderResult = false;
                                } else if (result === false) {
                                    renderResult = false;
                                } else if (result === true) {
                                    renderResult = true;
                                } else {
                                    renderResult = true;
                                }
                            }
                        });
                        popupTools.updateUI(data, 'brightness', function plugUpdate(result) {
                            if (result){val = Number(result);}
                        });
                        popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                            if (result){val = Number(result);}
                        });
                        popupTools.updateUI(data, 'color', function plugUpdate(result) {
                            if (result){col = result;}
                        });
                        onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId'],bus);
                        BrightnessController.run(params['deviceId'],val,'deviceControl',Param['operateID'],bus);
                        RGBRouting.run(params['deviceId'],params['widgetType'],textsOBJ,'deviceControl',col,Param['operateID'],bus);
                    }, null, "FTP2PApi", "querySceneActionStatus", [params['operateID'], "binsw01"]);
                }
                function listenValue(changeValue){
                    if (hasoperateID){
                        return 1;
                    }
                    window.addEventListener('ftdevicestatusupdate', function (data) {
                        if (params['deviceId'] === data.ID) {
                            if (data.title === "DeviceStatus") {
                                var result = JSON.parse(data.content);
                                for (var key in result) {
                                    if (key === "status") {
                                        var flag = String(result[key]);
                                        var lV = true;
                                        if (flag === 'true') {
                                            lV = true;
                                        } else if (flag === 'false') {
                                            lV = false;
                                        } else if (flag === true) {
                                            lV = true;
                                        } else if (flag === false) {
                                            lV = false;
                                        } else {
                                            lV = true;
                                        }
                                        if (changeValue) {
                                            changeValue(lV)
                                        }
                                    }
                                    if (key === "brightness") {
                                        var brightness = String(result[key]);
                                        if (Number(brightness)){
                                            if (Number(brightness) !== 0){
                                                if (changeValue) {
                                                    changeValue(true)
                                                }
                                            }
                                        }
                                    }
                                    if (key === "mtLevel") {
                                        var brightness2 = String(result[key]);
                                        if (Number(brightness2)){
                                            if (Number(brightness2) !== 0){
                                                if (changeValue) {
                                                    changeValue(true)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, false);
                }
            });
    }

    function Dimmer(Param,thismodel) {
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                store:'libs/store',
                OOMICommand: 'libs/Oomi-command',
                OOMICommon:'libs/Oomi-common-min',
                util:'desktop_widget/src/util',
                TweenLite:'libs/TweenMax.min',
                TimelineLite:'libs/TimelineMax.min',
                CSSPlugin:'libs/CSSPlugin.min',
                VueRouter:'libs/vue-router',
                Vue:'libs/vue',
                onOffButton:'desktop_widget/src/component/onOffButton',
                BrightnessController:'desktop_widget/src/component/BrightnessController4nonBulb',
                jquery_touchy:'libs/jquery.touchy',
                ListenerSender: 'deviceRoomWidget/JS/ListenerSender',
                LangSel:'internationalization/LanguageSelector'
            },
            shim:{
                'VueRouter':{
                    deps:['Vue'],
                    exports:'VueRouter'
                },
                'CSSPlugin':{
                    deps:['TweenLite'],
                    exports:'CSSPlugin'
                },
                'jquery_touchy':{
                    deps:['jquery'],
                    exports:'jquery_touchy'
                }
            }
        });
        requirejs(['jquery','Vue','onOffButton','BrightnessController','OOMICommand','util/popupTools','fastClick','store','ListenerSender'],
            function   ($,Vue,onOffButton, BrightnessController ,OOMICommand,popupTools,fastClick,Store,ListenerSender) {
                popupTools.deviceRoomAjaxHTML();
                fastClick.attach(document.body);
                var params = Oomi_command_function.create_new().resource_data();
                var hasoperateID = (Param.hasOwnProperty('operateID') && Param['operateID'] !== undefined && Param['operateID'] !== null);
                var bus = new Vue();
                function sendCommand(value){
                    if(value === true){
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", 'true', "status"]);
                    }else{
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", 'false', "status"]);
                    }
                    if (hasoperateID){
                        if(value === true){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", 'true', "status",Param['operateID']]);
                        }else{
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", 'false', "status",Param['operateID']]);
                        }
                    }
                }
                if (hasoperateID){
                    getScenesData();
                }else {
                    getDeviceData();
                }

                function getDeviceData(){
                    cordova.exec(function (data) {
                        var renderResult = true;
                        var val = 99;
                        var stringifyData = JSON.stringify(data);
                        if(stringifyData.indexOf('status') != -1) {
                            popupTools.updateUI(data, 'status', function plugUpdate(result) {
                                if (result){
                                    if (result === 'true') {
                                        renderResult = true;
                                    } else if (result === 'false') {
                                        renderResult = false;
                                    } else if (result === false) {
                                        renderResult = false;
                                    } else if (result === true) {
                                        renderResult = true;
                                    } else {
                                        renderResult = true;
                                    }
                                }
                                if (hasoperateID){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", renderResult, "status",Param['operateID']]);
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "binsw01", renderResult, "status",Param['operateID']]);
                            }
                        }
                        if(stringifyData.indexOf('brightness') != -1) {
                            popupTools.updateUI(data, 'brightness', function plugUpdate(result) {
                                if (result){
                                    val = Number(result);
                                }
                                if (hasoperateID){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                            }
                        }
                        if(stringifyData.indexOf('mtLevel') != -1) {
                            popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                                if (result){
                                    val = Number(result);
                                }
                                if (hasoperateID){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                                }
                            });
                        } else {
                            if (hasoperateID){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [params['deviceId'], "mlevel01", val, "mtLevel",Param['operateID']]);
                            }
                        }
                        onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId'],bus);
                        BrightnessController.run(params['deviceId'],val,Param['operateID'],bus);
                    }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
                }

                function getScenesData(){
                    cordova.exec(function (data) {
                        var renderResult = true;
                        var val = 99;
                        if (popupTools.updateUI(data,'',null) === false){
                            getDeviceData();
                            return 1;
                        }
                        popupTools.updateUI(data, 'status', function plugUpdate(result) {
                            if (result) {
                                if (result === 'true') {
                                    renderResult = true;
                                } else if (result === 'false') {
                                    renderResult = false;
                                } else if (result === false) {
                                    renderResult = false;
                                } else if (result === true) {
                                    renderResult = true;
                                } else {
                                    renderResult = true;
                                }
                            }
                        });
                        popupTools.updateUI(data, 'brightness', function plugUpdate(result) {
                            if (result) {val = Number(result);}
                        });
                        popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                            if (result) {val = Number(result);}
                        });
                        onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId'],bus);
                        BrightnessController.run(params['deviceId'],val,Param['operateID'],bus);
                    }, null, "FTP2PApi", "querySceneActionStatus", [params['operateID'], "binsw01"]);
                }

                function listenValue(changeValue){
                    if (hasoperateID){
                        return 1;
                    }
                    window.addEventListener('ftdevicestatusupdate', function (data) {
                        if (params['deviceId'] === data.ID) {
                            if (data.title === "DeviceStatus") {
                                var result = JSON.parse(data.content);
                                for (var key in result) {
                                    if (key === "status") {
                                        var flag = String(result[key]);
                                        var lV = true;
                                        if (flag === 'true') {
                                            lV = true;
                                        } else if (flag === 'false') {
                                            lV = false;
                                        } else if (flag === true) {
                                            lV = true;
                                        } else if (flag === false) {
                                            lV = false;
                                        } else {
                                            lV = true;
                                        }
                                        if (changeValue) {
                                            changeValue(lV)
                                        }
                                    }
                                    if (key === "brightness") {
                                        var brightness = String(result[key]);
                                        if (Number(brightness)){
                                            if (Number(brightness) !== 0){
                                                if (changeValue) {
                                                    changeValue(true)
                                                }
                                            }
                                        }
                                    }
                                    if (key === "mtLevel") {
                                        var brightness2 = String(result[key]);
                                        if (Number(brightness2)){
                                            if (Number(brightness2) !== 0){
                                                if (changeValue) {
                                                    changeValue(true)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, false);
                }
            });
    }

    function NewMotion(Param,thismodel){
        setSameConfig();
        requirejs(['jquery','OOMICommand','store','LangSel','fastClick','ListenerSender'],
            function($,OOMICommand,Store,LangSel,fastClick,ListenerSender) {
                var set = ListenerSender.setNewMotion.create_new(Param);
                set.languageSwitcher(Param.language, DW_animations, thismodel);
                set.motionListener(DW_animations);
                function DW_animations(value) {
                    if (value === true) {
                        if (thismodel === 'TPD32OC') {
                            $('#NewMotionValue').text(set.textsOBJ.DW_MotionYES);
                        } else if (thismodel === 'TPD32MO') {
                            $('#NewMotionValue').text(set.textsOBJ.NewMotionTrue);
                        } else if (thismodel === 'TPD32') {
                            $('#NewMotionValue').text(set.textsOBJ.DW_MotionYES);
                        } else if (thismodel === 'TPD07') {
                            $('#NewMotionValue').text(set.textsOBJ.DW_MotionYES);
                        } else if (thismodel === 'FT122') {
                            $('#NewMotionValue').text(set.textsOBJ.WS_MotionYES);
                        }

                    } else if (value === false) {
                        if (thismodel === 'TPD32OC') {
                            $('#NewMotionValue').text(set.textsOBJ.DW_MotionNO);
                        } else if (thismodel === 'TPD32MO') {
                            $('#NewMotionValue').text(set.textsOBJ.NewMotionFalse);
                        } else if (thismodel === 'TPD32') {
                            $('#NewMotionValue').text(set.textsOBJ.DW_MotionNO);
                        } else if (thismodel === 'TPD07') {
                            $('#NewMotionValue').text(set.textsOBJ.DW_MotionNO);
                        } else if (thismodel === 'FT122') {
                            $('#NewMotionValue').text(set.textsOBJ.WS_MotionNO);
                        }

                    }
                }
            })
    }

    function Doorlock(Param){
        setSameConfig();
        requirejs(['jquery','OOMICommand','store','LangSel','fastClick','ListenerSender'],
            function($,OOMICommand,Store,LangSel,fastClick,ListenerSender) {
                fastClick.attach(document.body);
                var params = Oomi_command_function.create_new().resource_data();
                languageSwitcher(params['language']);
                function languageSwitcher(lang){
                    var scriptOBJ = selectLanguage2(lang);
                    $.getScript(scriptOBJ.url, function () {
                        var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                        runDoorLock(textsOBJ);
                    });
                }
                function runDoorLock(textsOBJ) {
                    var set = ListenerSender.setDoorlock.create_new(Param);
                    var powerIsOn = false;
                    var textOn = textsOBJ.OnOffOn;
                    var textOff = textsOBJ.OnOffOff;
                    var plugStatus = $('.OnOffstatus');
                    var $c_el =  $('.OnOff_button');
                    plugStatus.text(textOn);
                    $('#Doorlock').click(function () {
                        setPower();
                    });
                    function setPower() {
                        if (powerIsOn === true) {
                            UISETFalse();
                            set.sendtoP2P("false");
                        } else if (powerIsOn === false) {
                            UISETTrue();
                            set.sendtoP2P("true");
                        }
                    }

                    function getPower(on_off) {
                        if (on_off === false) {
                            UISETFalse();
                        } else if (on_off === true) {
                            UISETTrue();
                        }
                    }

                    function UISETFalse() {
                        $c_el.attr('stroke','#595758');
                        plugStatus.css('color','#AFAEAE');
                        plugStatus.text(textOff);
                        powerIsOn = false;
                    }

                    function UISETTrue() {
                        $c_el.attr('stroke','#D0672B');
                        plugStatus.css('color','#D0672B');
                        plugStatus.text(textOn);
                        powerIsOn = true;
                    }
                    set.Listener(setPower, getPower);
                }
            })
    }

    function Siren(Param){
        var hasoperateID = (Param.hasOwnProperty('operateID') && Param['operateID'] !== undefined && Param['operateID'] !== null);
        if(!hasoperateID){
            return;
        }
        requirejs.config({
            baseUrl: '../',
            paths: {
                jquery: 'libs/jquery-1.11.3',
                fastClick: 'libs/fastclick2',
                OOMICommand: 'libs/Oomi-command',
                util:'desktop_widget/src/util',
                TweenLite:'libs/TweenMax.min',
                TimelineLite:'libs/TimelineMax.min',
                CSSPlugin:'libs/CSSPlugin.min',
                iscroll:'libs/iscroll',
                Vue:'libs/vue',
                LangSel:'internationalization/LanguageSelector'
            }
        });


        requirejs(['util/popupTools', 'jquery','fastClick','LangSel','TweenLite','CSSPlugin','iscroll','Vue'],main);
        function main(popupTools,     $,        fastClick,  LangSel,  TweenLite,  CSSPlugin,  iscroll,  Vue) {
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            var nodeID =  params['deviceId'];
            var operateID = Param['operateID'];
            var globalTextsOBJ = {};

            function languageSwitcher(lang){
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
                    setTimeout(function () {
                        cordova.exec(function (data) {
                            if (popupTools.updateUI(data,'',null) === false){
                                setTimeout(function () {
                                    cordova.exec(null, null, "FTP2PApi", "multiProSaveAction", [nodeID, "siren01", {'property':{"testmusic":'1', "testtime":'5',"testvolume":'5',"type":"instant"}},operateID]);
                                },1)
                            }
                            var volume = '6';
                            var sound = '0';
                            var length = '5';
                            popupTools.updateUI(data, 'testmusic', function plugUpdate(result) {
                                if(result){
                                    sound = result+'';
                                }
                            });
                            popupTools.updateUI(data, 'testvolume', function plugUpdate(result) {
                                if(result){
                                    volume = result+'';
                                }
                            });
                            popupTools.updateUI(data, 'testtime', function plugUpdate(result) {
                                if(result){
                                    length = result+'';
                                }
                            });
                            setTimeout(function () {
                                OomiRunpicker(sound,volume,length);
                            },10)
                        }, null, "FTP2PApi", "querySceneActionStatus", [Param['operateID'], "binsw01"]);
                    },10)
                });
            }
            document.addEventListener('deviceready', function () {
                languageSwitcher(params['language']);
                document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});
            }, false);

            function OomiRunpicker(sound,volume,length) {
                var thisComponent = {};
                var thisInterval = {'sound':null,'volume':null,'length':null};
                var myScroll = {sound:null,volume:null,length:null};
                var sendData = {sound:sound,volume:volume,length:length};
                var SoundDataShowMap = {'0':0, '1':1, '2':2, '3':3, '4':4 , '5':5};
                var VolumeDataShowMap = {'6':0,'5':0, '4':1, '3':1, '2':1, '1':2, '0':2};
                var LengthDataShowMap = {'5':0, '10':1, '15':2, '20':3, '30':'4','60':5,'120':6};
                var ShowData =     {sound:SoundDataShowMap[Number(sound)],volume:VolumeDataShowMap[Number(volume)],length:LengthDataShowMap[Number(length)]};
                Vue.component('sirenPicker', {
                    name:'sirenPicker',
                    template: '#_sirenPicker',
                    data:function thisData() {
                        return {
                            sound:{
                            pickerInfo:[{text:globalTextsOBJ.sirenS1,type:'val',command:'0',style:{top:'0'}},
                                        {text:globalTextsOBJ.sirenS2,type:'val',command:'1',style:{top:'16.667%'}},
                                        {text:globalTextsOBJ.sirenS3,type:'val',command:'2',style:{top:'33.334%'}},
                                        {text:globalTextsOBJ.sirenS4,type:'val',command:'3',style:{top:'50.001%'}},
                                        {text:globalTextsOBJ.sirenS5,type:'val',command:'4',style:{top:'66.667%'}},
                                        {text:globalTextsOBJ.sirenS6,type:'val',command:'5',style:{top:'83.334%'}}
                                        // {text:globalTextsOBJ.sirenS7,type:'val',command:7,style:{top:'75%'}},
                                        // {text:globalTextsOBJ.sirenS8,type:'val',command:8,style:{top:'87.5%'}}
                                        ],
                                pickerId:'sound',
                                style:{width:'33.333%',left:'0',height:'20%',top:'30%'},
                                title:globalTextsOBJ.sirenSound
                            },
                            volume:{
                                pickerInfo:[{text:globalTextsOBJ.sirenLow,       type:'val',command:'6',style:{top:'0'}},
                                            {text:globalTextsOBJ.sirenMedium,type:'val',command:'3',style:{top:'33.333%'}},
                                            {text:globalTextsOBJ.sirenHigh,type:'val',command:'0',style:{top:'66.666%'}}],
                                pickerId:'volume',
                                style:{width:'33.333%',left:'33.333%',height:'20%',top:'30%'},
                                title:globalTextsOBJ.sirenVolume
                            },
                            length:{
                                pickerInfo:[{text:5+globalTextsOBJ.sirenSec,type:'val',command:'5',style:{top:'0'}},
                                            {text:10+globalTextsOBJ.sirenSec,type:'val',command:'10',style:{top:'14.2857%'}},
                                            {text:15+globalTextsOBJ.sirenSec,type:'val',command:'15',style:{top:'28.5714%'}},
                                            {text:20+globalTextsOBJ.sirenSec,type:'val',command:'20',style:{top:'42.8571%'}},
                                            {text:30+globalTextsOBJ.sirenSec,type:'val',command:'30',style:{top:'57.1428%'}},
                                            {text:1+globalTextsOBJ.sirenMin,type:'val',command:'60',style:{top:'71.4285%'}},
                                            {text:2+globalTextsOBJ.sirenMin,type:'val',command:'120',style:{top:'85.7142%'}}],
                                pickerId:'length',
                                style:{width:'33.333%',left:'66.666%',height:'20%',top:'30%'},
                                title:globalTextsOBJ.sirenLength
                            },
                            test:globalTextsOBJ.test,
                            onOff:true
                        };
                    },
                    mounted:function(){
                        thisComponent = this;
                        setTimeout(function () {
                            thisComponent.picker(thisComponent.sound.pickerId);
                            thisComponent.picker(thisComponent.volume.pickerId);
                            thisComponent.picker(thisComponent.length.pickerId);
                        },10);

                    },
                    methods:{
                        picker:function pickerDouble(scrollEl){
                            var rootEl = {};
                            var els = {};
                            var scrollCellHolder = {};
                            initPosition();
                            function initPosition() {
                                var currentData = thisComponent[scrollEl].pickerInfo;
                                var length = currentData.length;
                                rootEl = $('#'+scrollEl);
                                scrollCellHolder = rootEl.find('.scrollCellHolder');
                                els = scrollCellHolder.find('.scrollCell');
                                scrollCellHolder.css('height',length*100+'%');
                                els.css('height',100/length+'%');
                                els.css('line-height',rootEl.height() + 'px');
                                newScroll();
                            }
                            function newScroll() {
                                myScroll[scrollEl] = new IScroll('#'+scrollEl, {
                                    scrollX: false,
                                    scrollY: true,
                                    momentum: true,
                                    snap: true,
                                    snapSpeed: 200,
                                    keyBindings: true,
                                    indicators: null
                                });
                                setTimeout(function () {
                                    myScroll[scrollEl].scrollTo(0,-rootEl.height()*ShowData[scrollEl]);
                                    thisComponent.effects(scrollEl,rootEl,scrollCellHolder,els);
                                },1);
                                myScroll[scrollEl].on('scrollCancel', function (e) {
                                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                                    clearInterval(thisInterval[scrollEl]);
                                }, false);
                                myScroll[scrollEl].on('scrollStart', function (e) {
                                    cordova.exec(null,null,"BasicFunction","requestDisallowIterceptTouchEvent",["true"]);
                                    thisInterval[scrollEl] = setInterval(function () {
                                        thisComponent.effects(scrollEl,rootEl,scrollCellHolder,els);
                                    },100);
                                }, false);
                                myScroll[scrollEl].on('scrollEnd',function (e) {
                                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                                    thisComponent.effects(scrollEl,rootEl,scrollCellHolder,els);
                                    clearInterval(thisInterval[scrollEl]);
                                    var scrollY = scrollCellHolder.css('transform').match(/\d+/g)[5];
                                    var pos = Math.round(scrollY / rootEl.height());
                                    sendData[scrollEl] = thisComponent[scrollEl]['pickerInfo'][pos]['command'];
                                    setTimeout(function () {
                                        thisComponent.send();
                                    },300);
                                }, false);
                            }
                        },
                        effects:function (scrollEl,rootEl,scrollCellHolder,els) {
                            var scrollY = scrollCellHolder.css('transform').match(/\d+/g)[5];
                            var slideY = Math.round(scrollY / rootEl.height());
                            TweenLite.to(els,            0.2, {css:{'font-size':'12px',color:'#9B9B9B'}});
                            TweenLite.to(els.eq(slideY), 0.2, {css:{'font-size':'18px',color:'#EC591A'}});
                        },
                        send:function () {
                            console.log(JSON.stringify(sendData));
                            setTimeout(function () {
                                cordova.exec(null, null, "FTP2PApi", "multiProSaveAction", [nodeID, "siren01", {'property':{"testmusic":sendData['sound'], "testtime":sendData['length'],"testvolume":sendData['volume'],"type":"instant"}},operateID]);
                            },10)
                        },
                        toggleClick:function () {
                            cordova.exec(null, null, "FTP2PApi", "deviceControlNew",       [nodeID,"siren01", {"testmusic":sendData['sound'], "testtime":sendData['length'],"testvolume":sendData['volume'],"type":"testinstant"}]);
                            $('.testButton').css('border-color','#EC591A');
                            setTimeout(function () {
                                $('.testButton').css('border-color','#9B9B9B');
                            },300);
                        }
                    }
                });
                var demo = new Vue({
                    el: '#Siren'
                });
            }
        }
    }

    function Cube(Param){
        setSameConfig();
        requirejs(['jquery','OOMICommand','store','LangSel','fastClick','ListenerSender'],
            function($,OOMICommand,Store,LangSel,fastClick,ListenerSender) {
                var set = ListenerSender.setCube.create_new(Param);
                //set.languageSwitcher(Param.language,motion,brightness);
                //set.CameraListener();
                set.multiListener(brightness, humidity, motion, temperatureValue, temperatureUnit, pm25, tvoc);
                var celsius = true;
                var celsius_temperature = 0;
                //$('#imageID').attr('src','http://192.168.43.1:1234/?action=stream');

                function brightness(value) {
                    var v = parseInt(value);
                    if (v > 40) {
                        $('#Brightnessvalue').text(set.textsOBJ.MULTI_CUBE_BRIGHTNESS_VALUE);
                    } else {
                        $('#Brightnessvalue').text(set.textsOBJ.MULTI_CUBE_BRIGHTNESS_VALUE_DARK);
                    }

                }

                function humidity(value) {
                    //$('#humidityvalue').text(value+'%');
                    $('#humidityvalue').text('--');
                    //todo
                }

                function motion(value) {
                    if (value == true) {
                        $('#Motionvalue').text(set.textsOBJ.MULTI_CUBE_MOTION_VALUE);
                    } else {
                        $('#Motionvalue').text(set.textsOBJ.MULTI_CUBE_MOTION_VALUE_NO);
                    }
                }

                function temperatureValue(value) {
                    var temperaturevalue = $('#temperatureValue');
                    celsius_temperature = value;
                    if (value <= -1000) {
                        temperaturevalue.text('--');
                        return 1;
                    }
                    if (celsius == true) {
                        value = Math.round(value);
                        temperaturevalue.text(value + '°C');
                    } else {
                        var tempV = (value * 1.8 + 32);
                        tempV = Math.round(tempV);
                        temperaturevalue.text(tempV + '°F');
                    }
                }

                function temperatureUnit(unit_Celsius) {
                    var temperaturevalue = $('#temperatureValue');
                    if (unit_Celsius == 'false' || unit_Celsius == 'true') {
                        if (unit_Celsius == 'false') {
                            temperaturevalue.text(celsius_temperature + '°C');
                            celsius = true;
                        } else {
                            temperaturevalue.text((celsius_temperature * 1.8 + 32).toFixed(1) + '°F');
                            celsius = false;
                        }
                    }
                }

                function pm25(qualityValue) {
                    var a = [15, 30, 35];
                    var el = $('#pm25Value');
                    AirRender(el, qualityValue, a);
                }

                function tvoc(qualityValue) {
                    var a = [40, 100, 200, 300];
                    var el = $('#tvocValue');
                    AirRender(el, qualityValue, a);
                }

                function AirRender(el, qualityValue, lep) {
                    var result = '', color = '';
                    if (qualityValue < 0) {
                        result = set.textsOBJ.AQ_NO_DEVICE;
                        //color = '#717071';
                    } else if (qualityValue <= lep[0]) {
                        result = set.textsOBJ.AQ_GOOD;
                        //color = '#85b12c';
                    } else if (qualityValue <= lep[1]) {
                        result = set.textsOBJ.AQ_OK;
                        //color = '#f8b62c';
                    } else if (qualityValue <= lep[2]) {
                        result = set.textsOBJ.AQ_Bad;
                        //color = '#f26f21';
                    } else if (qualityValue <= 999999) {
                        result = set.textsOBJ.AQ_VeryBad;
                        //color = '#574a3a';
                    } else {
                        result = set.textsOBJ.AQ_NO_DEVICE;
                    }
                    el.text(result);
                    //el.css({'color':color});
                }
            })
    }

    function Door_window(Param){
        setSameConfig();
        requirejs(['jquery','OOMICommand','store','LangSel','fastClick','ListenerSender'],
            function($,OOMICommand,Store,LangSel,fastClick,ListenerSender) {
                var set = ListenerSender.setDoor_window.create_new(Param);
                set.languageSwitcher(Param.language,DW_animations);
                set.doorListener(DW_animations,DW_battery);
                function DW_animations(value){
                    if(value == true){
                        $('#Door_window_Motion_value').text(set.textsOBJ.DW_MotionYES);
                    }else if(value == false){
                        $('#Door_window_Motion_value').text(set.textsOBJ.DW_MotionNO);
                    }
                }
                function DW_battery(value){
                    $('#Door_window_battery_value').text(value);
                }
            })
    }

    function MultisensorR(Param){
        setSameConfig();
        requirejs(['jquery','OOMICommand','store','LangSel','fastClick','ListenerSender'],
            function($,OOMICommand,Store,LangSel,fastClick,ListenerSender) {
                var set = ListenerSender.setMultisensorR.create_new(Param);
                set.languageSwitcher(Param.language, motion, brightness);
                set.multiListener(brightness, humidity, motion, temperatureValue, temperatureUnit);
                var celsius = true;
                var celsius_temperature = 0;

                function brightness(value) {
                    var v = parseInt(value);
                    if (v > 40) {
                        $('#multisensorBrightnessvalue').text(set.textsOBJ.MULTI_CUBE_BRIGHTNESS_VALUE);
                    } else {
                        $('#multisensorBrightnessvalue').text(set.textsOBJ.MULTI_CUBE_BRIGHTNESS_VALUE_DARK);
                    }

                }

                function humidity(value) {
                    //$('#humidityvalue').text(value+'%');
                    $('#humidityvalue').text('--');
                    //todo
                }

                function motion(value) {
                    if (value == true) {
                        $('#multisensorMotionvalue').text(set.textsOBJ.MULTI_CUBE_MOTION_VALUE);
                    } else {
                        $('#multisensorMotionvalue').text(set.textsOBJ.MULTI_CUBE_MOTION_VALUE_NO);
                    }
                }

                function temperatureValue(value) {
                    var temperaturevalue = $('#multisensortemperatureValue');
                    celsius_temperature = value;
                    if (celsius == true) {
                        temperaturevalue.text(value + '°C');
                    } else {
                        temperaturevalue.text(((value * 9 / 5 + 32) * 10 / 10.0).toFixed(1) + '°F');
                    }
                }

                function temperatureUnit(unit_Celsius) {
                    var temperaturevalue = $('#multisensortemperatureValue');
                    if (unit_Celsius == 'false' || unit_Celsius == 'true') {
                        if (unit_Celsius == 'false') {
                            temperaturevalue.text(celsius_temperature + '°C');
                            celsius = true;
                        } else {
                            temperaturevalue.text((celsius_temperature * 1.8 + 32).toFixed(1) + '°F');
                            celsius = false;
                        }
                    }
                }
            })
    }
})('');