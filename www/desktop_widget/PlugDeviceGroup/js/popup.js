/**
 * Created by qkchung on 17/2/25.
 */
(function() {
    function getCurrentFileName(){
        var CurrentUrl = window.document.location.pathname
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
            Vue:'libs/vue',
            onOffButton:'desktop_widget/src/component/onOffButton',
            fastclick:'libs/fastclick',
            Header:'desktop_widget/src/component/popupWidgetHeader4Group',
            closeButton: 'desktop_widget/src/component/closeButton',
            LangSel:'internationalization/LanguageSelector'
        },
        shim:{
            //'cordova_plugins':{
            //    deps:['cordova'],
            //    exports:'cordova_plugins'
            //}
        }
    });

    requirejs(['jquery','onOffButton','closeButton','OOMICommand','fastClick','util/popupTools','Header','LangSel'],
        function   ($, onOffButton ,closeButton ,OOMICommand,fastClick,popupTools,Header,LangSel) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            function test(textsOBJ){
                Header.run(params['operationtype'],textsOBJ);
                closeButton.run();
                getDeviceStatus();
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
                popupTools.loadCordova(function () {
                    Cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['operationtype'], "binsw01", value, "status"]);
                });
            }
            function getDeviceStatus(){
                getDeviceData();
                function getDeviceData() {
                    popupTools.loadCordova(function () {
                        Cordova.exec(function (data) {
                            console.log(data);
                            popupTools.updateUI(data, 'status', function plugUpdate(result) {
                                var renderResult = null;
                                if (result == 'true') {
                                    renderResult = true;
                                } else if (result == 'false') {
                                    renderResult = false;
                                } else if (result == false) {
                                    renderResult = false;
                                } else if (result == true) {
                                    renderResult = true;
                                }
                                onOffButton.run(sendCommand,renderResult,listenValue);
                            });
                        }, null, "FTP2PApi", "getDeviceStatus", [params['operationtype'], "binsw01"]);
                    });
                }
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
            function listenLevel(changeValue){
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (params['operationtype'] === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "energy") {
                                    var level = String(result[key]);
                                    changeValue(level);
                                }
                            }
                        }
                    }
                }, false);
            }
        });
})('');