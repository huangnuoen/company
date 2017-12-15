/*
 * Created By qkchung & Margaret on 2017/02/24
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        obj.device = {
            deviceName: "",
            deviceRoom: "",
            deviceImg: "allPlugs",
            deviceSign: "../assets/img/energy-red.svg",
            leafData: 1,
            percentageData: 0,
            status: {
                leaf: false,
                warn:false,
                percentage:false
            },
            OnOff:true
        };
        obj.getParams = function () {
            return  Oomi_command_function.create_new().resource_data();
        };
        var oomiParams = obj.getParams();
        var groupID = oomiParams['operationtype'];
        obj.sendCommand = function (nodeid,code) {
                if(code == true){
                    cordova.exec(null, null, "FTP2PApi", "deviceControl", [groupID, "binsw01", 'true', "status"]);
                }else{
                    cordova.exec(null, null, "FTP2PApi", "deviceControl", [groupID, "binsw01", 'false', "status"]);
                }
        };
        obj.getDeviceStatus = function(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor){
            getDeviceData();
            getDeviceName();
            function getDeviceName() {
                setDeviceName(oomiParams['deviceName']);
                setDeviceRoom(oomiParams['roomName']);
            }
            function getDeviceData() {
                cordova.exec(function (data) {
                    updateUI(data, 'status', function plugUpdate(result) {
                        if (result == 'true') {
                            setStatus(true);
                        } else if (result == 'false') {
                            setStatus(false);
                        } else if (result == false) {
                            setStatus(false);
                        } else if (result == true) {
                            setStatus(true);
                        }
                    });
                    updateUI(data, 'powerRate', function plugUpdate(result) {
                        result = Number(result);
                        setLeafValue(result);
                    })
                }, null, "FTP2PApi", "getDeviceStatus", [groupID, "binsw01"]);
                cordova.exec(function (data) {
                    popupTools.updateUI(data, 'powerRate', function plugUpdate(result) {
                        var tResult = Number(result).toFixed(1);
                        processBar.run(tResult,listenLevel);
                    })
                }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "prmeter01"]);
            }

            function updateUI(data, find, fun) {
                var obj = stringToJson(data);
                var arry = obj.value;
                if (arry.length > 0) {
                    for (var i in arry) {
                        if (typeof arry[i] == 'object') {
                            for (var j in arry[i]) {
                                if (j == find) {
                                    fun(arry[i][j]);
                                }
                            }
                        }
                    }
                }
                function stringToJson(data) {
                    var result = '';
                    if (data.indexOf('\"[') > 0 || data.indexOf(']\"') > 0) {
                        var str3 = data.replace('\"[', '[');
                        result = str3.replace(']\"', ']');
                    }
                    return JSON.parse(result);
                }
            }
        };
        obj.listener = function (nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis) {
            obj.getDeviceStatus(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue);
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "changeRoomName") {
                    getDeviceName2();
                    function getDeviceName2() {
                        cordova.exec(function(data){
                            var myData = JSON.parse(data);
                            setDeviceName(myData['value']);
                            setDeviceRoom(myData['roomName']);
                        }, null, "FTP2PApi", "getDeviceName", [groupID])
                    }
                }
                if (data.title === "widgetShake") {
                    if(data.content == 'true'){
                        shakeThis(true)
                    }else{
                        shakeThis(false)
                    }
                }
                if (groupID === data.ID) {
                    if (data.title === "changeName") {
                        if (setDeviceName) {
                            setDeviceName(data.content);
                        }
                    }
                    if (data.title === "changeRoom") {
                        if (setDeviceRoom) {
                            setDeviceRoom(data.content);
                        }
                    }
                    if (groupID == data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "status") {
                                    var flag = String(result[key]);
                                    if (flag === 'true') {
                                        if (setStatus) {
                                            setStatus(true)
                                        }
                                    } else if (flag === 'false') {
                                        if (setStatus) {
                                            setStatus(false)
                                        }
                                    } else if (flag === true) {
                                        if (setStatus) {
                                            setStatus(true)
                                        }
                                    } else if (flag === false) {
                                        if (setStatus) {
                                            setStatus(false)
                                        }
                                    }
                                }
                                if (key === "energy") {
                                    var level = String(result[key]);
                                    level = Number(level);
                                    setLeafValue(level);
                                }
                            }
                        }
                    }
                }
            }, false);
        };
        return obj;
    });
