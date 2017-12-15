
/**
 * Created By Margaret on 04/11/2017
 * All Configs
 */

// 配置当前config路径
//window.onload = function () {
(function(){
    function GetRequest() {
        var currentUrl = window.location.pathname; // 获取url中"desktop_widget"符后的字串
        var FileList = currentUrl.split("/");
        return FileList[FileList.length - 2];
    }

    requirejs.config({
        baseUrl: '../../',
        paths: {
            vue: 'libs/vue',
            component:'IRWidget/src/component/irWidget',
            config:'IRWidget/'+GetRequest()+'/js/index',
            jquery: 'libs/jquery-1.11.3',
            TweenLite:'libs/TweenMax.min',
            TimelineLite:'libs/TimelineMax.min',
            AttrPlugin:'libs/AttrPlugin.min',
            OomiCommand:'libs/Oomi-command',
            fastclick:'libs/fastclick2',
            util:'IRWidget/src/util/popupTools'
        },
        shim:{
            //cordova:{
            //    deps:[],
            //    exports:'cordova'
            //},
            //'cordova_plugins':{
            //    deps:['cordova'],
            //    exports:'cordova_plugins'
            //}
        }
    });

    require(['component','fastclick','util'], function (c,fastclick,popupTools) {
        fastclick.attach(document.body);
        popupTools.ajaxHTML_Index();
        document.addEventListener('deviceready', function () {
            c.run()
        }, false);
    });
})();
//};