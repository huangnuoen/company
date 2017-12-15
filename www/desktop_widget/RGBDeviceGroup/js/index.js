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
            deviceImg: "allLamps",
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
                    cordova.exec(null, null, "FTP2PApi", "deviceGroupControl", [groupID, "binsw01", 'true', "status"]);
                }else{
                    cordova.exec(null, null, "FTP2PApi", "deviceGroupControl", [groupID, "binsw01", 'false', "status"]);
                }
        };
        obj.getDeviceStatus = function(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis,Color){
            getDeviceData();
            getDeviceName();
            function getDeviceName(){
                cordova.exec(function (data) {
                    var myData = JSON.parse(data);
                    setDeviceName(myData['devGroupName']);
                    setDeviceRoom(myData['devGroupRoomName']);
                }, null, "FTP2PApi", "editGroupDetails", [groupID]);
            }
            function getDeviceData() {
                cordova.exec(function (data) {
                    updateUI(data, 'brightness', function plugUpdate(result) {
                        if(result == null){
                            cordova.exec(null,null,"FTP2PApi",'deviceGroupControl',[nodeid,"mlevel01",'99',"mtLevel"]);
                        }else{
                            percentageColor(Number(result))
                        }
                    });
                    updateUI(data, 'mtLevel', function plugUpdate(result) {
                        if(result == null){
                            cordova.exec(null,null,"FTP2PApi",'deviceGroupControl',[nodeid,"mlevel01",'99',"mtLevel"]);
                        }else{
                            percentageColor(Number(result))
                        }
                    });
                    updateUI(data, 'status', function plugUpdate(result) {
                        if (result == 'true') {
                            setStatus(true);
                        } else if (result == 'false') {
                            setStatus(false);
                        } else if (result == false) {
                            setStatus(false);
                        } else if (result == true) {
                            setStatus(true);
                        } else if(result == null){
                            setStatus(true);
                            cordova.exec(null, null, "FTP2PApi", "deviceGroupControl", [nodeid, "binsw01", 'true', "status"]);
                        }else{
                            setStatus(true);
                            cordova.exec(null, null, "FTP2PApi", "deviceGroupControl", [nodeid, "binsw01", 'true', "status"]);
                        }
                    });
                    updateUI(data, 'color', function plugUpdate(result) {
                        if(result == null){
                            cordova.exec(null,null,"FTP2PApi",'deviceGroupControl',[nodeid,"rgbbulb01",'warmWhite',"color"]);
                        }else{
                            Color(result);
                        }
                    });
                }, null, "FTP2PApi", "getDeviceStatus", [groupID, "binsw01"]);
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
        obj.listener = function (nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis,Color) {
            obj.getDeviceStatus(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis,Color);
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "reEditGroupDetails") {
                    cordova.exec(function (data) {
                        var myData = JSON.parse(data);
                        setDeviceName(myData['devGroupName']);
                        setDeviceRoom(myData['devGroupRoomName']);
                    }, null, "FTP2PApi", "editGroupDetails", [groupID]);
                }
                if (data.title === "changeRoomName") {
                    cordova.exec(function (data) {
                        var myData = JSON.parse(data);
                        setDeviceName(myData['devGroupName']);
                        setDeviceRoom(myData['devGroupRoomName']);
                    }, null, "FTP2PApi", "editGroupDetails", [groupID]);
                }
                if (data.title === "widgetShake") {
                    if(data.content == 'true'){
                        shakeThis(true)
                    }else{
                        shakeThis(false)
                    }
                }
                if (groupID === data.ID) {
                    if(data.title === "changeRoomName") {
                        setDeviceRoom(data.content);
                    }
                    if (groupID == data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "brightness") {
                                    var brightness = String(result[key]);
                                    percentageColor(brightness);
                                }
                                if (key === "color") {
                                    var c = String(result[key]);
                                    Color(c);
                                }
                                if (key === "mtLevel") {
                                    var brightness2 = String(result[key]);
                                    percentageColor(brightness2);
                                }
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
                            }
                        }
                    }
                }
            }, false);
        };
        return obj;
    });
