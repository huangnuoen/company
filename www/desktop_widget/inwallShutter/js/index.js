/**
 * Created by qkchung on 2017/10/9.
 */
/*
 * Created By qkchung & Margaret on 2017/02/24
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        var params = Oomi_command_function.create_new().resource_data();
        obj.getParams = function () {
            return  Oomi_command_function.create_new().resource_data();
        };
        obj.device = {
            deviceName: "",
            deviceImg: '../src/assets/img/'+getImageId()+'.svg',
            deviceRoom: '',
            nestValue: '',
            OnOff:true,
            fileName:'inwallShutter'
        };
        function getImageId(){
            var icon = '';
            switch (params['iconId']+''){
                case '0':icon='wshutter0';break;
                case '1':icon='wshutter1';break;
                case '2':icon='wshutter2';break;
                case '3':icon='wshutter3'; break;
                case '4':icon='wshutter4'; break;
                case '5':icon='wshutter5';break;
                default: icon='wshutter0';
            }
            return icon;
        }
        return obj;
    });


