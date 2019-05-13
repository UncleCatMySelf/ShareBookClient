import { Book } from 'book-model.js';
var util = require('../../util/util.js');
var book = new Book();

// pages/book/book.js
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    bookInfo:{},
    bookes:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var scene = decodeURIComponent(options.scene);
    //console.log(scene.length);
    //console.log(options.id);
    if(scene.length >= 12){
      //console.log('scene');
      this._getHouseBookInfo(scene);
    }else{
      //console.log('id');
      this._getHouseBookInfo(options.id);
    }
  },


  onBookTap:function(res){
    var bookId = res.currentTarget.dataset.movieid;
    //console.log(bookId);
    wx.navigateTo({
      url: 'book-detail/book-detail?id=' + bookId,
    })
  },

  _getHouseBookInfo:function(id){
    book.getHouseBookInfo(id, (res,books) => {
      this.setData({
        'bookInfo': res,
        'bookes': books
      });
    });
  },

  changeMessage:function(datas){
    var books = [];
    for (var idx in datas.wxBookMsgVos) {
      var book = datas.wxBookMsgVos[idx];
      var title = book.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.converToStarsArray(book.score),
        title: title,
        average: book.score,
        num: book.num,
        coverageUrl: book.image,
        bookid: book.bookid,
        author: book.author,
        introduced: book.introduced
      }
      books.push(temp);
    }
    this.setData({
      bookes:books
    });
  }

})