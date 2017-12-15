/**
 * Created by qkchung on 17/2/22.
 */
define(['util/popupTools','Vue','TweenLite','TimelineLite'],
    function( popupTools  ,Vue, TweenLite, TimelineLite) {
        var obj = {};
        obj.run = function (groupID,textsOBJ) {
            var self = null;
            var oomiParams = Oomi_command_function.create_new().resource_data();
            popupTools.ImportTemplates('#_header');
            Vue.component('pop-up-header', {
                name:'popUpHeader',
                template: '#_headerForGroup',
                data: function () {
                    return {
                        deviceName:'',
                        roomName:'',
                        editDeviceName: 'Device Group',
                        editSelectedAmount: 3,
                        editShowOrNot: true,
                        ChangeName:textsOBJ.changeNameTitle,
                        ChangeDevices:textsOBJ.changeDeviceTitle,
                        DeleteGroup: textsOBJ.deleteGroupTitle,
                        selectedName: textsOBJ.selectedNameTitle
                    }
                },
                mounted:function(){
                    self = this;
                    editPageSwitch();
                    listen();
                },
                methods: {
                    DetailsClick:function(){
                        TweenLite.to($('.groupDeviceDetails'), 0.3, {css:{'left':'0%',opacity:'1',display:'block'}});
                        cordova.exec(null, null, "FTP2PApi", "editGroupDetails", [groupID]);
                        this.editShowOrNot = false;

                    },
                    exitGroupDetails:function() {
                        TweenLite.to($('.groupDeviceDetails'), 0.3, {css:{'left':'100%',opacity:'0',display:'none'}});
                        this.editShowOrNot = true;
                    },
                    deleteGroup:function() {
                        sendCommand('deleteGroup');
                    },
                    changeDeviceName:function() {
                        sendCommand('changeName');
                    },
                    changeSelected:function() {
                        sendCommand('changeDevices');
                    }
                }
            });
            var demo = new Vue({
                el: '.head_content'
            });
            function sendCommand(commandFields) {
                cordova.exec(null, null, "FTP2PApi", "updataDevGroup", [groupID, commandFields]);
            }

            function editPageSwitch() {
                var $groupDeviceDetails = $('.groupDeviceDetails');
                var $body_content = $('.body_content');
                var $routing_content = $('.routing_content');
                var $editPattern = $('.editPattern');
                var $navigationHolder = $('.navigationHolder');
                var $head_content = $('.head_content');
                $groupDeviceDetails.css('height',$body_content.height()+$routing_content.height()+'px');
                $groupDeviceDetails.css('top',$head_content.height()+'px');
            }
            function listen(){
                getGroupDetails();
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (groupID === data.ID) {
                        if (data.title === "updataDevGroupName") {
                            self['deviceName'] = data.content;
                            self['editDeviceName'] = data.content;
                        }
                        if (data.title === "updataDevGroupDevice") {
                                self['editSelectedAmount'] = data.content;
                        }
                    }
                    if (data.title === "reEditGroupDetails") {
                        cordova.exec(function (data) {
                            var myData = JSON.parse(data);
                            self['roomName'] = myData['devGroupRoomName'];
                        }, null, "FTP2PApi", "editGroupDetails", [groupID]);
                    }
                    if (data.title === "changeRoomName") {
                        cordova.exec(function (data) {
                            var myData = JSON.parse(data);
                            self['roomName'] = myData['devGroupRoomName'];
                        }, null, "FTP2PApi", "editGroupDetails", [groupID]);
                    }
                }, false);
            }

            function getGroupDetails() {
                cordova.exec(function (data) {
                    var myData = JSON.parse(data);
                    self['editSelectedAmount'] =  myData['value'];
                    self['deviceName'] = myData['devGroupName'];
                    self['roomName'] = myData['devGroupRoomName'];
                    self['editDeviceName'] = myData['devGroupName'];
                }, null, "FTP2PApi", "editGroupDetails", [groupID]);
            }

        };
        return obj;
});
