/**
 * Created by qkchung on 17/04/11.
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
            closeButton: 'IRWidget/src/component/closeButton',
            irPopUp: 'IRWidget/src/component/irPopUp'
        },
        shim:{
        }
    });

    requirejs(['jquery','closeButton','OOMICommand','fastClick','util/popupTools','Header','irPopUp'],
        function   ($,closeButton, OOMICommand,fastClick,popupTools, Header, irPopUp) {
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
                closeButton.run();
                irPopUp.run(vueComponent, vueName, vueTemplate,ButtonEl,ButtonCommand);
            }, false);
        });
})('');