/**
 * Created by qkchung on 17/2/22.
 */
define(['util/popupTools','Vue'],
    function( popupTools  ,Vue) {
        var obj = {};
        obj.run = function (nodeID) {

            var self = null;
            var param = Oomi_command_function.create_new().resource_data();
            popupTools.ImportTemplates('#_header');
            Vue.component('pop-up-header', {
                name:'popUpHeader',
                template: '#_header',
                data: function () {
                    return {
                        deviceName:'',
                        roomName:''
                    }
                },
                mounted:function(){
                    self = this;
                    listen();
                },
                methods: {
                    DetailsClick:function(){
                        var a = setTimeout(function(){
                            cordova.exec(null, null, "FTP2PApi", "exitPopupWidget", ['devicePage',nodeID]);
                        },300)

                    }
                }
            });
            var demo = new Vue({
                el: '.head_content'
            });
            function listen(){
                    getDeviceName();
                    window.addEventListener('ftdevicestatusupdate', function (data) {
                        if (nodeID === data.ID) {
                            if (data.title === "changeName") {
                                self['deviceName'] =  data.content;
                            }
                            if (data.title === "changeRoomName") {
                                self['roomName'] =  data.content;
                            }
                            if (data.title === "changeRoom") {
                                self['roomName'] =  data.content;
                            }
                        }
                    }, false);
            }
            function getDeviceName(){
                cordova.exec(function (data) {
                    var myData = JSON.parse(data);
                    self['deviceName'] =  myData['value'];
                    self['roomName'] = myData['roomName'];
                }, null, "FTP2PApi", "getDeviceName", [nodeID]);
            }
        };
        return obj;
});
