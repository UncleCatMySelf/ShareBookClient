// pages/library/library.js
var app = getApp();
var util = require('../../util/util.js');

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    totalCount: 0,
    requestUrl: '',
    books: {},
    navigateTitle: '',
    isEmpty: true,
    libraryName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      ll_key: postsData.postList
    });
    this._internetLibrary(id);
    var cagetgory = '新书速递';
    this.data.navigateTitle = cagetgory;
    // console.log(cagetgory);
    var dataUrl = '';
    switch (cagetgory) {
      case '新书速递':
        dataUrl = app.globalData.doubanBase + '/v2/book/search?q=龙';
        break;
      case '经典文学':
        dataUrl = app.globalData.doubanBase + '/v2/book/search?q=文学';
        break;
      case '幼儿读物':
        dataUrl = app.globalData.doubanBase + '/v2/book/search?q=孩子';
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },

  onMovieTap: function (event) {
    var bookId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'book-detail/book-detail?id=' + bookId,
    })
  },

  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function (booksDouban) {
    var books = [];
    for (var idx in booksDouban.books) {
      var book = booksDouban.books[idx];
      var title = book.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      //[1,1,1,1,1] stars
      var temp = {
        stars: util.converToStarsArray(book.rating.average),
        title: title,
        average: book.rating.average,
        coverageUrl: book.images.large,
        bookid: book.id
      }
      books.push(temp);
    }
    var totalBooks = {}
    if (!this.data.isEmpty) {
      totalBooks = this.data.books.concat(books);
    } else {
      totalBooks = books;
      this.data.isEmpty = false;
    }
    this.setData({
      books: totalBooks
    });
    wx.hideNavigationBarLoading();
    this.data.totalCount += 20;
  },

  // 书屋数据获取
  _internetLibrary:function(id){
    var name = this.data.ll_key[id].name;
    //var name = '测试';
    this.setData({
      libraryName: name
    })
  },

})