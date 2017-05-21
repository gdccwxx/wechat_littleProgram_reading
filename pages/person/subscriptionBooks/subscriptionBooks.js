// pages/person/booksEditer/booksEditer.js
Page({

  data: {
    editer:false
  },

  onLoad: function (options) {

  },
  editer: function (event) {
    this.setData({
      editer: !this.data.editer
    })
  }
})