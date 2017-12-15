/**
 * Created by Administrator on 2017/3/1.
 */
(function(){
    function getCurrentPath() {
        var pathName = window.location.pathname;
        var fileList= pathName.split("/");
        return fileList[fileList.length-2];
    }

    requirejs.config({
        baseUrl: '../../',
        paths: {
            'vue':'libs/vue',
            'component':'scene_widget/component/sceneWidget',
            'jquery':'libs/jquery-1.11.3',
            'cordova':'cordova',
            'cordova_plugins':'cordova_plugins',
            'OomiCommand':'libs/Oomi-command',
            TweenLite:'libs/TweenMax.min',
            TimelineLite:'libs/TimelineMax.min',
            'AttrPlugin':'libs/AttrPlugin.min',
            'CSSPlugin':'libs/CSSPlugin.min'
        },
        shim:{
            'CSSPlugin':{
                deps:['TweenLite'],
                exports:'CSSPlugin'
            },
            'cordova_plugins':{
                deps:['cordova'],
                exports:'cordova_plugins'
            }
        }
    });

// 加载和使用模块
    require(['component','cordova'],function(Component,cordova) {
        document.addEventListener('deviceready',function(){
            Component.run();
        } , false);
    });
})();
