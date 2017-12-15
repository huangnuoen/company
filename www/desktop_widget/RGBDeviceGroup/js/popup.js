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
            Header:      'desktop_widget/src/component/popupWidgetHeader4Group',
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
    requirejs(['jquery','closeButton','Header','onOffButton','BrightnessController', 'RGBRouting','OOMICommand','util/popupTools','fastClick','store','LangSel'],
        function   ($,closeButton,Header,onOffButton, BrightnessController  ,RGBRouting,OOMICommand,popupTools,fastClick,Store,LangSel) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            function test(textsOBJ){
                Header.run(params['operationtype'],textsOBJ);
                closeButton.run();
                getDeviceData(textsOBJ);
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
                    cordova.exec(null, null, "FTP2PApi", "deviceGroupControl", [params['operationtype'], "binsw01", value, "status"]);
            }
            function getDeviceData(textsOBJ) {
                    cordova.exec(function (data) {
                        var renderResult = true;
                        var val = 99;
                        var col = 'ffffff';
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
                        onOffButton.run(sendCommand,renderResult,listenValue,params['operationtype']);
                        BrightnessController.run(params['operationtype'],val,'deviceGroupControl');
                        RGBRouting.run(params['operationtype'],params['widgetType'],textsOBJ,'deviceGroupControl',col);
                    }, null, "FTP2PApi", "getDeviceStatus", [params['operationtype'], "binsw01"]);
            }

            function listenValue(changeValue){
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (params['operationtype'] === data.ID) {
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
})('');