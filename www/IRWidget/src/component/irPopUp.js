/**
 * Created by qkchung on 17/4/11.
 */
define(['util/popupTools','Vue'],
    function( popupTools  ,Vue) {
        var obj = {};
        obj.run = function (vueComponent, vueName, vueTemplate,ButtonEl,ButtonCommand) {
            var self = null;
            var om2 = Oomi_command_function.create_new();
            var Param = om2.resource_data();
            var resourceID = 0;
            var data ={
                colorbuttons:'Oomi/colorButtons',
                generic:'Oomi/Generic',
                music:'Music2',
                navigation:'Oomi/navigation',
                numberpad:'Oomi/NumberPad',
                playback:'Oomi/PlayBack',
                remotebuttons:'Oomi/Remotebutton',
                tvvolume:'Oomi/TVVolume',
                volorchan:'Oomi/VolChan',
                TVRemote:'Oomi/TVRemote'
            };
            Vue.component(vueComponent, {
                name: vueName,
                template: vueTemplate,
                data: function () {
                    return {

                    }
                },
                mounted:function(){
                    self = this;
                    if(Param['isTemplate'] === '0'){
                        resourceID = om2.resource_list()[0].ID;
                        setTimeout(function () {
                            listen();
                            initEvent();
                        },10);
                    }
                },
                methods: {

                }
            });
            var demo = new Vue({
                el: '.body_content'
            });
            function initEvent(){
                var KEYlist = keyListArry(ButtonCommand);
                var thisI = 0;
                for( ; thisI <ButtonEl.length; ){
                    var el = ButtonEl[thisI];
                    var cm = KEYlist[thisI];
                    var thisEl = $('#'+el);
                    thisEl.attr('command',cm);
                    thisEl.click(function () {
                        var thisElLLL = $(this);
                        if(thisElLLL.css('opacity') == '1'){
                            om2.sendIR(resourceID,Number(thisElLLL.attr('command')));
                        }else{
                            var url="www/IRWidget/"+getCurrentFileName()+"/edit.html";
                            om2.load_edit_promp(url,Param,Param['language'],Param['relationName']);
                        }
                    });
                    thisI =+ thisI+1;
                }

            }
            function getCurrentFileName(){
                var CurrentUrl = window.document.location.pathname;
                var files = CurrentUrl.split('/');
                return files[files.length - 2];
            }
            function keyList(keylist){
                var KEYlist = '0x';
                for(var a =0 ; a < keylist.length;a++){
                    var temp = Number(keylist[a]).toString(16);
                    for(var i = 0, tempLenth = temp.length; i <8- tempLenth ; i++){
                        temp = '0'+temp;
                    }
                    KEYlist += temp;
                    if(a !=(keylist.length -1)){
                        KEYlist+=',';
                        KEYlist+='0x';
                    }
                }
                return KEYlist;
            }
            function keyListArry(keylist){
                var KEYlist = [];
                for(var a =0 ; a < keylist.length;a++){
                    var temp = Number(keylist[a]).toString(16);
                    for(var i = 0, tempLenth = temp.length; i <8- tempLenth ; i++){
                        temp = '0'+temp;
                    }
                    KEYlist[a] ='0x' + temp;
                }
                return KEYlist;
            }
            function setButtonStatus(returnData){
                var KEYElMap = {};
                var b = 0;
                for( ; b< ButtonCommand.length;){
                    KEYElMap[ButtonCommand[b]] = ButtonEl[b];
                    b= b+1;
                }
                for (var i in returnData) {
                    if (returnData[i] == 1) {
                        $('#'+KEYElMap[i]).css('opacity','1');
                    }
                }
            }
            function listen(){
                cordova.exec(function (data) {
                   setButtonStatus(JSON.parse(data));
                }, function (data) {},"FTP2PApi", "getKeyList",[resourceID, keyList(ButtonCommand)]);

                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if( resourceID === data.ID){
                            if(data.title === "IR_Control"){

                            }else if(data.title === "IR_Learn"){
                                Cordova.exec(function (data) {
                                    setButtonStatus(JSON.parse(data));
                                }, function (data) {},"FTP2PApi", "getKeyList",[resourceID, keyList(ButtonCommand)]);
                            }else if(data.title === "IR_CHECKKEYS") {
                                setButtonStatus(JSON.parse(data.content));
                            }
                        }
                    if (Param['relationID'] === data.ID) {
                        if(data.title=== "changeName"){
                            Param['relationName'] = data.content;
                        }
                    }
                }, false);
            }
        };
        return obj;
    });
