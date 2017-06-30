// pages/person/booksEditer/booksEditer.js
Page({

  data: {
    editer: false,
    length: 0
  },

  onLoad: function (options) {
    // var res = [{
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '预约成功',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,21'
    // }, {
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '预约成功',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,22'
    // }, {
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '预约成功',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,23'
    // }, {
    //   title: '设计中的设计',
    //   author: '愿研哉/朱婀',
    //   images: '/image/bookCoverImage.png',
    //   sucess: '预约成功',
    //   date: '5',
    //   publish: '山东人民出版社',
    //   time: '2017,06,24'
    // }]
    // this.getList(res);
  },
  editer: function (event) {
    this.setData({
      editer: !this.data.editer
    })
  },
  getList: function (res) {
    var books = [];
    for (var idx in res) {
      var subject = res[idx];
      var temp = {
        title: subject.title,
        author: subject.author,
        coverImg: subject.images,
        publish: subject.publish,
        sucess: subject.sucess,
        date: subject.date,
        time: subject.time
      }
      books.push(temp);
    }
    this.setData({
      books,
      length:res.length
    });
  },
  deleteChild: function (event) {
    var current = event.currentTarget.dataset.indexs
    var that = this
    var books = this.data.books
    wx.showModal({
      title: '删除',
      content: '是否取消借阅' + books[current].title + '一书?',
      success: function (res) {
        if (res.confirm) {
          books.splice(current, 1);
        }
        that.setData({
          books
        })
      }
    })
  }
})