/**
 * Created by qkchung on 2017/7/3.
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
            store:'libs/store',
            util:'IRWidget/src/util',
            Vue:'libs/vue',
            fastclick:'libs/fastclick',
            Header:'IRWidget/src/component/popupWidgetHeader',
            irPopUp: 'IRWidget/src/component/irPopUp'
        },
        shim:{
        }
    });

    requirejs(['jquery','OOMICommand','fastClick','util/popupTools','Header','irPopUp'],
        function   ($, OOMICommand,fastClick,popupTools, Header, irPopUp) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var vueComponent = getCurrentFileName()+'-content';
            var vueName = getCurrentFileName()+'Content';
            var vueTemplate = '#_'+getCurrentFileName()+'Content';
            var currentDevice = 'playback';
            // 前3个id对应ui第一行从左到右，后3个id对应ui第二行从左到右
            var ButtonEl = ['playOrPauseSVG','rewardSVG','forwardSVG', 'backSVG', 'playBackNextSVG'];
            var ButtonCommand=[1281,1282,1283,769,770];
            document.addEventListener('deviceready', function () {
                Header.run(currentDevice);
                irPopUp.run(vueComponent, vueName, vueTemplate,ButtonEl,ButtonCommand);
            }, false);
        });
})('');