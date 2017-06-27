// pages/person/person.js
//二维码是用户所有的信息，只需要把用户的信息放到二位吗的url上就行，我用插件弄了二维码。
//其他的就啥了
var app = getApp();
var util = require('../../utils/qrCode.js');
Page({

  data: {
    maskHidden: true,
    imagePath: '',
    placeholder: 'http://www.baidu.com',//默认二维码生成文本
    drawQrCode: false,
    switchRecommend:true
  },

  onLoad: function (options) {
    var recommend = wx.getStorageSync("recommend");    
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          userInfo: userInfo,
        })
      },
      fail:function(event){
        var userInfo = {
          nickName:'未登录',
          avatarUrl:'/image/icon/avatar.jpg'
        }
        that.setData({
          userInfo: userInfo,
        })
      },
      
    })
    this.setData({
      switchRecommend: recommend

    })
  },//跳转到节约历史
  onBorrowHistory:function(event){
    wx.navigateTo({
      url: "/pages/person/borrowList/borrowList?title=history",
    })
  },
  drawQrCode: function (e) {
    var that = this;
    var url = 'www.baidu.com';
    that.setData({
      maskHidden: false,
    });

    var size = that.setCanvasSize();
    //绘制二维码
    that.createQrCode(url, "mycanvas", size.w, size.h);
    that.setData({
      maskHidden: true
    });
    this.setData({
      drawQrCode: true
    })
  },//跳转到预约图书
  onSubscriptionBooks: function (event) {
    wx.navigateTo({
      url: "/pages/person/subscriptionBooks/subscriptionBooks"
    })
  },
  onReady: function () {
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },//二维码生成，不需要管
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 500;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    console.log(cavW)
    util.qrApi.draw(url, canvasId, cavW, cavH);

  },
  cancelQrCode: function (event) {
    this.setData({
      drawQrCode: false
    })
  },
  onRecommend:function(event){
    var switchRecommend = !this.data.switchRecommend
    wx.setStorageSync('recommend', switchRecommend)
    this.setData({
      switchRecommend
    })
  },//跳转到借阅清单
  onBorrowList:function(event){
    wx.navigateTo({
      url: "/pages/person/borrowList/borrowList?title=borrow",
    })
  }
})