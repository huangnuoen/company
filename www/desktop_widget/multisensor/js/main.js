/**
 * Created by Administrator on 2017/3/8.
 */

(function() {
    requirejs.config({
        baseUrl: '../../',
        paths: {
            jquery: 'libs/jquery-1.11.3',
            Vue: 'libs/vue',
            cordova:'cordova',
            cordova_plugins:'cordova_plugins',
            OOMICommon: 'libs/Oomi-common-min',
            OOMICommand: 'libs/Oomi-command',
            Header: 'desktop_widget/src/component/popupWidgetHeader',
            Mutisensors: 'desktop_widget/src/component/mutisensors',
            util:'desktop_widget/src/util',
            closeButton: 'desktop_widget/src/component/closeButton'
        },
        shim: {
            'cordova_plugins': {
                deps: ['cordova'],
                exports: 'cordova_plugins'
            }
        }
    })

    require(['Mutisensors','Header','closeButton', 'Cordova','cordova_plugins','OOMICommand'],
        function (Mutisensors , Header , closeButton, Cordova, cordova_plugins, OOMICommand) {
            Header.run();
            closeButton.run();
            Mutisensors.run();
        })
})('');