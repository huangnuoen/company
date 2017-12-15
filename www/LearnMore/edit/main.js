/**
 * Created by qkchung on 16/3/18.
 */
window.onload = function () {
    //alert(window.location.href);
    var om = Oomi_common_functions.createNew(null,null);
    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    languageSwitcher(lang);
    function languageSwitcher(lang) {
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            var textsOBJ = setAllTextLanguage(scriptOBJ.which);
            $('#learnMore_text_1').text(textsOBJ.LEARN1);
            $('#learnMore_text_2').text(textsOBJ.LEARN2);
            $('#learnMore_text_3').text(textsOBJ.LEARN3);
            $('#learnMore_text_4').text(textsOBJ.LEARN4);
            $('#editWidgetName').text( textsOBJ.EDIT_WIDGET_NAME);
            om.edit_name(Param.relationName);
        });
    }
    //if(Param.relationName != undefined && Param.relationName != null && Param.relationName != ''){
    //    om.edit_name(Param.relationName);
    //}else if(Param.deviceName != undefined && Param.deviceName != null && Param.deviceName != ''){
    //    om.edit_name(Param.deviceName);
    //}


    //if(Param.relationName != undefined && Param.relationName != ''){
    //    if(Param.relationName === 'null_qk123'){
    //        om.edit_name('null');
    //    }else{
    //        om.edit_name(Param.relationName);
    //    }
    //}else

    var $learnMore_trigger_1 = $('#learnMore_trigger_1');
    var $learnMore_trigger_2 = $('#learnMore_trigger_2');
    var $learnMore_trigger_3 = $('#learnMore_trigger_3');
    var $learnMore_trigger_4 = $('#learnMore_trigger_4');

    $learnMore_trigger_1.click(function () {
        trigger_1();
    });
    $learnMore_trigger_2.click(function () {
        trigger_2();
    });
    $learnMore_trigger_3.click(function () {
        trigger_3();
    });
    $learnMore_trigger_4.click(function () {
        trigger_4();
    });

    function trigger_1(){
        //todo
        //device page
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",0]);
    }
    function trigger_2(){
        //todo
        //adding new oomi device
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",1]);
    }
    function trigger_3(){
        //todo
        //hidden oomi touch control
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",3]);    }
    function trigger_4(){
        //todo
        //become widget pro
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",2]);
    }
    $('#back').click( function () {
        om2.exit_edit();
    });
    document.addEventListener('deviceready', function () {

        window.addEventListener('ftdevicestatusupdate', function (data) {
            if(data.title === "Language"){
                languageSwitcher(data.content);
            }
        }, false);

    }, false);
};