Page({
  onTap: function (event) {
    wx.redirectTo({
      url: '../posts/post',
      success: function (res) {},
      fail: function () {},
      complete: function () {}
    });
  },
  onTextTap(event) {

  },
  onUnload: function () {
    // console.log('unload')
  }
})