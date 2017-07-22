$(document).ready(function (){
  var offset = $("aside").offset();
  var footer = $("footer").outerHeight();
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    console.log(offset.top);
    $(window).on('resize',  function() {
    	offset = $('aside').offset();
    })
    if(offset.top < scrollTop) {
      // 没看到，添加 ".fixed"
      if((($('aside').height() + footer) > document.documentElement.clientHeight) && $('aside').height() >= ($('footer').offset().top - document.body.scrollTop)) {
        $("aside").removeClass("fixedT").addClass("fixedB").css("bottom", footer);
      } else {
        $("aside").removeClass("fixedB").addClass("fixedT");
      }
    }else {
      $("aside").removeClass("fixedT fixedB").removeAttr('style');
    }
  })

});