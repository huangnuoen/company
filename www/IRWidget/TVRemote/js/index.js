/*
 * Created By qkchung & Margaret on 2017/04/11
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        obj.device = {
            deviceName: "TV remote",
            deviceImg: "../src/assets/img/tvVolume.svg",
            OnOff:true,
            fileName:'TVRemote'
        };
        return obj;
    });
