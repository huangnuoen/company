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
            fastClick: 'libs/fastclick2',
            store:'libs/store',
            OOMICommand: 'libs/Oomi-command',
            util:'IRWidget/src/util',
            TweenLite:'libs/TweenMax.min',
            TimelineLite:'libs/TimelineMax.min',
            CSSPlugin:'libs/CSSPlugin.min',
            VueRouter:'libs/vue-router',
            Vue:'libs/vue',
            LangSel:'internationalization/LanguageSelector',
            IRRouting:'IRWidget/src/component/e_rout',
            // IRRename:'IRWidget/src/component/e_rename',
            IRSelect:'IRWidget/src/component/e_select',
            e_buttons:'IRWidget/src/component/e_buttons'
            // IRScanning:'IRWidget/src/component/e_scanning',
            // IRSelect:'IRWidget/src/component/e_select'
        },
        shim:{
            'VueRouter':{
                deps:['Vue'],
                exports:'VueRouter'
            },
            'CSSPlugin':{
                deps:['TweenLite'],
                exports:'CSSPlugin'
            },
            'jquery_touchy':{
                deps:['jquery'],
                exports:'jquery_touchy'
            }
        }
    });
// Start the main app logic.
    requirejs(['jquery','OOMICommand','util/popupTools','IRRouting','fastClick','store','LangSel'],
        function   ($,OOMICommand,popupTools,IRRouting,fastClick,Store,LangSel) {
            popupTools.ajaxEditHTML();
            fastClick.attach(document.body);
            var params = Oomi_command_function.create_new().resource_data();
            function run(textsOBJ){
                IRRouting.run(params['deviceId'],textsOBJ);
            }

            document.addEventListener('deviceready', function () {
                languageSwitcher(params['language']);
            }, false);

            function languageSwitcher(lang){
                var scriptOBJ = selectLanguage(lang);
                scriptOBJ.which = 'irWidget';
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    run(textsOBJ);
                });
            }
        });
})('');