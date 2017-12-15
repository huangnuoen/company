/**
 * Created by qkchung on 15/11/13.
 */
window.onload = function testStart() {
    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    var resourceTypeID = '';
    var TypeName = '';
    var condition = 0;
    var val = 0;
    var pageId = Param['pageid'];
    var nodeID = Param['deviceId'];
    var operateID = Param['operateID'];
    var model = Param['model'];
    var isC = true;
    var globalTextsOBJ = null;
    var allDATA = {};
    FastClick.attach(document.body);
    var pickerData = {
        resourceTypeID:'',
        resourceTypeName:'',
        route:0,
        condition:0,
        val:0,
        val2:''
    };
    var els = {
        "route":{
            'scrollCellHolder':0,
            'scrollCell':0
        },
        "pickingRouter":{
            "scrollCellHolder":0,
            "scrollCell":0
        },
        "pick_val":{
            "scrollCellHolder":0,
            "scrollCell":0
        },
        "pick_val2":{
            "scrollCellHolder":0,
            "scrollCell":0
        },
        "condition_status":{
            "scrollCellHolder":0,
            "scrollCell":0
        }
    };
    var bus = new Vue;
    model = 'FT096';
    pageId = '000006';
    // initResourceTypeID();
    getLangScript();
    function getLangScript() {
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
            setTimeout(function () {
                rockThemData();
                switchView(); //todo 测试代码
                // getDeviceData();//todo 生产代码
            },0);
        });
    }
    // document.addEventListener('touchstart', function (e) {cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);});

    function initResourceTypeID() {
        var model_EL = {
            'FT101':'Cube', // cube FT102-Touch
            'FT098':'OnOff', // OOMI_RGB_BULB
            'FT096':'OnOff', // OnOff
            'FT139':'OnOff', // OOMI_IN_WALL_SWITCH
            'FT100':'Cube', // OOMI_MULTISENSOR
            'FT111':'OnOff', // OOMI_IN_WALL_DIMMER
            'FT113':'Camera',
            "FT109":'Air', // OOMI_AIR
            'FT112':'Door_window', // OOMI_DOORWINDOWSENSOR
            "FT118":'RANGE_EXTENDER', // OOMI_RANGE_EXTENDER
            "FT115":'Dock', // OOMI_DOCK
            'FT104':'OOMI_STREAMER',
            'FT121':'OnOff', // OOMI_LED_STRIP
            'FT149':'Siren', // OOMI_SIREN
            'TPD16':'OnOff', // SWITCH_BINARY
            'TPD17':'OnOff', // SWITCH_MULTILEVEL
            'TPD64':'Doorlock', // ENTRY_CONTROL
            'TPD32OC':'NewMotion', // SENSOR_BINARY_OC
            'NEST01':'', // NEST01
            'PHILIPS02':'OnOff', // PHLight
            'TPD32MO':'NewMotion', // SENSOR_BINARY_MO
            'TPD32':'NewMotion', // SENSOR_BINARY_32
            'FT153':'OnOff', // OOMI_TOUCH_PANNEL
            'TPD07':'NewMotion', // TPD_DOORWINDOWSENSOR
            'FT014':'OnOff', // OOMI_MOTOR_CONTROLLER
            'FT145':'OnOff', // OOMI_PLUG_CN
            'FT122':'WaterSensor', //
            'FTARM':'Security'
        };
        var whichNotToRemove = model_EL[model];
        eval('make'+ whichNotToRemove +'Data'+'()');
        function makeCubeData() {
            resourceTypeID = 'temperature01';
            TypeName = 'temperature';
        }
        function makeDoor_windowData() {
            resourceTypeID = 'magnet01';
            TypeName = 'status';
        }
        function makeSirenData() {
            resourceTypeID = 'binsw01';
            TypeName = 'status';
        }
        function makeSensorData() {
            resourceTypeID = 'sensor01';
            TypeName = 'status';
        }
        function makeNewMotionData() {

        }
        function makeDockData() {

        }
        function makeWaterSensorData() {
            resourceTypeID = 'water01';
            TypeName = 'status';
        }
        function makeSecurityData() {

        }
        function makeOnOffData() {
            resourceTypeID = 'binsw01';
            TypeName = 'status';
        }
        // function makeBulbData() {
        //     resourceTypeID = 'mlevel01';
        //     TypeName = 'mtLevel';
        // }
        // function makeDimmerData() {
        //     resourceTypeID = 'mlevel01';
        //     TypeName = 'mtLevel';
        // }
    }

    function switchView() {
        var model_EL = {
            'FT101':'Cube', // cube FT102-Touch
            'FT098':'OnOff', // OOMI_RGB_BULB
            'FT096':'OnOff', // OnOff
            'FT139':'OnOff', // OOMI_IN_WALL_SWITCH
            'FT100':'Cube', // OOMI_MULTISENSOR
            'FT111':'OnOff', // OOMI_IN_WALL_DIMMER
            'FT113':'Camera',
            "FT109":'Air', // OOMI_AIR
            'FT112':'Door_window', // OOMI_DOORWINDOWSENSOR
            "FT118":'RANGE_EXTENDER', // OOMI_RANGE_EXTENDER
            "FT115":'Dock', // OOMI_DOCK
            'FT104':'OOMI_STREAMER',
            'FT121':'OnOff', // OOMI_LED_STRIP
            'FT149':'Siren', // OOMI_SIREN
            'TPD16':'OnOff', // SWITCH_BINARY
            'TPD17':'OnOff', // SWITCH_MULTILEVEL
            'TPD64':'Doorlock', // ENTRY_CONTROL
            'TPD32OC':'NewMotion', // SENSOR_BINARY_OC
            'NEST01':'', // NEST01
            'PHILIPS02':'OnOff', // PHLight
            'TPD32MO':'NewMotion', // SENSOR_BINARY_MO
            'TPD32':'NewMotion', // SENSOR_BINARY_32
            'FT153':'OnOff', // OOMI_TOUCH_PANNEL
            'TPD07':'NewMotion', // TPD_DOORWINDOWSENSOR
            'FT014':'OnOff', // OOMI_MOTOR_CONTROLLER
            'FT145':'OnOff', // OOMI_PLUG_CN
            'FT122':'WaterSensor', //
            'FTARM':'Security'
        };
        var whichNotToRemove = model_EL[model];
        eval('make'+ whichNotToRemove +'Data'+'()');
        function makeCubeData() {
            Vue.use(VueRouter);
            initRout();
        }
        function makeDoor_windowData() {
            getData();
            function getData() {
                var obj = [];
                if (pageId === '000006'){
                    obj = allDATA.Door_window000006;
                    loadThem(obj,{width:'50%', left:'0'},globalTextsOBJ.IQ_ACTION+':')
                }else {
                    obj = allDATA.Door_window000007;
                    loadThem(obj,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
                }
            }
        }
        function makeSirenData() {
            var pickerSiren = allDATA.onOff;
            loadThem(pickerSiren,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
        }
        function makeSensorData() {
            var pickerSensor = allDATA.onOff;
            loadThem(pickerSensor,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
        }
        function makeNewMotionData() {

        }
        function makeDockData() {
            getData();
            function getData() {
                var obj = [];
                if (pageId === '000006'){
                    obj = allDATA.Dock000006;
                    loadThem(obj,{width:'50%', left:'0'},globalTextsOBJ.IQ_ACTION+':')
                }else {
                    obj = allDATA.Dock000007;
                    loadThem(obj,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
                }
            }
        }
        function makeWaterSensorData() {
            var pickerDoor_window = getData();
            function getData() {
                var obj = [];
                if (pageId === '000006'){
                    obj = allDATA.waterSensor000006
                }else {
                    obj = allDATA.waterSensor000007
                }
                return obj;
            }
            loadThem(pickerDoor_window,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
        }
        function makeSecurityData() {
            var pickerDoor_window = allDATA.security;
            if (pageId === '000006'){
                loadThem(pickerDoor_window,{width:'50%', left:'0'},globalTextsOBJ.IQ_BECOMES+':')
            }else {
                loadThem(pickerDoor_window,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
            }
        }
        function makeOnOffData() {
            var pickerDoor_window = allDATA.onOff;
            loadThem(pickerDoor_window,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
        }
        function makeBulbData() {
            var pickerDoor_window = allDATA.onOff;
            loadThem(pickerDoor_window,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
        }
        function makeDimmerData() {
            var pickerDoor_window = allDATA.onOff;
            loadThem(pickerDoor_window,{width:'50%', left:'0'},globalTextsOBJ.IQ_STATUS+':')
        }
    }

    function getDeviceData() {
        document.addEventListener('deviceready', function (){
            cordova.exec(function (data1) {
                var obj = JSON.parse(data1);
                var value=obj.value;
                isC = value === "false";
            },null,"FTP2PApi","getUnit",[""]);
            if(pageId === '000006'){
                getStatus('getIQTriggersStatus','saveIQTriggers')
            }else if(pageId === '000007'){
                getStatus('getIQConditionsStatus','saveIQConditions')
            }

            function getStatus(getIQStatus,saveIQ) {
                cordova.exec(function (data) {
                    var obj = stringToJson(data);
                    var value = obj.value;
                    if(getJsonLength(value) !== 0) {
                        var resTypeId = value['resTypeId'];
                        var valueType = Number(value['valueType']);
                        for(var i in value){
                            var status = value[i];
                        }
                        setStatus(status,valueType,resTypeId);
                        setTimeout(function () {
                            switchView();
                        },10);
                    }else{
                        initStatus(saveIQ,resourceTypeID);
                    }
                }, null, "FTP2PApi",getIQStatus, [operateID]);
            }
            function setStatus(status,valueType,resTypeId) {
                val = status;
                if(model === 'FT101' || model === 'FT100'){
                    switch (resTypeId){
                        case 'hum01':
                        case 'temperature01':
                            pickerData.route = 0;
                            if (valueType === 3){
                                pickerData.condition = 0;
                                condition = 3;
                            }else if (valueType === 4){
                                condition = 4;
                                pickerData.condition = 1;
                            }else if (valueType === 0){
                                // pickerData.condition = 3;
                            }
                            pickerData.val = Number(status)+49; //todo
                            break;
                        case 'pir01':
                            pickerData.route = 1;
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'lum01':
                            pickerData.route = 2;
                            if (status === 3){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                    }
                }else {
                    switch (resTypeId){
                        case 'hum01':
                        case 'temperature01':
                            pickerData.route = 0;
                            if (valueType === 3){
                                pickerData.condition = 1;
                                condition = 3;
                            }else if (valueType === 4){
                                condition = 4;
                                pickerData.condition = 0;
                            }else if (valueType === 0){
                                // pickerData.condition = 3;
                            }
                            pickerData.val = status+50; //todo
                            break;
                        case 'pir01':
                            pickerData.route = 1;
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'lum01':
                            pickerData.route = 2;
                            if (status === 3){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'binsw01':
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;

                        case 'magnet01':
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'sensor01':
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'rgbbulb01':
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'mlevel01':
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                        case 'water01':
                            if(status === true){
                                pickerData.val = 0;
                            }else if(status === 'true'){
                                pickerData.val = 0;
                            }else {
                                pickerData.val = 1;
                            }
                            break;
                    }
                }
            }
            function initStatus(saveIQ,resourceTypeID) {
                switch (resourceTypeID){
                    case 'temperature01':
                        save(saveIQ,resourceTypeID,'temperature',4,0);
                        val = 0;
                        condition = 4;
                        pickerData.val = 50;
                        break;
                    case 'binsw01':
                        save(saveIQ,resourceTypeID,'status',0,true);
                        val = true;
                        condition = 0;
                        break;
                    case 'pir01':
                        save(saveIQ,resourceTypeID,'status',0,true);
                        val = true;
                        condition = 0;
                        break;
                    case 'lum01':
                        save(saveIQ,resourceTypeID,'illuminance',4,40);
                        val = 40;
                        condition = 3;
                        break;
                    case 'hum01':
                        save(saveIQ,resourceTypeID,'humidity',0,0);
                        break;
                    case 'magnet01':
                        save(saveIQ,resourceTypeID,'status',0,true);
                        val = true;
                        condition = 0;
                        break;
                    case 'sensor01':
                        save(saveIQ,resourceTypeID,'status',0,true);
                        val = true;
                        condition = 0;
                        break;
                    case 'rgbbulb01':
                        save(saveIQ,resourceTypeID,'brightness',1,0);
                        val = true;
                        condition = 0;
                        break;
                    case 'mlevel01':
                        save(saveIQ,resourceTypeID,'mtLevel',1,0);
                        val = true;
                        condition = 0;
                        break;
                    case 'water01':
                        save(saveIQ,resourceTypeID,'status',1,0);
                        val = true;
                        condition = 0;
                        break;
                }
            }
            function save(getIQStatus,resourceTypeID,typeName,condition,data) {
                cordova.exec(null, null, "FTP2PApi", getIQStatus, [nodeID,resourceTypeID,typeName,operateID,condition,data]);
                switchView();
            }
            function stringToJson(data){
                var result = data;
                if(data.indexOf('"{')>0){
                    result = result.replace("\[", '[');
                    result = result.replace(/"\[/g, '[');
                    result = result.replace(/]"/g, ']');
                    result = result.replace(/"{/g, '{');
                    result = result.replace(/}"/g, '}');
                    result = result.replace(/\\/g, '');
                }else{
                    return {'value':{}};
                }
                return JSON.parse(result);
            }
            function getJsonLength(jsonData){
                console.log(JSON.stringify(jsonData));
                var jsonLength = 0;
                for(var item in jsonData){
                    jsonLength++;
                }
                return jsonLength;
            }
        },false);
    }


    function initRout() {
        // var hum = { template: '<hum-holder></hum-holder>' };
        var temp = { template: '<temp-holder></temp-holder>' };
        var motion = { template: '<mo-holder></mo-holder>' };
        // var uv = { template:'<uv-holder></uv-holder>'};
        var light = { template:'<light-holder></light-holder>'};

        var thisComponent = null;
        var router = new VueRouter({
            routes: [
                { path: '/temp', name: 'temp', component: temp },
                // { path: '/hum', name: 'hum', component: hum },
                { path: '/motion', name: 'motion', component: motion },
                // { path: '/uv', name: 'uv', component: uv },
                { path: '/light', name: 'light', component: light }
            ]
        });
        new Vue({
            router: router,
            template:'#CubeRout',
            mounted:function(){
                var toPush = 'temp';
                if (pickerData.route === 0){
                    toPush = 'temp';
                    resourceTypeID = 'temperature01';
                    TypeName = 'temperature';
                }
                if (pickerData.route === 1){
                    resourceTypeID = 'pir01';
                    TypeName = 'status';
                    toPush = 'motion';
                }
                if (pickerData.route === 2){
                    resourceTypeID = 'lum01';
                    TypeName = 'illuminance';
                    toPush = 'light';
                }
                // if (pickerData.route === 3){
                //     toPush = 'uv';
                // }
                // if (pickerData.route === 4){
                //     toPush = 'light';
                // }
                thisComponent = this;
                router.push(toPush);
                bus.$on('scrollEnd',function (data) {
                    if (data.type === 'Routing'){
                        switch (data.command){
                            case 'temp':
                                router.push('temp');
                                pickerData.val = 50;
                                val = 0;
                                condition = 4;
                                resourceTypeID = 'temperature01';
                                TypeName = 'temperature';
                                break;
                            case 'hum':
                                router.push('hum');
                                pickerData.val = 0;
                                val = 0;
                                condition = 4;
                                break;
                            case 'motion':
                                router.push('motion');
                                pickerData.val = 0;
                                val = true;
                                resourceTypeID = 'pir01';
                                TypeName = 'status';
                                condition = 0;
                                break;
                            case 'uv':
                                router.push('uv');
                                pickerData.val = 0;
                                val = 0;
                                condition = 3;
                                break;
                            case 'light':
                                router.push('light');
                                pickerData.val = 0;
                                val = 40;
                                condition = 3;
                                resourceTypeID = 'lum01';
                                TypeName = 'illuminance';
                                break;
                        }
                    }
                })
            },
            created: function () {
            },
            data:function () {
                return {
                    nav:true,
                    cellInfo:allDATA.Rout,
                    style: {width:'20%', left:'0'},
                    myid:'pickingRouter'
                }
            },
            methods:{
            }
        }).$mount('#showWindow');
    }

    function loadThem(picker,style,topic) {
        Vue.component('outHolder', {
            name:'outHolder',
            template: '#outHolder',
            data: function () {
                return {
                    pickers:picker,
                    style: style,
                    topics:topic
                }
            },
            mounted:function(){
            },
            methods:{
            }
        });

        new Vue({
            el: '#showWindow',
            data: function () {
                return {
                }
            }
        });
    }


    /*************picker logic***************/
    (function OomiRunpicker() {
        function setItem(myID,myEl,loc) {
            els[myID][loc] = myEl;
        }

        Vue.component('picker', {
            name:'picker',
            thisInterval:0,
            template: '#picker',
            props:['info','scrollStyle','myid'],
            mounted:function(){
                var thisComponent = this;
                var length = this.$options.propsData.info.length;
                var myid = this.$options.propsData.myid;
                var rootEl =  $('#'+myid);
                var bodyH = $('body').height();
                setItem(myid,rootEl.find('.scrollCell'),'scrollCell');
                setItem(myid,rootEl.find('.scrollCellHolder'),'scrollCellHolder');
                setTimeout(function () {
                    bodyH = bodyH*0.33333;
                    els[myid].scrollCellHolder.css('height',length*bodyH+'px');
                    $('.scrollCell').css({'line-height':bodyH + 'px','height':+bodyH+'px'});
                    $('.topicHolder').css('line-height',bodyH*3 + 'px');
                    thisComponent.pickerDouble2();
                },1);
            },
            methods:{
                pickerDouble2:function () {
                    var thisComponent = this;
                    var effectInterval = 0;
                    var effectStopper = 0;
                    var propsData = this.$options.propsData;
                    var myid = propsData.myid;
                    var thisEl = els[myid];
                    function render(){
                        thisEl.scrollCell.css({'color':'#9B9B9B','font-size':'medium'});
                        var scrollY = thisEl.scrollCellHolder.css('transform').match(/\d+/g)[5]/thisEl.scrollCell[0].clientHeight;
                        scrollY =  Math.floor(scrollY);
                        thisEl.scrollCell.eq(scrollY).css({'font-size':'x-large',color:'#EC591A'})
                    }
                    function getPosition(){
                        var a = '';
                        switch (thisComponent.$options.propsData.myid){
                            case 'pickingRouter':
                                a = pickerData.route;
                                break;
                            case 'condition_status':
                                a = pickerData.condition;
                                break;
                            case 'pick_val':
                                a = pickerData.val;
                                break
                        }
                        return a;
                    }
                    function sendTo() {
                        var scrollY = thisEl.scrollCellHolder.css('transform').match(/\d+/g)[5]/thisEl.scrollCell[0].clientHeight;
                        scrollY =  Math.floor(Number(scrollY));
                        bus.$emit('scrollEnd',{type:propsData.info[Number(scrollY)].type,command:propsData.info[Number(scrollY)].command});

                    }
                    var myScroll = new Swiper('#'+propsData.myid,{
                        autoplay:false,
                        direction:'vertical',
                        width: '100%',
                        loop:false,
                        // speed:100,
                        initialSlide:getPosition(),
                        freeMode:true,
                        freeModeMomentum:true,
                        freeModeMomentumRatio:1,
                        freeModeMomentumVelocityRatio:1,
                        preventClicks:true,
                        freeModeMinimumVelocity:0.05,
                        on:{
                            init: function(){
                                render();
                            },
                            touchStart: function(event){
                                cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["true"]);
                                window.clearInterval(effectInterval);
                                window.clearTimeout(effectStopper);
                                effectInterval = setInterval(function () {
                                    render();
                                },100);
                            },
                            touchEnd:function (event) {
                                effectStopper = setTimeout(function () {
                                    window.clearInterval(effectInterval);
                                    sendTo();
                                    myScroll.slideTo(myScroll.activeIndex, 100, false);
                                    render();
                                },1020);
                                sendTo();
                                myScroll.slideTo(myScroll.activeIndex, 100, false);
                                render();
                            },
                            tap: function(){
                                window.clearInterval(effectInterval);
                                window.clearTimeout(effectStopper);
                                var scrollY = thisEl.scrollCellHolder.css('transform').match(/\d+/g)[5]/thisEl.scrollCell[0].clientHeight;
                                scrollY =  Math.floor(Number(scrollY));
                                bus.$emit('scrollEnd',{type:propsData.info[Number(scrollY)].type,command:propsData.info[Number(scrollY)].command});
                                myScroll.slideTo(myScroll.activeIndex, 100, false);
                                render();
                            },
                            transitionEnd:function(){
                                // thisComponent.myScroll.slideTo(thisComponent.myScroll.activeIndex, 0, false);
                                // render();
                            },
                            click: function(){
                                window.clearInterval(effectInterval);
                                window.clearTimeout(effectStopper);
                                myScroll.slideTo(myScroll.activeIndex, 100, false);
                                render();
                            }
                        }
                    });
                }
            }
        });
    })();

    /*************picker logic***************/

    /*************components***************/
    setTimeout(function () {
        loadComponents()
    },1);
    function loadComponents() {
        var om2 = Oomi_command_function.create_new();
        var Param = om2.resource_data();
        var lang = Param.language;
        var isC = true;
        var globalTextsOBJ = null;
        var component = {
            hum:{},
            temp:{},
            uv:{}
        };
        getLangScript();
        function getLangScript() {
            var scriptOBJ = selectLanguage2(lang);
            $.getScript(scriptOBJ.url, function () {
                globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
            });
        }
        document.addEventListener('deviceready', function (){
            cordova.exec(function (data1) {
                var obj=JSON.parse(data1);
                var value=obj.value;
                isC = value !== "false";
            },null,"FTP2PApi","getUnit",[""]);
        });
        bus.$on('scrollEnd',function (data) {
            setTimeout(function () {
                if (data.type === 'temp'){
                    condition = Number(data.command);
                }else if(data.type === 'light'){
                    val = 40;
                    condition = data.command;
                }else if(data.type === 'Routing'){

                }else {
                    val = data.command;
                }
                console.log(resourceTypeID);
                console.log(TypeName);
                console.log(condition);
                console.log(val);
                console.log('******************');
                if(pageId === '000006'){
                    cordova.exec(null, null, "FTP2PApi", 'saveIQTriggers', [nodeID,resourceTypeID,TypeName,operateID,condition,val]);
                }else if(pageId === '000007'){
                    cordova.exec(null, null, "FTP2PApi", 'saveIQConditions', [nodeID,resourceTypeID,TypeName,operateID,condition,val]);
                }
            },100);

        });
        Vue.component('humHolder', {
            name:'humHolder',
            template: '#humHolder',
            data:function () {
                return {
                    pickers:this.getData()
                }
            },
            mounted:function(){
                component.hum = this;
            },
            methods:{
                getData:function () {
                    var thisObj = [];
                    if (pageId === '000006') {
                        thisObj = allDATA.hum000006
                    }else {
                        thisObj = allDATA.hum000006
                    }
                    return thisObj;
                }
            }
        });
        Vue.component('tempHolder', {
            name:'tempHolder',
            template: '#tempHolder',
            data:function () {
                return {
                    pickers:this.getData()
                }
            },
            mounted:function(){
                component.temp = this;
            },
            methods:{
                getData:function () {
                    var thisObj = [];

                    if (pageId === '000006') {
                        thisObj = allDATA.temp000006
                    }else {
                        thisObj = allDATA.temp000006
                    }
                    return thisObj;
                }
            }
        });
        Vue.component('uvHolder', {
            name:'uvHolder',
            template: '#uvHolder',
            data:function () {
                return {
                    pickers:this.getData()
                }
            },
            mounted:function(){
                component.uv = this;
            },
            methods:{
                getData:function () {
                    var thisObj = [];
                    if (pageId === '000006') {
                        thisObj = allDATA.UV000006
                    }else {
                        thisObj = allDATA.UV000006
                    }
                    return thisObj;
                }
            }
        });
        Vue.component('moHolder', {
            name:'moHolder',
            template: '#moHolder',
            data:function () {
                return {
                    pickers: allDATA.MO
                }
            },
            mounted:function(){
            },
            methods:{
            }
        });
        Vue.component('lightHolder', {
            name:'lightHolder',
            template: '#lightHolder',
            data:function () {
                return {
                    pickers:allDATA.Light
                }
            },
            mounted:function(){
            },
            methods:{
            }
        });

    }
    /*************components***************/

    /*************the data***************/
    function rockThemData() {
        allDATA = {
            Rout:[
                // {text:globalTextsOBJ.IQ_HUMIDITY,type:'Routing', command:'hum',style:{top:'0'}},
                {text:globalTextsOBJ.IQ_Temperature,type:'Routing', command:'temp',style:{}},
                {text:globalTextsOBJ.IQ_motion,type:'Routing', command:'motion',style:{}},
                // {text:globalTextsOBJ.IQ_UV,type:'Routing', command:'uv',style:{top:'60%'}},
                {text:globalTextsOBJ.IQ_Light,type:'Routing', command:'light',style:{}}
            ],
            hum000006:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_ABOVE,type:'hum',command:'4',style:{}},
                    {text:globalTextsOBJ.IQ_BELOW,type:'hum',command:'3',style:{}}],
                    style:{width:'50%', left:'0'},myid:'condition_status'},
                {cellInfo:makeVal(0,100,1,2), style: {width:'50%', left:'50%'},myid:'pick_val'}
            ],
            hum000007:[
                {cellInfo:[{text:globalTextsOBJ.IQ_ABOVE,type:'hum',command:'4',style:{top:'0'}},
                    {text:globalTextsOBJ.IQ_BELOW,type:'hum',command:'3',style:{}},
                    {text:globalTextsOBJ.IQ_BETWEEN,type:'hum',command:'3',style:{}},
                    {text:globalTextsOBJ.IQ_OUTSIDE,type:'hum',command:'3',style:{}}],
                    style:{width:'33.33%', left:'0'},myid:'condition_status'},
                {cellInfo:makeVal(0,100,1,2), style: {width:'66.666%', left:'33.333%'},myid:'pick_val'},
                {cellInfo:makeVal(0,100,1,3), style: {width:'33.33%', left:'66.66%',visibility:'hidden'},myid:'pick_val2'}
            ],
            temp000006:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_ABOVE,type:'temp',command:'4',style:{}},
                    {text:globalTextsOBJ.IQ_BELOW,type:'temp',command:'3',style:{}}],
                    myid:'condition_status', style:{width:'50%', left:'0'}},
                {cellInfo:makeTempVal(-50,51,1,2), style: {width:'50%', left:'50%'},myid:'pick_val'}
            ],
            temp000007:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_ABOVE,type:'temp',command:'1',style:{}},
                    {text:globalTextsOBJ.IQ_BELOW,type:'temp',command:'2',style:{}},
                    {text:globalTextsOBJ.IQ_BETWEEN,type:'temp',command:'3',style:{}},
                    {text:globalTextsOBJ.IQ_OUTSIDE,type:'hum',command:'3',style:{}}], style:{width:'33.33%', left:'0'},myid:'condition_status'},
                {cellInfo:makeTempVal(-50,51,1,2), style: {width:'66.666%', left:'33.33%'},myid:'pick_val'},
                {cellInfo:makeTempVal(-50,51,1,3), style: {width:'33.33%', left:'66.66%',visibility:'hidden'},myid:'pick_val2'}
            ],
            UV000006:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_ABOVE,type:'uv',command:'1',style:{}},
                    {text:globalTextsOBJ.IQ_BELOW,type:'uv',command:'2',style:{}}],
                    style:{width:'50%', left:'0'},myid:'condition_status'},
                {cellInfo:makeVal(0,100,1,2), style: {width:'50%', left:'50%'},myid:'pick_val'}
            ],
            UV000007:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_ABOVE,type:'uv',command:'1',style:{}},
                    {text:globalTextsOBJ.IQ_BELOW,type:'uv',command:'2',style:{}},
                    {text:globalTextsOBJ.IQ_BETWEEN,type:'uv',command:'3',style:{}}],
                    style:{width:'33.33%', left:'0'},myid:'condition_status'},
                {cellInfo:makeVal(0,100,1,3), style: {width:'50%', left:'33.33%'},myid:'pick_val'},
                {cellInfo:makeVal(0,100,1,3), style: {width:'33.33%', left:'66.66%',visibility:'hidden'},myid:'pick_val2'}
            ],
            MO:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_MOTION_YES,type:'mo',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_MOTION_NO,type:'mo',command:'false',style:{}}],
                    style:{width:'100%', left:'0'},myid:'pick_val'}
            ],
            Light:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_DARK,type:'light',command:'3',style:{}},
                    // {text:globalTextsOBJ.IQ_DIM,type:'light',command:'2',style:{top:'25%'}},
                    // {text:globalTextsOBJ.IQ_NORMAl,type:'light',command:'3',style:{top:'50%'}},
                    {text:globalTextsOBJ.IQ_BRIGHT,type:'light',command:'4',style:{}}],
                    style:{width:'100.00%', left:'0.00%'},myid:'pick_val'}
            ],
            MultisensorR:'',
            Door_window000006:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_D_W_OPEN,type:'DW',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_D_W_CLOSE,type:'DW',command:'false',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            Door_window000007:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_D_W_OPEN,type:'DW',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_D_W_CLOSED,type:'DW',command:'false',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            Dock000006:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_DOCK,type:'Dock',command:'1',style:{}},
                    {text:globalTextsOBJ.IQ_UNDOCK,type:'Dock',command:'2',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            Dock000007:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_DOCKED,type:'Dock',command:'1',style:{}},
                    {text:globalTextsOBJ.IQ_UNDOCKED,type:'Dock',command:'2',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            NewMotion:'',
            waterSensor000006:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_LEAKD,type:'WaterSensor',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_NOLEAK,type:'WaterSensor',command:'false',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            waterSensor000007:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_LEAK,type:'WaterSensor',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_NOLEAK,type:'WaterSensor',command:'true',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            security:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_DISARM,type:'Security',command:'1',style:{}},
                    {text:globalTextsOBJ.IQ_ARMSTAY,type:'Security',command:'2',style:{}},
                    {text:globalTextsOBJ.IQ_ARMAWAY,type:'Security',command:'3',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            onOff:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_STATE_ON,type:'onOff',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_STATE_OFF,type:'onOff',command:'false',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ],
            Dimmer:[
                {cellInfo:[
                    {text:globalTextsOBJ.IQ_STATE_ON,type:'Dimmer',command:'true',style:{}},
                    {text:globalTextsOBJ.IQ_STATE_OFF,type:'Dimmer',command:'false',style:{}}
                ], style:{width:'50.00%', left:'50.00%'},myid:'pick_val'}
            ]
        };
        function makeVal(low,high,jump,command) {
            var tempArray=[];
            for (var i = low ; i < high ; i++){
                tempArray[i] = {
                    text:i+1, type:'val',command: i+1+''//, style: {top: i*100/(high-low)+'%'}
                }
            }
            return tempArray;
        }
        function makeTempVal(low,high,jump,command) {
            var tempArray=[];
            for (var i = low ; i < high ; i++){
                tempArray[i+50] = {
                    text:isC? i+'°C':(((i)-32)/(1.8)).toFixed(0)+'°F', type:'val',command: i+''//, style: {top: (i+50)*bodyH+'px'}
                }
            }
            return tempArray;
        }
    }

    /*************the data***************/
};