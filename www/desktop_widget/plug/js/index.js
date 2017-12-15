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
            deviceImg: getImageId(),
            deviceSign: "../assets/img/energy-red.svg",
            leafData: 1,
            percentageData: 100,
            status: {
                leaf: true,
                warn:false,
                percentage:false
            },
            OnOff:true
        };
        function getImageId(){
            var params = Oomi_command_function.create_new().resource_data();
            var IdNimgName = {
                '0':'plug',
                '1':'plugs_fanner',
                '2':'plugs_heater',
                '3':'plugs_desklamp',
                '4':'plugs_air_conditioner',
                '5':'plugs_speaker',
                '6':'plugs_television'
            };
            var thisPlug = IdNimgName[params['iconId']+'']?IdNimgName[params['iconId']]:IdNimgName[0];
                thisPlug = thisPlug+'';
            return thisPlug;
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
            // 当初次入网时，若检测到有lock status的缓存时，清空缓存
            function detectFirstNetIn(res) {
                var getLockedStatus = localStorage.getItem('isLocked'+nodeid);
                if(res.indexOf('status') < 0 && getLockedStatus) {
                    localStorage.removeItem('isLocked'+nodeid);
                }
            }
            function getDeviceData() {
                cordova.exec(function (data) {
                    detectFirstNetIn(JSON.stringify(data));
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
                    popupTools.updateUI(data, 'powerRate', function plugUpdate(result) {
                        if(result == null){
                            return 1;
                        }
                        var thisRe = Number(result).toFixed(1);
                        setLeafValue(thisRe);
                    })
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
                            console.log('name_'+ JSON.stringify(myData));
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
                    //console.log(JSON.stringify(data));
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
                    if (data.title === "changeIcon") {
                        var iconId = data.content+'';
                        var IdNimgName = {
                            '0':'plug',
                            '1':'plugs_fanner',
                            '2':'plugs_heater',
                            '3':'plugs_desklamp',
                            '4':'plugs_air_conditioner',
                            '5':'plugs_speaker',
                            '6':'plugs_television'
                        };
                        var thisPlug = IdNimgName[iconId+'']?IdNimgName[iconId+'']:IdNimgName[0];
                        if (changeIcon) {
                            changeIcon(thisPlug);
                        }
                    }
                    if (nodeid == data.ID) {
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
                                if (key === "powerRate") {
                                    var level = String(result[key]);
                                    level = Number(level).toFixed(1);
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
