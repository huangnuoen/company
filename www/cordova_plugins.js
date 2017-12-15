cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/FTNotification/www/DeviceStatus.js",
        "id": "FTNotification.DeviceStatus",
        "clobbers": [
            "navigator.DeviceStatus"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.10-dev",
    "org.apache.cordova.console": "0.2.8",
    "org.apache.cordova.network-information": "0.2.8"
}
// BOTTOM OF METADATA
});