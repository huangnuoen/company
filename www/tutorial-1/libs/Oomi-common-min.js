/**
 * Created by qkchung on 16/5/24.
 */
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
    createNew: function (){
        var Oomi = {};
        Oomi.Oomi_command = Oomi_command_function.create_new();
        Oomi.Duration = {
            'hideDuration':400,
            'callBackDuration':20000,
            'keylistCallBackDuration':7500
        };
        Oomi.callbackTimeout = 0;
        Oomi.currentName = '';
        Oomi.spinner = null;
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
        Oomi.spin_init = function spin_init(){
            var target = document.getElementById('loading_mask');

            if(target == undefined){
                //console.log(target + 'wrong loading mask Id');
            }else {
                target.style.left = '100%';
            }
        };
        Oomi.loadingMaskTimeout = 0;
        Oomi.spin = function spin(show){
            var $target = document.getElementById("loading_mask");
            window.clearTimeout(Oomi.loadingMaskTimeout);
            if($target != undefined) {
                if (show) {
                    $target.style.left = "0";
                    if($target.childElementCount==0){
                        var e =document.createElement("img");
                        e.src = "../libs/img/loading.gif";
                        //e.onerror = function a() {
                        //    e.src = "../libs/img/loading.gif";
                        //};
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
        return Oomi;
    }
};