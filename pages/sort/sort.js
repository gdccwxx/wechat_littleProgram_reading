
Page({

  data: {
    selectArr: ['文学', '流行', '文化', '生活', '经营', '科技'],
    title: '',
    sortClasses: []
  },
  onLoad: function (event) {
    var selected = wx.getStorageSync('selected') || 0;
    var sortClasses = [{ name: '文学', nums: '1000' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }, { name: '流行', nums: '2015' }];
    this.setData({
      title: this.data.selectArr[selected],
      selected,
      sortClasses
    })
  },
  onClass: function (event) {
    var selected = event.currentTarget.dataset.select
    this.setData({
      title: this.data.selectArr[selected],
      selected
    })
    wx.setStorageSync('selected', selected);
  },
  onSelect:function(event){
    var selected = event.currentTarget.dataset.sortselect
    wx.navigateTo({
      url: '/pages/template/moreBook/moreBook?categrory=' + '新书速递'
    })
  }
})