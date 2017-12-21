const $ = require("../lib/jquery-3.2.1.min.js");
const fastclick = require("../lib/fastclick.js");
const TweenMax = require("../lib/TweenMax.min.js");

$(function() {
    fastclick.attach(document.body);
});

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
        delay: 0.9
    });
}

// 背景圆
var circleBg = $('#circleBg');
TweenLite.from(circleBg, 0.6, {
    ease: Elastic.easeOut.config(1.2, 0.5),
    opacity: 0,
    scale: 0,
    delay: 0.2,
    transformOrigin: "center bottom"
});

// right
var right = $('#right');
TweenLite.from(right, 1.2, {
    ease: Elastic.easeOut.config(1, 0.4),
    y: '150',
    delay: 0.2
});

// 雪花
var snow = $('#snow').children();
var dot = $('.dot')[0];
for(var i = 0; i < snow.length; i++) {
    TweenLite.from(snow[i], 0.8, {
        ease: Power4.easeInOut,
        scale: 0,
        opacity: 0,
        transformOrigin: 'center',
        delay: 0.2
    });
}
var counter = $('.rotate')[0];
var a = TweenLite.to(counter, 0.5, {
    rotation: -90,
    delay: 1.5
})
var clock = $('.rotate')[1];
var b = TweenLite.to(clock, 0.5, {
    rotation: 90,
    delay: 2
})

// text
var text = $('.text')[0];
TweenLite.from(text, 0.8, {
    ease: Power1.easeInOut,
    opacity: 0,
    delay: 1
})


// touch event
var touch = {};
right.on('touchstart', start)
right.on('touchmove', move)
right.on('touchend', end)
function start() {
    event.preventDefault();
    touch.initiated = true;
    var t = event.touches[0];
    touch.startX = t.pageX;
    touch.startY = t.pageY;
}
function move() {
    if (!touch.initiated) {
        return
    }
    var t = event.touches[0];
    var deltaY = t.pageY - touch.startY;
    if (deltaY > 0) {
        touch.deltaY = deltaY/3.5;
        TweenLite.to(this, 0.1, {
            scale: Math.max(0.4, 1 - touch.deltaY/400),
            transformOrigin: 'center center',
            y: Math.min(130, touch.deltaY)
        });
        TweenLite.to(dot, 0.1, {
            y: Math.min(120, touch.deltaY)
        });
        TweenLite.to(counter, 0.1, {
            rotation: -45 * touch.deltaY/250
        });
        TweenLite.to(clock, 0.1, {
            rotation: 45 * touch.deltaY/250
        });
        TweenLite.to(circleBg, 0.1, {
            scale: Math.max(0.6,  1 - touch.deltaY/400),
            transformOrigin: 'center bottom'
        })
    }
}
function end() {
    console.log(touch.deltaY);
    TweenLite.to(this, 0.8, {
        ease: Elastic.easeOut.config(1, 0.3),
        scale: 1,
        y: 0
    })
    TweenLite.to(dot, 0.8, {
        ease: Elastic.easeOut.config(1, 0.3),
        y: 0
    })
    TweenLite.to(counter, 0.8, {
        ease: Elastic.easeOut.config(1, 0.3),
        rotation: 0
    })
    TweenLite.to(clock, 0.8, {
        ease: Elastic.easeOut.config(1, 0.3),
        rotation: 0
    })
    TweenLite.to(circleBg, 0.8, {
        ease: Elastic.easeOut.config(1, 0.3),
        scale: 1
    })
    touch.initiated = false;

}
