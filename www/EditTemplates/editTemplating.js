/**
 * Created by qkchung on 16/10/11.
 */

    function getTemplateAjax( callback) {
        var source;
        var template;
        var currentURL = window.location.href;
        var whichFile = currentURL.split('#')[0].split('/');
        var which = whichFile[whichFile.length - 2];
        var path = '';
        if(which == 'Music2' || which == 'Music1'){
            path = "../EditTemplates/editTemplate.html"; //difference
        }else{
            path = "../../EditTemplates/editTemplate.html"; //difference
        }
        $.ajax({
            url: path,
            catch:true,
            success: function(data) {
                source    = data;
                template  = Handlebars.compile(source);
                if (callback) callback(template);
            }
        });
    }
    getTemplateAjax(function(template) {
        var mainContent = $('#main_content');
        mainContent.append(template);
        mainContent.append(Handlebars.compile($('#widgetContainerTemplate').html())(''));
        var widgetHolder = $('#widgetHolder');
        widgetHolder.append(Handlebars.compile($('#widgetContainer').html())(''));
    });

    function renderEverything(){

    }
    function createNewEdittemplate(keylist,buttonEL,element_button){
        var editObj = {};
        editObj.currentName = '';
        editObj.currentPage = 1;
        editObj.scriptObj = {};
        editObj.currentEvet = null;
        editObj.Oomi_command = Oomi_command_function.create_new();
        editObj.resourceID = editObj.Oomi_command.resource_list()[0].ID;
        editObj.Param = editObj.Oomi_command.resource_data();
        editObj.keylist = keylist;
        editObj.buttonEl = buttonEL;
        editObj.timeout = 0;
        editObj.spinner = null;
        editObj.focusEffect = function () {
            var widget_name = document.getElementById("widget_name"),
                clearBtn = document.getElementById('clearBtn'),
                editTextField = document.getElementById("nameTextField");
            var doneButt = document.getElementById("doneButt");
            var widgetCover = document.getElementById("widgetCover");
            var BButt = document.getElementById("BButt");
            var nameInput = document.getElementById("nameInput");
            var clearSend = 0;
            //multiLang();

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
                //var lenReg = function(){
                //    return editTextField.value.replace(/[^\x00-\xFF]/g,'**').length;
                //};
                //if(lenReg()>20){
                //    this.value = this.value.substring(0,this.value.length - 1);
                //}
                this.value=this.value.replace(/\s+/g,' ')
            };
            clearBtn.onclick = function () {
                editTextField.value = '';
                editTextField.focus();
                clearBtn.style.display = 'none';
                window.clearTimeout(clearSend);
            };

            function initVals(){
                var str = editObj.Param.widgetId;
                var array=str.split('_');
                var nodeid=array[1];
                var relation_name = editObj.Param['relationName'];
                if(relation_name == undefined || relation_name == 'null'){
                    relation_name = '';
                }else if(relation_name == 'null_qk123'){
                    relation_name = 'null';
                }
                editTextField.value = relation_name;
                editTextField.setAttribute('placeholder',relation_name);
                editObj.Oomi_command.edit_name(relation_name,editObj.Param,nodeid);
                editObj.currentName = relation_name;
                widget_name.innerHTML = editTextField.value;
            }
            function multiLang(){
                var om2 = editObj.Oomi_command;
                var Param = om2.resource_data();
                var lang = Param.language;
                languageSwitcher(lang);
                function languageSwitcher(lang) {
                    var scriptOBJ = selectLanguage2(lang);
                    $.getScript(scriptOBJ.url, function () {
                        var textsOBJ = setAllTextLanguage('editTemplate');
                        editObj.scriptObj=textsOBJ;
                        $('#greetings').text(textsOBJ.GREET);
                        $('#processing').text(textsOBJ.PROCESSING1);
                        $('#doneButt').text(textsOBJ.DONE);
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
                var str = editObj.Param.widgetId;
                var array=str.split('_');
                var nodeid=array[1];
                //Oomi.spin(true);
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
            function switchPage(page){
                //console.log(nameInput.style.display);
                if(page == 1){
                    widgetCover.style.display = 'block';
                    editTextField.style.display = 'block';
                    clearBtn.style.display = 'block';
                    $('#processing').text(editObj.scriptObj.PROCESSING1);
                }else if(page == 2){
                    $('#processing').text(editObj.scriptObj.PROCESSING2);
                    widgetCover.style.display = 'none';
                    editTextField.style.display = 'none';
                    clearBtn.style.display = 'none';
                }
                editObj.currentPage = page;
            }
            doneButt.onclick = function(){
                editObj.clickEffect(doneButt);
                if(editObj.currentPage == 1){
                    send(editTextField);
                    switchPage(2);
                }else if(editObj.currentPage == 2){
                    editObj.Oomi_command.exit_edit();
                    //switchPage(1);
                }
            };
            BButt.onclick = function () {
                editObj.clickEffect(BButt);
                if(editObj.currentPage == 1){
                    editObj.Oomi_command.exit_edit();
                    //todo
                }else if(editObj.currentPage == 2){
                    //todo
                    $('#processing').text(editObj.scriptObj.PROCESSING1);
                    switchPage(1);
                }
            };
        };

        editObj.learningIR = function (data) {
            clickEvents();
            function clickEvents(){
                var lenth = editObj.keylist.length;
                var tempLoop =null;
                for(var i  = 0 ; i < lenth ; i++){
                    tempLoop = i;
                    var El = $('#'+editObj.buttonEl[editObj.keylist[i]]);
                    El.click(function () {
                      var id = $(this).attr('id');
                        if($(this).find('.button_mask').attr('opacity') == 0){
                            editObj.switchPages('assignOomiCubeIR',element_button[id]);
                        }else{
                            editObj.switchPages('TeachOomiCubeIR',element_button[id]);
                        }
                    });
                }
            }
            editObj.unmask_buttonss(data);
        };
        editObj.unmaskSingle = function unmaskSingle(el) {
            $('#'+el).find('.button_mask').attr('opacity',0);
            $('.'+el).attr('opacity','1');
        };
        editObj.unmask_buttonss = function unmask_buttonss(data){
            if(data != undefined) {
                for (var i in data) {
                    if (data[i] == 1) {
                        var unmask_el = document.getElementById(buttonEL[i]);
                        if(unmask_el.attributes['opacity'] != '0'){
                            unmask_el.getElementsByClassName('button_mask')[0].setAttribute("opacity", "0");
                            var classEL = $('.'+buttonEL[i]);
                            if(classEL.length && classEL.length>0){
                                classEL.attr('opacity','1');
                            }
                        }
                    }
                }
            }
        };
        editObj.switchPages = function (el,codes,results) {
            switch (el){
                case 'TeachOomiCubeIR':
                    renderTo(el);
                    teach(codes);
                    break;
                case 'assignOomiCubeIR':
                    renderTo(el);
                    assign(codes);
                    break;
                case 'ResultOomiCubeIR':
                    renderTo(el);
                    result(codes,results);
                    break;
                case  'null':
                    $('.blackBackground').remove();
                    break;
            }
            function renderTo(positions){
                $('.blackBackground').remove();
                var posi = document.querySelector('#'+positions);
                var clone = document.importNode(posi.content, true);
                document.querySelector('#main_content').appendChild(clone);

            }
            function teach(codes){
                //var a =0;
                //a = setInterval(function(){
                //    editObj.spin_init();
                //    window.clearInterval(a);
                //    a = null;
                //},300);
                window.clearTimeout(editObj.timeout);
                editObj.Oomi_command.learnIR(editObj.resourceID,codes);
                editObj.timeout = window.setTimeout(function () {
                    //editObj.spinner.stop();
                    //editObj.spinner = null;
                    editObj.switchPages('ResultOomiCubeIR',codes,false);
                    window.clearTimeout(editObj.timeout);
                },25000);

                (function changeText(){
                    $('#headingsHolder').text(editObj.scriptObj.TEACHTitle);
                    $('#tutorialHolder').text(editObj.scriptObj.TEACHTutorial);
                    $('#ScanningButton').text(editObj.scriptObj.TEACHScan);
                })();

            }
            function assign(codes){
                (function changeText(){
                    $('#assignHeadingsHolder').text(editObj.scriptObj.ASSIGNTitle);
                    $('#testButton').text(editObj.scriptObj.ASSIGNTest);
                    $('#ReassignButton').text(editObj.scriptObj.ASSIGNReassign);
                    $('#cancelButton').text(editObj.scriptObj.ASSIGNCanel);
                })();
                $('#testButton').click(function () {
                    editObj.clickEffect(this);
                    editObj.Oomi_command.sendIR(editObj.resourceID,codes);
                });
                $('#ReassignButton').click(function () {
                    editObj.clickEffect(this);
                    editObj.switchPages('TeachOomiCubeIR',codes);
                });
                $('#cancelButton').click(function () {
                    editObj.clickEffect(this);
                    editObj.switchPages('null')
                });
            }
            function result(codes,results){
                $('#ResultDone').click(function () {
                    editObj.clickEffect(this);
                    editObj.switchPages('null');
                });
                changeText();
                function changeText(){
                    $('#ResultDone').text(editObj.scriptObj.RESULTDone);
                    if(results == true){
                        $('#ResultFeedback').text(editObj.scriptObj.RESULTTitleSuccess);
                        $('#ResultTest').text(editObj.scriptObj.RESULTTest).click(function () {
                            editObj.clickEffect(this);
                            editObj.Oomi_command.sendIR(editObj.resourceID,codes);
                        });
                       $('#successLogo').attr('visibility','visible');
                    }else{
                        $('#ResultFeedback').text(editObj.scriptObj.RESULTTitleFail);
                        $('#ResultTest').text(editObj.scriptObj.RESULTRetry).click(function () {
                            editObj.clickEffect(this);
                            editObj.switchPages('TeachOomiCubeIR',codes);
                        });
                        $('#successLogo').attr('visibility','hidden');
                    }
                }
            }
        };
        editObj.LanguageSwitch = function LanguageSwitch(){
            var lang = editObj.Param.language;
            languageSwitcher(lang);
            function languageSwitcher(lang) {
                var scriptOBJ = selectLanguage3(lang);
                $.getScript(scriptOBJ.url, function () {
                    var textsOBJ = setAllTextLanguage('editTemplate');
                    editObj.scriptObj=textsOBJ;
                    $('#greetings').text(textsOBJ.GREET);
                    $('#processing').text(textsOBJ.PROCESSING1);
                    $('#doneButt').text(textsOBJ.DONE);
                });
            }
        };
        editObj.spin_init = function spin_init() {
            var opts = {
                lines: 12,            // The number of lines to draw
                length: 4,            // The length of each line
                width: 2,             // The line thickness
                radius: 6,           // The radius of the inner circle
                scale: 1.0,           // Scales overall size of the spinner
                corners: 1,           // Roundness (0..1)
                color: '#FFFFFF',        // #rgb or #rrggbb
                opacity: 1/4,         // Opacity of the lines
                rotate: 0,            // Rotation offset
                direction: 1,         // 1: clockwise, -1: counterclockwise
                speed:1,             // Rounds per second
                trail: 100,           // Afterglow percentage
                fps: 20,              // Frames per second when using setTimeout()
                zIndex: 2e9,          // Use a high z-index by default
                className: 'spinner', // CSS class to assign to the element
                top: '68%',           // center vertically
                left: '55%',          // center horizontally
                shadow: false,        // Whether to render a shadow
                hwaccel: false,       // Whether to use hardware acceleration (might be buggy)
                position: 'absolute'  // Element positioning
            };
            var target = document.getElementById('Scanning');
            if (editObj.spinner  == null) {
                editObj.spinner  = new Spinner(opts).spin(target);
            }
        };
        editObj.listeners = function(){
            document.addEventListener('deviceready', function () {
                editObj.LanguageSwitch();
                editObj.learningIR();
                var KEYlist = '0x';
                for(var a =0 ; a < keylist.length;a++){
                    var temp = Number(keylist[a]).toString(16);
                    for(var i = 0, tempLenth = temp.length; i <8- tempLenth ; i++){
                        temp = '0'+temp;
                    }
                    KEYlist += temp;
                    if(a !=(keylist.length -1)){
                        KEYlist+=',';
                        KEYlist+='0x';
                    }
                }

                var b=0;
                var interval = setInterval(function(){
                    b++;
                    cordova.exec(function (data) {
                        editObj.unmask_buttonss(JSON.parse(data));
                    },function (data) {},"FTP2PApi", "getKeyList",[editObj.resourceID, KEYlist]);
                    if(b>=1){
                        window.clearInterval(interval);
                    }
                },50);

                window.addEventListener('ftdevicestatusupdate', function (data) {
                        if (editObj.resourceID == data.ID) {
                            if (data.title === "IR_Control") {

                            } else if (data.title === "IR_Learn") {
                                    if (data.status == 'true') {
                                        //editObj.spinner.stop();
                                        //editObj.spinner = null;
                                        editObj.unmaskSingle(buttonEL[data.content]);
                                        editObj.switchPages('ResultOomiCubeIR',data.content,true);

                                        window.clearTimeout(editObj.timeout);
                                    } else {
                                        //editObj.switchPages('ResultOomiCubeIR',data.content,false);
                                        //window.clearTimeout(editObj.timeout);
                                        //todo 返回失败的情况
                                    }
                            } else if (data.title === "IR_CHECKKEYS") {
                                editObj.unmask_buttonss(JSON.parse(data.content));
                            }
                        }
                }, false);
            }, false);
        };
        editObj.clickEffect = function clickEffect(el){
            el = $(el);
            el.css({'border':'2px solid #F26F21','background-color':'#F26F21','color':'#FFFFFF'});
            var a = setTimeout(function(){
                el.css({'border':'2px solid #c3c3c3','background-color':'transparent','color':'#c3c3c3'});
                window.clearTimeout(a);
            },500);
        };
        return editObj;
    }