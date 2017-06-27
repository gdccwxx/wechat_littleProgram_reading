//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
    news: {},
    classes: {},
    recommend: {},
    CodeData:null,
    recommends:true
  },
  onLoad: function (event) {
    
    var inTheatersUrl = "https://api.douban.com" + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = "https://api.douban.com" + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = "https://api.douban.com" + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "news", "新书速递");
    this.getMovieListData(comingSoonUrl, "classes", "经典图书");
    this.getMovieListData(top250Url, "recommend", "热门推荐");
  },
  onReady:function(event){
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
    console.log(this.data.news)
  },
  inBindFocus:function(event){
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
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverImg: subject.images.large,
        movieId: subject.id
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
  onScanCodeTap:function(event){
    wx.scanCode({
      success: (res) =>{
        console.log(res)
        var title = event.currentTarget.dataset.title;
        wx.navigateTo({
          url: 'bookDetail/bookDetail?title=' + title + '&scanCode=' + res
        })
      }
    })
  },
  bookDetail:function(event){
    var title = event.currentTarget.dataset.title;
    console.log(title);
    wx.navigateTo({
      url: '/pages/template/bookDetail/bookDetail?title=' + title
    })
  }
})
