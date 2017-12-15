/**
 * Created by qkchung.
 */
define(['util/popupTools','Vue'],
    function( popupTools ,Vue) {
        var obj = {};
        var thisComponent = {};
        obj.run = function(nodeID){
            Vue.component('on-off-lock', {
                name:'onOffLock',
                template: '#_onOffLock',
                data: function () {
                    return {
                        isLocked:false
                    }
                },
                mounted:function(){
                    thisComponent = this;
                    $('#_onOffLock').remove();
                    getCurrentStatus();
                },
                methods:{
                    chooseLockOrNot: function() {
                        this.isLocked = !this.isLocked;
                        localStorage.setItem('isLocked'+nodeID,this.isLocked);
                    }
                }
            });
            var demo = new Vue({
                el: '.onOffLock'
            })

            function getCurrentStatus() {
                var getCurrentStatus = localStorage.getItem('isLocked'+nodeID);
                if(getCurrentStatus == 'true') {
                    thisComponent.isLocked = true;
                } else {
                    thisComponent.isLocked = false;
                }
            }

        };
        return obj;
    });