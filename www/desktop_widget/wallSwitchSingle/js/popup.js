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
            closeButton: 'desktop_widget/src/component/closeButton'
        },
        shim:{
            //'cordova_plugins':{
            //    deps:['cordova'],
            //    exports:'cordova_plugins'
            //}
        }
    });

    requirejs(['onOffButton','closeButton','processBar','OOMICommand','fastClick','util/popupTools','Header','toggle'],
        function   (onOffButton ,closeButton,processBar ,OOMICommand,fastClick,popupTools,Header,toggle) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                Header.run(params['deviceId']);
                closeButton.run();
                getMultiResDeviceStatus();
            }, false);

            function sendCommand(value){
                cordova.exec(null, null, "FTP2PApi", "resourceControl", [params['relationID'], value, "status"]);
            }
            function getMultiResDeviceStatus() {
                cordova.exec(function (RawResult) {
                    var result = stringToJson(RawResult);
                    var result1 = result['value'];
                    setTimeout(function () {
                        var re = true;
                        if (result1['value']){
                            var tempRe = result1['value']['status'];
                            if (tempRe === 'true') {
                                re = true;
                            } else if (tempRe === 'false') {
                                re = false;
                            } else if (tempRe === false) {
                                re = false;
                            } else if (tempRe === true) {
                                re = true;
                            }
                        }
                        onOffButton.run(sendCommand,re,listenValue,params['deviceId']);
                    },1);
                    function stringToJson(data) {
                        var str1 = data.replace('\"[', '[');
                        var str2 = str1.replace(']\"', ']');
                        var str3 = str2.replace('"{', '{');
                        var str4 = str3.replace('"{', '{');
                        var str5 = str4.replace('}"', '}');
                        result = str5.replace('}"', '}');
                        result = result.replace('\\', '');
                        result = result.replace('\\', '');
                        result = result.replace('\\', '');
                        result = result.replace('\\', '');
                        return JSON.parse(result);
                    }
                }, null, "FTP2PApi", "getResourceStatus", [params['relationID']],'binsw01');
            }
            function listenValue(changeValue){
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (params['deviceId'] === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            var result2 = data.status;
                            setTimeout(function () {
                                if(result2===params['relationID']){
                                    for (var key in result) {
                                        if (key === "status") {
                                            var flag = String(result[key]);
                                            if (flag === 'true') {
                                                if (changeValue) {
                                                    changeValue(true)
                                                }
                                            } else if (flag === 'false') {
                                                if (changeValue) {
                                                    changeValue(false)
                                                }
                                            } else if (flag === true) {
                                                if (changeValue) {
                                                    changeValue(true)
                                                }
                                            } else if (flag === false) {
                                                if (changeValue) {
                                                    changeValue(false)
                                                }
                                            }
                                        }
                                    }
                                }
                            },20)
                        }
                    }
                }, false);
            }
            function listenLevel(changeValue){
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (params['deviceId'] === data.ID) {
                        // if (data.title === "DeviceStatus") {
                        //     var result = JSON.parse(data.content);
                        //     for (var key in result) {
                        //         if (key === "powerRate") {
                        //             var level = Number(result[key]).toFixed(1);
                        //             changeValue(level);
                        //         }
                        //     }
                        // }
                    }
                }, false);
            }
        });
})('');