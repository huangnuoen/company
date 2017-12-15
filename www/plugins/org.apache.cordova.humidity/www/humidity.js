cordova.define("org.apache.cordova.humidity.humidity", function(require, exports, module) { /*
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
  return humidity.channels.humidityupdate.numHandlers;
}

var STATUS_CRITICAL = 5;
var STATUS_LOW = 20;

var Humidity = function() {

    this._level = null;
    this._isPlugged = null;
    // Create new event handlers on the window (returns a channel instance)
    this.channels = {
      humidityupdate:cordova.addWindowEventHandler("humidityupdate")
    };
    
     
    for (var key in this.channels) {
    	
        this.channels[key].onHasSubscribersChange = Humidity.onHasSubscribersChange;
       
    }
};
/**
 * Event handlers for when callbacks get registered for the NFC.
 * Keep track of how many handlers we have so we can start and stop the native NFC listener
 * appropriately (and hopefully save on NFC life!).
 */
Humidity.onHasSubscribersChange = function() {

  // If we just registered the first handler, make sure native listener is started.

  if (this.numHandlers === 1 && handlers() === 1) {
  	
      exec(humidity._status, humidity._error, "FTHumidity", "start", []);
      
  } else if (handlers() === 0) {
  
      exec(null, null, "FTHumidity", "stop", []);
  }
};

/**
 * Callback for temperature status
 *
 * @param {Object} info            keys: Humidity
 */
Humidity.prototype._status = function (info) {

    if (info) {
            
            // Something changed. Fire Humidity event
            cordova.fireWindowEvent("humidityupdate", info);      
    
        }
    
};

/**
 * Error callback for Temperature start
 */
Humidity.prototype._error = function(e) {
    console.log("Error initializing Humidity: " + e);
};

var humidity = new Humidity();

module.exports = humidity;


});