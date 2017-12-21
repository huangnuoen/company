TweenLite.from($('#circle'), 0.9, {
    ease: Elastic.easeOut.config(1, 1),
    scale: 0,
    transformOrigin: 'center',
    delay: 0.1
});
TweenLite.from($('#dot'), 0.4, {
    ease: Power2.easeOut,
    scale: 0,
    transformOrigin: 'center',
    delay: 0.5
});
TweenLite.from($('.text')[0], 0.7, {
    ease: Power4.easeInOut,
    opacity: 0,
    delay: 1.5
});
TweenLite.from($('.btn')[0], 0.7, {
    ease: Power4.easeInOut,
    opacity: 0,
    delay: 1.7
});
TweenLite.from($('.add')[0], 1, {
    ease: Elastic.easeOut.config(1, 0.3),
    rotation: -45,
    transformOrigin: 'center',
    delay: 2
});
TweenLite.from($('.add')[1], 1, {
    ease: Elastic.easeOut.config(1, 0.3),
    rotation: -90,
    transformOrigin: 'center',
    delay: 2
});
TweenLite.from($('.add')[2], 1, {
    ease: Elastic.easeOut.config(1, 0.3),
    rotation: -180,
    transformOrigin: 'center',
    delay: 2
});

