/**
 * Created by qkchung on 17/2/22.
 */
define(['util/popupTools','Vue'],
    function( popupTools  ,Vue) {
        var obj = {};
        obj.run = function (currentDevice) {
            var self = null;
            var om2 = Oomi_command_function.create_new();
            var Param = om2.resource_data();
            Vue.component('pop-up-header', {
                name:'popUpHeader',
                template: '#_header',
                data: function () {
                    return {
                        deviceName:Param['relationName']
                    }
                },
                mounted:function(){
                    self = this;
                    if(Param['isTemplate'] === '0'){
                        setTimeout(function () {
                            listen();
                        },10);
                    } else {
                        changeDeviceName(Param['language']);
                    }
                },
                methods: {
                    edit: function () {
                        var url="www/IRWidget/"+getCurrentFileName()+"/edit.html";
                        om2.load_edit_prompDirect(url,Param,Param['language'],self.deviceName);
                    }
                }
            });
            var demo = new Vue({
                el: '.head_content'
            });
            function getCurrentFileName(){
                var CurrentUrl = window.document.location.pathname;
                var files = CurrentUrl.split('/');
                return files[files.length - 2];
            }
            function changeDeviceName(lang) {
                var currentName = {};
                if(lang === 'zh_CN'){
                    currentName = {
                        'Music':'音乐',
                        'TV': '电视机',
                        'Generic': '通用',
                        'Navigation': '导航',
                        'Numbers': '数字',
                        'Vol Channals': '音量频道',
                        'Volume': '音量',
                        'Colors': '色彩',
                        'Play Back': '回放',
                        'TVRemote': '电视遥控器'
                    }
                } else {
                    currentName = {
                        'Music':'Music',
                        'TV': 'TV',
                        'Generic': 'Generic',
                        'Navigation': 'Navigation',
                        'Numbers': 'Numbers',
                        'Vol Channals': 'Vol Channals',
                        'Volume': 'Volume',
                        'Colors': 'Colors',
                        'Play Back': 'Play Back',
                        'TVRemote': 'TVRemote'
                    }
                }
                self.deviceName = currentName[Param['relationName']];
            }
            function listen(){
                    window.addEventListener('ftdevicestatusupdate', function (data) {
                        if(data.title === "Language"){
                            Param['language'] = data.content;
                        }
                        if (Param['relationID']  === data.ID) {
                            if(data.title=== "changeName"){
                                self.deviceName = data.content;
                            }
                        }
                    }, false);
            }

        };
        return obj;
});
