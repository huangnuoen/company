/**
 * Created by Margaret on 2017/3/10.
 */

define(['util/popupTools','jquery','Vue'],
    function(popupTools,$,Vue){
        var obj = {};
        obj.run = function() {
            popupTools.ImportTemplates('#_air_details');
            var thisComponent = {};
            Vue.component('air-details',{
                template: '#_air_details',
                data:function() {
                    return {
                        OnOffLock: true,
                        vocStatus: '',
                        vocValue: '',
                        fpmStatus: '',
                        fpmValue: ''
                    }
                },
                mounted:function() {
                    thisComponent = this;
                    getVocValue(0.6);
                    getFpmValue(36)
                    getVocStatus(0.6);
                    getFpmStatus(36);
                },
                methods:{
                    clickDwButton:function() {
                        this.OnOffLock = !this.OnOffLock;
                    }
                }
            })

            // get voc value
            function getVocValue(vocValue) {
                thisComponent.vocValue = vocValue;
            }

            // get fpm value
            function getFpmValue(fpmValue) {
                thisComponent.fpmValue = fpmValue;
            }

            // font color of voc/fpm will be assigned different on the display

            function getVocStatus(vocValue) {
                var $vocStatus = $('.vocStatus');
                if (vocValue>3) {
                    thisComponent.vocStatus = 'Very Bad';
                    $vocStatus.css('color','#C30D23');
                } else if (vocValue>1) {
                    thisComponent.vocStatus = 'Bad';
                    $vocStatus.css('color','#FF0000');
                } else if (vocValue>0.5) {
                    thisComponent.vocStatus = 'OK';
                    $vocStatus.css('color','#FF8000');
                } else if(vocValue>0.25) {
                    thisComponent.vocStatus = 'Normal';
                    $vocStatus.css('color','#FF007F');
                } else {
                    thisComponent.vocStatus = 'Good';
                    $vocStatus.css('color','#8DC21F');
                }
            }

            // get fpm status from bg and update it according to fpmValue
            function getFpmStatus(fpmValue) {
                var $fpmStatus = $('.fpmStatus');
                if (fpmValue>35) {
                    thisComponent.fpmStatus = 'Very Bad';
                    $fpmStatus.css('color','#C30D23');
                } else if (fpmValue>30) {
                    thisComponent.fpmStatus = 'Bad';
                    $fpmStatus.css('color','#FF0000');
                } else if (fpmValue>15) {
                    thisComponent.fpmStatus = 'OK';
                    $fpmStatus.css('color','#FF8000');
                } else {
                    thisComponent.fpmStatus = 'Good';
                    $fpmStatus.css('color','#8DC21F');
                }
            }

            var app = new Vue({
                el: '.body_content'
            })
        }
        return obj;
})