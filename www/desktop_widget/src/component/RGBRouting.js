/**
 * Created by qkchung on 17/3/3.
 */
define(['jquery', 'util/popupTools','solidCommon','ChooseRGB','RGBRainbow','RGBrandom','RGBPattern','VueRouter','Vue','TweenLite','TimelineLite'],
    function($  ,       popupTools   , solidCommon  ,ChooseRGB,RGBRainbow , RGBrandom , RGBPattern,VueRouter  , Vue,TweenLite,TimelineLite) {
        var obj = {};
        obj.run = function (nodeID,Wtype,textsOBJ,deviceType,col,operateID,bus,model) {
            solidCommon.run(nodeID,Wtype,textsOBJ,deviceType,operateID,bus,model);
            ChooseRGB.run(nodeID,textsOBJ,deviceType,operateID,bus);
            RGBRainbow.run(nodeID,textsOBJ,deviceType,operateID,bus);
            RGBrandom.run(nodeID,textsOBJ,deviceType,operateID,bus);
            RGBPattern.run(nodeID,textsOBJ,deviceType,operateID,bus);
            popupTools.ImportTemplates('#_RGBRouting');
            Vue.use(VueRouter);
            var Solid = { template: '<solid-common></solid-common>' };
            var Rainbow = { template: '<rainbow></rainbow>' };
            var Pattern = { template: '<RGBPattern></RGBPattern>' };
            var Random = { template:'<random></random>'};
            var Round = { template:'<choose-rgb></choose-rgb>'};
            var thisComponent = null;
            var router = new VueRouter({
                routes: [
                    { path: '/Solid', name: 'Solid', component: Solid },
                    { path: '/Rainbow', name: 'Rainbow', component: Rainbow },
                    { path: '/Pattern', name: 'Pattern', component: Pattern },
                    { path: '/Random', name: 'Random', component: Random },
                    { path: '/solidRainbow', name: 'solidRainbow', component: Solid },
                    { path: '/roundRainbow', name: 'roundRainbow', component: Round }
                ]
            });

            var demo = new Vue({
                router: router,
                template:'#_RGBRouting',
                mounted:function(){
                    var toPush = 'Solid';
                    thisComponent = this;
                    initPosition(toPush);
                    renderRout(col);
                    listener();
                },
                created: function () {
                },
                data:{
                    roundRainbowShow:true,
                    solidRainbowShow:false,
                    Solid:textsOBJ.popSolid,
                    Rainbow:textsOBJ.popRainbow,
                    Pattern:textsOBJ.popPattern,
                    Random:textsOBJ.popRandom
                },
                methods:{
                    isClick: function (event) {
                        setPosition();
                        this.roundRainbowShow=false;
                        this.solidRainbowShow=true;
                    },
                    roundRainbowClick: function (event) {
                        setPosition();
                        this.roundRainbowShow = !this.roundRainbowShow;
                        this.solidRainbowShow = !this.solidRainbowShow;
                    },
                    solidRainbowClick: function (event) {
                        setPosition();
                        this.roundRainbowShow = !this.roundRainbowShow;
                        this.solidRainbowShow = !this.solidRainbowShow;
                    },hideRainbow: function (event) {
                        setPosition();
                        hideSolid();
                    }
                }

            }).$mount('.RGB_routing_content');
            function setPosition(){
                var toPush = router.history.current.name;
                isRoundRainbow(toPush);
                var pos = 0;
                var gap = 181.5;
                switch(toPush){
                    case "Solid":pos=0;break;
                    case "Rainbow":pos=1;break;
                    case "Pattern":pos=2;break;
                    case "Random":pos=3;break;
                    case "solidRainbow":pos=0;break;
                    case "roundRainbow":pos=0;break;
                }
                TweenLite.to('.RoutingUnderline', 0.3, {attr:{x1:pos*gap,x2:(pos+1)*gap}, ease:Bounce.easeOut});
                TweenLite.to('a', 0.3, {css:{color:'#595757'}});
                TweenLite.to('.link-'+toPush, 0.3, {css:{color:'#D0672B'},delay:0.3});
            }
            function isRoundRainbow(pushUrl) {
                if(pushUrl === 'roundRainbow') {
                    if(operateID !== undefined) {
                        localStorage.setItem('showRoundRainbow'+operateID,true);
                    } else {
                        localStorage.setItem('showRoundRainbow'+nodeID,true);
                    }
                } else{
                    if(operateID !== undefined) {
                        localStorage.removeItem('showRoundRainbow'+operateID);
                    } else {
                        localStorage.removeItem('showRoundRainbow'+nodeID);
                    }
                }
            }
            function initPosition(){
                var toPush = router.history.current.name;
                var pos = 0;
                var gap = 181.5;
                switch(toPush){
                    case "Solid":pos=0;break;
                    case "Rainbow":pos=1;hideSolid();break;
                    case "Pattern":pos=2;hideSolid();break;
                    case "Random":pos=3;hideSolid();break;
                    case "solidRainbow":pos=0;break;
                    case "roundRainbow":pos=0;break;
                }
                TweenLite.to('.RoutingUnderline', 0, {attr:{x1:pos*gap,x2:(pos+1)*gap}, ease:Bounce.easeOut});
                TweenLite.to('a', 0, {css:{color:'#595757'}});
                TweenLite.to('.link-'+toPush, 0, {css:{color:'#D0672B'},delay:0});
            }
            function hideSolid(){
                thisComponent.roundRainbowShow = false;
                thisComponent.solidRainbowShow = false;
            }
            function listener(){
                if (operateID !== undefined){
                    return 1;
                }
                window.addEventListener('ftdevicestatusupdate', function (data) {
                    if (nodeID === data.ID) {
                        if (data.title === "DeviceStatus") {
                            var result = JSON.parse(data.content);
                            for (var key in result) {
                                if (key === "color") {
                                    var re = String(result[key]);
                                    renderRout(re);
                                }
                            }
                        }
                    }
                }, false);
            }
            function renderRout(re){
                re = re+'';
                var toJump = re;
                if(re.indexOf('_') !== -1){
                    toJump = re.split('_')[0];
                }
                if(toJump === 'pattern'){
                    router.push({ name: 'Pattern'});
                    setPosition();
                    hideSolid();
                }else if(toJump === 'rainbow'){
                    router.push({ name: 'Rainbow'});
                    setPosition();
                    hideSolid();
                }else if(re.indexOf('random')>-1){
                    router.push({ name: 'Random'});
                    setPosition();
                    hideSolid();
                }else {
                    var toPush = router.history.current.name;
                    var getOperateRdStorage = null;
                    var getRoundStorage = null;
                    if(operateID !== undefined) {
                        getOperateRdStorage = localStorage.getItem('showRoundRainbow'+operateID);
                    } else {
                        getRoundStorage = localStorage.getItem('showRoundRainbow'+nodeID);
                    }
                    if(getRoundStorage || getOperateRdStorage){
                        router.push({ name: 'roundRainbow'});
                        setPosition();
                        thisComponent.roundRainbowShow=true;
                        thisComponent.solidRainbowShow=false;
                    } else {
                        if(operateID !== undefined) {
                            localStorage.removeItem('showRoundRainbow'+operateID);
                        } else {
                            localStorage.removeItem('showRoundRainbow'+nodeID);
                        }
                        router.push({ name: 'Solid'});
                        setPosition();
                        thisComponent.roundRainbowShow=false;
                        thisComponent.solidRainbowShow=true;
                    }
                }
            }
        };
        return obj;
    });