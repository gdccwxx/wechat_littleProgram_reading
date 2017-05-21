// pages/person/person.js
var app = getApp();
var util = require('../../utils/qrCode.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskHidden: true,
    imagePath: '',
    placeholder: 'http://www.baidu.com',//默认二维码生成文本
    drawQrCode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onNowBorrow: function (event) {
    // wx.navigateTo({
    // url: '/pages/person/nowBorrow.wxml'
    // })
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
  },
  onSubscriptionBooks: function (event) {
    wx.navigateTo({
      url: "/pages/person/subscriptionBooks/subscriptionBooks"
    })
  },
  onReady: function () {
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },
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
  }
})