/**
 * Created by Margaret on 2017/3/9.
 */

define(['util/popupTools','jquery','Vue'],
    function(popupTools,$,Vue){
        var obj = {};
        obj.run = function() {
            popupTools.ImportTemplates('#_dw_details');
            var thisComponent = {};
            Vue.component('dw-details',{
                template: '#_dw_details',
                data:function() {
                    return {
                        OnOffLock: true,
                        dwStatus: 'Open',
                        dwSignsSrc: '../src/assets/img/openDoor.svg',
                    }
                },
                methods:{
                    clickDwButton:function() {
                        this.OnOffLock = !this.OnOffLock;
                    },
                },
                mounted:function() {
                    thisComponent = this;
                    getDwStatus(false,true,false,false,false);
                    // get dw type from URL
                    getDwSigns('window');
                },

            });

            // if one of dw status returns a 'open/close', it will show 'open/close'
            function getDwStatus(doorStatus,windowStatus,smallStatus,garageStatus,refrigeratorStatus) {
                if(doorStatus || windowStatus || smallStatus || garageStatus || refrigeratorStatus== true) {
                    thisComponent.dwStatus = 'Open';
                } else {
                    thisComponent.dwStatus = 'Close';
                    $('.dwStatus').css('color','#B3B2B3');
                }
            }

            // get the dw type from background and the corresponding function will be executed
            function getDwSigns(type) {
                switch(type) {
                    case 'door': switchToDoor(false); break;
                    case 'window': switchToWindow(true); break;
                    case 'bedroomDoor': switchToBedroomDoor(false); break;
                    case 'garageDoor' : switchToGarageDoor(false); break;
                    case 'refrigerator' : switchToRefrigerator(false); break;
                    default: switchToNone(); break;
                }
            }

            function switchToDoor(doorStatus) {
                if(doorStatus == true) {
                    thisComponent.dwSignsSrc = '../src/assets/img/openDoor.svg';
                } else {
                    thisComponent.dwSignsSrc = '../src/assets/img/closeDoor.svg';
                }
            }

            function switchToWindow(windowStatus) {
                if(windowStatus == true) {
                    thisComponent.dwSignsSrc = '../src/assets/img/openWindow.svg';
                } else {
                    thisComponent.dwSignsSrc = '../src/assets/img/closeWindow.svg';
                }
            }

            function switchToBedroomDoor(bedroomDoorStatus) {
                if(bedroomDoorStatus == true) {
                    thisComponent.dwSignsSrc = '../src/assets/img/openSmallDoor.svg';
                } else {
                    thisComponent.dwSignsSrc = '../src/assets/img/closeSmallDoor.svg';
                }
            }

            function switchToGarageDoor(garageDoorStatus) {
                if(garageDoorStatus == true) {
                    thisComponent.dwSignsSrc = '../src/assets/img/openGarageDoor.svg';
                } else {
                    thisComponent.dwSignsSrc = '../src/assets/img/closeGarageDoor.svg';
                }
            }

            function switchToRefrigerator(refrigeratorStatus) {
                if(refrigeratorStatus == true) {
                    thisComponent.dwSignsSrc = '../src/assets/img/openRefrigeratorDoor.svg';
                } else {
                    thisComponent.dwSignsSrc = '../src/assets/img/closeRefrigeratorDoor.svg';
                }
            }

            // default ？？？
            function switchToNone() {
                thisComponent.dwSignsSrc = '../src/assets/img/openDoor.svg';
            }

            var app = new Vue({
                el:'.body_content'
            });
        }
        return obj;
})
