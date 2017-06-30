// pages/person/booksEditer/booksEditer.js
Page({
  data: {
    length: 0,
    history:false
  },
  onLoad: function (options) {
    var email = wx.getStorageSync('email')
    var that = this
    if(options.title == 'history'){
      that.setData({
        history: true
      })
    }
    var url
    if(this.data.history === true){
      url = 'https://www.leodevelop.com:8000/user/lendhistory'
    } else {
      url = 'https://www.leodevelop.com:8000/user/lendbook'
    }
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        wechat: email
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res){
        console.log(res.data)
        var lendhistory = res.data.lendhistory
        that.getList(lendhistory)
      },
      fail: function(){
        wx.showToast({
          title: '网络连接错误',
          icon: 'loading',
          duration: 2000
        })
      }
    })
    
    // this.getList(res);
  },
  getList: function (res) {
    var books = [];
    var length = res.length
    for (var idx in res) {
      var subject = res[idx];
      var temp = {
        title: subject.book.title,
        author: subject.book.author,
        coverImg: subject.book.imgUrl,
        publish: subject.book.publisher,
        sucess: subject.lendTime.toLocaleString(),
        // date: subject.datetoLocaleString(),
        time: subject.untilTime.toLocaleString()
      }
      books.push(temp);
    }
    this.setData({
      books: books,
      length: length
    })
  }
})