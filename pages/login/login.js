// pages/login/login.js
var app = getApp();
Page({
  data:{
    email:'',
    flag: 'hide',
    ycode: ''
  },
  onLoad:function(options){
    console.log(this)
    // wx.showToast({
    //         title: '验证码错误',
    //         icon: 'loading',
    //         duration: 2000
    //       })
  },
  //这是点击确定按钮之后获取用户wechat号，以及邮箱
  onConfirm:function(event){
    wx.request({
      url: 'https://www.leodevelop.com:8000/register', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        wechat: this.data.email,
        email: this.data.email
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.result === "邮件已发送"){
          this.setData({
            flag: '',
            ycode: 'hide'
          })
        } else if (res.data.result === '邮箱已存在') {
          wx.setStorageSync('wechat', this.data.email)
          wx.setStorageSync('email',this.data.email)
          wx.navigateTo({
            url: "/pages/person/person",
          })
        }
      }
    })
  },
  onchange:function(event){
    this.setData({
      email:event.detail.value
    })
    console.log(this.data.email)
  },
  onVircode: function(e){
    this.setData({
      vircode: e.detail.value
    })
  },
  onLogin: function () {
    wx.request({
      url: 'https://www.leodevelop.com:8000/register/vircode',
      method: 'post',
      data: {
        wechat: this.data.email,
        vircode: this.data.vircode
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.result === "验证成功"){
          wx.setStorageSync('wechat', this.data.email)
          wx.setStorageSync('email',this.data.email)
          wx.navigateTo({
            url: "/pages/person/person",
          })
        } else if (res.data.result === '验证失败') {
          wx.showToast({
            title: '验证码错误',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  }
})