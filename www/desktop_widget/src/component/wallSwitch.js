/**
 * Created by qkchung on 17/2/27.
 */
define(['jquery','util/popupTools','Vue','LangSel'],
    function($,popupTools,Vue,LangSel) {
        var obj = {};
        obj.run = function (nodeID,model,operationID,textsOBJ,isDRW) {
            popupTools.ImportTemplates('#wallSwitch');
            var rData = {wallSwitchInfo:[]};
            //  rData = {wallSwitchInfo:[{
            //     name:'qwer',
            //     location:'asdfg',
            //     isOn:true,
            //     onOff:'rte',
            //     src :'../src/assets/img/wallswitch_normal_19.png',
            //     command:0,
            //     resId:54,
            //     style:{top:'25%'},
            //     isTick:true
            // }]};
            // loadThemComponent(rData);
            function isInWallSwitch() {
                var a = false;
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
            getMultiResDeviceStatus();
            function getMultiResDeviceStatus() {
                cordova.exec(function (data) {
                    console.log(data);
                    setResult(data);
                    setTimeout(function () {
                        if(operationID && operationID!==null){
                            getActionStatus();
                        }else {
                            loadThemComponent(rData)
                        }
                    },10);
                }, null, "FTP2PApi", "getMultiResDeviceStatus", [nodeID],'binsw01');
            }
            function getActionStatus() {
                cordova.exec(function (data) {
                    console.log(data);
                    var result = stringToJson(data);
                    if (result.value.length > 0){
                        setResult2(data);
                    }else {
                        loadThemComponent(rData);
                        var count = rData['wallSwitchInfo'].length;
                        var i = 0;
                        var thisInterval = setInterval(function () {
                            if(i < count){
                                console.log(JSON.stringify(rData));
                                cordova.exec(null, null, "FTP2PApi", "saveMultiResDevAction",   [rData['wallSwitchInfo'][i]['resId'], rData['wallSwitchInfo'][i]['isOn'], "status", operationID,'true']);
                                i++;
                            }else {
                                window.clearInterval(thisInterval)
                            }
                        },100);
                        return 1;
                    }
                }, null, "FTP2PApi", "getMultiResDevAction", [operationID]);
            }

            function setResult(result) {
                result = stringToJson(result);
                setTimeout(function () {
                    result = result.value;
                    var count = result.length-1;
                    var type = 0;
                        switch (model.split('-')[0]){
                        case 'FT153':type=1; break;
                        case 'FT156':type=1; break;
                        case 'FT157':type=2; break;
                        case 'FT154':type=2; break;
                        case 'FT155':type=4; break;
                        case 'FT116':type=1;  break;
                        case 'FT139':type=1;  break;
                        case 'FT132':type=2;  break;
                        case 'FT140':type=2;  break;
                    }

                    for (var i = 0 ,k = 0; i <= count; i++){
                        var resId = result[i]['resid'];
                        if(resId.indexOf('multibinsw')>0 || (type === 1 && resId.indexOf('binsw01')>0)){
                            var re = {};
                            if (result[i]['value']){
                                re = result[i]['value']['status'];
                            }
                            var ico = 0;
                            if(result[i]['iconId']){
                                ico = result[i]['iconId'];
                            }
                            re = re === true || re === 'true';
                            if(isInWallSwitch()){
                                if(Number(ico) !== 0){
                                    ico = (Number(ico)+7);
                                }
                            }else {
                                ico = (Number(ico)+1);
                            }

                            rData.wallSwitchInfo[k] = {
                                name:result[i]['widgetName'],
                                location:result[i]['roomName'],
                                isOn:re,
                                onOff:re?textsOBJ.OnOffOn:textsOBJ.OnOffOff,
                                src :'../src/assets/img/wallswitch_normal_'+ico+'.png',
                                command:k,
                                resId:resId,
                                style:getTop(type,k),
                                isTick:true
                            };
                            k++
                        }
                    }
                },1);
            }

            function setResult2(result) {
                result = stringToJson(result);
                setTimeout(function () {
                    result = result.value;
                    var count = result.length;
                    for (var i = 0 ; i <count; i ++){
                        var resId = result[i]['resid'];
                        var isActive = true;
                        if(result[i]['isActive']){
                             isActive = result[i]['isActive'];
                        }
                        var re = {};
                        if (result[i]['value']){
                            re = result[i]['value']['property']['status'];
                        }
                        re = re === true || re === 'true';
                        isActive = isActive === true || isActive === 'true';
                        if(resId.indexOf('multibinsw')>0 || count===1){
                            for(var j = 0 ; j < rData['wallSwitchInfo'].length ; j ++){
                                if(rData['wallSwitchInfo'][j]['resId'] === resId){
                                    rData['wallSwitchInfo'][j]['isOn'] = re;
                                    rData['wallSwitchInfo'][j]['onOff'] = re?textsOBJ.OnOffOn:textsOBJ.OnOffOff;
                                    rData['wallSwitchInfo'][j]['isTick'] = isActive;
                                }
                            }
                        }
                    }
                    setTimeout(function () {
                        loadThemComponent(rData)
                    },10);
                },1);
            }
            function getTop(count,k) {
                var obj = {top:''};
                if(isDRW){
                    var height = 100/count;
                    obj.top = height*(k)+'%';
                    obj.height = height+'%'
                }else {
                    obj.top = (100-25*count)/(count===1?2:count)+25*(k)+'%'
                }
                return obj;
            }
            function stringToJson(data) {
                data = data.replace(/"\[/g, '[');
                data = data.replace(/]"/g, ']');
                data = data.replace(/"{/g, '{');
                data = data.replace(/}"/g, '}');
                data = data.replace(/\\/g, '');
                return JSON.parse(data);
            }
            function loadThemComponent(rData) {
                Vue.component('wall-switch', {
                    name:'wallSwitch',
                    template: '#_wallSwitch',
                    data: function () {
                        return rData;
                    },
                    mounted:function(){
                        var wallSwitchList = $('.wallSwitchList').height();
                        $('.wallSwitchStatus').css('line-height',wallSwitchList+'px');
                        $('.wallSwitchOnOff').css('top',wallSwitchList/2-13+'px');
                        $('.wallSwitchIcon').css('top',wallSwitchList/2-17+'px');
                        var tick = $('.tick');
                        tick.css({'top':wallSwitchList/2-15+'px','visibility':'hidden'});
                        if(operationID && this.wallSwitchInfo.length !== 1){
                            tick.css({'visibility':'visible'});
                        }
                        $('template').remove();
                        var imgs = document.getElementsByClassName('iconImg');
                        var locationImg = document.getElementsByClassName('locationImg');

                        var thisComponent = this;
                        imgs[0].onerror = function () {
                            for(var j = 0 ; j < thisComponent.wallSwitchInfo.length ;j++){
                                thisComponent.wallSwitchInfo[j].src = thisComponent.wallSwitchInfo[j].src.replace('..','../desktop_widget');
                            }
                        };
                        locationImg[0].onerror = function () {
                            $('.locationImg').attr('src',"../libs/img/location.svg")
                        };
                        initEffect(this);
                        function initEffect(el) {
                            for(var j = 0 ; j < el.wallSwitchInfo.length ; j ++){
                                var re = el.wallSwitchInfo[j]['isOn'];
                                var command = el.wallSwitchInfo[j]['command'];
                                el.wallSwitchInfo[j]['onOff'] = re?textsOBJ.OnOffOn:textsOBJ.OnOffOff;
                                var onOff = document.getElementsByClassName('wallSwitchStatus');
                                if (re){
                                    $(onOff[command]).css('color','#EC591A');
                                }else {
                                    $(onOff[command]).css('color','#9B9B9B');
                                }
                            }
                        }
                    },
                    methods:{
                        onOffClick : function (command) {
                            command = Number(command);
                            this.wallSwitchInfo[command].isOn = !this.wallSwitchInfo[command].isOn;
                            var onOff = document.getElementsByClassName('wallSwitchStatus');
                            if (this.wallSwitchInfo[command].isOn){
                                this.wallSwitchInfo[command].onOff = textsOBJ.OnOffOn;
                                $(onOff[command]).css('color','#EC591A');
                            }else {
                                this.wallSwitchInfo[command].onOff = textsOBJ.OnOffOff;
                                $(onOff[command]).css('color','#9B9B9B');
                            }

                            cordova.exec(null, null, "FTP2PApi", "resourceControl",[this.wallSwitchInfo[command].resId, this.wallSwitchInfo[command].isOn, "status"]);

                            if(operationID && operationID!==null){
                                cordova.exec(null, null, "FTP2PApi", "saveMultiResDevAction",   [this.wallSwitchInfo[command].resId, this.wallSwitchInfo[command].isOn, "status", operationID,this.wallSwitchInfo[command].isTick?'true':'false']);
                            }
                        },
                        tickClick:function (command) {
                            this.wallSwitchInfo[command].isTick = !this.wallSwitchInfo[command].isTick;
                            if(operationID && operationID!==null){
                                cordova.exec(null, null, "FTP2PApi", "saveMultiResDevAction",   [this.wallSwitchInfo[command].resId, this.wallSwitchInfo[command].isOn, "status", operationID,this.wallSwitchInfo[command].isTick?'true':'false']);
                            }
                        }
                    }
                });
                var demo = new Vue({
                    el: '#wallSwitch',
                    data:{}
                })
            }
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if(operationID && operationID!==null){
                    return 1;
                }
                if (nodeID === data.ID) {
                    if (data.title === "DeviceStatus") {
                        var result = JSON.parse(data.content);
                        var result2 = data.status;
                        setTimeout(function () {
                            if(result2){
                                for (var key in result) {
                                    if (key === "status") {
                                        var re = true;
                                        var flag = String(result[key]);
                                        if (flag === 'true') {
                                            re = true;
                                        } else if (flag === 'false') {
                                            re = false;
                                        } else if (flag === true) {
                                            re = true;
                                        } else if (flag === false) {
                                            re = false;
                                        }
                                        for(var j = 0 ; j < rData['wallSwitchInfo'].length ; j ++){
                                            if(rData['wallSwitchInfo'][j]['resId'] === result2){
                                                rData['wallSwitchInfo'][j]['isOn'] = re;
                                                rData['wallSwitchInfo'][j]['onOff'] = re?textsOBJ.OnOffOn:textsOBJ.OnOffOff;
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