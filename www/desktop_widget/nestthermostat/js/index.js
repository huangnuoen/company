/*
 * Created By qkchung & Margaret on 2017/04/11
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        obj.device = {
            deviceName: "",
            deviceImg: "../src/assets/img/nest.svg",
            deviceRoom: '',
            nestValue: 68,
            OnOff:true,
            fileName:'nestthermostat'
        };
        obj.getParams = function () {
            return  Oomi_command_function.create_new().resource_data();
        };
        return obj;
    });