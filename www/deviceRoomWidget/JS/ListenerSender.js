/**
 * Created by qkchung on 16/2/26.
 */
define(['OOMICommon'],function(OOMICommon){
    var ListenerSender = {};
    // ListenerSender.run = function() {
    var model_ = {
        create_new: function (Param) {
            var set = {};
            set.test = function test() {

            };
            //todo
            return set;
        }
    };
    ListenerSender.setNewMotion ={
        create_new: function (Param) {
            var set = {};
            set.textsOBJ = {};
            set.stateOBJ = {status : true,
                thismodel:''
            };
            set.languageSwitcher = function (lang,motion,thismodel) {
                set.stateOBJ.thismodel = thismodel;
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    set.textsOBJ = textsOBJ;
                    if(thismodel == 'TPD32OC'){
                        $('#NewMotionName').text(textsOBJ.DW_Motion);
                    }else if(thismodel == 'TPD32MO'){
                        $('#NewMotionName').text(textsOBJ.NewMotionTitle);
                    }else if(thismodel == 'TPD32'){
                        $('#NewMotionName').text(textsOBJ.DW_Motion);
                    }else if(thismodel == 'TPD07') {
                        $('#NewMotionName').text(textsOBJ.DW_Motion);
                    } else if(thismodel == 'FT122') {
                        $('#NewMotionName').text(set.textsOBJ.DW_Motion);
                    }
                    if(motion){
                        motion(set.stateOBJ.status)
                    }
                });
            };
            set.motionListener = function (motion) {
                document.addEventListener('deviceready',function(){
                    var str=Param['widgetId'];
                    var array=str.split('_');
                    var nodeid=array[1];
                    getDeviceData();
                    function getDeviceData(){
                        set.languageSwitcher(Param.language,motion,set.stateOBJ.thismodel);
                        cordova.exec(function (data) {
                            updateUI(data,'status', function (result) {
                                if(result == true){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == false){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else if(result == 'true'){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == 'false'){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else{
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }
                            });
                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid]);

                        function updateUI(data,find,fun){
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                for(var i in arry){
                                    if(typeof arry[i] == 'object') {
                                        for (var j in arry[i]) {
                                            if (j == find) {
                                                fun(arry[i][j]);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        function stringToJson(data){
                            var result = '';
                            if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                                var str3 = data.replace('\"[','[');
                                result = str3.replace(']\"',']');
                            }
                            return JSON.parse(result);
                        }
                    }

                    window.addEventListener('ftdevicestatusupdate',function(data){
                        var td = Param;
                        if(td.deviceId==data.ID){
                            if(data.title==="DeviceStatus"){

                                var result = JSON.parse(data.content);
                                for (var key in result)
                                {
                                    if(key ==="status"){
                                        if(result[key] == true){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }else if(result[key]== false){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(result[key]== 'false'){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(result[key]== 'true'){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }
                                    }
                                }
                            }
                        }
                        if(data.title === "Language"){
                            set.languageSwitcher(data.content,motion,set.stateOBJ.thismodel);
                        }
                    },false);
                } , false);
            };
            return set;
        }
    };
    ListenerSender.setSiren = {
        create_new: function (Param) {
            var set = {};
            set.om = Oomi_common_functions.createNew(null,null);
            set.om.spin_init();//鍒濆鍖栧姞杞芥晥鏋�
            set.om.spin(false);
            set.callback = 0;//寤舵椂鏍囪瘑
            set.listenData = true;
            set.DoSend = true;
            set.canSend = 0;
            set.canSendTimeout = 0;
            set.loadingMaskTimeout = 0;
            set.recieveCallback = 0;
            set.spin_init = function spin_init(){
                var target = document.getElementById('Dimmerloading_mask');
                if(target == undefined){
                }else {
                    target.style.left = "100%";
                }
            };
            set.spin_init();
            set.spin = function spin(show){
                var $target = document.getElementById('Sirenloading_mask');
                window.clearTimeout(set.loadingMaskTimeout);
                if($target != undefined) {
                    if (show) {
                        $target.style.left = "0";
                        if($target.childElementCount==0){
                            var e =document.createElement("img");
                            e.src = "../libs/img/loading.gif";
                            e.id="load_img";
                            $target.appendChild(e);
                        }
                    } else if (!show){
                        $target.style.left = "100%";
                        set.loadingMaskTimeout =setTimeout(function () {
                            if(document.getElementById("load_img") != null){
                                $('#load_img').remove();
                            }
                        },5000);
                    }
                }
            };
            set.syncSend = function syncSend(syncun) {
                if(set.DoSend == true){
                    if(syncun){
                        syncun();
                    }
                    set.DoSend = false;
                    window.clearTimeout(set.canSendTimeout);
                    set.canSend = setTimeout(function () {
                        set.DoSend = true;
                        window.clearTimeout(set.canSend);
                    }, 700);
                }else{
                    window.clearTimeout(set.canSendTimeout);
                    window.clearTimeout(set.canSend);
                    set.canSendTimeout = setTimeout(function () {
                        set.DoSend = true;
                        if(syncun){
                            syncun();
                        }
                        window.clearTimeout(set.canSendTimeout);
                    }, 690);
                }
            };
            set.Loadings = function Loadings(time) { //鍔犺浇loadingx鏁堟灉鍑芥暟锛屽弬鏁颁负鍔犺浇鐨勬椂闀裤��
                window.clearTimeout(set.callback);
                set.spin(true);
                set.callback = setTimeout(function () {
                    set.spin(false);
                    window.clearTimeout(set.callback);
                    set.callback = 0;
                },time);


                window.clearTimeout(set.recieveCallback);
                set.recieveCallback = setTimeout(function(){
                    window.clearTimeout(set.recieveCallback);
                    set.recieveCallback = null;
                },4000);
            };
            set.sendtoP2P = function sendtoP2P(code) {
                var str = Param.widgetId;
                var array = str.split('_');
                var nodeid = array[1];
                var pageid = array[3];
                set.Loadings(500);
                set.listenData = false;
                if(set.DoSend == true){
                    if(Param.hasOwnProperty('operateID')){
                        //alert("operateID:"+Param['operateID']);
                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                            //todo
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", code, "status",Param['operateID']]);
                        }
                    }
                    cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", code, "status"]);
                    set.DoSend = false;
                    window.clearTimeout(set.canSendTimeout);
                    set.canSend = setTimeout(function () {
                        set.DoSend = true;
                        window.clearTimeout(set.canSend);
                    }, 700);
                }else {
                    window.clearTimeout(set.canSendTimeout);
                    window.clearTimeout(set.canSend);
                    set.canSendTimeout = setTimeout(function () {
                        set.DoSend = true;
                        if (Param.hasOwnProperty('operateID')) {
                            //alert("operateID:"+Param['operateID']);
                            if (Param['operateID'] != undefined && Param['operateID'] != null) {
                                //todo
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", code, "status", Param['operateID']]);
                            }
                        }
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", code, "status"]);
                        window.clearTimeout(set.canSendTimeout);
                    }, 800);
                }

            };

            set.Listener = function Listener(setPower,getPower) {
                document.addEventListener('deviceready', function () {
                    var str = Param.widgetId;
                    var array = str.split('_');
                    var nodeid = array[1];
                    var pageid = array[3];
                    set.Loadings(500);
                    if(Param.hasOwnProperty('operateID')){
                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                            getScenesData(Param['operateID']);
                        }
                    }else{
                        getDeviceData();
                    }

                    function getScenesData(operateID){
                        cordova.exec(function (data) {
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                updateUI(data,'status',function SirenUpdate(result) {
                                    var flag= String(result);
                                    if (flag == 'true') {
                                        getPower(true);
                                    } else if (flag == 'false') {
                                        getPower(false);
                                    }else if (flag == true) {
                                        getPower(true);
                                    } else if (flag == false) {
                                        getPower(false);
                                    }
                                })
                            }else{
                                getDeviceData();
                            }
                        }, null, "FTP2PApi", "querySceneActionStatus", [operateID]);//todo
                    }

                    function getDeviceData(){
                        cordova.exec(function (data) {
                            var stringifyData = JSON.stringify(data);
                            if(stringifyData.indexOf('status') != -1) {
                                updateUI(data,'status',function SirenUpdate(result) {
                                    var flag= String(result);
                                    if(Param.hasOwnProperty('operateID')){
                                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", flag, "status",Param['operateID']]);
                                        }
                                    }
                                    if (flag == 'true') {
                                        getPower(true);
                                    } else if (flag == 'false') {
                                        getPower(false);
                                    }else if (flag == true) {
                                        getPower(true);
                                    } else if (flag == false) {
                                        getPower(false);
                                    }

                                })
                            } else {
                                if(Param.hasOwnProperty('operateID')){
                                    if(Param['operateID'] != undefined && Param['operateID'] != null ){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", true, "status",Param['operateID']]);
                                    }
                                }
                            }
                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid, "binsw01"]);
                    }

                    function updateUI(data,find,fun){
                        var obj = stringToJson(data);
                        var arry = obj.value;
                        if (arry.length > 0 ) {
                            for(var i in arry){
                                if(typeof arry[i] == 'object') {
                                    for (var j in arry[i]) {
                                        if (j == find) {
                                            fun(arry[i][j]);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    function stringToJson(data){
                        var result = '';
                        if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                            var str3 = data.replace('\"[','[');
                            result = str3.replace(']\"',']');
                        }
                        return JSON.parse(result);
                    }

                    if(!Param.hasOwnProperty('operateID')){
                        window.addEventListener('ftdevicestatusupdate', function a(data) {

                            var om2 = Oomi_command_function.create_new();
                            var td = om2.resource_data();

                            if (td.deviceId == data.ID && set.timeout!=0) {
                                if (data.title === "DeviceStatus") {
                                    //window.clearTimeout(set.callback);
                                    //set.om.spin(false);

                                    if(set.listenData == true) {
                                        var result = JSON.parse(data.content);
                                        for (var key in result) {

                                            if (key === "status") {
                                                //alert(result[key]);
                                                var flag = String(result[key]);
                                                if (flag == 'true') {
                                                    getPower(true);
                                                } else if (flag == 'false') {
                                                    getPower(false);
                                                } else if (flag == true) {
                                                    getPower(true);
                                                } else if (flag == false) {
                                                    getPower(false);
                                                }
                                            }
                                        }

                                    }else{
                                        set.listenData = true;
                                    }
                                }
                            }
                        }, false);
                    }
                }, false);
            };

            return set;
        }
    };

    ListenerSender.setDoorlock = {
        create_new: function (Param) {
            var set = {};
            set.om = Oomi_common_functions.createNew(null,null);
            set.om.spin_init();//鍒濆鍖栧姞杞芥晥鏋�
            set.om.spin(false);
            set.callback = 0;//寤舵椂鏍囪瘑
            set.listenData = true;
            set.DoSend = true;
            set.canSend = 0;
            set.canSendTimeout = 0;
            set.Loadings = function Loadings(time) { //鍔犺浇loadingx鏁堟灉鍑芥暟锛屽弬鏁颁负鍔犺浇鐨勬椂闀裤��
                window.clearTimeout(set.callback);
                set.om.spin(true);
                set.callback = setTimeout(function () {
                    set.om.spin(false);
                    window.clearTimeout(set.callback);
                    set.callback = 0;
                },time);
            };
            set.sendtoP2P = function sendtoP2P(code) {
                var str = Param.widgetId;
                var array = str.split('_');
                var nodeid = array[1];
                var pageid = array[3];
                set.Loadings(500);
                set.listenData = false;
                console.log(code);
                if(set.DoSend == true){
                    if(Param.hasOwnProperty('operateID')){
                        //alert("operateID:"+Param['operateID']);

                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                            //todo
                            if(code == 'true'){
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "dLock01", '0', "doorLock",Param['operateID']]);
                            }else{
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "dLock01", '255', "doorLock",Param['operateID']]);
                            }

                        }
                    }
                    if(code == 'true'){
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "dLock01", '0', "doorLock"]);
                    }else{
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "dLock01", '255', "doorLock"]);
                    }

                    set.DoSend = false;
                    window.clearTimeout(set.canSendTimeout);
                    set.canSend = setTimeout(function () {
                        set.DoSend = true;
                        window.clearTimeout(set.canSend);
                    }, 700);
                }else {
                    window.clearTimeout(set.canSendTimeout);
                    window.clearTimeout(set.canSend);
                    set.canSendTimeout = setTimeout(function () {
                        set.DoSend = true;
                        if (Param.hasOwnProperty('operateID')) {
                            //alert("operateID:"+Param['operateID']);
                            if (Param['operateID'] != undefined && Param['operateID'] != null) {
                                if(code == 'true'){
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "dLock01", '0', "doorLock",Param['operateID']]);
                                }else{
                                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "dLock01", '255', "doorLock",Param['operateID']]);
                                }
                            }
                        }
                        if(code == 'true'){
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "dLock01", '0', "doorLock"]);
                        }else{
                            cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "dLock01", '255', "doorLock"]);
                        }
                        window.clearTimeout(set.canSendTimeout);
                    }, 800);
                }

            };

            set.Listener = function Listener(setPower,getPower) {
                document.addEventListener('deviceready', function () {
                    var str = Param.widgetId;
                    var array = str.split('_');
                    var nodeid = array[1];
                    var pageid = array[3];
                    set.Loadings(500);
                    if(Param.hasOwnProperty('operateID')){
                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                            getScenesData(Param['operateID']);
                        }
                    }else{
                        getDeviceData();
                    }

                    function getScenesData(operateID){
                        cordova.exec(function (data) {
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                updateUI(data,'doorLock',function plugUpdate(result) {
                                    var flag= String(result);
                                    if (flag == '0') {
                                        getPower(true);
                                    } else if (flag == '255') {
                                        getPower(false);
                                    }else if (flag == 0) {
                                        getPower(true);
                                    } else if (flag == 255) {
                                        getPower(false);
                                    }
                                })
                            }else{
                                getDeviceData();
                            }
                        }, null, "FTP2PApi", "querySceneActionStatus", [operateID]);//todo
                    }

                    function getDeviceData(){
                        cordova.exec(function (data) {
                            var stringifyData = JSON.stringify(data);
                            if(stringifyData.indexOf('doorLock') != -1) {
                                updateUI(data,'doorLock',function plugUpdate(result) {
                                    var flag= String(result);
                                    if(Param.hasOwnProperty('operateID')){
                                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "dLock01", flag, "doorLock",Param['operateID']]);
                                        }
                                    }
                                    if (flag == '0') {
                                        getPower(true);
                                    } else if (flag == '255') {
                                        getPower(false);
                                    }else if (flag == 0) {
                                        getPower(true);
                                    } else if (flag == 255) {
                                        getPower(false);
                                    }

                                })
                            } else {
                                if(Param.hasOwnProperty('operateID')){
                                    if(Param['operateID'] != undefined && Param['operateID'] != null ){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "dLock01", 0, "doorLock",Param['operateID']]);
                                    }
                                }
                            }

                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid, "dLock01"]);
                    }

                    function updateUI(data,find,fun){
                        var obj = stringToJson(data);
                        var arry = obj.value;
                        if (arry.length > 0 ) {
                            for(var i in arry){
                                if(typeof arry[i] == 'object') {
                                    for (var j in arry[i]) {
                                        if (j == find) {
                                            fun(arry[i][j]);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    function stringToJson(data){
                        var result = '';
                        if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                            var str3 = data.replace('\"[','[');
                            result = str3.replace(']\"',']');
                        }
                        return JSON.parse(result);
                    }

                    if(!Param.hasOwnProperty('operateID')){
                        window.addEventListener('ftdevicestatusupdate', function a(data) {

                            var om2 = Oomi_command_function.create_new();
                            var td = om2.resource_data();

                            if (td.deviceId == data.ID && set.timeout!=0) {
                                if (data.title === "DeviceStatus") {
                                    //window.clearTimeout(set.callback);
                                    //set.om.spin(false);

                                    if(set.listenData == true) {
                                        var result = JSON.parse(data.content);
                                        for (var key in result) {

                                            if (key === "doorLock") {
                                                //alert(result[key]);
                                                var flag = String(result[key]);
                                                if (flag == '0') {
                                                    getPower(true);
                                                } else if (flag == '255') {
                                                    getPower(false);
                                                } else if (flag == 0) {
                                                    getPower(true);
                                                } else if (flag == 255) {
                                                    getPower(false);
                                                }
                                            }
                                        }

                                    }else{
                                        set.listenData = true;
                                    }
                                }
                            }
                        }, false);
                    }
                }, false);
            };

            return set;
        }
    };

    ListenerSender.setPlug = {
        create_new: function (Param) {
            var set = {};
            set.om = Oomi_common_functions.createNew(null,null);
            set.om.spin_init();//鍒濆鍖栧姞杞芥晥鏋�
            set.om.spin(false);
            set.callback = 0;//寤舵椂鏍囪瘑
            set.listenData = true;
            set.DoSend = true;
            set.canSend = 0;
            set.canSendTimeout = 0;
            set.Loadings = function Loadings(time) { //鍔犺浇loadingx鏁堟灉鍑芥暟锛屽弬鏁颁负鍔犺浇鐨勬椂闀裤��
                window.clearTimeout(set.callback);
                set.om.spin(true);
                set.callback = setTimeout(function () {
                    set.om.spin(false);
                    window.clearTimeout(set.callback);
                    set.callback = 0;
                },time);
            };
            set.sendtoP2P = function sendtoP2P(code) {
                var str = Param.widgetId;
                var array = str.split('_');
                var nodeid = array[1];
                var pageid = array[3];
                set.Loadings(500);
                set.listenData = false;
                if(set.DoSend == true){
                    if(Param.hasOwnProperty('operateID')){
                        //alert("operateID:"+Param['operateID']);
                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                            //todo
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", code, "status",Param['operateID']]);
                        }
                    }
                    cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", code, "status"]);
                    set.DoSend = false;
                    window.clearTimeout(set.canSendTimeout);
                    set.canSend = setTimeout(function () {
                        set.DoSend = true;
                        window.clearTimeout(set.canSend);
                    }, 700);
                }else {
                    window.clearTimeout(set.canSendTimeout);
                    window.clearTimeout(set.canSend);
                    set.canSendTimeout = setTimeout(function () {
                        set.DoSend = true;
                        if (Param.hasOwnProperty('operateID')) {
                            //alert("operateID:"+Param['operateID']);
                            if (Param['operateID'] != undefined && Param['operateID'] != null) {
                                //todo
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", code, "status", Param['operateID']]);
                            }
                        }
                        cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", code, "status"]);
                        window.clearTimeout(set.canSendTimeout);
                    }, 800);
                }

            };

            set.Listener = function Listener(setPower,getPower) {
                document.addEventListener('deviceready', function () {
                    var str = Param.widgetId;
                    var array = str.split('_');
                    var nodeid = array[1];
                    var pageid = array[3];
                    set.Loadings(500);
                    if(Param.hasOwnProperty('operateID')){
                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                            getScenesData(Param['operateID']);
                        }
                    }else{
                        getDeviceData();
                    }

                    function getScenesData(operateID){
                        cordova.exec(function (data) {
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                updateUI(data,'status',function plugUpdate(result) {
                                    var flag= String(result);
                                    if (flag == 'true') {
                                        getPower(true);
                                    } else if (flag == 'false') {
                                        getPower(false);
                                    }else if (flag == true) {
                                        getPower(true);
                                    } else if (flag == false) {
                                        getPower(false);
                                    }
                                })
                            }else{
                                getDeviceData();
                            }
                        }, null, "FTP2PApi", "querySceneActionStatus", [operateID]);//todo
                    }

                    function getDeviceData(){
                        cordova.exec(function (data) {
                            var stringifyData = JSON.stringify(data);
                            if(stringifyData.indexOf('status') != -1 ) {
                                updateUI(data,'status',function plugUpdate(result) {
                                    var flag= String(result);
                                    if(Param.hasOwnProperty('operateID')){
                                        if(Param['operateID'] != undefined && Param['operateID'] != null ){
                                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", flag, "status",Param['operateID']]);
                                        }
                                    }
                                    if (flag == 'true') {
                                        getPower(true);
                                    } else if (flag == 'false') {
                                        getPower(false);
                                    }else if (flag == true) {
                                        getPower(true);
                                    } else if (flag == false) {
                                        getPower(false);
                                    }
                                })
                            } else {
                                if(Param.hasOwnProperty('operateID')){
                                    if(Param['operateID'] != undefined && Param['operateID'] != null ){
                                        cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, "binsw01", true, "status",Param['operateID']]);
                                    }
                                }
                            }
                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid, "binsw01"]);
                    }

                    function updateUI(data,find,fun){
                        var obj = stringToJson(data);
                        var arry = obj.value;
                        if (arry.length > 0 ) {
                            for(var i in arry){
                                if(typeof arry[i] == 'object') {
                                    for (var j in arry[i]) {
                                        if (j == find) {
                                            fun(arry[i][j]);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    function stringToJson(data){
                        var result = '';
                        if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                            var str3 = data.replace('\"[','[');
                            result = str3.replace(']\"',']');
                        }
                        return JSON.parse(result);
                    }

                    if(!Param.hasOwnProperty('operateID')){
                        window.addEventListener('ftdevicestatusupdate', function a(data) {

                            var om2 = Oomi_command_function.create_new();
                            var td = om2.resource_data();

                            if (td.deviceId == data.ID && set.timeout!=0) {
                                if (data.title === "DeviceStatus") {
                                    //window.clearTimeout(set.callback);
                                    //set.om.spin(false);

                                    if(set.listenData == true) {
                                        var result = JSON.parse(data.content);
                                        for (var key in result) {

                                            if (key === "status") {
                                                //alert(result[key]);
                                                var flag = String(result[key]);
                                                if (flag == 'true') {
                                                    getPower(true);
                                                } else if (flag == 'false') {
                                                    getPower(false);
                                                } else if (flag == true) {
                                                    getPower(true);
                                                } else if (flag == false) {
                                                    getPower(false);
                                                }
                                            }
                                        }

                                    }else{
                                        set.listenData = true;
                                    }
                                }
                            }
                        }, false);
                    }
                }, false);
            };

            return set;
        }
    };


    ListenerSender.setCube ={
        create_new: function (Param) {
            var set = {};
            set.textsOBJ = {};
            set.stateOBJ = {};
            set.currentIP = '192.168.43.1:1234';
            set.languageSwitcher = function (lang,motion,brightness,pm25,tvoc,fun) {
                if(fun){
                    fun();
                }
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    set.textsOBJ = textsOBJ;
                    $('#Brightnessname').text(textsOBJ.MULTI_CUBE_BRIGHTNESS);
                    $('#Motionname').text(textsOBJ.MULTI_CUBE_MOTION);
                    $('#temperaturename').text(textsOBJ.MULTI_CUBE_TEMPERATURE);
                    $('#pm25name').text(textsOBJ.AQ_pm25);
                    //$('#pm25name').text(textsOBJ.MULTI_CUBE_TEMPERATURE);
                    //$('#tvocname').text(textsOBJ.MULTI_CUBE_TEMPERATURE);
                    if(motion){
                        motion(set.stateOBJ.status)
                    }
                    if(brightness){
                        brightness(set.stateOBJ.illuminance)
                    }
                    if(pm25){
                        pm25(set.stateOBJ.value);
                    }
                    if(fun){
                        fun();
                    }
                });
            };
            set.CameraListener = function CameraListener() {

                $('#refresh_g').click(function () {
                    window.location.reload(true);
                });
                function noPic(img){
                    img.src = '../image/noPic.svg';
                }
                setTimeout(function () {
                    window.location.reload(true);
                }, 600000);
                var timer = 0;
                var om2 = Oomi_command_function.create_new();
                document.addEventListener('deviceready',function(){

                    function loadImage(ip){
                        window.clearInterval(timer);
                        var img = document.getElementById('imageID');
                        timer = setInterval(function () {

                            img.src='http://'+ip+':1234/?action=stream';
                        },10000);
                    }
                    cordova.exec(function(data){
                        var ipobj=JSON.parse(data);
                        var ip=ipobj.wifiIP;
                        var img = document.getElementById('imageID');
                        if(ip != "null"){
                            img.src='http://'+ip+':1234/?action=stream';
                            set.currentIP  = ip;
                            var a = setInterval(function () {
                                img.src='http://'+ip+':1234/?action=stream';
                            },5000);
                            img.onload = function () {
                                window.clearInterval(a);
                                loadImage(ip);
                                a = null;
                            }
                        }else {
                            img.src='http://192.168.43.1:1234/?action=stream';
                            var b = setInterval(function () {
                                img.src='http://'+ip+':1234/?action=stream';
                            },5000);
                            img.onload = function () {
                                window.clearInterval(b);
                                loadImage('192.168.43.1');
                                b = null;
                            }
                        }

                    },function(data){
                        //
                    },"FTP2PApi","getWifiIP",[""]);

                    window.addEventListener('ftdevicestatusupdate',function(data){
                        var td = om2.resource_data();
                        if(data.title === "ScreenBroadcast" ) {
                            var img = document.getElementById('imageID');
                            if(data.status == 'android.intent.action.SCREEN_ON'){
                                img.src='http://'+set.currentIP+':1234/?action=stream';
                                loadImage(set.currentIP);
                                //alert('SCREEN_ON');
                            }else if(data.status == 'android.intent.action.SCREEN_OFF'){
                                img.src = null;
                                //alert('SCREEN_OFF');
                            }else if(data.status == 'android.intent.action.USER_PRESENT'){
                                //alert('USER_PRESENT');
                            }
                        }
                        if(data.title==="wifiIP"){
                            var ip=data.content;
                            if(ip!=null){
                                var img = document.getElementById('imageID');
                                set.currentIP = ip;
                                img.src='http://'+ip+':1234/?action=stream';
                                loadImage(ip);
                            }
                        }
                    },false);
                } , false);

            };

            set.multiListener = function multiListener(brightness,humidity,motion,temperature,temperatureUnit,pm25,tvoc) {
                document.addEventListener('deviceready',function(){
                    var str=Param.widgetId;
                    var array=str.split('_');
                    var nodeid=array[1];
                    var pageid=array[3];
                    set.languageSwitcher(Param.language,motion,brightness,pm25,tvoc,getDeviceData);
                    function getDeviceData(){
                        //set.languageSwitcher(Param.language);
                        cordova.exec(function (data) {
                            updateUI(data,'temperature', function (result) {
                                var value = Number(result);
                                temperature(Number(value.toFixed(1)));
                            });
                            updateUI(data,'illuminance', function (result) {
                                var value = Number(result);
                                brightness(Number(value.toFixed(1)));
                                set.stateOBJ.illuminance = Number(value.toFixed(1));
                            });
                            updateUI(data,'status', function (result) {
                                if(result == true){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == false){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else if(result == 'true'){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == 'false'){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }
                            });
                            updateUI(data,'pm25', function (result) {
                                var value = Number(result);
                                set.stateOBJ.pm25 = value;
                                pm25(value);
                            });
                            //updateUI(data,'tvoc', function (result) {
                            //    var value = Number(result);
                            //    tvoc(value);
                            //});
                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid]);
                        cordova.exec(function (data) {
                            var obj=JSON.parse(data);
                            var value=obj.value;

                            if(value==="true"){
                                temperatureUnit('true');

                            }else{
                                temperatureUnit('false');
                            }
                        },null,"FTP2PApi","getUnit",[""]);
                        function updateUI(data,find,fun){
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                for(var i in arry){
                                    if(typeof arry[i] == 'object') {
                                        for (var j in arry[i]) {
                                            if (j == find) {
                                                fun(arry[i][j]);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        function stringToJson(data){
                            var result = '';
                            if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                                var str3 = data.replace('\"[','[');
                                result = str3.replace(']\"',']');
                            }
                            return JSON.parse(result);
                        }
                    }

                    window.addEventListener('ftdevicestatusupdate',function(data){

                        var om2=Oomi_command_function.create_new();
                        var td = om2.resource_data();
                        if(data.title === "Language"){
                            set.languageSwitcher(data.content);
                        }
                        if(td.deviceId==data.ID){
                            if(data.title==="DeviceStatus"){

                                var result = JSON.parse(data.content);
                                for (var key in result)
                                {
                                    if(key==="illuminance"){
                                        var value = Number(result[key]);
                                        brightness(Number(value.toFixed(1)));
                                        set.stateOBJ.illuminance = Number(value.toFixed(1));
                                    }
                                    if(key=== "temperature"){
                                        var value = Number(result[key]);
                                        temperature(Number(value.toFixed(1)));
                                    }
                                    if(key=== "pm25"){
                                        var value = Number(result[key]);
                                        set.stateOBJ.pm25 = value;
                                        pm25(value);
                                    }
                                    //if(key=== "tvoc"){
                                    //    var value = Number(result[key]);
                                    //    tvoc(value);
                                    //}
                                    if(key ==="humidity"){
                                        //humidity(Number(value.toFixed(1)));
                                    }
                                    if(key ==="status"){
                                        var flag= String(result[key]);
                                        if(flag==="true"){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }else if(flag==="false"){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(flag===false){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(flag===true){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }else{
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }
                                    }

                                }

                            }
                        }

                        if(data.title === "temperature01"){
                            if(data.content==="true"){
                                temperatureUnit('true');

                            }else{
                                temperatureUnit('false');
                            }
                        }
                    },false);
                } , false);

            };
            return set;
        }
    };

    ListenerSender.setDoor_window ={
        create_new: function (Param) {
            var set = {};
            set.textsOBJ = {};
            set.stateOBJ = {};
            set.languageSwitcher = function (lang,motion) {
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    set.textsOBJ = textsOBJ;
                    $('#Door_window_Motion').text(textsOBJ.DW_Motion);
                    $('#Door_window_battery').text(textsOBJ.DW_BATTERY);
                    if(motion){
                        motion(set.stateOBJ.status)
                    }
                });
            };
            set.doorListener = function (motion,battery) {
                document.addEventListener('deviceready',function(){

                    var str=Param.widgetId;
                    var array=str.split('_');
                    var nodeid=array[1];
                    var pageid=array[3];

                    getDeviceData();
                    function getDeviceData(){
                        set.languageSwitcher(Param.language);
                        cordova.exec(function (data) {
                            updateUI(data,'level', function (result) {
                                battery(result);
                            });
                            updateUI(data,'status', function (result) {
                                if(result == true){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == false){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else if(result == 'true'){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == 'false'){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else{
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }
                            });
                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid]);

                        function updateUI(data,find,fun){
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                for(var i in arry){
                                    if(typeof arry[i] == 'object') {
                                        for (var j in arry[i]) {
                                            if (j == find) {
                                                fun(arry[i][j]);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        function stringToJson(data){
                            var result = '';
                            if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                                var str3 = data.replace('\"[','[');
                                result = str3.replace(']\"',']');
                            }
                            return JSON.parse(result);
                        }
                    }

                    window.addEventListener('ftdevicestatusupdate',function(data){
                        var td = Param;
                        if(td.deviceId==data.ID){
                            if(data.title==="DeviceStatus"){

                                var result = JSON.parse(data.content);
                                for (var key in result)
                                {
                                    if(key ==="status"){
                                        if(result[key] == true){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }else if(result[key]== false){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(result[key]== 'false'){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(result[key]== 'true'){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }
                                    }else if (key==="level"){
                                        var batteryLevel = Math.floor(Number(result[key]) * 10) / 10;
                                        battery(batteryLevel);
                                    }
                                }
                            }
                        }
                        if(data.title === "Language"){
                            set.languageSwitcher(data.content);
                        }
                    },false);
                } , false);
            };
            return set;
        }
    };

    ListenerSender.setMultisensorR ={
        create_new: function (Param) {
            var set = {};
            set.textsOBJ = {};
            set.stateOBJ = {
                status:true
            };
            set.languageSwitcher = function (lang,motion,brightness) {
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    set.textsOBJ = textsOBJ;
                    $('#multisensorBrightnessname').text(textsOBJ.MULTI_CUBE_BRIGHTNESS);
                    $('#multisensorMotionname').text(textsOBJ.MULTI_CUBE_MOTION);
                    $('#multisensortemperaturename').text(textsOBJ.MULTI_CUBE_TEMPERATURE);
                    if(motion){
                        motion(set.stateOBJ.status);
                    }
                    if(brightness){
                        brightness(set.stateOBJ.illuminance)
                    }
                });
            };
            set.multiListener = function multiListener(brightness,humidity,motion,temperature,temperatureUnit) {
                document.addEventListener('deviceready',function(){
                    var str=Param.widgetId;
                    var array=str.split('_');
                    var nodeid=array[1];
                    var pageid=array[3];
                    getDeviceData();
                    function getDeviceData(){
                        cordova.exec(function (data) {
                            set.languageSwitcher(Param.language);
                            updateUI(data,'temperature', function (result) {
                                var value = Number(result);
                                temperature(Number(value.toFixed(1)));
                            });
                            updateUI(data,'illuminance', function (result) {
                                var value = Number(result);
                                brightness(Number(value.toFixed(1)));
                                set.stateOBJ.illuminance = Number(value.toFixed(1));
                            });
                            updateUI(data,'status', function (result) {
                                if(result == true){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == false){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else if(result == 'true'){
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }else if(result == 'false'){
                                    motion(false);
                                    set.stateOBJ.status = false;
                                }else{
                                    motion(true);
                                    set.stateOBJ.status = true;
                                }
                            });
                            // ***getTemperature后getUnit***
                            cordova.exec(function (data) {
                                var obj=JSON.parse(data);
                                var value=obj.value;
                                if(value==="true"){
                                    temperatureUnit('true');
                                }else{
                                    temperatureUnit('false');
                                }
                            },null,"FTP2PApi","getUnit",[""]);
                        }, null, "FTP2PApi", "getDeviceStatus", [nodeid]);

                        function updateUI(data,find,fun){
                            var obj = stringToJson(data);
                            var arry = obj.value;
                            if (arry.length > 0 ) {
                                for(var i in arry){
                                    if(typeof arry[i] == 'object') {
                                        for (var j in arry[i]) {
                                            if (j == find) {
                                                fun(arry[i][j]);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        function stringToJson(data){
                            var result = '';
                            if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                                var str3 = data.replace('\"[','[');
                                result = str3.replace(']\"',']');
                            }
                            return JSON.parse(result);
                        }
                    }

                    window.addEventListener('ftdevicestatusupdate',function(data){

                        var om2=Oomi_command_function.create_new();
                        var td = om2.resource_data();
                        if(data.title === "Language"){
                            set.languageSwitcher(data.content);
                        }
                        if(td.deviceId==data.ID){
                            if(data.title==="DeviceStatus"){

                                var result = JSON.parse(data.content);
                                for (var key in result)
                                {
                                    if(key==="illuminance"){
                                        var value1 = Number(result[key]);
                                        brightness(Number(value1.toFixed(1)));
                                        set.stateOBJ.illuminance = Number(value1.toFixed(1));
                                    }
                                    if(key=== "temperature"){
                                        var value2 = Number(result[key]);
                                        temperature(Number(value2.toFixed(1)));
                                    }
                                    if(key ==="humidity"){
                                        var value3 = Number(result[key]);
                                    }
                                    if(key ==="status"){
                                        var flag= String(result[key]);
                                        if(flag==="true"){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }else if(flag==="false"){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(flag===false){
                                            motion(false);
                                            set.stateOBJ.status = false;
                                        }else if(flag===true){
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }else{
                                            motion(true);
                                            set.stateOBJ.status = true;
                                        }
                                    }
                                }
                            }
                        }
                        if(data.title === "temperature01"){

                            if(data.content==="true"){
                                temperatureUnit('true');

                            }else{
                                temperatureUnit('false');
                            }
                        }

                    },false);
                } , false);

            };
            return set;
        }
    }
    return ListenerSender;
})