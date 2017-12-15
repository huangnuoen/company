/**
 * Created by qkchung on 17/4/7.
 */
window.onload = function () {

    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    var  $set = $('.set');
    var  $test = $('.test');
    var setTimeOut = 0;
    var testTimeOut = 0;
    var resourceID = om2.resource_list()[0].ID;
    renderNew();
    languageSwitcher(lang);
    function languageSwitcher(lang){
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            var textsOBJ = setAllTextLanguage(scriptOBJ.which);
            $set.text(textsOBJ.SET);
            $test.text(textsOBJ.TEST);
        });
    }
    $set.click(function(){
        sendSet();
        $set.css({'border-color':'#F26F21',color:'#F26F21'});
        setTimeOut = setTimeout(function () {
            $set.css({'border-color':'#b3b2b3',color:'#b3b2b3'});
            window.clearTimeout(setTimeOut);
        },300);
    });
    $test.click(function(){
        sendTest();
        $test.css({'border-color':'#F26F21',color:'#F26F21'});
        testTimeOut = setTimeout(function () {
            $test.css({'border-color':'#b3b2b3',color:'#b3b2b3'});
            window.clearTimeout(testTimeOut);
        },300);
    });
    function sendSet(){
        cordova.exec(null,null,"FTP2PApi","learnIR",[resourceID,Param['operationtype']]);
    }
    function sendTest(){
        cordova.exec(null,null,"FTP2PApi","sendIR",[resourceID,Param['operationtype']]);
    }
    function renderNew(){
        $set.css('line-height',$set.height()+'px');
        $test.css('line-height',$test.height()+'px')
    }
    document.addEventListener('deviceready', function (){

        var str = Param.widgetId;
        var array = str.split('_');
        var nodeid = array[1];

        querySceneActionStatus();
        function querySceneActionStatus() {
            cordova.exec(function (data) {
                var obj = stringToJson(data);
                var arry = obj.value;
                if (arry.length <= 0 ) {
                    cordova.exec(null, null, "FTP2PApi", "saveSceneAction", [nodeid, resourceID, Param['operationtype'], "keyID",Param['operateID']]);
                }else{



                }
            }, null, "FTP2PApi", "querySceneActionStatus", [Param.operateID]);
        }

        function updateUI(data,find,fun){
            var obj = stringToJson(data);
            var arry = obj.value;
            if (arry.length > 0 ) {
                for(var i in arry){
                    if(typeof arry[i] == 'object') {
                        for (var j in arry[i]) {
                            if (j == find) {
                                fun(arry[i][j]);
                            }
                        }
                    }
                }
            }
        }

        function stringToJson(data){
            var result = '';
            if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                var str3 = data.replace('\"[','[');
                result = str3.replace(']\"',']');
            }
            return JSON.parse(result);
        }

        window.addEventListener('ftdevicestatusupdate', function (data) {
            if(data.title === "Language"){
                languageSwitcher(data.content);
            }
        }, false);
    },false);
    return true;
};
