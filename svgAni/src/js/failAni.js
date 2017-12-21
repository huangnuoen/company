// 横线
var line = $('.line');
for(var i = 0; i < line.length; i++) {
    TweenLite.from(line[i], 0.6, {
        opacity: 0.1,
        scaleX: 0,
        scaleY: 0.1,
        transformOrigin: 'center'
    });
    TweenLite.to(line[i], 1, {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.45,
        delay: 0.9
    });
}

// 背景圆
var circleBg = $('#circleBg');
TweenLite.from(circleBg, 0.8, {
    ease: Power1.easeInOut,
    scale: 0,
    transformOrigin: "center bottom"
});
TweenLite.to(circleBg, 1, {
    ease: Power1.easeOut,
    scale: 0.85,
    delay: 1.28
})
// 雪花
var snow = $('#snow');
// 淡入淡出
var fade = TweenLite.from(snow, 1, {
    ease: Power1.easeInOut,
    opacity: 0,
    delay: 0.1
});
TweenLite.to(snow, 1, {
    opacity: 0,
    y: '20%',
    delay: 1.3
})
for(var i = 0; i < snow.children().length; i++) {
    TweenLite.from(snow.children()[i], 0.8, {
        ease: Power2.easeOut,
        scale: 0,
        transformOrigin: 'center center'
    })
}

// 感叹号
var wrong = $('#wrong');
TweenLite.from(wrong, 1.2, {
    ease: Power1.easeInOut,
    opacity: 0,
    delay: 0.8
})

// shake
wrong.on('click', function () {
    TweenLite.fromTo(this, 0.3, {x:-1}, {
        x:1,
        ease:RoughEase.ease.config({
            strength:8,
            points:20,
            template:Linear.easeNone,
            randomize:false
        }),
        clearProps:"x"
    })
})

// 文字
var text = $('.text')[0];
TweenLite.from(text, 0.8, {
    ease: Power1.easeInOut,
    opacity: 0,
    delay: 1
})

// 按钮
var btn = $('div.btn')[0];
TweenLite.from(btn, 0.8, {
    ease: Power1.easeInOut,
    opacity: 0,
    delay: 1.8
})
