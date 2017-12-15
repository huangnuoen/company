/**
 * Created by qkchung on 16/10/19.
 */
/**
 * Created by qkchung on 16/10/11.
 */
    function getTemplateAjax(path, callback) {
        var source;
        var template;

        $.ajax({
            url: path,
            catch:true,
            success: function(data) {
                source    = data;
                template  = Handlebars.compile(source);
                //execute the callback if passed
                if (callback) callback(template);
            }
        });
    }
    getTemplateAjax('../../EditTemplates/editTemplate.html', function(template) {
        var mainContent = $('#main_content');
        mainContent.append(template);
        mainContent.append(Handlebars.compile($('#widgetContainerTemplate').html())(''));
        var widgetHolder = $('#widgetHolder');
        widgetHolder.append($('#widgetContainer').html());
        if(window.MYonload){
            MYonload();
        }
    });


function createNewEdittemplate(){
    var editObj = {};
    editObj.currentName = '';
    editObj.scriptObj = {};
    editObj.Oomi_command = Oomi_command_function.create_new();
    editObj.Param = editObj.Oomi_command.resource_data();
    editObj.focusEffect = function () {
        var widget_name = document.getElementById("widget_name"),
            clearBtn = document.getElementById('clearBtn'),
            editTextField = document.getElementById("nameTextField");
        var doneButt = document.getElementById("doneButt");
        var widgetCover = document.getElementById("widgetCover");
        var BButt = document.getElementById("BButt");
        var nameInput = document.getElementById("nameInput");
        var clearSend = 0;
        widgetCover.style.display = 'none';
        multiLang();
        initVals();
        editTextField.onkeyup = function validateEditName() {
            if((/[^\w\s\.\(\)\/\u4e00-\u9fa5]/ig).test(this.value)==true){
                this.value=this.value.replace(/[^\w\s\.\u4e00-\u9fa5]/ig,'')
            }
            if(this.value.length == 1){
                if(this.value[0]==' '){
                    this.value=''
                }
            }
            if(this.value.length > 0){
                clearBtn.style.display = 'block';
            }else{
                clearBtn.style.display = 'none';
            }
            this.value=this.value.replace(/\s+/g,' ')
        };
        clearBtn.onclick = function () {
            editTextField.value = '';
            editTextField.focus();
            clearBtn.style.display = 'none';
            window.clearTimeout(clearSend);
        };
        function initVals(){
            getDeviceName();
            function getDeviceName(){
                cordova.exec(function (data) {
                            var myData = JSON.parse(data);
                            editObj.Param['deviceName'] = myData['value'];
                            if(myData['isCube'] == true){
                                var relation_name = editObj.Param['relationName'];
                                if(relation_name == undefined || relation_name == 'null'){
                                    relation_name = '';
                                }else if(relation_name == 'null_qk123'){
                                    relation_name = 'null';
                                }
                                editTextField.value = relation_name;
                                editTextField.setAttribute('placeholder',relation_name);
                                editObj.currentName = relation_name;

                                widget_name.innerHTML = editTextField.value;
                            }else{
                                var device_name = editObj.Param['deviceName'];
                                if(device_name == undefined || device_name == 'null'){
                                    device_name = '';
                                }else if(device_name == 'null_qk123'){
                                    device_name = 'null';
                                }
                                editTextField.value = device_name;
                                editTextField.setAttribute('placeholder',device_name);
                                editObj.currentName = device_name;
                                widget_name.innerHTML = editTextField.value;
                            }
                }, null, "FTP2PApi", "getDeviceName", [editObj.Param.deviceId]);
            }
        }
        function multiLang(){
            var om2 = editObj.Oomi_command;
            var Param = om2.resource_data();
            var lang = Param.language;
            languageSwitcher(lang);
            function languageSwitcher(lang) {
                var scriptOBJ = selectLanguage3(lang);
                editObj.scriptObj = scriptOBJ;
                //var aInterval = setInterval(function () {
                //    if(scriptOBJ.iscube != undefined){

                //        window.clearInterval(aInterval);
                //    }
                //},100);

                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage('editTemplate');
                    editObj.scriptObj=textsOBJ;
                    $('#greetings').text(textsOBJ.GREET);
                    $('#processing').text(textsOBJ.PROCESSING1);
                    $('#doneButt').text(textsOBJ.DONE);
                    $('#resetPin').text(textsOBJ.RESETPIN);
                    //if(scriptOBJ.which == 'Security'){
                    //    var resetPin = document.getElementById("resetPin");
                    //    resetPin.style.display = 'block';
                    //    resetPin.onclick = function () {
                    //        Cordova.exec(function (data) {
                    //        }, function (data) {
                    //        }, "FTP2PApi", "resetPinCode",[]);
                    //    };
                    //}
                });
            }
        }
        editTextField.onkeydown = function KeyDown() {
            if (event.keyCode == 13) {
                this.blur();
            }
        };
        editTextField.onblur = function () {
            clearSend = window.setTimeout(function () {
                clearBtn.style.display = 'none';
            },100);
            editTextField.style.color = 'black';
            //Oomi.spin(false);
        };
        editTextField.onfocus = function editButtonClick() {
            editTextField.style.color = '#FF9012';
            if(this.value.length > 0){
                clearBtn.style.display = 'block';
            }else{
                clearBtn.style.display = 'none';
            }
        };

        function send(event) {
            //Oomi.spin(true);
            var str = editObj.Param.widgetId;
            var array=str.split('_');
            var nodeid=array[1];
            event.returnValue = false;
            event.cancel = true;
            editTextField.style.background = "none";
            //editTextField.style.border = "none";
            var lenReg = function(str){
                return str.replace(/[^\x00-\xFF]/g,'*').length;
            };
            //var lenth = event.value.length;
            if(lenReg(event.value)>20){
                //for(var a = 0 ; a < lenth ; a++){
                //    if(lenReg(event.value.substring(0,4+a))>20){
                        editTextField.value = editTextField.value.substring(0,20);
                //        break;
                //    }
                //}
            }
            widget_name.innerHTML = event.value;
            if(event.value.length == 0){
                widget_name.innerHTML = editObj.currentName;
                editTextField.value = editObj.currentName;
                editTextField.setAttribute('placeholder',editObj.currentName);
            }else if(event.value == 'null'){
                editObj.Oomi_command.edit_name(event.value+'_qk123',editObj.Param,nodeid);
                editObj.currentName = 'null';
                editTextField.setAttribute('placeholder',editObj.currentName);
            }else{

                editObj.Oomi_command.edit_name(event.value,editObj.Param,nodeid);
                editObj.currentName = event.value;
                editTextField.setAttribute('placeholder',editObj.currentName);
            }
        }

        doneButt.onclick = function(){
            send(editTextField);
            clickEffect(doneButt);
        };
        BButt.onclick = function () {
            editObj.Oomi_command.exit_edit();
        };
        function clickEffect(el){
            el = $(el);
            el.css({'border':'2px solid #F26F21','background-color':'#F26F21','color':'#FFFFFF'});
            var a = setTimeout(function(){
                el.css({'border':'2px solid #c3c3c3','background-color':'transparent','color':'#c3c3c3'});
                window.clearTimeout(a);
            },500);
        }
    };


    return editObj;
}