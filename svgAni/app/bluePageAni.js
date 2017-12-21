TweenLite.from('.header', 0.6, {
    delay: 0.2,
    opacity: 0,
    ease: Power4.easeInOut
});
TweenLite.from(['.device', '.shadow'], 1, {
    scale: 0,
    delay: 0.25,
    transformOrigin: 'center',
    ease: Elastic.easeOut.config(1, 0.5),
})
TweenLite.from('.circle', 0.8, {
    opacity: 0,
    delay: 0.2,
    ease: Power4.easeInOut
});
TweenLite.from('.balloon1', 0.8, {
    y: 15,
    opacity: 0,
    delay: 0.8,
    ease: Elastic.easeOut.config(1, 0.3),
});
TweenLite.from('.balloon2', 0.8, {
    y: 15,
    opacity: 0,
    delay: 0.9,
    ease: Elastic.easeOut.config(1, 0.3),
});
var cloudFade = new TimelineMax({repeat:0,ease: Power2.easeInOut,delay:1.2})
cloudFade.from(['.cloud1','.cloud2'], 0.8, {
    opacity: 0
})
//cloud.fromTo('.cloud1',2,{x:-15},{x:15});
//cloud.fromTo('.cloud2',2,{x:15},{x:-15});
TweenMax.fromTo('.cloud1', 3.1, {
    x: 15,
}, {
    x: -15,
    yoyo: true,
    repeat: -1,
    delay: 1.6,
    repeatDelay: 0
})
TweenMax.fromTo('.cloud2', 3.1, {
    x: -15,
}, {
    x: 15,
    yoyo: true,
    delay: 1.6,
    repeat: -1,
    repeatDelay: 0
})

TweenLite.from(['.orange', '.bottom'], 1.2, {
    opacity: 0,
    delay: 0.8,
    ease: Power4.easeInOut
});

TweenMax.from(['.snow', '.add'], 2.7, {
    opacity: 0.5,
    scale: 0.2,
    delay: 1.4,
    repeat: -1,
    yoyo: true,
    transformOrigin: 'center',
    // ease: Elastic.easeOut.config(1, 0.5),
})
/*camera ani*/
TweenMax.fromTo('.camera1', 0.2, {
    scale: 1,
    yoyo: true,
    // repeat: 1,
    transformOrigin: 'center',
    delay: 2,
}, {
    scale: 0.96,
    yoyo: true,
    repeat: 1,
    transformOrigin: 'center',
    delay: 1.3,
});
TweenLite.to('.camera2', 0.25, {
    rotation: -90,
    transformOrigin: '53% 47.3%',
    delay: 1.7
})
TweenLite.to('.camera2', 0.25, {
    scale: 1.45,
    transformOrigin: '53% 47.3%',
    delay: 2.2,
})
TweenLite.to('.camera2', 0.3, {
    scale: 1,
    transformOrigin: '53% 47.3%',
    delay: 2.4,
    //ease: Elastic.easeOut.config(1, 0.5),
})
var glass = new TimelineMax({delay: 1.8,ease: Elastic.easeOut.config(1, 0.5),})
glass.add(TweenLite.to('.shutter', 0.2, {y: 3}))
glass.add(TweenLite.to('.shutter', 0.2, {y: 0, delay:0.2}))
glass.add(TweenLite.set('.glass', {
    opacity: 1,
    scale: 0,
    transformOrigin: '50% 50%',
}));
glass.add(TweenLite.to('.glass', 0.6, {
    opacity:0.5,
    scale: 1.2,
    transformOrigin: '50% 50%',
}));
glass.add(TweenLite.to('.glass', 0.0001, {
    fill: '#00a0e9',
    opacity:0,
    transformOrigin: '50% 50%',
}));

/*TweenLite.fromTo('.shutter', 0.25, {y:1}, {
    y:2,
    clearProps:"y",
    delay: 2
})*/

