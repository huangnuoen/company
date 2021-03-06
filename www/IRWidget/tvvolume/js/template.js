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
            var currentDevice = 'TV Volume';
            var ButtonEl = ['muteSVG','increaseVolumeSVG','decreseVolumeSVG'];
            var ButtonCommand=['1284','1025','1026'];
            document.addEventListener('deviceready', function () {
                Header.run(currentDevice);
                irPopUp.run(vueComponent, vueName, vueTemplate,ButtonEl,ButtonCommand);
            }, false);

        });
})('');