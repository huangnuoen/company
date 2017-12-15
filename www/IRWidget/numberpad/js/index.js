/*
 * Created By qkchung & Margaret on 2017/04/11
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        obj.device = {
            deviceName: "Number Pad",
            deviceImg: "../src/assets/img/numberPad.svg",
            OnOff:true,
            fileName:'numberpad'
        };
        return obj;
    });
