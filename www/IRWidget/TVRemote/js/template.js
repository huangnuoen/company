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
            var vueComponent = getCurrentFileName()+'Content';
            var vueName = getCurrentFileName()+'Content';
            var vueTemplate = '#_'+getCurrentFileName()+'Content';
            var currentDevice = 'Number Pad';
            var ButtonEl = [
                'red',
                'green',
                'yellow',
                'blue',
                'one',
                'two',
                'three',
                'four',
                'five',
                'six',
                'seven',
                'eight',
                'nine',
                'zero',
                'space',
                'tick',
                'ok',
                'right',
                'left',
                'top',
                'bottom',
                'mute',
                'refresh',
                'plus',
                'minus',
                'up',
                'down',
                'play',
                'pre',
                'next'];
            var ButtonCommand = [1610612993,
                1610612994,
                1610612995,
                1610612996,
                257,
                258,
                259,
                260,
                261,
                262,
                263,
                264,
                265,
                266,
                267,
                514,
                513,
                519,
                518,
                516,
                517,
                1284,
                515,
                1025,
                1026,
                769,
                770,
                1281,
                1282,
                1283];

            document.addEventListener('deviceready', function () {
                Header.run(currentDevice);
                irPopUp.run(vueComponent, vueName, vueTemplate,ButtonEl,ButtonCommand);
            }, false);

        });
})('');