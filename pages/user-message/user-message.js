const app = getApp()
import { UserMessage } from 'user-message-model.js';
var userMessage = new UserMessage();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userMessage: {
      data:{
        bookNum:0,
        allTime:0,
        title:'生员'
      }
    }
  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    // this.getPhoneNumber();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
    this._userMessageData(wx.getStorageSync('userid'));
  },

  _userMessageData: function (id) {
    userMessage.getUserMessage(id, (res) => {
      this.setData({
        'userMessage': res
      });
    });
  },


  onUserNoteSrc: function () {
    wx.navigateTo({
      url: '../user_note/user_note',
    })
  },

  onCommon: function () {
    wx.navigateTo({
      url: '../common-problems/common-problems',
    })
  },

  // 充值
  onUserTopUp: function () {
    wx.navigateTo({
      url: '../user_wallet/user_wallet',
    })
  },

  //卡包
  onCardBag:function(){
    wx.showToast({
      title: '亲，本功能暂未开通呢。',
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})