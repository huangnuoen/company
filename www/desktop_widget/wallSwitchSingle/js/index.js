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
            var model = params['model'].split('-')[0];
            var posi = params['relationID'].split('-')[3]+'';
            var icoName = 'WSpage8';
            switch (model){
                case 'FT153':icoName='WSone';break;
                case 'FT156':icoName='WSone';break;
                case 'FT157':icoName='WSDual';
                    if(posi === '1')  {
                        icoName = 'wsicon1';
                    }else {
                        icoName = 'wsicon2';
                    }
                    break;
                case 'FT154':icoName='WSDual';
                    if(posi === '1')  {
                        icoName = 'wsicon1';
                    }else {
                        icoName = 'wsicon2';
                    }
                    break;
                case 'FT155':icoName='WSfour';
                    if(posi === '1')  {
                        icoName = 'wsicon3';
                    }else if(posi === '2')  {
                        icoName = 'wsicon4';
                    }else if(posi === '3')  {
                        icoName = 'wsicon5';
                    }else {
                        icoName = 'wsicon6';
                    }
                    break;
                case 'FT116':
                case 'FT139':
                case 'FT132':
                case 'FT140':icoName = 'inwallSwitch';
                    break;
            }
            return icoName;
        }
        function isInWallSwitch() {
            var a = false;
            var model = params['model'].split('-')[0];
            switch (model.split('-')[0]){
                case 'FT153':a=false;break;
                case 'FT156':a=false;break;
                case 'FT157':a=false;break;
                case 'FT154':a=false; break;
                case 'FT155':a=false; break;
                case 'FT116':a=true;break;
                case 'FT139':a=true;break;
                case 'FT132':a=true; break;
                case 'FT140':a=true; break;
            }
            return a;
        }
        obj.sendCommand = function (nodeid,code) {
            if(code === true){
                cordova.exec(null, null, "FTP2PApi", "resourceControl", [params['relationID'], 'true', "status"]);
            }else{
                cordova.exec(null, null, "FTP2PApi", "resourceControl", [params['relationID'], 'false', "status"]);
            }
        };
        obj.getParams = function () {
            return  Oomi_command_function.create_new().resource_data();
        };
        obj.getDeviceStatus = function(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,changeIcon){
            var requestInter = setInterval(function () {
                getMultiResDeviceStatus();
            },300);
                getMultiResDeviceStatus();
            function getMultiResDeviceStatus() {
                cordova.exec(function (RawResult) {
                    window.clearInterval(requestInter);
                    var result = stringToJson(RawResult);
                    var result1 = result['value'];
                    setTimeout(function () {
                        if (result1['value']){
                            var re = result1['value']['status'];
                            if (re === 'true') {
                                setStatus(true);
                            } else if (re === 'false') {
                                setStatus(false);
                            } else if (re === false) {
                                setStatus(false);
                            } else if (re === true) {
                                setStatus(true);
                            }else if(re === null){
                                setStatus(true);
                                cordova.exec(null, null, "FTP2PApi", "resourceControl", [params['relationID'], 'true', "status"]);
                            }else{
                                setStatus(true);
                                cordova.exec(null, null, "FTP2PApi", "resourceControl", [params['relationID'], 'true', "status"]);
                            }
                        }else {
                            cordova.exec(null, null, "FTP2PApi", "resourceControl", [params['relationID'], 'true', "status"]);
                        }
                        if(result1['widgetName']){
                            setDeviceName(result1['widgetName']);
                        }
                        if(result1['roomName']){
                            setDeviceRoom(result1['roomName']);
                        }
                        if(result1['iconId']){
                            var NumberRe = Number(result1['iconId']);
                            if(isInWallSwitch()){
                                if(NumberRe === 0){
                                    changeIcon('inwallSwitch');
                                }else {
                                    changeIcon('wsicon'+(NumberRe+6));
                                }
                            }else {
                                changeIcon('wsicon'+NumberRe);
                            }
                        }
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
        };

        obj.listener = function (nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,switchToWarning,switchToLeaf,switchToPercentage,setPercentageValue,shakeThis,percentageColor,changeIcon) {
            obj.getDeviceStatus(nodeid,setDeviceName,setDeviceRoom,setStatus,setLeafValue,changeIcon);
            function getMultiResDeviceStatus() {
                cordova.exec(function (RawResult) {
                    var result = stringToJson(RawResult);
                    var result1 = result['value'];
                    setTimeout(function () {
                        if (result1['value']){
                            var re = result1['value']['status'];
                            if (re === 'true') {
                                setStatus(true);
                            } else if (re === 'false') {
                                setStatus(false);
                            } else if (re === false) {
                                setStatus(false);
                            } else if (re === true) {
                                setStatus(true);
                            }
                        }
                        if(result1['widgetName']){
                            setDeviceName(result1['widgetName']);
                        }
                        if(result1['roomName']){
                            setDeviceRoom(result1['roomName']);
                        }
                        if(result1['iconId']){
                            var NumberRe = Number(result1['iconId']);
                            if(isInWallSwitch()){
                                if(NumberRe === 0){
                                    changeIcon('inwallSwitch');
                                }else {
                                    changeIcon('wsicon'+(NumberRe+6));
                                }
                            }else {
                                changeIcon('wsicon'+NumberRe);
                            }
                        }
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
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "changeRoomName") {
                    getDeviceName2();
                    function getDeviceName2() {
                        cordova.exec(function(data){
                            var myData = JSON.parse(data);
                            // setDeviceName(myData['value']);
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
                if (params['relationID'] === data.ID) {
                    if (data.title === "changeName") {
                        getMultiResDeviceStatus();
                    }
                    if (data.title === "changeRoom") {
                        getMultiResDeviceStatus();
                    }
                    if (data.title === "changeIcon") {
                        var NumberRe = Number(data.content);
                        var icoName = 'wsicon';

                        if(isInWallSwitch()){
                            if(NumberRe === 0){
                                icoName = 'inwallSwitch';
                            }else {
                                icoName = 'wsicon'+(NumberRe+6);
                            }
                        }else {
                            icoName = 'wsicon'+NumberRe;
                        }
                        if (changeIcon) {
                            changeIcon(icoName);
                        }
                    }
                }
                if (nodeid === data.ID) {
                    if (data.title === "DeviceStatus") {
                        var result = JSON.parse(data.content);
                        var result2 = data.status;
                        setTimeout(function () {
                            if(result2===params['relationID']){
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
                        },1)
                    }
                }
            }, false);
        };
        return obj;
    });
