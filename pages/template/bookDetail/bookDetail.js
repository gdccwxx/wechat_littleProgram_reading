// pages/book/bookDetail/bookDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var titles = '加入书单'
    if(options.scanCode == undefined) {
      titles = '在线预约';
    }
    this.setData({
      brief:" 《红楼梦》是一部百科全书式的长篇小说。以宝黛爱情悲剧为主线，以四大家族的荣辱兴衰为背景，描绘出18世纪中国封建社会的方方面面，以及封建专制下新兴资本主义民主思想的萌动。结构宏大、情节委婉、细节精致，人物形象栩栩如生，声口毕现，堪称中国古代小说中的经 典。",
      titles
    })
    this.show();
  },
  show:function(event){
    var dataBrief = this.data.brief.trim().substring(0, 68) + "......";
    console.log(dataBrief)
    this.setData({
      dataBrief
    })
  },
  onMoreTap:function(event){
    this.setData({
      clickMore:true,
      dataBrief:this.data.brief
    })
  }
})