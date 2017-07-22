$(document).ready(function (){
  var offset = $("aside").offset();
  var footer = $("footer").outerHeight();
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    console.log(offset.top);
    $(window).on('resize',  function() {
    	offset = $('aside').offset();
      footer = $("footer").outerHeight();
      scrollTop = $(window).scrollTop();
    })
    if(offset.top < scrollTop) {
      // 当aside高度和页脚高度之和大于视图高度时，将aside的bottom设置为0，移除top属性
      if((($('aside').height() + footer) > document.documentElement.clientHeight) && $('aside').height() >= ($('footer').offset().top - document.body.scrollTop)) {
        $("aside").removeClass("fixedT").addClass("fixedB").css("bottom", footer);
      } else {
        $("aside").removeClass("fixedB").removeAttr('style').addClass("fixedT");
      }
    }else {
      $("aside").removeClass("fixedT fixedB").removeAttr('style');
    }
  })

});