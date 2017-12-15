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
            //processBar:'desktop_widget/src/component/processBar',
            fastclick:'libs/fastclick',
            Header:'desktop_widget/src/component/popupWidgetHeader',
            closeButton: 'desktop_widget/src/component/closeButton'
        },
        shim:{
            //'cordova_plugins':{
            //    deps:['cordova'],
            //    exports:'cordova_plugins'
            //}
        }
    });

    requirejs(['jquery', 'onOffButton','closeButton','OOMICommand','fastClick','util/popupTools','Header'],
        function   ($,onOffButton ,closeButton ,OOMICommand,fastClick,popupTools,Header) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                //toggle.run();
                Header.run(params['deviceId']);
                closeButton.run();
                getDeviceStatus();
            }, false);

            function sendCommand(value){
                    if(value == true){
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "dLock01", '0', "doorLock"]);
                    }else{
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [params['deviceId'], "dLock01", '255', "doorLock"]);
                    }
            }
            function getDeviceStatus(){
                getDeviceData();
                function getDeviceData() {
                    cordova.exec(function (data) {
                        var renderResult = true;
                        popupTools.updateUI(data, 'doorLock', function plugUpdate(result) {
                            if (result == '0') {
                                renderResult = true;
                            } else if (result == '255') {
                                renderResult = false;
                            } else if (result == 0) {
                                renderResult = true;
                            } else if (result == 255) {
                                renderResult = false;
                            } else {
                                renderResult = true;
                            }
                        });
                        onOffButton.run(sendCommand,renderResult,listenValue,params['deviceId']);
                    }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "dLock01"]);
                }
            }

            function listenValue(changeValue){
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (params['deviceId'] === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "doorLock") {
                                    var flag = String(result[key]);
                                    var lV = true;
                                    if (flag === '0') {
                                        lV = true;
                                    } else if (flag === '255') {
                                        lV = false;
                                    } else if (flag === 0) {
                                        lV = true;
                                    } else if (flag === 255) {
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