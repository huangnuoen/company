
/**
 * Created By Margaret on 2017/2/24
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
            'vue': 'libs/vue',
            'component':'desktop_widget/src/component/desktopWidget',
            'config':'desktop_widget/'+GetRequest()+'/js/index',
            'jquery': 'libs/jquery-1.11.3',
            'TweenLite':'libs/TweenMax.min',
            'TimelineLite':'libs/TimelineMax.min',
            'AttrPlugin':'libs/AttrPlugin.min',
            'CSSPlugin':'libs/CSSPlugin.min',
            'OomiCommand':'libs/Oomi-command',
            fastclick:'libs/fastclick2',
            util:'desktop_widget/src/util/popupTools'
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
            var a = document.getElementById('app');
            if (a.offsetHeight!==0){
                c.run();
            }else {
                var thisInterval = setInterval(function () {
                    if (a.offsetHeight!==0){
                        c.run();
                        window.clearInterval(thisInterval);
                    }
                },1000);
            }
        }, false);
    });
})();
//};