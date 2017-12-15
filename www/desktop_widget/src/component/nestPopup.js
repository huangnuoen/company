/**
 * Created by qkchung on 17/4/11.
 */
define(['util/popupTools','Vue'],
    function( popupTools  ,Vue) {
        var obj = {};
        obj.run = function (vueComponent, vueName, vueTemplate, nodeid,bus) {
            var self = null;
            var unitC = true;
            var mode = 'eco';
            var CHMaxT = 10;
            var CHMinT = 9;
            var ECOMaxT = 10;
            var ECOMinT = 9;
            var currentT = 20;
            var OthersModeTemp = 10;
            var sendTimeoutForValue = 0;
            var sendTimeoutForMode = 0;
            var didInit = false;
            Vue.component(vueComponent, {
                name: vueName,
                template: vueTemplate,
                data: function () {
                    return {
                        humidityValue: 0,
                        TempValue:0,
                        modes: [
                            {modeItem: 'Heat.Cool'},
                            {modeItem: 'Eco'},
                            {modeItem: 'Heat'},
                            {modeItem: 'Cool'},
                            {modeItem: 'Off'}
                        ],
                        currentModeIndex: 0,
                        setMinNestTemperature: '',
                        setMaxNestTemperature: '',
                        autoEcoModeNest: false,
                        setOthersModeTemp: '',
                        twinMinMax:true,
                        offOrNot: true
                    }
                },
                mounted:function(){
                    self = this;
                    removeLoading(120000);
                    listenRangePicker();
                    listenStuff();
                },
                methods: {
                    // 点击切换mode
                    changeNestStatus:function(index) {
                        this.currentModeIndex = index;
                        modeRouteChange();
                    },
                    // minadd minplus maxadd maxplus为auto和Eco mode的递增与递减
                    minAdd:function() {
                        temperatureLeftAdd();
                        sendModeToCube();
                    },
                    minPlus:function() {
                        temperatureLeftMinus();
                        sendModeToCube();
                    },
                    maxAdd:function() {
                        temperatureRightAdd();
                        sendModeToCube();
                    },
                    maxPlus:function() {
                        temperatureRightMinus();
                        sendModeToCube();
                    },
                    // 以下两种为 heat cool off模式的加减,plus(表达有误)为减，add为加
                    othersModePlus:function() {
                        othersTemperaturePlus();
                        sendModeToCube();
                    },
                    othersModeAdd:function() {
                        othersTemperatureAdd();
                        sendModeToCube();
                    }
                },
                watch: {
                    //监测index
                    currentModeIndex:function() {
                        //modeRouteChange();
                    },
                    // min的值不能超过max的值
                    setMinNestTemperature:function() {
                            //cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", this.setMinNestTemperature, "tempLc"]);
                    },
                    setMaxNestTemperature:function() {
                            //cordova.exec(null, null, "FTP2PApi", "deviceControl", [nodeid, "binsw01", this.setMinNestTemperature, "tempLc"]);
                    }
                },
                events: {

                }
            });


            function nestLoading(time){
                $('.Nestloading').css('display','block');
                setTimeout(function () {
                    $('.Nestloading').css('display','none');
                },time);
            }

            function removeLoading(time){
                setTimeout(function () {
                    $('.Nestloading').css('display','none');
                },time);

            }
            function listenRangePicker(){
                bus.$on('test', function (msg) {
                    if(msg.isSingle){
                        getOthersModeTemperature(msg.max);
                        sendModeToCube();
                    }else{
                        getMaxNestTemperature(msg.max);
                        getMinNestTemperature(msg.min);
                        sendModeToCube();
                    }
                });
            }

            function sendModeToCube(){
                window.clearTimeout(sendTimeoutForValue);
                sendTimeoutForValue = setTimeout(function(){
                    nestLoading(3000);
                    if(mode == 'cool'){
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode,"tempHc":OthersModeTemp.toFixed(0)+''}]);
                    }else if(mode == 'heat'){
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode,"tempHc":OthersModeTemp.toFixed(0)+''}]);
                    }else if(mode == 'off'){
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode}]);
                    }else if(mode == 'eco'){
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode, "tempHc":ECOMaxT.toFixed(0)+'',"tempLc":ECOMinT.toFixed(0)+''}]);
                    }else {
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode, "tempHc":CHMaxT.toFixed(0)+'',"tempLc":CHMinT.toFixed(0)+''}]);
                    }
                },2000);
            }
            function sendOnlyModeToCube(){
                //window.clearTimeout(sendTimeoutForMode);
                //sendTimeoutForMode = setTimeout(function(){
                window.clearTimeout(sendTimeoutForValue);
                    if(mode == 'cool'){
                        nestLoading(25000);
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode}]);
                        setTimeout(function () {
                            cordova.exec(function (data) {}, null, "FTP2PApi","getNestInfo",[nodeid]);
                        },8000)
                    }else if(mode == 'heat'){
                        nestLoading(25000);
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode}]);
                        setTimeout(function () {
                            cordova.exec(function (data) {}, null, "FTP2PApi","getNestInfo",[nodeid]);
                        },8000)
                    }else if(mode == 'off'){
                        nestLoading(25000);
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode}]);
                        setTimeout(function () {
                            cordova.exec(function (data) {}, null, "FTP2PApi","getNestInfo",[nodeid]);
                        },8000)
                    }else if(mode == 'eco'){
                        nestLoading(25000);
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode}]);
                        setTimeout(function () {
                            cordova.exec(function (data) {}, null, "FTP2PApi","getNestInfo",[nodeid]);
                        },8000)
                    }else {
                        nestLoading(25000);
                        cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeid,"hvac01", {"hvacMode":mode}]);
                        setTimeout(function () {
                            cordova.exec(function (data) {}, null, "FTP2PApi","getNestInfo",[nodeid]);
                        },8000)
                    }
                //    sendTimeoutForMode = 0;
                //},5000);
            }
            // 以下四种为auto和eco模式的递增递减
            function temperatureLeftAdd() {
                var tempMin = CHMinT;
                tempMin++;
                if(tempMin >= 31) {
                    CHMinT = 31;
                } else {
                    if(tempMin<CHMaxT) {
                        CHMinT++;
                    }else if(tempMin == CHMaxT){
                        CHMinT++;
                        CHMaxT++;
                    }
                }
                getMaxNestTemperature(CHMaxT);
                getMinNestTemperature(CHMinT);
                sendTocube();
            }
            function temperatureLeftMinus() {
                var tempMin = CHMinT;
                tempMin--;
                if(tempMin <=9) {
                    CHMinT = 9;
                }else{
                    if(tempMin<CHMaxT) {
                        CHMinT--;
                    }
                }
                getMinNestTemperature(CHMinT);
                sendTocube();
            }
            function temperatureRightAdd() {
                var tempMax = CHMaxT;
                tempMax--;
                if(tempMax <= 10) {
                    CHMaxT = 10;
                    CHMinT = 9;
                } else {
                    if(tempMax>CHMinT) {
                        CHMaxT--;
                    }else if(tempMax == CHMinT){
                        CHMaxT--;
                        CHMinT--;

                    }
                }
                getMaxNestTemperature(CHMaxT);
                getMinNestTemperature(CHMinT);
                sendTocube();
            }
            function temperatureRightMinus() {
                var tempMax = CHMaxT;
                tempMax++;
                if(tempMax >= 32) {
                    CHMaxT = 32;
                } else {
                    if(tempMax>CHMinT) {
                        CHMaxT++;
                    }
                }
                getMaxNestTemperature(CHMaxT);
                sendTocube();
            }
            // heat/cool/off递减
            function othersTemperatureAdd() {
                var tempMax = OthersModeTemp;
                tempMax++;
                if(tempMax >= 32) {
                    OthersModeTemp = 32;
                } else {
                    if(tempMax>OthersModeTemp) {
                        OthersModeTemp++;
                    }
                }
                getOthersModeTemperature(OthersModeTemp);
                sendTocube();
            }

            // heat/cool/off递增
            function othersTemperaturePlus() {
                var tempMax = OthersModeTemp;
                tempMax--;
                if(tempMax <= 9) {
                    OthersModeTemp = 9;
                } else {
                    if(tempMax<OthersModeTemp) {
                        OthersModeTemp--;
                    }
                }
                getOthersModeTemperature(OthersModeTemp);
                sendTocube();
            }
            function sendTocube(){
                bus.$emit('test2',{min: CHMinT,max:CHMaxT,HCMax:OthersModeTemp});
            }
            // 获取auto/eco的min值
            function getMinNestTemperature(tempValue) {
                if(mode == 'eco'){
                    ECOMinT = tempValue
                }else{
                    CHMinT = tempValue;
                }
                if(unitC){
                    convertToCelsius = tempValue;
                    if(convertToCelsius > 32) {
                        convertToCelsius = 32;
                    } else if(convertToCelsius < 9 ) {
                        convertToCelsius = 9;
                    }
                }else{
                    var convertToCelsius = (Number(tempValue)*1.8)+32;
                    if(convertToCelsius > 89.6) {
                        convertToCelsius = 89.6;
                    } else if(convertToCelsius < 48.2 ) {
                        convertToCelsius = 48.2;
                    }
                }
                self.setMinNestTemperature = Number(convertToCelsius).toFixed(1);
            }

            // 获取auto/eco的max值
            function getMaxNestTemperature(tempValue) {
                if(mode == 'eco'){
                    ECOMaxT = tempValue
                }else{
                    CHMaxT = tempValue;
                }
                if(unitC){
                    convertToCelsius = tempValue;
                    if(convertToCelsius > 32) {
                        convertToCelsius = 32;
                    } else if(convertToCelsius < 9 ) {
                        convertToCelsius = 9;
                    }
                }else{
                    var convertToCelsius = (Number(tempValue)*1.8)+32;
                    if(convertToCelsius > 89.6) {
                        convertToCelsius = 89.6;
                    } else if(convertToCelsius < 48.2 ) {
                        convertToCelsius = 48.2;
                    }
                }
                self.setMaxNestTemperature = Number(convertToCelsius).toFixed(1);
            }

            // 获取heat/cool/off的值
            function getOthersModeTemperature(tempValue) {
                OthersModeTemp = tempValue;

                if(unitC){
                    convertToCelsius = tempValue;
                    if(convertToCelsius > 32) {
                        convertToCelsius = 32;
                    } else if(convertToCelsius < 9 ) {
                        convertToCelsius = 9;
                    }
                }else{
                    var convertToCelsius = (Number(tempValue)*1.8)+32;
                    if(convertToCelsius > 89.6) {
                        convertToCelsius = 89.6;
                    } else if(convertToCelsius < 48.2 ) {
                        convertToCelsius = 48.2;
                    }
                }
                self.setOthersModeTemp = Number(convertToCelsius).toFixed(1);
            }
            // 点击改变mode并获取相应值
            function modeRouteChange() {
                if(self.currentModeIndex == 0) {
                    self.autoEcoModeNest = true;
                    self.twinMinMax = true;
                    mode = 'heat-cool';
                    setTimeout(function () {
                        getMinNestTemperature(CHMinT);
                        getMaxNestTemperature(CHMaxT);
                    },10);
                    sendOnlyModeToCube();
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:CHMaxT,min:CHMinT,current:currentT});
                } else if(self.currentModeIndex == 1){
                    self.autoEcoModeNest = true;
                    self.offOrNot = false;
                    self.twinMinMax = false;
                    mode = 'eco';
                    setTimeout(function () {
                        getMinNestTemperature(ECOMinT);
                        getMaxNestTemperature(ECOMaxT);
                    },10);
                    sendOnlyModeToCube();
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:ECOMaxT,min:ECOMinT,current:currentT});
                }else if(self.currentModeIndex == 2) {
                    self.autoEcoModeNest = false;
                    self.offOrNot = true;
                    mode = 'heat';
                    sendOnlyModeToCube();
                    getOthersModeTemperature(OthersModeTemp);
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:OthersModeTemp,min:currentT,current:currentT});
                } else if (self.currentModeIndex == 3) {
                    self.autoEcoModeNest = false;
                    self.offOrNot = true;
                    mode = 'cool';
                    getOthersModeTemperature(OthersModeTemp);
                    sendOnlyModeToCube();
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:OthersModeTemp,min:currentT,current:currentT});
                } else if(self.currentModeIndex == 4) {
                    self.autoEcoModeNest = false;
                    self.offOrNot = false;
                    // 切换为off时只显示当前值
                    mode = 'off';
                    getOthersModeTemperature(OthersModeTemp);
                    sendOnlyModeToCube();
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:currentT,min:currentT,current:currentT});
                }
            }

            function initMode() {
                if(mode == 'heat-cool') {
                    self.currentModeIndex = 0;
                    self.autoEcoModeNest = true;
                    self.twinMinMax = true;
                    getMinNestTemperature(CHMinT);
                    getMaxNestTemperature(CHMaxT);
                    mode = 'heat-cool';
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:CHMaxT,min:CHMinT,current:currentT});
                } else if(mode == 'eco'){
                    self.currentModeIndex = 1;
                    self.autoEcoModeNest = true;
                    self.offOrNot = false;
                    self.twinMinMax = false;
                    getMinNestTemperature(ECOMinT);
                    getMaxNestTemperature(ECOMaxT);
                    mode = 'eco';
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:ECOMaxT,min:ECOMinT,current:currentT});
                }else if(mode == 'heat') {
                    self.currentModeIndex = 2;
                    self.autoEcoModeNest = false;
                    self.offOrNot = true;
                    getOthersModeTemperature(OthersModeTemp);
                    mode = 'heat';
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:OthersModeTemp,min:currentT,current:currentT});
                } else if (mode == 'cool') {
                    self.currentModeIndex = 3;
                    self.autoEcoModeNest = false;
                    self.offOrNot = true;
                    getOthersModeTemperature(OthersModeTemp);
                    mode = 'cool';
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:OthersModeTemp,min:currentT,current:currentT});
                } else if(mode == 'off') {
                    self.currentModeIndex = 4;
                    self.autoEcoModeNest = false;
                    self.offOrNot = false;
                    // 切换为off时只显示当前值
                    mode = 'off';
                    getOthersModeTemperature(OthersModeTemp);
                    bus.$emit('forMode',{mode: self.currentModeIndex,max:currentT,min:currentT,current:currentT});
                }
            }

            function listenStuff(){
                cordova.exec(function (data) {
                    var obj=JSON.parse(data);
                    var value=obj.value;
                    if(value=="true"){
                        unitC = false;
                    }else if(value=="false"){
                        unitC = true;
                    }else if(value==true){
                        unitC = false;
                    }else if(value==false){
                        unitC = true;
                    }
                    cordova.exec(function (data) {}, null, "FTP2PApi","getNestInfo",[nodeid]);
                },null,"FTP2PApi","getUnit",[""]);
                    window.addEventListener('ftdevicestatusupdate', function (data) {
                        if(data.title === "Language"){

                        }
                            if(data.title === "NestStatus"){
                                var dataSY = data.content;
                                dataSY = JSON.parse(dataSY);
                                if(nodeid === dataSY['serialNumber']){
                                    mode = dataSY['hvacMode'];
                                    CHMaxT = Number(dataSY['target_temperature_high']);
                                    CHMinT = Number(dataSY['target_temperature_low']);
                                    ECOMaxT = Number(dataSY['eco_temperature_high']);
                                    ECOMinT = Number(dataSY['eco_temperature_low']);
                                    currentT = Number(dataSY['ambient_temperature']);
                                    OthersModeTemp = Number(dataSY['target_temperature']);
                                    self.humidityValue = Number(dataSY['humidity']);
                                    self.TempValue = Number(dataSY['ambient_temperature']).toFixed(1)+'°C';
                                    if(unitC!=true){
                                        self.TempValue = (Number(dataSY['ambient_temperature'])*1.8+32).toFixed(1)+'°F';
                                    }
                                    setTimeout(function () {
                                        removeLoading(100);
                                        initMode();
                                    },100)
                                }
                            }
                    }, false);
            }

        };
        return obj;
    });
