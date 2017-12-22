/**
 * Created by qkchung on 15/10/30.
 */

var Oomi_command_function = {
    create_new : function(){
        var Oomi_command = {};
        Oomi_command.resource_data = function resource_data(myFunc) {
            var currentURL = window.location.href;
            //var currentURL = "http://localhost:63342/Oomi_widget1/MultiSensor/edit.html#widgetId=123456&positionId=123456&sceneId=456789&iqId=123456&operationtype=123456&resourceList=[{ID:123456,type:humidity},{ID:2456456,type:temperlate},{ID:3846486,type:motion},{ID:4456456,type:brightness}]&isLearn=1&isTemplate=0&relationID=123456";
            if(currentURL.split('#')[1] == undefined || currentURL.split('#')[1] == null || currentURL.split('#')[1].length<20){
                currentURL = "http://localhost:63342/Oomi_widget1/MultiSensor/edit.html#widgetId=123456_456456_45454_1212312312_4545&deviceName=default&positionId=1&sceneId=456789&iqId=123456&operationtype=123456&resourceList=[{\"ID\":\"123456\",\"type\":\"humidity\"},{\"ID\":\"123456\",\"type\":\"humidity\"},{\"ID\":\"123456\",\"type\":\"humidity\"},{\"ID\":\"123456\",\"type\":\"humidity\"}]&isLearn=1&isTemplate=0&relationID=123456&model=FT109-A&relationName=gggggggdggggghjvhhjh&deviceName=bobryh&roomName=adfasfasdfas&language=zh_CN&iqValueType=temperature01";
            }
            if(currentURL.indexOf('#')>0 && currentURL.split("#")[1].indexOf('&')>0 ) {
                if (currentURL.split("#")[1].indexOf('&') > 0) {
                    if(currentURL.split("#")[1].split("&")[0].indexOf('=')>0) {
                        var O_str_array = currentURL.split("#")[1].split("&");
                        var Oomi_param = {};
                        var a;
                        for (var i = 0; i < O_str_array.length; i++) {
                            a = O_str_array[i].split("=");
                            Oomi_param[a[0]] = a[1];
                        }
                        console.log('Oomi_param:'+JSON.stringify(Oomi_param));
                        console.log('widgetId:'+Oomi_param['/widgetId'])
                        if(Oomi_param['/widgetId']) {
                            var widgetId_array =  Oomi_param['/widgetId'].split('_');
                        } else {
                            var widgetId_array =  Oomi_param['widgetId'].split('_');
                        }
                        Oomi_param['widgetType'] = widgetId_array[0];
                        Oomi_param['deviceId'] = widgetId_array[1];
                        //Oomi_param['sceneId'] = widgetId_array[1];
                        Oomi_param['pageId'] = widgetId_array[3];
                        if(myFunc!=undefined){
                            myFunc(Oomi_param);
                        }
                        return Oomi_param;
                    }
                }
            }

            return null;
        };
        Oomi_command.resource_list = function resource_list() {
            var p = Oomi_command.resource_data();

            var t = p.resourceList;
            if(t==null){
                return null;
            }else if(t==""){
                return null;
            }else{
                return JSON.parse(t);
            }

        };
        Oomi_command.learnIR = function learnIR(resourceID,code){
            Cordova.exec(null,null,"FTP2PApi","learnIR",[resourceID,code]);
        };
        Oomi_command.sendIR = function sendIR(resourceID,code){
            Cordova.exec(null,null,"FTP2PApi","sendIR",[resourceID,code]);
        };
        Oomi_command.edit_name = function edit_name(event,param,nodeID){
            Cordova.exec(null,null,"BasicFunction","changeName",[param.relationID,event,nodeID]);
        };
        Oomi_command.load_edit = function load_edit(url,param,Language,globalName){
            var URL = window.location.href;
            var resourceList = 0;
            var O_str_array = URL.split("#")[1].split("&");
            for(var i = 0; i < O_str_array.length; i++) {
                var a = O_str_array[i].split("=");
                if(a[0] == 'resourceList'){
                    resourceList = O_str_array[i];
                }
            }
            var str=url+"#widgetId="+param.widgetId+"&relationName="+globalName+"&relationID="+param.relationID+"&"+resourceList+'&language='+Language;
                Cordova.exec(null,null,"BasicFunction","start",[str]);
        };
        Oomi_command.load_edit_promp = function load_edit_promp(url,param,Language,globalName){
            var URL = window.location.href;
            var resourceList = 0;
            var O_str_array = URL.split("#")[1].split("&");
            for(var i = 0; i < O_str_array.length; i++) {
                var a = O_str_array[i].split("=");
                if(a[0] == 'resourceList'){
                    resourceList = O_str_array[i];
                }
            }

            var str=url+"#widgetId="+param.widgetId+"&relationName="+globalName+"&relationID="+param.relationID+"&"+resourceList+'&language='+Language;
            Cordova.exec(null,null,"FTP2PApi","popupMessage",[str]);
        };

        Oomi_command.load_edit_prompDirect = function load_edit_promp(url,param,Language,globalName){
            var URL = window.location.href;
            var resourceList = 0;
            var O_str_array = URL.split("#")[1].split("&");
            for(var i = 0; i < O_str_array.length; i++) {
                var a = O_str_array[i].split("=");
                if(a[0] == 'resourceList'){
                    resourceList = O_str_array[i];
                }
            }

            var str=url+"#widgetId="+param.widgetId+"&relationName="+globalName+"&relationID="+param.relationID+"&"+resourceList+'&language='+Language;
            Cordova.exec(null,null,"FTP2PApi","popupMessageEdit",[str]);
        };

        Oomi_command.exit_edit = function exit_edit(){
            $('#backFill').attr('fill','#FF8F12');
            setTimeout(function () {
                Cordova.exec(null,null,"BasicFunction","exit",[""]);
            },300);
        };
        return Oomi_command;
    }
};
