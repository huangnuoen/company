/**
 * Created by Margaret on 2017/3/9.
 */

(function() {
    requirejs.config({
        baseUrl: '../../',
        paths: {
            jquery: 'libs/jquery-1.11.3',
            Vue: 'libs/vue',
            cordova:'cordova',
            cordova_plugins:'cordova_plugins',
            OomiCommand:'libs/Oomi-command',
            Header: 'desktop_widget/src/component/popupWidgetHeader',
            Dw: 'desktop_widget/src/component/dw',
            util:'desktop_widget/src/util',
            closeButton: 'desktop_widget/src/component/closeButton'
        },
        shim:{
            'cordova_plugins':{
                deps:['cordova'],
                exports:'cordova_plugins'
            }
        }
    })

    require(['jquery','Vue','Header','closeButton','Dw','OomiCommand','cordova','cordova_plugins'],
        function ($, Vue, Header, closeButton, Dw, OomiCommand, Cordova, Cordova_plugins) {
            Header.run();
            closeButton.run();
            Dw.run();
        })
})('');
