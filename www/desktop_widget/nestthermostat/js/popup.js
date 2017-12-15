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
            util:'desktop_widget/src/util',
            Vue:'libs/vue',
            fastclick:'libs/fastclick',
            Header:'desktop_widget/src/component/popupWidgetHeader',
            closeButton: 'desktop_widget/src/component/closeButton',
            nestPopup: 'desktop_widget/src/component/nestPopup',
            nestRangePicker: 'desktop_widget/src/component/nestRangePicker',
            jquery_touchy:'libs/jquery.touchy'
        },
        shim:{
        'jquery_touchy':{
            deps:['jquery'],
            exports:'jquery_touchy'
        }
        }
    });

    requirejs(['jquery','Vue','closeButton','OOMICommand','fastClick','util/popupTools','Header','nestPopup','nestRangePicker'],
        function   ($,Vue,closeButton, OOMICommand,fastClick,popupTools, Header, nestPopup,nestRangePicker) {
            var params = Oomi_command_function.create_new().resource_data();
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var vueComponent = getCurrentFileName()+'-content';
            var vueName = getCurrentFileName()+'Content';
            var vueTemplate = '#_'+getCurrentFileName()+'Content';
            var currentDevice = 'Nest Thermostat';

            document.addEventListener('deviceready', function () {
                var bus = new Vue();
                Header.run(params['deviceId']);
                closeButton.run();
                nestPopup.run(vueComponent, vueName, vueTemplate, params['deviceId'],bus);
                nestRangePicker.run(params['deviceId'],bus)
            }, false);
            function test(){
                Header.run(params['deviceId']);
                closeButton.run();
                nestPopup.run(vueComponent, vueName, vueTemplate, params['deviceId']);
                nestRangePicker.run(params['deviceId'])
            }

        });
})('');