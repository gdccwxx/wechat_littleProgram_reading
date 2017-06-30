// pages/book/bookDetail/bookDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickMore: false,
    book: {},
    about:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var titles = '加入书单'
    if (options.scanCode == undefined) {
      titles = '在线预约';
    }
    var that = this
    wx.request({
      url: 'https://www.leodevelop.com:8000/book/isbn/' + options.id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data
        var authors = res.data.author.join('/')
        that.setData({
          brief: data.summary,
          dataBrief: data.summary,
          titles,
          publish: data.publisher,
          title: data.title,
          haveNum: data.storeNum + data.lendNum,
          storeNum: data.storeNum,
          author: authors,
          imgUrl: data.imgUrl,
          catlog: data.catalog

        })
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
    this.setData({
      isbn: options.id,
      titles
    })
    this.show();
    this.getAbout();
  },
  show: function (event) {
    var dataBrief = this.data.brief
    this.setData({
      dataBrief
    })
  },
  onMoreTap: function (event) {
    this.setData({
      clickMore: true,
      dataBrief: this.data.brief
    })
  },
  getAbout: function (event) {
    var that = this
    wx.request({
      url: 'https://www.leodevelop.com:8000/book/about/' + this.data.isbn,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data
        // console.log(res.data)
        // console.log(data)
        var authors = res.data.author
        var movies = [];
        for (var idx in res.data) {
          var subject = res.data[idx];
          var title = subject.title;
          if (title.length >= 6) {
            title = title.substring(0, 6) + '...';
          }
          var temp = {
            title: title,
            author: subject.author,
            coverImg: subject.imgUrl,
            movieId: subject.isbn13
          }
          movies.push(temp);
        }
        that.setData({
          about:movies
        })
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
  },
  bookDetail: function (event) {
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/template/bookDetail/bookDetail?id=' + title
    })
  },
  clickSubscription:function(event){
    var email = wx.getStorageSync('email')
    var wechat = wx.getStorageSync('wechat')
    var that = this
    wx.request({
      url: 'https://www.leodevelop.com:8000/user/submitappoint',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      data:{
        wechat:'lcdxh',
        isbn: that.data.isbn
      },
      success: function (res) {
        // success
        var data = res.data
        console.log(data)
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
  }
})