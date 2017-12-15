/**
 * Created by qkchung on 2017/10/9.
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
            util:'desktop_widget/src/util',
            Vue:'libs/vue',
            Header:'desktop_widget/src/component/popupWidgetHeader',
            closeButton: 'desktop_widget/src/component/closeButton',
            shutterButton: 'desktop_widget/src/component/shutterButton',
        },
        shim:{
            //'cordova_plugins':{
            //    deps:['cordova'],
            //    exports:'cordova_plugins'
            //}
        }
    });

    requirejs(['jquery','closeButton','shutterButton','OOMICommand','fastClick','util/popupTools','Header'],
        function   ($,closeButton ,shutterButton,OOMICommand,fastClick,popupTools,Header) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                Header.run(params['deviceId']);
                closeButton.run();
                shutterButton.run(params['deviceId']);
            }, false);
        });
})('');