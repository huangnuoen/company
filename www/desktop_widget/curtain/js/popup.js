/**
 * Created by qkchung on 2017/8/22.
 */

(function() {
    function getCurrentFileName(){
        var CurrentUrl = window.document.location.pathname;
        var files = CurrentUrl.split('/');
        return files[files.length - 2];
    }
    requirejs.config({
        baseUrl: '../../',
        paths: {
            jquery: 'libs/jquery-1.11.3',
            fastClick: 'libs/fastclick2',
            store:'libs/store',
            OOMICommand: 'libs/Oomi-command',
            TweenLite:'libs/TweenMax.min',
            util:'desktop_widget/src/util',
            Vue:'libs/vue',
            Header:      'desktop_widget/src/component/popupWidgetHeader',
            closeButton: 'desktop_widget/src/component/closeButton',
            switchProcessBar: 'desktop_widget/src/component/switchProcessBar',
        }
    });
// Start the main app logic.
    requirejs(['jquery','closeButton','switchProcessBar','Header','OOMICommand','util/popupTools','fastClick','store'],
        function   ($,closeButton,switchProcessBar,Header,OOMICommand,popupTools,fastClick,Store) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                Header.run(params['deviceId']);
                closeButton.run();
                getDeviceData();
            }, false);
            function getDeviceData(){
                cordova.exec(function (data) {
                    var val = 99;
                    var renderResult = true;
                    popupTools.updateUI(data, 'mtLevel', function plugUpdate(result) {
                        val = Number(result);
                        if(val === 0) {
                            renderResult = false;
                        } else {
                            renderResult = true;
                        }
                    });
//                    popupTools.updateUI(data, 'status', function plugUpdate(result) {
//                        if (result == 'true') {
//                            renderResult = true;
//                        } else if (result == 'false') {
//                            renderResult = false;
//                        } else if (result == false) {
//                            renderResult = false;
//                        } else if (result == true) {
//                            renderResult = true;
//                        } else {
//                            renderResult = true;
//                        }
//                    });
                    switchProcessBar.run(params['deviceId'],val,renderResult,null);
                }, null, "FTP2PApi", "getDeviceStatus", [params['deviceId'], "binsw01"]);
            }
        });
})('');