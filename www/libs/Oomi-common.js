/**
 * Created by qkchung on 15/10/28.
 */

/*
 * This libs is for all FANTEM OOMI-widgets.
 * Any method been used more than 3 times or is important in these widgets will be extracted and rewritten here.
 * This libs consist of command , data request ,and some of the identical methods.
 * The aim of this lib is to help develop Oomi widgets in a fast way.
 * This lib only matches the specially designed html dom , check /model/index.html
 *
 * */
var Oomi_common_functions = {
    createNew: function (buttons_el,keylistStr){
        if(buttons_el == undefined){
            //console.log('buttons_el undefined, buttons_el is the IR code and button element json');
        }
        var Oomi = {};
        /*
         * function name :topSelect(test,setup,highlight_part,select)
         * function ：ir 学习的教程和步骤贺业务逻辑
         * @param:(test,setup,highlight_part,select)
         * @param test: test 元素
         * @param highlight_part: 选中按钮的高光元素
         * @param select :取值’test‘ 、’setup‘， 标识顶部按钮选取情况，setup被选中则select = “setup”,否则为”test“
         * */
        Oomi.Oomi_command = Oomi_command_function.create_new();
        Oomi.select = 'setup';
        Oomi.resourse_ID = null;
        Oomi.buttons_el = buttons_el;
        Oomi.keylistStr = keylistStr;
        Oomi.blinkTimer = 0;
        Oomi.blinkTimer2 = 0;
        Oomi.Duration = {
            'blinkDuration' : 1000,
            'hideDuration':400,
            'callBackDuration':20000,
            'keylistCallBackDuration':7500
        };
        Oomi.callbackTimeout = 0;
        Oomi.currentCode = 0;
        Oomi.currentEvent = 0;
        Oomi.currentName = '';
        Oomi.prevEvent = 0;
        Oomi.currentResourceID = 0;
        Oomi.spinner = null;
        Oomi.canLearn = false;
        Oomi.canKeyList= false;
        Oomi.textOBJ = {};
        /*
         * function name:edit_name(relation_name)
         * function :
         * @param relation_name:url上得到的relation_name，当前widget的名字
         * */
        Oomi.edit_name = function edit_name(relation_name){
            var widget_name = document.getElementById("widget_name"),
                editButton = document.getElementById("editButton"),
                clearBtn = document.getElementById('clearBtn'),
                editTextField = document.getElementById("nameTextField");
            var clearSend = 0;
            editTextField.onkeyup = function validateEditName() {
                if((/[^\w\s\.\u4e00-\u9fa5]/ig).test(this.value)==true){
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
            //if(widget_name == undefined || editButton == undefined || editTextField == undefined){
            //    console.log('widget_name,editButton,editTextField either is undefined');
            //}else {
            if(relation_name == undefined || relation_name == 'null'){
                relation_name = '';
            }else if(relation_name == 'null_qk123'){
                relation_name = 'null';
            }
            editTextField.value = relation_name;
            Oomi.currentName = relation_name;
            widget_name.innerHTML = editTextField.value;
            adjust_button_position();
            editButton.onclick = function editButtonClick() {
                editTextField.focus();
            };
            editTextField.onkeydown = function KeyDown() {
                if (event.keyCode == 13) {
                    this.blur();
                }
            };
            editTextField.onblur = function () {
                clearSend = window.setTimeout(function () {
                    send(editTextField);
                    clearBtn.style.display = 'none';
                },100);

                editTextField.style.color = 'black';
                //Oomi.spin(false);
            };
            editTextField.onfocus = function editButtonClick() {
                editName();
                editTextField.style.color = '#FF9012';
                if(this.value.length > 0){
                    clearBtn.style.display = 'block';

                }else{
                    clearBtn.style.display = 'none';
                }
            };
            function editName() {
                //editTextField.setAttribute("readonly","false");
                editTextField.style.background = "white";
                editTextField.style.border = "gray";
                //editTextField.setSelectionRange(0,editTextField.value.length);
                editButton.style.display = "none";


            }
            function send(event) {
                //Oomi.spin(true);
                event.returnValue = false;
                event.cancel = true;
                editTextField.style.background = "none";
                editTextField.style.border = "none";
                editButton.style.display = "inline";
                widget_name.innerHTML = event.value;

                if(event.value.length == 0){
                    widget_name.innerHTML = Oomi.currentName;
                    editTextField.value = Oomi.currentName;
                }else if(event.value == 'null'){
                    Oomi.Oomi_command.edit_name(event.value+'_qk123',Oomi.Oomi_command.resource_data());
                    Oomi.currentName = 'null';
                }else{
                    Oomi.Oomi_command.edit_name(event.value,Oomi.Oomi_command.resource_data());
                    Oomi.currentName = event.value;
                }
                adjust_button_position();
            }
            function adjust_button_position(){
                var editbutton = document.getElementById("editButton_svg");
                var editTextForm = document.getElementById('editTextForm');
                var editTextFieldLeft = editTextField.offsetLeft + editTextForm.offsetLeft;
                var editTextFieldLength = Compute(editTextField.value).w;
                //console.log(editTextFieldLength);
                //console.log(editTextField.offsetWidth);
                if( editTextFieldLength > editTextField.offsetWidth){
                    $('#editButton_svg').css('left', editTextField.offsetWidth+editTextFieldLeft+2+'px');
                }else {
                    editbutton.style.left = editTextFieldLength+ editTextFieldLeft+4+'px';
                }
            }
            function Compute(v) {
                var d = $('#dvCompute');
                d.text(v);
                var obj = { w: d.width(),
                    h: d.height() };
                d.text('');
                return obj;
            }
            //}
        };
        Oomi.languageSwitcher = function (lang,name) {
            var scriptOBJ = selectLanguage(lang);
            if(scriptOBJ.which == 'Music2'){
                scriptOBJ.url = scriptOBJ.url.substring(3);
            }
            if(scriptOBJ.which == 'Music1'){
                scriptOBJ.url = scriptOBJ.url.substring(3);
            }
            $.getScript(scriptOBJ.url, function () {
                var textsOBJ = setAllTextLanguage(scriptOBJ.which);
                Oomi.textOBJ = textsOBJ;
                $('#stepByStep').text(textsOBJ.STEP);
                $('#s1_text').text(textsOBJ.STEP1);
                $('#s2_text').text(textsOBJ.STEP2);
                $('#s3_text_success').text(textsOBJ.STEP3SUCCESS);
                $('#ResultTestButton').text(textsOBJ.TEST);
                $('#editWidgetName').text(textsOBJ.EDIT_WIDGET_NAME);
                Oomi.edit_name(name);
            });
        };
        /*
         * function name:spin_init()
         * function : 初始化蒙版和蒙版上得加载图
         * */
         var spinner = null;
         Oomi.spin_init = function spin_init(){
            //var opts = {
            //    lines: 12,            // The number of lines to draw
            //    length: 4,            // The length of each line
            //    width: 2,             // The line thickness
            //    radius: 10,           // The radius of the inner circle
            //    scale: 1.2,           // Scales overall size of the spinner
            //    corners: 1,           // Roundness (0..1)
            //    color: '#FF9012',        // #rgb or #rrggbb
            //    opacity: 1/4,         // Opacity of the lines
            //    rotate: 0,            // Rotation offset
            //    direction: 1,         // 1: clockwise, -1: counterclockwise
            //    speed:1,             // Rounds per second
            //    trail: 100,           // Afterglow percentage
            //    fps: 20,              // Frames per second when using setTimeout()
            //    zIndex: 2e9,          // Use a high z-index by default
            //    className: 'spinner', // CSS class to assign to the element
            //    top: '50%',           // center vertically
            //    left: '50%',          // center horizontally
            //    shadow: false,        // Whether to render a shadow
            //    hwaccel: false,       // Whether to use hardware acceleration (might be buggy)
            //    position: 'absolute'  // Element positioning
            //};
            var target = document.getElementById('loading_mask');

            if(target == undefined){
                //console.log(target + 'wrong loading mask Id');
            }else {
                //if (Oomi.spinner  == null) {
                //    Oomi.spinner  = new Spinner(opts).spin(target);
                //}
                //target.style.display = "none";
                //var e =document.createElement("img");
                //e.src = "../../libs/img/loading.gif";
                //e.onerror = function a() {
                //    e.src = "../libs/img/loading.gif";
                //};
                //e.id="load_img";
                //target.appendChild(e);
                target.style.left = '100%';
            }
        };
        /*
         * function name : spin(show)
         * function : 蒙版显示或者隐藏
         * @param show:取值布尔值 true 的时候显示，false的时候隐藏
         * */
         Oomi.loadingMaskTimeout = 0;
         Oomi.spin = function spin(show){
             var $target = document.getElementById("loading_mask");
             //var e =document.getElementById("load_img");
             window.clearTimeout(Oomi.loadingMaskTimeout);
             if($target != undefined) {
                 if (show) {
                     $target.style.left = "0";
                     if($target.childElementCount==0){
                         var e =document.createElement("img");
                         e.src = "../libs/img/loading.gif";
                         e.id="load_img";
                         $target.appendChild(e);
                     }
                 } else if (!show){
                     $target.style.left = "100%";
                     Oomi.loadingMaskTimeout =setTimeout(function () {
                         if(document.getElementById("load_img") != null){
                             $('#load_img').remove();
                         }
                     },5000);
                 }
             }
        };
        /*
         * function unmask_buttons(data,b_el)
         * function : 去掉按钮上的蒙版的事件处理
         * @param data:取值json对象，键取红外十进制编码，值取1或0
         * @param b_el:取值json对象，键取红外十进制编码，键取按钮dom元素的id值
         * */
        Oomi.unmask_buttons = function unmask_buttons(data,b_el){
            if(data != undefined) {
                for (var i in data) {
                    if (data[i] == 1) {
                        var unmask_el = document.getElementById(b_el[i]);
                        if(unmask_el.attributes['opacity'] != '0'){
                            unmask_el.getElementsByClassName('button_mask')[0].setAttribute("opacity", "0");
                            var classEL = $('.'+b_el[i]);
                            if(classEL.length && classEL.length>0){
                                classEL.attr('opacity','1');
                            }
                        }
                    }
                }
            }
        };
        Oomi.unhighlightblink = function unhighlightblink(data,b_el){
            if(data != undefined) {
                for (var i in data) {
                    if (data[i] == 1) {
                            var el = $("#"+b_el[i]);
                            el.find('.highlight_part').hide();
                    }
                }
            }
        };

        Oomi.loading = function loading(func,time){
            window.clearTimeout(Oomi.callbackTimeout);
            Oomi.callbackTimeout = setTimeout(function () {
                if(func != null){
                    func();
                }
                Oomi.spin(false);
                Oomi.callbackTimeout = 0;
            }, time);
        };
        /*
         * function name : set_up(event,highlight_part)
         * function : 红外学习和控制
         * @param data:取值json对象，键取红外十进制编码，值取1或0
         * @param b_el:取值json对象，键取红外十进制编码，键取按钮dom元素的id值
         * */
        Oomi.set_up = function set_up(el,code,resourceID){

            if(Oomi.prevEvent != 0){
                Oomi.prevEvent.find('.long_highlight_part').attr("opacity","0");
            }
            Oomi.canLearn = true;
            if(el != undefined) {
                Oomi.spin(true);
                Oomi.currentCode = code;
                Oomi.currentEvent = el;
                Oomi.currentResourceID = resourceID;
                Oomi.singleButtonBlink(el);
                Oomi.step2();
                Oomi.Oomi_command.learnIR(resourceID,code);

                Oomi.loading(function () {
                    Oomi.step3UnSuccessful(el);
                },Oomi.Duration.callBackDuration);

            }
        };

        Oomi.singleButtonBlink = function singleButtonBlink(el){
            //console.log(el);
            $('.highlight_part').hide();
            el.find('.highlight_part').show();
            el.find('.long_highlight_part').attr('opacity','0');
        };
        Oomi.single_long_highlight = function long_highlight(el) {
            el.find('.highlight_part').hide();
            el.find('.long_highlight_part').attr('opacity','0.8');
        };
        Oomi.step1 = function step1() {
            var step_1 = $('#step_1'),
                step_2 = $('#step_2'),
                step_3 = $('#step_3'),
                IRImage = $('#IRImage'),
                IRLearnPoint = $('#IRLearnPoint');
            step_2.hide();
            step_3.hide();
            IRImage.hide();
            step_1.find('.s_text').css('color','#FF9012');
            IRLearnPoint.css('top','15%');
        };
        Oomi.step2 = function step2() {
            var step_1 = $('#step_1'),
                step_2 = $('#step_2'),
                step_3 = $('#step_3'),
                IRImage = $('#IRImage'),
                IRLearnPoint = $('#IRLearnPoint');
            $('.long_highlight_part').attr('opacity','0');
            step_3.hide();
            IRImage.show();
            step_1.find('.s_text').css('color','#939292');
            step_2.find('.s_text').css('color','#FF9012');
            IRLearnPoint.css('top','31%');
            $('#step_point_1').css({'color':'#939292','background-color': '#FFFFFF','font-size': '23px'}).text('①');
            $('#step_point_2').css({'color':'#FFFFFF','background-color': '#FF9012','font-size': '19px'}).text('2');
            $('#step_point_3').css({'color':'#939292','background-color': '#FFFFFF','font-size': '23px'}).text('③');
            step_2.show();
        };
        Oomi.step3Successful = function step3(el) {
            var step_1 = $('#step_1'),
                step_2 = $('#step_2'),
                step_3 = $('#step_3'),
                IRImage = $('#IRImage'),
                IRLearnPoint = $('#IRLearnPoint');
            step_3.show();
            IRImage.hide();
            step_1.find('.s_text').css('color','#939292');
            step_2.find('.s_text').css('color','#939292');
            step_3.find('.s_text').css('color','#FF9012').text(Oomi.textOBJ.STEP3SUCCESS);
            $('#ResultTestButton').text(Oomi.textOBJ.TEST).addClass('DoTEST');
            IRLearnPoint.css('top','55%');
            el.find('.button_mask').attr("opacity","0");
            Oomi.prevEvent = el;
            $('#step_point_1').css({'color':'#939292','background-color': '#FFFFFF','font-size': '23px'}).text('①');
            $('#step_point_2').css({'color':'#939292','background-color': '#FFFFFF','font-size': '23px'}).text('②');
            $('#step_point_3').css({'color':'#FFFFFF','background-color': '#FF9012','font-size': '19px'}).text('3');
            Oomi.single_long_highlight(el);
        };
        Oomi.step3UnSuccessful = function step3UnSuccess() {
            var step_1 = $('#step_1'),
                step_2 = $('#step_2'),
                step_3 = $('#step_3'),
                IRImage = $('#IRImage'),
                IRLearnPoint = $('#IRLearnPoint');
            step_3.show();
            IRImage.hide();
            step_1.find('.s_text').css('color','#939292');
            step_2.find('.s_text').css('color','#939292');
            step_3.find('.s_text').css('color','#FF9012').text(Oomi.textOBJ.STEP3FAIL);
            $('#ResultTestButton').text(Oomi.textOBJ.RELearn).removeClass('DoTEST');
            IRLearnPoint.css('top','55%');
            $('#step_point_1').css({'color':'#939292','background-color': '#FFFFFF','font-size': '23px'}).text('①');
            $('#step_point_2').css({'color':'#939292','background-color': '#FFFFFF','font-size': '23px'}).text('②');
            $('#step_point_3').css({'color':'#FFFFFF','background-color': '#FF9012','font-size': '19px'}).text('3');
        };

        Oomi.EventListenEdit = function EventListenEdit() {
            $('#ResultTestButton').click(function () {
                if( $('#ResultTestButton').hasClass('DoTEST')){
                    Oomi.spin(true);
                    Oomi.Oomi_command.sendIR(Oomi.currentResourceID, Oomi.currentCode);
                    Oomi.loading(null,600);
                }else {
                    Oomi.set_up(Oomi.currentEvent,Oomi.currentCode,Oomi.currentResourceID);
                }
            });
            document.addEventListener('deviceready', function () {
                if(Oomi.Oomi_command.resource_data().relationName == undefined){
                    Oomi.Oomi_command.edit_name('',Oomi.Oomi_command.resource_data());
                }else{
                    Oomi.Oomi_command.edit_name(Oomi.Oomi_command.resource_data().relationName,Oomi.Oomi_command.resource_data());
                }

                var resourcelist1 = Oomi.Oomi_command.resource_list();
                if (resourcelist1 != null) {
                    Oomi.canKeyList = true;
                    var a = setTimeout(function () {
                        window.clearTimeout(Oomi.callbackTimeout);
                        Cordova.exec(function (data) {
                            Oomi.unmask_buttons(JSON.parse(data.content), buttons_el);
                        }, function (data) {
                        }, "FTP2PApi", "getKeyList",[resourcelist1[0].ID, keylistStr]);
                        Oomi.spin(false);
                        window.clearTimeout(a);
                    },1000);

                    Oomi.loading(null,Oomi.Duration.keylistCallBackDuration);
                }else{
                    //window.clearTimeout(Oomi.callbackTimeout);
                    var c = setTimeout(function () {
                        Oomi.spin(false);
                        window.clearTimeout(c);
                    },30000);
                }

                window.addEventListener('ftdevicestatusupdate', function (data) {
                    var td = Oomi.Oomi_command.resource_data();
                    var resourceList = Oomi.Oomi_command.resource_list();

                    if (td.relationID === data.ID) {
                        if (data.title === "changeName") {
                            Oomi.spin(false);

                        } else if (data.title === "IRCREAT") {
                            //alert(data.content);
                        }
                    }
                    if(data.title === "Language"){
                        Oomi.languageSwitcher(data.content);
                    }
                    if (resourceList != null) {
                        if (resourceList[0].ID = data.ID) {
                            if (data.title === "IR_Control") {
                                if(Oomi.callbackTimeout != 0) {
                                    //Oomi.IR_step("IR_result", data.content, data.status);
                                    Oomi.spin(false);
                                    window.clearTimeout(Oomi.callbackTimeout);
                                }
                            } else if (data.title === "IR_Learn") {
                                if(Oomi.canLearn == false){
                                    return 1;
                                }else{
                                    Oomi.canLearn = false;
                                }
                                if(Oomi.callbackTimeout != 0) {
                                    Oomi.spin(false);
                                    if (data.status == 'true') {
                                        Oomi.step3Successful($('#' + buttons_el[data.content]));
                                        Oomi.currentCode = data.content;
                                    } else {
                                        Oomi.step3UnSuccessful();
                                    }
                                    window.clearTimeout(Oomi.callbackTimeout);
                                }
                            } else if (data.title === "IR_CHECKKEYS") {
                                if(Oomi.canKeyList == false){
                                    return 1;
                                }else{
                                    Oomi.canKeyList = false;
                                }
                                Oomi.spin(false);
                                Oomi.unmask_buttons(JSON.parse(data.content), buttons_el);
                                Oomi.unhighlightblink(JSON.parse(data.content), buttons_el);
                                window.clearTimeout(Oomi.callbackTimeout);
                            }
                        }
                    }
                }, false);
            }, false);
        };
        return Oomi;
    }
};