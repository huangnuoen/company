/*
 * Created By qkchung & Margaret on 2017/04/11
 * Virtual Interface
 */


define(['jquery','OomiCommand','util'],
    function($,OC,popupTools) {
        var obj = {};
        obj.device = {
            deviceName: "Playback",
            deviceImg: "../src/assets/img/playback.svg",
            OnOff:true,
            fileName:'playback'
        };
        return obj;
    });
