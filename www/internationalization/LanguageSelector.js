/**
 * Created by qkchung on 16/5/20.
 */
function selectLanguage(language){
    //todo
    var currentURL = window.location.href;
    var whichFile = currentURL.split('#')[0].split('/');
    var which = whichFile[whichFile.length - 2];
    var url = "../../internationalization/"+language+".js"; //difference
    var scriptOBJ = {};
    scriptOBJ.url = url;
    scriptOBJ.which = which;
    scriptOBJ.iscube = false;
    var isCube = [
     'Music2'         ,
     'Camera'          ,
     'MultiSensor'    ,
     'Remotebutton'    ,
     'Air_Quality'     ,
     'TVOC'            ,
     'Generic'         ,
     'colorButtons'     ,
     'NumberPad'        ,
     'navigation'     ,
     'VolChan'        ,
     'TVVolume'       ,
     'Music1'          ,
     'PlayBack'
    ];
    var isCubeLenth = isCube.length;
    for(var a = 0;a < isCubeLenth;a++){
        if(which == isCube[a]){
            scriptOBJ.iscube = true;
            break;
        }
    }
    if(scriptOBJ.which == 'RGBDeviceGroup'){
        scriptOBJ.which = 'bulb';
    }
    if(scriptOBJ.which == 'PhilipsHue'){
        scriptOBJ.which = 'bulb';
    }
    if(scriptOBJ.which == 'PlugDeviceGroup'){
        scriptOBJ.which = 'bulb';
    }
    return scriptOBJ;
}
function selectLanguage2(language){//for IR widget
    //todo
    var currentURL = window.location.href;
    var whichFile = currentURL.split('#')[0].split('/');
    var which = whichFile[whichFile.length - 2];
    var url = "../internationalization/"+language+".js"; //difference
    var scriptOBJ = {};
    scriptOBJ.url = url;
    scriptOBJ.which = which;
    return scriptOBJ;
}
function selectLanguage3(language){ //for IR learning
    //todo
    var currentURL = window.location.href;
    var whichFile = currentURL.split('#')[0].split('/');
    var which = whichFile[whichFile.length - 2];
    var url = '';
    if(which == 'Music2' || which == 'Music1'){
        url = "../internationalization/"+language+".js"; //difference
    }else{
        url = "../../internationalization/"+language+".js"; //difference
    }

    var scriptOBJ = {};
    scriptOBJ.url = url;
    scriptOBJ.which = which;
    scriptOBJ.iscube = false;
    var isCube = [
        'Music2'         ,
        'Camera'          ,
        'MultiSensor'    ,
        'Remotebutton'    ,
        'Air_Quality'     ,
        'TVOC'            ,
        'Generic'         ,
        'colorButtons'     ,
        'NumberPad'        ,
        'navigation'     ,
        'VolChan'        ,
        'TVVolume'       ,
        'Music1'          ,
        'PlayBack'        ,
        'CubeMultiSensor'
    ];
    var isCubeLenth = isCube.length;
    for(var a = 0;a < isCubeLenth;a++){
        if(which == isCube[a]){
            scriptOBJ.iscube = true;
            break;
        }
    }
    return scriptOBJ;
}
function selectLanguageForRoom(language,model){
    //todo
    var currentURL = window.location.href;
    var whichFile = currentURL.split('#')[0].split('/');
    var which = whichFile[whichFile.length - 2];
    var url = "../internationalization/"+language+".js"; //difference
    var scriptOBJ = {};
    scriptOBJ.url = url;
    scriptOBJ.which = which;
    scriptOBJ.iscube = false;
    var isCube = [
        'Music2'         ,
        'Camera'          ,
        'MultiSensor'    ,
        'Remotebutton'    ,
        'Air_Quality'     ,
        'TVOC'            ,
        'Generic'         ,
        'colorButtons'     ,
        'NumberPad'        ,
        'navigation'     ,
        'VolChan'        ,
        'TVVolume'       ,
        'Music1'          ,
        'PlayBack'
    ];
    var isCubeLenth = isCube.length;
    for(var a = 0;a < isCubeLenth;a++){
        if(which == isCube[a]){
            scriptOBJ.iscube = true;
            break;
        }
    }
    if(scriptOBJ.which == 'RGBDeviceGroup'){
        scriptOBJ.which = 'bulb';
    }
    if(scriptOBJ.which == 'PhilipsHue'){
        scriptOBJ.which = 'bulb';
    }
    if(scriptOBJ.which == 'PlugDeviceGroup'){
        scriptOBJ.which = 'bulb';
    }
    if(model == 'RGB') {
        scriptOBJ.which = 'bulb';
    }
    if(model == 'Plug') {
        scriptOBJ.which = 'OnOffStatus';
    }
    return scriptOBJ;
}