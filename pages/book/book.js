//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    news: {},
    classes: {},
    recommend: {},
    CodeData: null,
    recommends: true
  },
  onLoad: function (event) {

    var inTheatersUrl = "https://www.leodevelop.com:8000/book/newbook/3"
    var comingSoonUrl = "https://www.leodevelop.com:8000/book/oldbook/3"
    // var top250Url = "https://api.douban.com" + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "news", "新书速递");
    this.getMovieListData(comingSoonUrl, "classes", "经典图书");
    // this.getMovieListData(top250Url, "recommend", "热门推荐");

  },
  onReady: function (event) {
    var recommends = wx.getStorageSync('recommend')
    if (recommends) {
      wx.setStorageSync('recommend', true)
    } else {
      recommends = false
      wx.setStorageSync('recommend', false)
    }
    this.setData({
      recommends
    })
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var _this = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        _this.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
    console.log(this.data)
  },
  inBindFocus: function (event) {
    wx.navigateTo({
      url: 'search/search'
    })
  },
  onMoreTap: function (event) {
    var categrory = event.currentTarget.dataset.categrory;
    wx.navigateTo({
      url: '/pages/template/moreBook/moreBook?categrory=' + categrory
    })
  },
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban) {
      var subject = moviesDouban[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        average: subject.author,
        coverImg: subject.imgUrl,
        movieId: subject.isbn13
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle,
      books: movies
    };
    this.setData(readyData);
  },
  onScanCodeTap: function (event) {
    wx.scanCode({
      success: (res) => {
        var title = event.currentTarget.dataset.title;
        wx.navigateTo({
          url: 'bookDetail/bookDetail?title=' + title + '&id=' + res
        })
      }
    })
  },
  bookDetail: function (event) {
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/template/bookDetail/bookDetail?id=' + title
    })
  }
})
