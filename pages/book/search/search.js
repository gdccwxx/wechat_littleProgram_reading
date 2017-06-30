// pages/book/search/search.js
Page({
  data: {
    historys: [],
    searchData: "",
    isShowDisplayAll: false,
    needShow: false,
    clickSearch: false,
    searchChildData: ""
  },
  onLoad: function (options) {
    this.showHistory()
  },
  bindConfirms: function (event) {
    var search = event instanceof Array ? event : wx.getStorageSync('searchHistory') || [];
    var modify = event.detail.value.trim();
    var needShow = false;
    var that = this
    if (modify == "" && this.data.clickSearch == true) {
      this.setData({
        clickSearch: false
      })
    }
    if (modify == "") {
      return;
    }
    search.push(modify);
    search = this.cleanRepeatData(search)
    wx.setStorageSync('searchHistory', search);
    if (search.length > 3) {
      needShow = true;
    }
    if (!this.data.isShowDisplayAll) {
      search.reverse().splice(3, search.length - 1);
    }
    this.showHistory()
    wx.request({
      url: 'https://www.leodevelop.com:8000/book/search',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header
      data: {
        searchStr: that.data.searchData
      },
      success: function (res) {
        // success
        console.log(res.data)
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
    console.log(that.data.searchData)
    this.setData({
      needShow,
      clickSearch: true
    })
  },
  bindchanges: function (event) {
    this.setData({
      searchData: event.detail.value
    })
  },
  sureSearch: function (event) {
    if (this.data.searchData.trim() == "" && this.data.clickSearch == true) {
      console.log(123)
      this.setData({
        clickSearch: false
      })
    }
    if (this.data.searchData.trim() != "") {
      var data = wx.getStorageSync('searchHistory') || [];
      var that = this
      var needShow = false;
      data.push(this.data.searchData.trim());
      data = this.cleanRepeatData(data);
      if (data.length > 3) {
        needShow = true
      }
      wx.setStorageSync('searchHistory', data)
      if (!this.data.isShowDisplayAll) {
        data.reverse().splice(3, data.length - 1);
      } else {
        data.reverse()
      }
      wx.request({
        url: 'https://www.leodevelop.com:8000/book/search',
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/json"
        }, // 设置请求的 header
        data: {
          searchStr: that.data.searchData
        },
        success: function (res) {
          // success
          console.log(res.data)
        },
        fail: function (res) {
          // fail
          console.log("failed");
        }
      })
      this.setData({
        historys: data,
        needShow,
        clickSearch: true
      })
    }
  },
  cleanRepeatData: function (event) {
    var last = event[event.length - 1];
    for (var i = 0; i < event.length - 1; i++) {
      if (event[i] == last) {
        event.splice(i, 1)
        break;
      }
    }
    return event;
  },
  showHistory: function (event) {
    var historys = event instanceof Array ? event : wx.getStorageSync('searchHistory') || [];
    var needShow = false;
    historys.reverse();
    if (historys.length > 3 && !this.data.isShowDisplayAll) {
      historys.splice(3, historys.length - 1);
      needShow = true
    }
    this.setData({
      historys,
      needShow
    })
  },
  showButton: function (event) {
    if (this.data.needShow) {
      this.setData({
        isShowDisplayAll: true,

      })
      this.showHistory();
    }
  },
  removeChild: function (event) {
    var history = wx.getStorageSync('searchHistory');
    var target = event.currentTarget.dataset.child;
    history.splice(history.indexOf(target), 1);
    wx.setStorageSync('searchHistory', history);
    this.showHistory()
    if (history.length < 3) {
      this.setData({
        isShowDisplayAll: false,
        needShow: false
      })
    }
  },
  historySearch: function (event) {
    this.setData({
      searchData: event.currentTarget.dataset.child,
      searchChildData: event.currentTarget.dataset.child
    })
    this.sureSearch()
  }
})