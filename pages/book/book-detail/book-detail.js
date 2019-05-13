import { BookDetail } from 'book-detail-model.js';
var util = require('../../../util/util.js');
var bookDetail = new BookDetail();

// pages/book/book-detail/book-detail.js
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    currentTabsIndex:0,
    bookInfo:{},
    stars:[],
    summary:'',
    author:'',
    reviews:{},
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'id': options.id
    });
    //options.id
    this._getBookDetailInfo(options.id);
  },

  onTabsItemTap: function (event) {
    var index = event.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      currentTabsIndex: index
    });
  },

  _getBookDetailInfo:function(id){
    console.log(id);
    bookDetail.getBookDetailInfo(id, (res) => {
      console.log(res);
      var starts = [];
      starts = util.converToStarsArray(res.score);
      var summary = res.summary;
      if (summary.length >= 270) {
        summary = summary.substring(0, 270) + '...';
      }
      var author = res.author;
      if (author.length >= 20) {
        author = author.substring(0,20) + '...';
      }
      this.setData({
        'bookInfo': res,
        'author': author,
        'stars': starts,
        'summary': summary
      });
    });
    bookDetail.getBookReviewInfo(id,(res) => {
      console.log(res);
      var reviews = [];
      for(var idx in res){
        var review = res[idx];
        var temp = {
          stars: util.converToStarsArray(review.score),
          content: review.content,
          userName: review.userName,
          date: review.date
        }
        reviews.push(temp);
      }
      this.setData({
        'reviews': reviews
      });
      //console.log(this.data.reviews);
    })
  },

  alsoTap:function(){
    bookDetail.alsoToTabFunction(this.data.id, wx.getStorageSync('userid'),(res) => {
      console.log(res);
      if(res == 2000){
        wx.showToast({
          title: '借阅成功',
        })
      } else if (res == 8008) {
        wx.showToast({
          title: '请先充值押金哦！',
        })
        wx.navigateTo({
          url: '../../user_wallet/user_wallet',
        })
      }else if(res == 4000){
        wx.showToast({
          title: '尚未归还书籍',
        })
      }else if(res == 2002){
        wx.showToast({
          title: '请充值结算订单',
        })
      }else{
        wx.showToast({
          title: '借阅失败',
        })
      }
    })
  }

})