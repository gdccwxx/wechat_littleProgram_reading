// pages/person/booksEditer/booksEditer.js
Page({

  data: {
    length: 0,
    history:true
  },

  onLoad: function (options) {
    var res = [{
      title: '设计中的设计',
      author: '愿研哉/朱婀',
      images: '/image/bookCoverImage.png',
      sucess: '201.06.17',
      date: '5',
      publish: '山东人民出版社',
      time: '2017,06,21'
    }, {
      title: '设计中的设计',
      author: '愿研哉/朱婀',
      images: '/image/bookCoverImage.png',
      sucess: '201.06.17',
      date: '5',
      publish: '山东人民出版社',
      time: '2017,06,22'
    }, {
      title: '设计中的设计',
      author: '愿研哉/朱婀',
      images: '/image/bookCoverImage.png',
      sucess: '201.06.17',
      date: '5',
      publish: '山东人民出版社',
      time: '2017,06,23'
    }, {
      title: '设计中的设计',
      author: '愿研哉/朱婀',
      images: '/image/bookCoverImage.png',
      sucess: '201.06.17',
      date: '5',
      publish: '山东人民出版社',
      time: '2017,06,24'
    }]
    if(options.title == 'history'){
      this.setData({
        history:false
      })
    }
    this.getList(res);
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
      length: res.length
    });
  }
})