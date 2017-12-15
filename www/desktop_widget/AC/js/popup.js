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
            OOMICommon: 'libs/Oomi-common-min',
            OOMICommand: 'libs/Oomi-command',
            fastClick: 'libs/fastclick2',
            store:'libs/store',
            util:'desktop_widget/src/util',
            TweenLite:'libs/TweenMax.min',
            TimelineLite:'libs/TimelineMax.min',
            AttrPlugin:'libs/AttrPlugin.min',
            Vue:'libs/vue',
            onOffButton:'desktop_widget/src/component/onOffButton',
            fastclick:'libs/fastclick',
            Header:'desktop_widget/src/component/popupWidgetHeader',
            closeButton: 'desktop_widget/src/component/closeButton',
            ac: 'desktop_widget/src/component/ACMode',
            LangSel:'internationalization/LanguageSelector'
        }
    });

    requirejs(['jquery','onOffButton','closeButton','ac','OOMICommand','fastClick','util/popupTools','Header','LangSel'],
        function   ($,onOffButton ,closeButton,ac ,OOMICommand,fastClick,popupTools,Header,LangSel) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                languageSwitcher(params.language);
            }, false);
            function languageSwitcher(lang){
                var scriptOBJ = selectLanguage(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    Header.run(params['deviceId']);
                    closeButton.run();
                    getDeviceStatus(textsOBJ);
                });
            }
            function sendCommand(value){
                cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", value, "status"]);
            }
            function getDeviceStatus(textsOBJ){
                cordova.exec(function (data) {
                    console.log(JSON.stringify(data));
                    var renderResult = true;
                    var modeResult = [];
                    popupTools.updateUI(data, 'modes', function plugUpdate(result) {
                        modeResult = result;
                    });
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
                    onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId']);
                    ac.run(params['deviceId'],textsOBJ,modeResult);
                }, null, "FTP2PApi", "getOldACStatus", [params['deviceId'], "binsw01"]);
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
                            }
                        }
                    }
                }, false);
            }
        });
})('');