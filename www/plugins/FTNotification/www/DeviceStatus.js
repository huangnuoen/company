cordova.define("FTNotification.DeviceStatus", function(require, exports, module) { /*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * This class contains information about the current Temperature status.
 * @constructor
 */


var cordova = require('cordova'),
    exec = require('cordova/exec');

function handlers() {
  return deviceStatus.channels.ftdeviceStatusupdate.numHandlers;
}

var STATUS_CRITICAL = 5;
var STATUS_LOW = 20;

var DeviceStatus = function() {

    this._level = null;
    this._isPlugged = null;
    // Create new event handlers on the window (returns a channel instance)
    this.channels = {
      ftdeviceStatusupdate:cordova.addWindowEventHandler("ftdevicestatusupdate")
    };
    
     
    for (var key in this.channels) {
    	
        this.channels[key].onHasSubscribersChange = DeviceStatus.onHasSubscribersChange;
       
    }
};
/**
 * Event handlers for when callbacks get registered for the NFC.
 * Keep track of how many handlers we have so we can start and stop the native NFC listener
 * appropriately (and hopefully save on NFC life!).
 */
DeviceStatus.onHasSubscribersChange = function() {

  // If we just registered the first handler, make sure native listener is started.

  if (this.numHandlers === 1 && handlers() === 1) {
  
  	
      exec(deviceStatus._status, deviceStatus._error, "FTDeviceStatusChangeNotification", "start", []);
      
  } else if (handlers() === 0) {
  
      exec(null, null, "FTDeviceStatusChangeNotification", "stop", []);
  }
};

/**
 * Callback for deviceStatus status
 *
 * @param {Object} info            keys: deviceStatus
 */
DeviceStatus.prototype._status = function (info) {

    if (info) {
            
            // Something changed. Fire deviceStatusupdate event
            cordova.fireWindowEvent("ftdevicestatusupdate", info);
//            console.log(JSON.stringify(info));
        }
    
};

/**
 * Error callback for Temperature start
 */
DeviceStatus.prototype._error = function(e) {
    console.log("Error initializing deviceStatus: " + e);
};

var deviceStatus = new DeviceStatus();

module.exports = deviceStatus;


});
