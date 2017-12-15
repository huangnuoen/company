/**
 * Created by qkchung on 17/3/8.
 */

define(['util/popupTools','jquery','Vue'],
    function(popupTools, $, Vue) {
        var obj = {};
        obj.run = function (temperature,brightness,motion,listenDevice) {
            var thisComponent = {};
            popupTools.ImportTemplates('#_mutisensor_details');
            Vue.component('sensor-details', {
                template: '#_mutisensor_details',
                data:function() {
                    return {
                        sensorDetails: [
                            {'sensorSignStatus':motion ?'Yes' :'No','sensorSignName':'Motion Sensor',
                                'sensorSrc':'../src/assets/img/stand-off.svg'},
                            {'sensorSignStatus':brightness,'sensorSignName':'Light Sensor',
                                'sensorSrc':'../src/assets/img/darkness-off.svg'},
                            {'sensorSignStatus':50+'℉','sensorSignName':'Temperature Sensor',
                                'sensorSrc':'../src/assets/img/therometer-off.svg'},
                            {'sensorSignStatus':'31'+'%','sensorSignName':'Humidity Sensor',
                                'sensorSrc':'../src/assets/img/humidity-off.svg'},
                            {'sensorSignStatus':'1'+' UV Index','sensorSignName':'UV Sensor',
                                'sensorSrc':'../src/assets/img/cloudy-off.svg'},
                        ],
                        OnOffLock:true,
                        // motionStatusData:true,
                        lightStatusData: 50,

                    }
                },
                mounted:function() {
                    thisComponent = this;
                    this.watchMotionSensor();
                    this.watchLightSensor();
                    // getTemperature(50);
                    getHumidity(15);
                    getUVRays(3);
                    var self = this;
                    if(listenDevice) {
                        listenDevice(function(data) {
                            self.sensorDetails[2].sensorSignStatus = data+'℉';
                        },function(data) {
                            self.sensorDetails[1].sensorSignStatus = data;
                        },function(data) {
                            self.sensorDetails[0].sensorSignStatus = data;
                        })
                    }
                },
                watch:{
                    // motion sensor
                    motionStatusData:function() {
                        this.watchMotionSensor();
                    },
                    lightStatusData:function() {
                        this.watchLightSensor();
                    }
                },
                methods:{
                    clickOptionButton:function() {
                        this.OnOffLock = !this.OnOffLock;
                    },
                    watchMotionSensor:function() {
                        getMotionStatus(true);
                    },
                    watchLightSensor:function() {
                        getLightSensor(70);
                    }
                },
            });

            // 获取motion sensor状态
            function getMotionStatus(motionStatus) {
                if(motionStatus == true) {
                    thisComponent.sensorDetails[0].sensorSignStatus = 'Yes';
                    thisComponent.sensorDetails[0].sensorSrc = '../src/assets/img/run-off.svg';
                } else {
                    thisComponent.sensorDetails[0].sensorSignStatus = 'No';
                    thisComponent.sensorDetails[0].sensorSrc = '../src/assets/img/stand-off.svg';
                }
            };

            // 获取light sensor状态
            function getLightSensor(lightStatus) {
                if(lightStatus > 60) {
                    thisComponent.sensorDetails[1].sensorSignStatus = 'Light';
                    thisComponent.sensorDetails[1].sensorSrc = '../src/assets/img/brightness-off.svg';
                } else {
                    thisComponent.sensorDetails[1].sensorSignStatus = 'Dark';
                    thisComponent.sensorDetails[1].sensorSrc = '../src/assets/img/darkness-off.svg'
                }
            };

            // 获取温度值
            function getTemperature(value) {
                thisComponent.sensorDetails[2].sensorSignStatus = value;
            }

            // 获取湿度值
            function getHumidity(value) {
                thisComponent.sensorDetails[3].sensorSignStatus = value;
            };

            // 获取紫外线值
            function getUVRays(value) {
                thisComponent.sensorDetails[4].sensorSignStatus = value;
            };

            var app = new Vue({
                el:'.body_content'
            });
    }
    return obj;
})