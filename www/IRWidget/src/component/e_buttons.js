/**
 * Created by qkchung on 2017/7/3.
 */
define(['util/popupTools','Vue'],
    function( popupTools  ,Vue) {
        var obj = {};
        obj.run = function (vueTemplate,bus,resourceID) {
            function GetRequest() {
                var currentUrl = window.location.pathname; // 获取url中"desktop_widget"符后的字串
                var FileList = currentUrl.split("/");
                return FileList[FileList.length - 2];
            }
            var thisFile = GetRequest();
            var self = null;
            var isCancel = false;
            var codeData = {
                colorbuttons:{
                    ButtonEl:['redCircle','greenCircle','yellowCircle','blueCircle'],
                    ButtonCommand:[1610612993,1610612994,1610612995,1610612996]
                },
                generic:{
                    ButtonEl:['ace','deuce','trey','onOffButtonSVG'],
                    ButtonCommand:[1610612993,1610612994,1610612995,1]
                },
                music:{
                    ButtonEl:['rewardSVG','playOrPauseSVG','forwardSVG', 'muteSVG','decreseVolumeSVG','increaseVolumeSVG'],
                    ButtonCommand:[1282,1281,1283,1284,1026,1025]
                },
                navigation:{
                    ButtonEl:[
                        'navRecycleSVG',
                        'navQuerySVGXX',
                        'middleOkBtn',
                        'middleRightBtn',
                        'middleLeftBtn',
                        'middleTopBtn',
                        'middleBottomBtn',
                        'navHomeSVG',
                        'navWarningSVG',
                        'navMuteSVG',
                        'navReturnSVG',
                        'navIncreaseSVG',
                        'navDecreaseSVG',
                        'navPrevSVG',
                        'navNextSVG'],
                    ButtonCommand:[1610612994,1610612995,514,519,518,516,517,1610612993,513,1284,515,1025,1026,769,770]
                },
                numberpad:{
                    ButtonEl:['numberOneSVG',
                        'numberTwoSVG',
                        'numberThreeSVG',
                        'numberFourSVG',
                        'numberFiveSVG',
                        'numberSixSVG',
                        'numberSevenSVG',
                        'numberEightSVG',
                        'numberNineSVG',
                        'numberZeroSVG',
                        'numberPadIconSVG',
                        'numberTickSVG'],
                    ButtonCommand:[257,258,259,260,261,262,263,264,265,266,267,514]
                },
                playback:{
                    ButtonEl:['playOrPauseSVG','rewardSVG','forwardSVG', 'backSVG', 'playBackNextSVG'],
                    ButtonCommand:[1281,1282,1283,769,770]
                },
                remotebuttons:{
                    ButtonEl:['onOffButtonSVG',
                        'middleOkBtn',
                        'middleRightBtn',
                        'middleLeftBtn',
                        'middleTopBtn',
                        'middleBottomBtn',
                        'remoteBtnHomeSVG',
                        'remoteBtnMenuSVG',
                        'remoteBtnMuteSVG',
                        'remoteBtnReturnSVG',
                        'remoteBtnIncreaseSVG',
                        'remoteBtnDecreaseSVG'],
                    ButtonCommand:[1, 514, 519, 518, 516, 517, 1610612993, 513, 1284, 515, 1025, 1026]
                },
                TVRemote:{
                    ButtonEl:['red', 'green', 'yellow', 'blue', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                        'zero', 'space', 'tick', 'ok', 'right', 'left', 'top', 'bottom', 'mute', 'refresh', 'plus', 'minus', 'up', 'down', 'play', 'pre', 'next'],
                    ButtonCommand:[1610612993, 1610612994, 1610612995, 1610612996, 257, 258, 259, 260, 261, 262, 263, 264,
                        265, 266, 267, 514, 513, 519, 518, 516, 517, 1284, 515, 1025, 1026, 769, 770, 1281, 1282, 1283]
                },
                tvvolume:{
                    ButtonEl:['muteSVG','increaseVolumeSVG','decreseVolumeSVG'],
                    ButtonCommand:[1284,1025,1026]
                },
                volorchan:{
                    ButtonEl:['decreaseVolumeSVG','increaseVolumeSVG', 'muteSVG', 'volPrevSVG','volNextSVG'],
                    ButtonCommand:[1026,1025,1284,1282,1283]
                }

            };
            var ButtonEl = codeData[thisFile]['ButtonEl'];
            var ButtonCommand = codeData[thisFile]['ButtonCommand'];
            Vue.component('buttons', {
                name: 'buttons',
                template: '#_'+vueTemplate,
                data: function () {
                    return {

                    }
                },
                mounted:function(){
                    self = this;
                    listen();
                    initEvent();
                },
                methods: {

                }
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
                        if(thisElLLL.css('opacity') === '1'){
                            bus.$emit('reassign',{command:Number(thisElLLL.attr('command')),El:thisElLLL[0].outerHTML});
                        }else{
                            bus.$emit('teach',{command:Number(thisElLLL.attr('command')),El:thisElLLL[0].outerHTML});
                        }
                    });
                    thisI =+ thisI+1;
                }

            }
            function keyList(keylist){
                var KEYlist = '0x';
                for(var a =0 ; a < keylist.length;a++){
                    var temp = Number(keylist[a]).toString(16);
                    for(var i = 0, tempLenth = temp.length; i <8- tempLenth ; i++){
                        temp = '0'+temp;
                    }
                    KEYlist += temp;
                    if(a !== (keylist.length -1)){
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
                if (returnData === null){
                    return 1;
                }
                var KEYElMap = {};
                var b = 0;
                for( ; b< ButtonCommand.length;){
                    KEYElMap[ButtonCommand[b]] = ButtonEl[b];
                    b= b+1;
                }
                for (var i in returnData) {
                    if (returnData[i] === 1) {
                        $('#'+KEYElMap[i]).css('opacity','1');
                    }
                }
            }
            function listen(){
                bus.$on('cancelResult',function (data) {
                    isCancel = data;
                });

                cordova.exec(function (data) {
                    setButtonStatus(JSON.parse(data));
                }, function (data) {},"FTP2PApi", "getKeyList",[resourceID, keyList(ButtonCommand)]);

                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if( resourceID=== data.ID){
                        if(data.title === "IR_Control"){

                        }else if(data.title === "IR_Learn"){
                            cordova.exec(function (data) {
                                if(isCancel === true) {
                                    return 1;
                                } else {
                                    bus.$emit('result',true);
                                }
                                setButtonStatus(JSON.parse(data));
                            }, function (data) {},"FTP2PApi", "getKeyList",[resourceID, keyList(ButtonCommand)]);
                        }else if(data.title === "IR_CHECKKEYS") {
                            setButtonStatus(JSON.parse(data.content));
                        }
                    }
                }, false);
            }
        };
        return obj;
    });