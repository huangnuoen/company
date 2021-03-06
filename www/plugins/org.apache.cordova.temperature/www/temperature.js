cordova.define("org.apache.cordova.temperature.temperature", function(require, exports, module) { /*
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
  return temperature.channels.temperatureupdate.numHandlers;
}

var STATUS_CRITICAL = 5;
var STATUS_LOW = 20;

var Temperature = function() {

    this._level = null;
    this._isPlugged = null;
    // Create new event handlers on the window (returns a channel instance)
    this.channels = {
      temperatureupdate:cordova.addWindowEventHandler("temperatureupdate")
    };
    
     
    for (var key in this.channels) {
    	
        this.channels[key].onHasSubscribersChange = Temperature.onHasSubscribersChange;
       
    }
};
/**
 * Event handlers for when callbacks get registered for the NFC.
 * Keep track of how many handlers we have so we can start and stop the native NFC listener
 * appropriately (and hopefully save on NFC life!).
 */
Temperature.onHasSubscribersChange = function() {

  // If we just registered the first handler, make sure native listener is started.

  if (this.numHandlers === 1 && handlers() === 1) {
  	alert("temperature!");
      exec(temperature._status, temperature._error, "FTTemperature", "start", []);
      
  } else if (handlers() === 0) {
  
      exec(null, null, "FTTemperature", "stop", []);
  }
};

/**
 * Callback for temperature status
 *
 * @param {Object} info            keys: Temperature
 */
Temperature.prototype._status = function (info) {

    if (info) {
            
            // Something changed. Fire temperatureupdate event
            cordova.fireWindowEvent("temperatureupdate", info);      
    
        }
    
};

/**
 * Error callback for Temperature start
 */
Temperature.prototype._error = function(e) {
    console.log("Error initializing temperature: " + e);
};

var temperature = new Temperature();

module.exports = temperature;


});
