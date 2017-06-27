// pages/login/login.js
Page({
  data:{
    email:''
  },
  onLoad:function(options){
    
  },
  //这是点击确定按钮之后获取用户wechat号，以及邮箱
  onConfirm:function(event){
    wx.request({
      url: 'https://www.leodevelop.com:8080/register', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        wechat: 'lcdxlh',
        email: this.data.email
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  bindchange:function(event){
    this.setData({
      email:event.detail.value
    })
  }
})