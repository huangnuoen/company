/**
 * Created by qkchung on 17/3/14.
 */
/**
 * Created by qkchung on 17/2/28.
 */
define(['jquery','util/popupTools','Vue','TweenLite','TimelineLite'],
    function($, popupTools ,Vue,TweenLite,TimelineLite) {
        var obj = {};
        obj.run = function(nodeID,textsOBJ,commandType,operateID,bus){
            popupTools.ImportTemplates('#_random');
            var ax = 1;
            var canSend = 0;
            Vue.component('random', {
                name:'random',
                template: '#_random',
                data: function () {
                    return {
                        randomText:textsOBJ.RandomTur,
                        ChangeNow:textsOBJ.changeNow
                    }
                },
                mounted:function(){
                    resetTextPositions();
                },
                methods:{
                    randomClick : function () {
                        TweenLite.to('.randomButton', 0.3, {css:{'background-color':'#F26F21',color:'white'}, ease:Bounce.easeOut});
                        TweenLite.to('.randomButton', 0.3, {css:{'background-color':'transparent',color:'#F26F21'},delay:0.6, ease:Bounce.easeOut});
                        var random = createColor();

                    }
                }
            });
            function resetTextPositions(){
                var randomTitle = $('.randomTitle');
                var h = randomTitle.height();
                randomTitle.css('line-height',h+'px');
            }

            function syncSend(fun) {
                window.clearTimeout(canSend);
                canSend = setTimeout(function () {
                    if(fun){
                        fun();
                    }
                    window.clearTimeout(canSend);
                    canSend = 0;
                },300);
            }

            function sendTo(rgb){
                syncSend(function () {
                    if($('#onOffButtonSVGPath').attr('class') === 'powerOff'){
                        if (bus){
                            bus.$emit('onOff',{});
                        }
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",'random'+rgb,"color"]);
                        setTimeout(function () {
                            cordova.exec(null, null, "FTP2PApi", commandType, [nodeID, "binsw01", 'true', "status"]);
                        },100);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", rgb, "color",operateID]);
                            setTimeout(function () {
                                cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "binsw01", 'true', "status",operateID]);
                            },100);
                        }
                    }else{
                        cordova.exec(null,null,"FTP2PApi",commandType,[nodeID,"rgbbulb01",'random'+rgb,"color"]);
                        if (operateID !== null){
                            cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeID, "rgbbulb01", rgb, "color",operateID]);
                        }
                    }
                });
            }

            function createColor(){
                var R = 0;
                var G = 0;
                var B = 0;
                var position1 = Math.ceil(Math.random()*3);
                var position2 = Math.ceil(Math.random()*2);
                var position3 = Math.ceil(Math.random()*255);
                switch (position1){
                    case 1: R = 255;
                        switch (position2){
                            case 1: G = 0;B = position3;break;
                            case 2: G = position3;B=0;break;
                        }
                        break;
                    case 2: G = 255;
                        switch (position2){
                            case 1: R = 0;B = position3;break;
                            case 2: R = position3;B=0;break;
                        }
                        break;
                    case 3: B = 255;
                        switch (position2){
                            case 1: R = 0;G = position3;break;
                            case 2: R = position3;G=0;break;
                        }
                        break;
                }
                R = R.toString(16);
                G = G.toString(16);
                B = B.toString(16);
                if(R.length == 1){
                    R = '0'+R;
                }
                if(G.length == 1){
                    G = '0'+G;
                }
                if(B.length == 1){
                    B = '0'+B;
                }
                var color = R+B+G;
                sendTo(color);
                return color;
            }
        };
        return obj;
    });