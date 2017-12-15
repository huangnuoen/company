/**
 * Created by qkchung on 17/2/25.
 */

(function() {
    function getCurrentFileName(){
        var CurrentUrl = window.document.location.pathname;
        var files = CurrentUrl.split('/');
        return files[files.length - 2];
    }
    requirejs.config({
        baseUrl: '../../',

        paths: {
            jquery: 'libs/jquery-1.11.3',
            fastClick: 'libs/fastclick2',
            store:'libs/store',
            OOMICommand: 'libs/Oomi-command',
            util:'desktop_widget/src/util',
            TweenLite:'libs/TweenMax.min',
            TimelineLite:'libs/TimelineMax.min',
            CSSPlugin:'libs/CSSPlugin.min',
            VueRouter:'libs/vue-router',
            Vue:'libs/vue',
            Header:      'desktop_widget/src/component/popupWidgetHeader',
            onOffButton:'desktop_widget/src/component/onOffButton',
            BrightnessController:'desktop_widget/src/component/BrightnessController',
            RGBRouting:'desktop_widget/src/component/RGBRouting',
            solidCommon:'desktop_widget/src/component/solidCommon',
            ChooseRGB:'desktop_widget/src/component/ChooseRGB',
            RGBRainbow:'desktop_widget/src/component/RGBrainbow',
            RGBrandom:'desktop_widget/src/component/RGBrandom',
            closeButton: 'desktop_widget/src/component/closeButton',
            RGBPattern: 'desktop_widget/src/component/RGBPattern',
            jquery_touchy:'libs/jquery.touchy',
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
// Start the main app logic.
    requirejs(['jquery','closeButton','Header','onOffButton','BrightnessController', 'RGBRouting','OOMICommand','util/popupTools','fastClick','store','LangSel','Vue'],
        function   ($,closeButton,Header,onOffButton, BrightnessController  ,RGBRouting,OOMICommand,popupTools,fastClick,Store,LangSel,Vue) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            function test(textsOBJ){
                Header.run(params['deviceId']);
                closeButton.run();
                getDeviceData(textsOBJ);
              onOffButton.run(sendCommand,true,listenValue,params['deviceId'],new Vue());
              BrightnessController.run(params['deviceId'],10,'deviceControl');
              RGBRouting.run(params['deviceId'],params['widgetType'],textsOBJ,'deviceControl','ffffff',null,new Vue(),params['model']);
            }

            document.addEventListener('deviceready', function () {

                languageSwitcher(params['language']);

            }, false);
            function languageSwitcher(lang){
                var scriptOBJ = selectLanguage(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    test(textsOBJ);
                });
            }
            function sendCommand(value){
                    if(value == true){
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", 'true', "status"]);
                    }else{
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", 'false', "status"]);
                    }
            }
                function getDeviceData(textsOBJ) {
                        cordova.exec(function (data) {
                            var renderResult = true;
                            var val = 99;
                            var col = 'ffffff';
                            var bus = new Vue();
                            popupTools.updateUI(data, 'status', function plugUpdate(result) {
                                if (result == 'true') {
                                    renderResult = true;
                                } else if (result == 'false') {
                                    renderResult = false;
                                } else if (result == false) {
                                    renderResult = false;
                                } else if (result == true) {
                                    renderResult = true;
                                } else {
                                    renderResult = true;
                                }
                            });
                            popupTools.updateUI(data, 'brightness', function plugUpdate(result) {
                                val = Number(result);
                            });
                            popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                                val = Number(result);
                            });
                            popupTools.updateUI(data, 'color', function plugUpdate(result) {
                                col = result;
                            });
                            onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId'],bus);
                            BrightnessController.run(params['deviceId'],val,'deviceControl');
                            RGBRouting.run(params['deviceId'],params['widgetType'],textsOBJ,'deviceControl',col,null,bus,params['model']);
                        }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
                }

            function listenValue(changeValue){
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
                                        } else {
                                            if (changeValue) {
                                                changeValue(false)
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
                                        }else {
                                            if (changeValue) {
                                                changeValue(false)
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
})('');