/**
 * Created by qkchung on 17/2/25.
 */
(function() {
    function getCurrentFileName(){
        var CurrentUrl = window.document.location.pathname
        var files = CurrentUrl.split('/');
        return files[files.length - 2];
    }
    requirejs.config({
        baseUrl: '../../',
        paths: {
            jquery: 'libs/jquery-1.11.3',
            OOMICommon: 'libs/Oomi-common-min',
            OOMICommand: 'libs/Oomi-command',
            fastClick: 'libs/fastclick2',
            util:'desktop_widget/src/util',
            Vue:'libs/vue',
            fastclick:'libs/fastclick',
            iscroll:'libs/iscroll',
            LangSel:'internationalization/LanguageSelector',
            TweenLite:'libs/TweenMax.min',
            TimelineLite:'libs/TimelineMax.min'
        },
        shim:{

        }
    });

    requirejs(['jquery','OOMICommand','fastClick','util/popupTools','LangSel','iscroll','Vue','TweenLite'],
        function   ($  ,OOMICommand,fastClick,popupTools,LangSel,iscroll,Vue,TweenLite) {
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            var nodeID =  params['deviceId'];
            var globalTextsOBJ = {};
            document.addEventListener('deviceready', function () {
                languageSwitcher(params['language']);
                // cordova.exec(null,null,"BasicFunction","requestDisallowIterceptTouchEvent",["true"]);
                window.addEventListener('ftdevicestatusupdate', function (data) {

                }, false);
            }, false);

            function languageSwitcher(lang){
                var scriptOBJ = selectLanguage(lang);
                scriptOBJ.which = 'deviceRoomWidget';
                $.getScript(scriptOBJ.url, function () {
                    globalTextsOBJ = setAllTextLanguage(scriptOBJ.which);
                    // var thisData = localStorage.getItem('sirenSetting_'+nodeID);
                    // if(thisData){
                    //     var objData = JSON.parse(thisData);
                    //     var volume = objData['volume'];
                    //     var sound = objData['sound'];
                    //     OomiRunpicker(sound,volume);
                    // }
                    setTimeout(function () {
                        cordova.exec(function (data) {
                            console.log(data);
                            var volume = '6';
                            var sound = '0';
                            var thisData = localStorage.getItem('sirenSetting_'+nodeID);
                            if(thisData){
                                var objData = JSON.parse(thisData);
                                volume = objData['volume'];
                                sound = objData['sound'];
                            }
                            popupTools.updateUI(data, 'music', function plugUpdate(result) {
                                if(result ){
                                    sound = result;
                                }
                            });
                            popupTools.updateUI(data, 'volume', function plugUpdate(result) {
                                if(result){
                                    volume = result
                                }
                            });
                            setTimeout(function () {
                                OomiRunpicker(sound,volume);
                            },1)
                        }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
                    },1)
                });
            }

            function OomiRunpicker(sound,volume) {
                var thisComponent = {};
                var thisInterval = {'sound':null,'volume':null};
                var myScroll =     {sound:null,volume:null};
                var sendData =     {sound:sound,volume:volume};
                var SoundDataShowMap = {'0':0, '1':1, '2':2, '3':3, '4':4 , '5':5};
                var VolumeDataShowMap = {'6':0,'5':0, '4':1, '3':1, '2':1, '1':2,'0':2};
                var LengthDataShowMap = {'5':0, '10':1, '15':2, '20':3, '30':'4','60':5,'120':6};
                var ShowData =     {sound:SoundDataShowMap[Number(sound)],volume:VolumeDataShowMap[Number(volume)]};
                Vue.component('sirenPicker', {
                    name:'sirenPicker',
                    template: '#_sirenPicker',
                    data:function thisData() {
                        return {
                            sound:{
                                pickerInfo:[{text:globalTextsOBJ.sirenS1,type:'val',command:'0',style:{top:'0'}},
                                    {text:globalTextsOBJ.sirenS2,type:'val',command:'1',style:{top:'16.667%'}},
                                    {text:globalTextsOBJ.sirenS3,type:'val',command:'2',style:{top:'33.334%'}},
                                    {text:globalTextsOBJ.sirenS4,type:'val',command:'3',style:{top:'50.001%'}},
                                    {text:globalTextsOBJ.sirenS5,type:'val',command:'4',style:{top:'66.667%'}},
                                    {text:globalTextsOBJ.sirenS6,type:'val',command:'5',style:{top:'83.334%'}},
                                    // {text:globalTextsOBJ.sirenS7,type:'val',command:7,style:{top:'75%'}},
                                    // {text:globalTextsOBJ.sirenS8,type:'val',command:8,style:{top:'87.5%'}}
                                ],
                                pickerId:'sound',
                                style:{width:'50%',left:'0',height:'20%',top:'30%'},
                                title:globalTextsOBJ.sirenSound
                            },
                            volume:{
                                pickerInfo:[{text:globalTextsOBJ.sirenLow,  type:'val',command:'6',style:{top:'0'}},
                                    {text:globalTextsOBJ.sirenMedium,type:'val',command:'3',style:{top:'33.333%'}},
                                    {text:globalTextsOBJ.sirenHigh,type:'val',command:'0',style:{top:'66.666%'}}],
                                pickerId:'volume',
                                style:{width:'50%',left:'50%',height:'20%',top:'30%'},
                                title:globalTextsOBJ.sirenVolume
                            },
                            test:globalTextsOBJ.test,
                            onOff:true
                        };
                    },
                    mounted:function(){
                        thisComponent = this;
                        setTimeout(function () {
                            thisComponent.picker(thisComponent.sound.pickerId);
                            thisComponent.picker(thisComponent.volume.pickerId);
                        },10);

                    },
                    methods:{
                        picker:function pickerDouble(scrollEl){
                            var rootEl = {};
                            var els = {};
                            var scrollCellHolder = {};
                            initPosition();
                            function initPosition() {
                                var currentData = thisComponent[scrollEl].pickerInfo;
                                var length = currentData.length;
                                rootEl = $('#'+scrollEl);
                                scrollCellHolder = rootEl.find('.scrollCellHolder');
                                els = scrollCellHolder.find('.scrollCell');
                                scrollCellHolder.css('height',length*100+'%');
                                els.css('height',100/length+'%');
                                els.css('line-height',rootEl.height() + 'px');
                                newScroll();
                            }
                            function newScroll() {
                                myScroll[scrollEl] = new IScroll('#'+scrollEl, {
                                    scrollX: false,
                                    scrollY: true,
                                    momentum: true,
                                    snap: true,
                                    snapSpeed: 200,
                                    keyBindings: true,
                                    indicators: null
                                });
                                setTimeout(function () {
                                    myScroll[scrollEl].scrollTo(0,-rootEl.height()*ShowData[scrollEl]);
                                    thisComponent.effects(scrollEl,rootEl,scrollCellHolder,els);
                                },1);
                                myScroll[scrollEl].on('scrollCancel', function (e) {
                                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                                    clearInterval(thisInterval[scrollEl]);
                                }, false);
                                myScroll[scrollEl].on('scrollStart', function (e) {
                                    cordova.exec(null,null,"BasicFunction","requestDisallowIterceptTouchEvent",["true"]);
                                    thisInterval[scrollEl] = setInterval(function () {
                                        thisComponent.effects(scrollEl,rootEl,scrollCellHolder,els);
                                    },100);
                                }, false);
                                myScroll[scrollEl].on('scrollEnd',function (e) {
                                    cordova.exec(null,null,"BasicFunction","requestDisallowInterceptTouchEvent",["false"]);
                                    thisComponent.effects(scrollEl,rootEl,scrollCellHolder,els);
                                    clearInterval(thisInterval[scrollEl]);
                                    var scrollY = scrollCellHolder.css('transform').match(/\d+/g)[5];
                                    var pos = Math.round(scrollY / rootEl.height());
                                    sendData[scrollEl] = thisComponent[scrollEl]['pickerInfo'][pos]['command'];
                                    thisComponent.send();
                                }, false);
                            }
                        },
                        effects:function (scrollEl,rootEl,scrollCellHolder,els) {
                            var scrollY = scrollCellHolder.css('transform').match(/\d+/g)[5];
                            var slideY = Math.round(scrollY / rootEl.height());
                            TweenLite.to(els,            0.2, {css:{'font-size':'12px',color:'#9B9B9B'}});
                            TweenLite.to(els.eq(slideY), 0.2, {css:{'font-size':'18px',color:'#EC591A'}});
                        },
                        send:function () {
                            console.log(JSON.stringify(sendData))
                            localStorage.setItem('sirenSetting_'+nodeID,JSON.stringify(sendData));
                            cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeID,"siren01", {"music":sendData['sound'],     "volume":sendData['volume'],"time":"0","type":"siren"}]);
                        },
                        toggleClick:function () {
                            cordova.exec(null, null, "FTP2PApi", "deviceControlNew", [nodeID,"siren01", {"testmusic":sendData['sound'], "testvolume":sendData['volume'],"type":"test"}]);
                            $('.testButton').css('border-color','#EC591A');
                            setTimeout(function () {
                                $('.testButton').css('border-color','#9B9B9B');
                            },300);
                        }
                    }
                });
                var demo = new Vue({
                    el: '#Siren'
                });
            }
        });
})('');