var tutorialCommon = {};
tutorialCommon.importCommonHtml = function() {
    $.ajax({
        url : "component.html",
        async:false,            //this is the trick
        success : function(result){
            document.body.innerHTML=result+document.body.innerHTML;
        }
    });
}
tutorialCommon.clickAnimation = function() {
    var tl = new TimelineMax({delay: 1.275, paused: false, repeat: -1, repeatDelay: 0.2, yoyo: false, smoothChildTiming: true, useFrames: false});
    tl.add(TweenLite.to('.mycircle', 0.1,{attr:{r:'23'}}));
    tl.add(TweenLite.to('.mycircle', 0.1,{attr:{r:'24'}}));
    tl.add(TweenLite.to('.mycircle', 0.1,{attr:{r:'22'}}));
    tl.add(TweenLite.to('.mycircle', 0.1,{attr:{r:'23'}}));
    tl.add(TweenLite.to('.mycircle', 0.1,{attr:{r:'21'}}));
    tl.add(TweenLite.to('.mycircle', 0.1,{attr:{r:'20'}}));
    tl.add(TweenLite.to('.mycircle', 1.2,{attr:{opacity:'0',r:'34'}}));
    // tl.add(TweenLite.to('.mycircle', 0.6,{attr:{opacity:'1',r:'25'}}));
    setTimeout(function(){
        $('.mycircle').css('display','inline');
    },1275);
}

tutorialCommon.blackBoxAnimation = function(start,end,repeatstart,repeatend) {
    var tlB = new TimelineMax({delay: 1.275 ,paused: false, repeat: -1, repeatDelay: 0.2, yoyo: false	, smoothChildTiming: true, useFrames: false});
    var tl2 = new TimelineMax({delay: 0 ,paused: false, repeat: 0, repeatDelay: 1, yoyo: false, smoothChildTiming: true, useFrames: false});
    tl2.add(TweenLite.to('.messageDialog', 0.425, {'top':start,ease:Power2.easeOut}));
    tl2.add(TweenLite.to('.messageDialog', 0.85, {'top':end,ease:Bounce.easeOut}));

    tlB.add(TweenLite.to('.messageDialog', 0.6,{'top':repeatend,  ease:Power2.easeOut   }));
    tlB.add(TweenLite.to('.messageDialog', 1.2,{'top':repeatstart,ease:Power2.easeOut}));
//  tlB.add(TweenLite.to('.messageDialog', 1.05,{'top':repeatstart,ease:Power2.easeOut}));
}
