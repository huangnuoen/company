/**
 * Created by qkchung on 2017/7/3.
 */
/**
 * Created by qkchung on 17/3/3.
 */
define(['jquery', 'util/popupTools','VueRouter','IRSelect','Vue','TweenLite','TimelineLite'],
    function($  ,       popupTools , VueRouter ,IRSelect,  Vue,  TweenLite,  TimelineLite) {
        var obj = {};
        obj.run = function (nodeID,textsOBJ) {
            IRSelect.run('ir-select','IrSelect','_Select',textsOBJ);
            Vue.use(VueRouter);
            var om2 = Oomi_command_function.create_new();
            // var Exit = { template: '<div></div>' };
            var SelectDone = { template: '<ir-select></ir-select>' };
            var thisComponent = null;
            var router = new VueRouter({
                routes: [
                    // { path: '/Exit', name: 'Exit', component: Exit },
                    { path: '/SelectDone', name: 'SelectDone', component: SelectDone}
                ]
            });

            var demo = new Vue({
                router: router,
                template:'#_IRRouting',
                mounted:function(){
                    thisComponent = this;
//                    router.push('SelectDone');
                    window.location.hash = 'SelectDone';
                },
                created: function () {
                },
                data:{
                    showSelectDone:false
                },
                methods:{
                    Exit: function (event) {
                        om2.exit_edit();
                    },
                    SelectDone: function (event) {
                    },
                    toTutorial: function() {
                        var a = setTimeout(function(){
                            cordova.exec(null, null, "FTP2PApi", "IRTutorial", ['toIRTutorial']);
                        },300)
                    }
                }

            }).$mount('.IR_routing_content');


        };
        return obj;
    });