/**
 * Created by qkchung on 17/2/27.
 */
define(['util/popupTools','Vue'],
    function(popupTools,Vue) {
        var obj = {};
        obj.run = function () {
            popupTools.ImportTemplates('#_toggleButton');
            Vue.component('toggle-button', {
                name:'toggleButton',
                template: '#_toggleButton',
                mounted:function(){
                    //$('#_toggleButton').remove();
                },
                data: function () {
                    return {
                        OnOffLock:true
                    }
                },
                methods:{
                    toggleClick : function () {
                        this.OnOffLock = !this.OnOffLock;
                    }
                }
            });
            var demo = new Vue({
                el: '.toggleButton',
                data:{}
            })
        };
        return obj;
    });