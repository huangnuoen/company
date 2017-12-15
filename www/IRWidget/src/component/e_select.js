/**
 * Created by qkchung on 2017/7/3.
 */
define(['util/popupTools','Vue','e_buttons'],
    function( popupTools  ,Vue,e_buttons) {
        var obj = {};
        obj.run = function (vueComponent, vueName, vueTemplate,textsOBJ) {
            function GetRequest() {
                var currentUrl = window.location.pathname; // 获取url中"desktop_widget"符后的字串
                var FileList = currentUrl.split("/");
                return FileList[FileList.length - 2];
            }
            var bus = new Vue();
            var currentCommand = 1;
            var thisComponent = null;
            var currentEl = '';
            var om2 = Oomi_command_function.create_new();
            var resourceID = om2.resource_list()[0].ID;
            var learnTimeout = 0;
            e_buttons.run(GetRequest(),bus,resourceID);
            Vue.component(vueComponent, {
                name: vueName,
                template: '#'+vueTemplate,
                data: function () {
                    return {
                        SelectTitle:textsOBJ.SelectTitle,
                        assignedTitle:textsOBJ.assignedTitle,
                        test:textsOBJ.test,
                        reassign:textsOBJ.reassign,
                        cancel:textsOBJ.cancel,
                        teachTitle:textsOBJ.teachTitle,
                        teachTur:textsOBJ.teachTur,
                        successTitle:textsOBJ.successTitle,
                        done:textsOBJ.done,
                        failTitle:textsOBJ.failTitle,
                        back:textsOBJ.back,
                        tryAgain:textsOBJ.tryAgain,
                        test2:textsOBJ.test2,
                        ScanningText:textsOBJ.ScanningText,
                        assigned:false,
                        teach:false,
                        success:false,
                        fail:false,
                        currentButt:currentEl
                    }
                },
                mounted:function(){
                    thisComponent = this;
                    listenButtons();
                },
                methods: {
                    testClicked:function () {
                        om2.sendIR(resourceID,currentCommand);
                    },
                    reassignClicked:function () {
                        setTimeout(function(){
                            bus.$emit('cancelResult',false);
                            loadTimeout();
                            showTeach();
                            om2.learnIR(resourceID,currentCommand);
                        },150)
                    },
                    cancelClicked:function () {
                        delayButtsClicked(showNone);
                    },
                    teachCancelClicked:function () {
                        bus.$emit('cancelResult',true);
                        delayButtsClicked(showNone);
                    },
                    test2Clicked:function () {
                        om2.sendIR(resourceID,currentCommand);
                    },
                    doneClicked:function () {
                        showNone();
                    },
                    backClicked:function () {
                        delayButtsClicked(showNone);
                    },
                    tryAgainClicked:function () {
                        setTimeout(function () {
                            loadTimeout();
                            showTeach();
                            om2.learnIR(resourceID,currentCommand);
                        },150)
                    }
                }
            });

            function delayButtsClicked(showFunc) {
                setTimeout(function () {
                    showFunc();
                },150)
            }

            function loadTimeout() {
                window.clearTimeout(learnTimeout);
                learnTimeout = setTimeout(function () {
                    showFail();
                },25000);
            }
            function showAssigned() {
                thisComponent.assigned = true;
                thisComponent.teach = false;
                thisComponent.success = false;
                thisComponent.fail = false;
            }
            function showTeach() {
                bus.$emit('cancelResult',false);
                thisComponent.assigned = false;
                thisComponent.teach = true;
                thisComponent.success = false;
                thisComponent.fail = false;
                setTimeout(function () {
                    thisComponent.currentButt = currentEl;
                },10);
            }
            function showSuccess() {
                thisComponent.assigned = false;
                thisComponent.teach = false;
                thisComponent.success = true;
                thisComponent.fail = false;
            }
            function showFail() {
                thisComponent.assigned = false;
                thisComponent.teach = false;
                thisComponent.success = false;
                thisComponent.fail = true;
            }
            function showNone() {
                window.clearTimeout(learnTimeout);
                thisComponent.assigned = false;
                thisComponent.teach = false;
                thisComponent.success = false;
                thisComponent.fail = false;
            }
            function getElemtsFromButtons(elemt) {
                var d = elemt.replace(new RegExp(/(#FFF)/g),'transparent');
                var c = d.replace(new RegExp(/(#BCBCBC)/g),'transparent');
                var b = c.replace(new RegExp(/(fff)/g),'585858');
                var a = b.replace(new RegExp(/(B3B2B3)/g),'FFFFFF');
                currentEl = a.replace(new RegExp(/(IRButtons)/g),'');
            }
            function listenButtons() {
                bus.$on('reassign',function (data) {
                    showAssigned();
                    currentCommand = data['command'];
                    getElemtsFromButtons(data['El']);
                });
                bus.$on('teach',function (data) {
                    currentCommand = data['command'];
                    getElemtsFromButtons(data['El']);
                    showTeach();
                    loadTimeout();
                    om2.learnIR(resourceID,currentCommand);
                });
                bus.$on('result',function (data) {
                    if(data === true){
                        showSuccess();
                        window.clearTimeout(learnTimeout);
                    }
                });
            }
        };
        return obj;
    });