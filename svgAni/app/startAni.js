// page1 Ani
var logo = $('#guide .page1 .logo')[0];
var text1 = $('#guide .page1 .text')[0];
TweenLite.to(logo, 0.75, {
    opacity: 1,
    ease: Power4.easeInOut
});
TweenLite.from(text1, 0.75, {
    opacity: 0,
    ease: Power4.easeInOut,
    delay: 0.5
});

