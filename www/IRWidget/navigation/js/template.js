/**
 * Created by qkchung on 2017/7/3.
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
            util:'IRWidget/src/util',
            Vue:'libs/vue',
            fastclick:'libs/fastclick',
            Header:'IRWidget/src/component/popupWidgetHeader',
            irPopUp: 'IRWidget/src/component/irPopUp'
        },
        shim:{
        }
    });

    requirejs(['jquery','OOMICommand','fastClick','util/popupTools','Header','irPopUp'],
        function   ($, OOMICommand,fastClick,popupTools, Header, irPopUp) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var vueComponent = getCurrentFileName()+'-content';
            var vueName = getCurrentFileName()+'Content';
            var vueTemplate = '#_'+getCurrentFileName()+'Content';
            var currentDevice = 'Navigation';
            // 下面第一行3个id对应ui左边第一列,后第二行5个id对应ui中间大圆圈按键(上右下左中间),后第三行3个id对应ui右边一列
            // 最后一行id对应ui最后一行
            //var ButtonEl = ['navIncreaseSVG','navMuteSVG','navDecreaseSVG', 'middleTopBtn','middleRightBtn','middleBottomBtn','middleLeftBtn','middleOk', 'navPrevSVG','navRecycleSVG','navNextSVG', 'navHomeSVG','navQuerySVG','navWarningSVG','navReturnSVG'];
            var ButtonEl = [
                'navRecycleSVG',
                'navQuerySVGXX',
                'middleOkBtn',
                'middleRightBtn',
                'middleLeftBtn',
                'middleTopBtn',
                'middleBottomBtn',
                'navHomeSVG',
                'navWarningSVG',
                'navMuteSVG',
                'navReturnSVG',
                'navIncreaseSVG',
                'navDecreaseSVG',
                'navPrevSVG',
                'navNextSVG'];
            var  ButtonCommand= [1610612994,1610612995,514,519,518,516,517,1610612993,513,1284,515,1025,1026,769,770];

            document.addEventListener('deviceready', function () {
                Header.run(currentDevice);
                irPopUp.run(vueComponent, vueName, vueTemplate,ButtonEl,ButtonCommand);
            }, false);

        });
})('');