/*
 * Created By qkchung & Margaret on 2017/02/24
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        var params = Oomi_command_function.create_new().resource_data();
        obj.device = {
            deviceName: "",
            deviceRoom: "",
            deviceImg: getImageId(),
            deviceSign: "../assets/img/energy-red.svg",
            leafData: 1,
            percentageData: 100,
            status: {
                leaf: false,
                warn:false,
                percentage:false
            },
            OnOff:true
        };
        function getImageId(){
            var a = '';
            switch (params['model'].split('-')[0]){
                case 'FT153':a='WSone';break;
                case 'FT156':a='WSone';break;
                case 'FT157':a='WSDual';break;
                case 'FT154':a='WSDual'; break;
                case 'FT155':a='WSfour'; break;
                case 'FT116':a='inwallSwitch';break;
                case 'FT139':a='inwallSwitch';break;
                case 'FT132':a='inwallSwitch';break;
                case 'FT140':a='inwallSwitch';break;
            }
            return a;
        }
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
        obj.getDeviceStatus = function(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,percentageColor){
            getDeviceData();
            getDeviceName();
            function getDeviceName() {
                cordova.exec(function(data){
                    var myData = JSON.parse(data);
                    setDeviceName(myData['value']);
                    setDeviceRoom(myData['roomName']);
                }, null, "FTP2PApi", "getDeviceName", [nodeid])
            }
            function getDeviceData() {
                cordova.exec(function (data) {
                    popupTools.updateUI(data, 'status', function plugUpdate(result) {
                        if (result === 'true') {
                            setStatus(true);
                        } else if (result === 'false') {
                            setStatus(false);
                        } else if (result === false) {
                            setStatus(false);
                        } else if (result === true) {
                            setStatus(true);
                        }else if(result === null){
                            setStatus(true);
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", 'true', "status"]);
                        }else{
                            setStatus(true);
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", 'true', "status"]);
                        }
                    });
                }, null, "FTP2PApi", "getDeviceStatus", [nodeid, "binsw01"]);
            }
        };
        obj.listener = function (nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,setPercentageValue,shakeThis,percentageColor,changeIcon) {
            obj.getDeviceStatus(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue);
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
                    if(data.content === 'true'){
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
                        var result2 = data.status;
                        setTimeout(function () {
                            if(result2 === ""){
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
                                }
                            }
                        },20)
                    }
                }
            }, false);
        };
        return obj;
    });
