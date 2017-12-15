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
            Vue:'libs/vue',
            onOffButton:'desktop_widget/src/component/onOffButton',
            processBar:'desktop_widget/src/component/processBar',
            fastclick:'libs/fastclick',
            Header:'desktop_widget/src/component/popupWidgetHeader',
            toggle:'desktop_widget/src/component/toggleButton',
            closeButton: 'desktop_widget/src/component/closeButton',
            onOffLock: 'desktop_widget/src/component/onOffLock'
        },
        shim:{
            //'cordova_plugins':{
            //    deps:['cordova'],
            //    exports:'cordova_plugins'
            //}
        }
    });

    requirejs(['onOffButton','closeButton','onOffLock','processBar','OOMICommand','fastClick','util/popupTools','Header','toggle'],
        function   (onOffButton ,closeButton,onOffLock,processBar ,OOMICommand,fastClick,popupTools,Header,toggle) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                //toggle.run();
                Header.run(params['deviceId']);
                closeButton.run();
                onOffLock.run(params['deviceId']);
                getDeviceStatus();
            }, false);

            function sendCommand(value){
                    cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "binsw01", value, "status"]);
            }
            function getDeviceStatus(){
                getDeviceData();
                function getDeviceData() {
                        cordova.exec(function (data) {
                            var powerRate = 0;
                            var renderResult = true;
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
                            popupTools.updateUI(data, 'powerRate', function plugUpdate(result) {
                                if(result){
                                    powerRate = Number(result).toFixed(1);
                                }
                            });
                            onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId']);
                            processBar.run(powerRate,listenLevel,params['language']);
                        }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
                }
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
            function listenLevel(changeValue){
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (params['deviceId'] === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "powerRate") {
                                    var level = Number(result[key]).toFixed(1);
                                    changeValue(level);
                                }
                            }
                        }
                    }
                }, false);
            }
        });
})('');