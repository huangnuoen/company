/**
 * Created by qkchung on 2017/8/22.
 */
window.onload = function () {
    var currentURL = window.location.href;
    // currentURL = 'x#a=1&b=2&c=en';
    console.log(currentURL);
    var c1 = currentURL.split('#')[1];
    var c2 = c1.split('&');
    var textsOBJ = {};
    var router = initRout();
    var acPos = Number(c2[0].split('=')[1]);
    var devSN = c2[1].split('=')[1];
    var language =  c2[2].split('=')[1];
    var setPlug = Number(acPos) === 1;
    var timeoutTimer = 0;
    var loadInterval = 0;
    function learnTimeout() {
        window.clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(function () {
            router.push('fail');
        },35000);
    }
    function initRout() {
        var reOff              = { template: '<re-off></re-off>' };
        var reSet              = { template: '<re-set></re-set>' };
        var turnAcOn           = { template: '<turn-ac-on></turn-ac-on>' };
        var teachPlugOff       = { template: '<teach-plug-off></teach-plug-off>' };
        var setAcConfig        = { template: '<set-ac-config></set-ac-config>' };
        var teachPlugSetting   = { template: '<teach-plug-setting></teach-plug-setting>' };
        var teachOffSuccess    = { template: '<teach-off-success></teach-off-success>' };
        var teachSettingSuccess= { template: '<teach-setting-success></teach-setting-success>' };
        var fail               = { template: '<fail></fail>' };
        return new VueRouter({
            routes: [
                { path: '/reOff'              , name: 'reOff'              , component: reOff              },
                { path: '/reSet'              , name: 'reSet'              , component: reSet              },
                { path: '/turnAcOn'           , name: 'turnAcOn'           , component: turnAcOn           },
                { path: '/teachPlugOff'       , name: 'teachPlugOff'       , component: teachPlugOff       },
                { path: '/setAcConfig'        , name: 'setAcConfig'        , component: setAcConfig        },
                { path: '/teachPlugSetting'   , name: 'teachPlugSetting'   , component: teachPlugSetting   },
                { path: '/teachOffSuccess'    , name: 'teachOffSuccess'    , component: teachOffSuccess    },
                { path: '/teachSettingSuccess', name: 'teachSettingSuccess', component: teachSettingSuccess},
                { path: '/fail'               , name: 'fail'               , component: fail               }
            ]
        });
    }
    document.addEventListener('deviceready', function () {
        languageSwitcher(language);
        listen();
    }, false);
    function getDeviceStatus(){
        cordova.exec(function (data) {
            window.clearInterval(loadInterval);
            if (loadInterval === 0){
                return 1;
            }
            loadInterval = 0;
            console.log(JSON.stringify(data));
            var modeResult = [];
            updateUI(data, 'modes', function plugUpdate(result) {
                modeResult = result;
            });
            initComponents(modeResult.indexOf(acPos) === -1);
        }, null, "FTP2PApi", "getOldACStatus", [devSN, "binsw01"]);
        function updateUI(data, find, fun) {
            var obj = stringToJson(data);
            var arry = obj.value;
            if (arry.length > 0) {
                for (var i in arry) {
                    if(typeof arry[i] === 'object') {
                        if (arry[i] !== null && arry[i] !== 'null'){
                            for (var j in arry[i]) {
                                if (j === find) {
                                    if (fun){
                                        fun(arry[i][j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }else{
                if (fun){
                    fun(null);
                }
            }
            return (arry.length>0);
            function stringToJson(data) {
                var result = '';
                if (data.indexOf('\"[') > 0 || data.indexOf(']\"') > 0) {
                    var str3 = data.replace('\"[', '[');
                    result = str3.replace(']\"', ']');
                }else {
                    result = data;
                }
                return JSON.parse(result);
            }
        }
    }
    function sendIR() {
        cordova.exec(null, null, "FTP2PApi", "deviceControl", [devSN, "IRBlaster01", acPos, "sendkey"]);
    }
    function learnIR() {
        cordova.exec(null, null, "FTP2PApi", "deviceControl", [devSN, "IRBlaster01", acPos, "learnkey"]);
    }
    function exit() {
        cordova.exec(null,null,"BasicFunction","exit",[""]);
    }
    function highLight(e) {
        TweenLite.to(e.target, 0.3, {css:{'background-color':'#EC591A'}});
        TweenLite.to(e.target, 0.3, {css:{'background-color':'transparent'},delay:0.3});
    }
    function languageSwitcher(lang){
        var scriptOBJ = selectLanguage(lang);
        scriptOBJ.which = 'irWidget';
        $.getScript(scriptOBJ.url, function () {
            textsOBJ = setAllTextLanguage(scriptOBJ.which);
            getDeviceStatus();
            loadInterval = setInterval(function () {
                getDeviceStatus();
            },300);
        });
    }
    function initComponents(re) {
        Vue.component('reOff', {
            name:'reOff',
            template: '#_reOff',
            data: function () {
                return {
                    reOff:textsOBJ.reOff,
                    test:textsOBJ.test,
                    reprogram:textsOBJ.reprogram
                }
            },
            mounted:function(){
            },
            methods:{
                testClick:function(e) {
                    highLight(e);
                    sendIR();
                },
                reprogramClick:function () {
                    router.push('turnAcOn')
                },
                exitClick:function () {
                    exit();
                }
            }
        });
        Vue.component('reSet', {
            name:'reSet',
            template: '#_reSet',
            data: function () {
                return {
                    reSet:textsOBJ.reSet,
                    test:textsOBJ.test,
                    reprogram:textsOBJ.reprogram
                }
            },
            mounted:function(){
            },
            methods:{
                testClick:function(e) {
                    highLight(e);
                    sendIR();
                },
                reprogramClick:function () {
                    router.push('turnAcOn')
                },
                exitClick:function () {
                    exit();
                }
            }
        });
        Vue.component('turnAcOn', {
            name:'turnAcOn',
            template: '#_turnAcOn',
            data: function () {
                return {
                    turnAcOn:textsOBJ.turnAcOn,
                    next:textsOBJ.next
                }
            },
            mounted:function(){
                window.clearTimeout(timeoutTimer);
            },
            methods:{
                nextClick:function() {
                    if (setPlug){
                        router.push('teachPlugOff');
                    }else {
                        router.push('setAcConfig');
                    }
                },
                exitClick:function () {
                    exit();
                }
            }
        });
        Vue.component('teachPlugOff', {
            name:'teachPlugOff',
            template: '#_teachPlugOff',
            data: function () {
                return {
                    teachPlugOff:textsOBJ.teachPlugOff
                }
            },
            mounted:function(){
                learnIR();
                learnTimeout();
            },
            methods:{
                backClick:function() {
                    router.push('turnAcOn')
                }
            }
        });
        Vue.component('setAcConfig', {
            name:'setAcConfig',
            template: '#_setAcConfig',
            data: function () {
                return {
                    setAcConfig:textsOBJ.setAcConfig,
                    next:textsOBJ.next
                }
            },
            mounted:function(){
                window.clearTimeout(timeoutTimer);
            },
            methods:{
                nextClick:function() {
                    router.push('teachPlugSetting')
                }
            }
        });
        Vue.component('teachPlugSetting', {
            name:'teachPlugSetting',
            template: '#_teachPlugSetting',
            data: function () {
                return {
                    teachPlugSetting:textsOBJ.teachPlugSetting
                }
            },
            mounted:function(){
                learnIR();
                learnTimeout();
            },
            methods:{
                backClick:function() {
                    router.push('setAcConfig')
                }
            }
        });
        Vue.component('teachOffSuccess', {
            name:'teachOffSuccess',
            template: '#_teachOffSuccess',
            data: function () {
                return {
                    success:textsOBJ.successTitle,
                    success2:textsOBJ.successOff,
                    test:textsOBJ.test,
                    done:textsOBJ.done
                }
            },
            mounted:function(){
                window.clearTimeout(timeoutTimer);
            },
            methods:{
                testClick:function(e) {
                    highLight(e);
                    sendIR();
                },
                doneClick:function(e) {
                    highLight(e);
                    exit();
                }
            }
        });
        Vue.component('teachSettingSuccess', {
            name:'teachSettingSuccess',
            template: '#_teachSettingSuccess',
            data: function () {
                return {
                    success:textsOBJ.successTitle,
                    success2:textsOBJ.successSetting,
                    turnOff:textsOBJ.turnOff,
                    test:textsOBJ.test,
                    done:textsOBJ.done
                }
            },
            mounted:function(){
                window.clearTimeout(timeoutTimer);
            },
            methods:{
                testClick:function(e) {
                    highLight(e);
                    sendIR()
                },
                doneClick:function(e) {
                    highLight(e);
                    exit();
                },
                turnOffClick:function (e) {
                    highLight(e);
                    cordova.exec(null, null, "FTP2PApi", "deviceControl", [devSN, "IRBlaster01", 1, "sendkey"]);
                }
            }
        });
        Vue.component('fail', {
            name:'fail',
            template: '#_fail',
            data: function () {
                return {
                    fail:textsOBJ.fail,
                    tryAgain:textsOBJ.tryAgain,
                    done:textsOBJ.done
                }
            },
            mounted:function(){
                window.clearTimeout(timeoutTimer);
            },
            methods:{
                tryAgainClick:function() {
                    window.clearTimeout(timeoutTimer);
                    if (setPlug){
                        router.push('turnAcOn')
                    }else {
                        router.push('turnAcOn')
                    }
                },
                doneClick:function (e) {
                    highLight(e);
                    exit()
                }
            }
        });
        setTimeout(function () {
            var rout = new Vue({
                router: router,
                template:'#_RGBRouting',
                mounted:function(){
                    if(re){
                        router.push('turnAcOn');
                    }else {
                        if (setPlug){
                            router.push('reOff');
                        }else {
                            router.push('reSet');
                        }
                    }
                },
                created: function () {
                },
                data:{
                    showSelectDone:false
                },
                methods:{

                }
            }).$mount('#mainHolder');
        },100);
    }
    function listen() {
        window.addEventListener('ftdevicestatusupdate', function (data) {
            if (devSN === data.ID) {
                if (data.title === "DeviceStatus") {
                    var result = JSON.parse(data.content);
                    for (var key in result) {
                        if (key === "learnstatus") {
                            if (result[key] === 'true'){
                                if(setPlug){
                                    router.push('teachOffSuccess');
                                }else {
                                    router.push('teachSettingSuccess');
                                }
                            }
                        }
                    }
                }
            }
        }, false);
    }
};