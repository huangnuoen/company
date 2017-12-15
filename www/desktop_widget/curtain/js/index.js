/**
 * Created by qkchung on 2017/8/22.
 */

define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        obj.device = {
            deviceName: "",
            deviceRoom: "",
            deviceImg: "curtain",
            deviceSign: "../assets/img/energy-red.svg",
            leafData: 1,
            percentageData: 100,
            status: {
                leaf: false,
                warn:false,
                percentage:true
            },
            OnOff:true
        };
        obj.sendCommand = function (nodeid,code) {
            if(code == true){
                cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", 'true', "status"]);
            }else{
                cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", 'false', "status"]);
            }
        };
        obj.getParams = function () {
            return  Oomi_command_function.create_new().resource_data();
        };
        obj.getDeviceStatus = function(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis){
            getDeviceData();
            getDeviceName();
            function getDeviceName(){
                cordova.exec(function (data) {
                    var myData = JSON.parse(data);
                    setDeviceName(myData['value']);
                    setDeviceRoom(myData['roomName']);
                }, null, "FTP2PApi", "getDeviceName", [nodeid]);
            }
            function getDeviceData() {
                cordova.exec(function (data) {
                    popupTools.updateUI(data, 'status', function plugUpdate(result) {
                        if (result == 'true') {
                            setStatus(true);
                        } else if (result == 'false') {
                            setStatus(false);
                        } else if (result == false) {
                            setStatus(false);
                        } else if (result == true) {
                            setStatus(true);
                        }else if(result == null){
                            setStatus(true);
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", 'true', "status"]);
                        }else{
                            setStatus(true);
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", 'true', "status"]);
                        }
                    });
                    popupTools.updateUI(data, 'mtLevel', function curtainUpdate(result) {
                        if(result == null){
                            cordova.exec(null,null,"FTP2PApi",'deviceControl',[nodeid,"mlevel01",'99',"mtLevel"]);
                        }else{
                            percentageColor(Number(result))
                        }
                    });
                }, null, "FTP2PApi", "getDeviceStatus", [nodeid, "binsw01"]);
            }


        };
        obj.listener = function (nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis) {
            obj.getDeviceStatus(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor,shakeThis);
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "changeRoomName") {
                    getDeviceName2();
                    function getDeviceName2() {
                        cordova.exec(function(data){
                            var myData = JSON.parse(data);
                            setDeviceName(myData['value']);
                            setDeviceRoom(myData['roomName']);
                        }, null, "FTP2PApi", "getDeviceName", [nodeid])
                    }
                }
                if (data.title === "widgetShake") {
                    if(data.content == 'true'){
                        shakeThis(true)
                    }else{
                        shakeThis(false)
                    }
                }
                if (nodeid === data.ID) {
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
                            if (key === "mtLevel") {
                                var brightness2 = String(result[key]);
                                percentageColor(brightness2);
                                if (Number(brightness2) !== 0){
                                    setStatus(true);
                                } else {
                                    setStatus(false);
                                }
                            }
                        }
                    }
                }
            }, false);
        };
        return obj;
    });
