Page({
  data: {
    books: [],
    totalCount: 0,
    isEmpty: true
  },
  onLoad: function (options) {
    var categrory = options.categrory;
    var dataUrl = "";
    wx.setNavigationBarTitle({
      title: categrory,
    })
    switch (categrory) {
      case "新书速递":
        dataUrl = "https://api.douban.com" + "/v2/movie/in_theaters"
        break;
      case "经典图书":
        dataUrl = "https://api.douban.com" + "/v2/movie/coming_soon"
        break;
      case "热门推荐":
        dataUrl = "https://api.douban.com" + "/v2/movie/top250"
        break;
    }
    this.setData({
      dataUrl
    })
    this.http(dataUrl, this.processDoubanData);
  },
  onScrollLower: function (event) {

    var nextUrl = this.data.dataUrl + "?start=" + this.data.totalCount + "&count=20";
    this.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData: function (moviesDouban) {
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
    var totalMovie = {};
    if (this.data.isEmpty) {
      totalMovie = this.data.books.concat(movies)
    } else {
      totalMovie = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      books: totalMovie
    });
    wx.hideNavigationBarLoading()
    this.data.totalCount += 20;
  },
  http: function (url, callBack) {
    var _this = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        callBack(res.data)
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
  }
})