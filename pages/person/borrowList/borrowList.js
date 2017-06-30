// pages/person/booksEditer/booksEditer.js
Page({
  data: {
    length: 0,
    history:true
  },
  onLoad: function (options) {
    var email = wx.getStorageSync('email')
    var that = this
    wx.request({
      url: 'https://www.leodevelop.com:8000/user/lendhistory', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        wechat: 'lcdxlh@126.com'
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
    // var res = [{
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '201.06.17',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,21'
    // }, {
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '201.06.17',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,22'
    // }, {
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '201.06.17',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,23'
    // }, {
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '201.06.17',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,24'
    // }]
    if(options.title == 'history'){
      this.setData({
        history:false
      })
    }
    // this.getList(res);
  },
  getList: function (res) {
    var books = [];
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
      length: res.length
    })
  }
})