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
            util:'IRWidget/src/util',
            Vue:'libs/vue',
            fastclick:'libs/fastclick',
            Header:'IRWidget/src/component/popupWidgetHeader',
            closeButton: 'IRWidget/src/component/closeButton',
            irPopUp: 'IRWidget/src/component/irPopUp'
        },
        shim:{
        }
    });

    requirejs(['jquery','closeButton','OOMICommand','fastClick','util/popupTools','Header','irPopUp'],
        function   ($,closeButton, OOMICommand,fastClick,popupTools, Header, irPopUp) {
            popupTools.ajaxHTML();
            fastClick.attach(document.body);
            var vueComponent = getCurrentFileName()+'-content';
            var vueName = getCurrentFileName()+'Content';
            var vueTemplate = '#_'+getCurrentFileName()+'Content';
            var currentDevice = 'Remote Button';
            // 前5个id对应ui中间的大圆圈(上右下左ok) 第二行2个id对应ui最右边一列(+-) 第三行4个id对应ui最后一行
            var remoteButtonEl = ['middleTopBtn','middleRightBtn','middleBottomBtn','middleLeftBtn','middleOk',
                'remoteBtnIncreaseSVG','remoteBtnDecreaseSVG',
                'remoteBtnHomeSVG','remoteBtnMenuSVG','remoteBtnMuteSVG','remoteBtnReturnSVG'];
            document.addEventListener('deviceready', function () {
                Header.run(currentDevice);
                closeButton.run();
                irPopUp.run(vueComponent, vueName, vueTemplate);
            }, false);

        });
})('');