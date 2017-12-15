/**
 * Created by qkchung on 17/2/25.
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
            OOMICommon: 'libs/Oomi-common-min',
            OOMICommand: 'libs/Oomi-command',
            fastClick: 'libs/fastclick2',
            store:'libs/store',
            util:'desktop_widget/src/util',
            Vue:'libs/vue',
            fastclick:'libs/fastclick',
            Header:'desktop_widget/src/component/popupWidgetHeader',
            closeButton: 'desktop_widget/src/component/closeButton',
            wallSwitch: 'desktop_widget/src/component/wallSwitch',
            LangSel:'internationalization/LanguageSelector'
        },
        shim:{

        }
    });

    requirejs(['jquery','closeButton','OOMICommand','fastClick','util/popupTools','Header','wallSwitch','LangSel'],
        function   ($ ,closeButton ,OOMICommand,fastClick,popupTools,Header,wallSwitch,LangSel) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            document.addEventListener('deviceready', function () {
                Header.run(params['deviceId']);
                closeButton.run();
                languageSwitcher(params['language']);
                function languageSwitcher(lang){
                    var scriptOBJ = selectLanguage(lang);
                    scriptOBJ.which = 'deviceRoomWidget';
                    $.getScript(scriptOBJ.url, function () {
                        var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                        wallSwitch.run(params['deviceId'],params['model'],null,textsOBJ,false);
                    });
                }
            }, false);
        });
})('');