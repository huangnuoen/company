window.onload = function () {
    //alert(window.location.href);
    var om2 = Oomi_command_function.create_new();
    var Param = om2.resource_data();
    var lang = Param.language;
    var headerTitle = $('#headerTitle');
    var textHolder = $('.textHolder');
    languageSwitcher(lang);
    function languageSwitcher(lang) {
        var scriptOBJ = selectLanguage2(lang);
        $.getScript(scriptOBJ.url, function () {
            var textsOBJ = setAllTextLanguage(scriptOBJ.which);
            $('#learnMore_text_1').text(textsOBJ.LEARN1);
            $('#learnMore_text_2').text(textsOBJ.LEARN2);
            $('#learnMore_text_3').text(textsOBJ.LEARN3);
            $('#learnMore_text_4').text(textsOBJ.LEARN4);
        });
    }
    //if(Param.relationName != undefined && Param.relationName != ''){
    //    if(Param.relationName === 'null_qk123'){
    //        headerTitle.text('null');
    //    }else{
    //        headerTitle.text(Param.relationName);
    //    }
    //}else if(Param.relationName == undefined || Param.relationName == ''){
    //    headerTitle.text(' ');
    //}
    headerTitle.css('line-height', headerTitle.height()+'px');
    textHolder.css('line-height',textHolder.height()+'px');
    var a = 0;
    a = setInterval(function () {
        //console.log('go');
        if(headerTitle.height()!=0){
            headerTitle.css('line-height', headerTitle.height()+'px');
            textHolder.css('line-height',textHolder.height()+'px');
            window.clearTimeout(a);
        }
    },500);
    var $learnMore_trigger_1 = $('#learnMore_text_1');
    var $learnMore_trigger_2 = $('#learnMore_text_2');
    var $learnMore_trigger_3 = $('#learnMore_text_3');
    var $learnMore_trigger_4 = $('#learnMore_text_4');

    $learnMore_trigger_1.click(function () {
        trigger_1();
        highlighter($(this));
    });
    $learnMore_trigger_2.click(function () {
        trigger_2();
        highlighter($(this));
    });
    $learnMore_trigger_3.click(function () {
        trigger_3();
        highlighter($(this));
    });
    $learnMore_trigger_4.click(function () {
        trigger_4();
        highlighter($(this));
    });

    function highlighter(el){
        var thisEl = $('#'+el.attr('id')+'_img');
        //console.log('#'+el.attr('id')+'_img');
        thisEl.attr('opacity','0');
        setTimeout(function () {
            thisEl.attr('opacity','1');
        },300);
    }

    function trigger_1(){
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",0]);
    }
    function trigger_2(){
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",1]);
    }
    function trigger_3(){
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",3]);    }
    function trigger_4(){
        Cordova.exec(null,null,"BasicFunction","learnTutorial",["TutorialType",2]);
    }
    document.addEventListener('deviceready', function () {

        window.addEventListener('ftdevicestatusupdate', function (data) {
            if(Param.relationID === data.ID){
                if(data.title === "changeName" ) {
                    //$("#title").text(data.content);
                }
            }
            if(data.title === "Language"){
                //alert(data.content);
                languageSwitcher(data.content);
            }
        }, false);

    }, false);
};