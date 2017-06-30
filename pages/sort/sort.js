
Page({

  data: {
    selectArr: ['文学', '流行', '文化', '生活', '经营', '科技'],
    title: '',
    sortClasses: []
  },
  onLoad: function (event) {
    var selected = wx.getStorageSync('selected') || 0;
    this.setData({
      title: this.data.selectArr[selected],
      selected
    })
    this.getList()
  },
  onClass: function (event) {
    var selected = event.currentTarget.dataset.select
    this.setData({
      title: this.data.selectArr[selected],
      selected
    })
    this.getList()
    
    wx.setStorageSync('selected', selected);
  },
  onSelect: function (event) {
    var selected = event.currentTarget.dataset.sortselect
    wx.navigateTo({
      url: '/pages/template/moreBook/moreBook?categrory=' + selected
    })
  },
  getList: function (event) {
    var that = this
    var list = [];
    wx.request({
      url: 'https://www.leodevelop.com:8000/tag/getchild',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header
      data:{
        "fatherType": that.data.selectArr[that.data.selected]
      },
      success: function (res) {
        // success
        var data = res.data
        var i = 0;
        for (var idx in data) {
          var subject = data[idx];
          console.log(subject)
          var temp = {
            nums: subject.number,
            name: subject.typename,
            id: i++
          }
          list.push(temp);
        }
        that.setData({
          sortClasses: list
        })
      },
      fail: function (res) {
        // fail
        console.log("failed");
      }
    })
  }
})