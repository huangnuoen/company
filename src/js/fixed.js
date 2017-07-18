$(document).ready(function (){

  // 检查对象，这里是 HTML 5 的 "aside"，可改为 ".class" 或者 "#id"
  var offset = $("aside").offset();
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    // 视窗还看到这个侧边栏？
    if(offset.top < scrollTop) {
      // 没看到，添加 ".fixed"
      $("aside").addClass("fixed")
    }else {
      // 看到，不需要 ".fixed"
      $("aside").removeClass("fixed")
    }
  })

});