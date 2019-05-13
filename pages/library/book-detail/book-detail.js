var util = require('../../../util/util.js');
var app = getApp();

// pages/movies/movie-detail/movie-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bookId = options.id;
    var url = app.globalData.doubanBase +'/v2/book/'+bookId;
    util.http(url, this.processDoubanData);
  },

  processDoubanData:function(data){
    if(!data){
      return;
    }
    var translator = '';
    if (data.translator[0] != null){
      translator = data.translator[0];
    }else{
      translator = '';
    }
    var author = '';
    if (data.author[0] != null) {
      author = data.author[0];
    } else {
      author = '';
    }
    var book = {
      bookImg: data.images ? data.images.large : '',//图书封面
      author: author,//作者
      authorIntro:data.author_intro,//作者简介
      translator: translator,//译者
      pubdate: data.pubdate,//出版时间
      pages: data.pages,//页数
      title: data.title,//标题
      publisher: data.publisher,//出版社
      summary: data.summary,//内容简介
      catalog:data.catalog,//目录
      stars: util.converToStarsArray(data.rating.average),//星星
      average: data.rating.average,//评分
      price: data.price,//价格
      id:data.id//id
    }
    console.log(book);
    this.setData({
      book:book
    })
  },

  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})