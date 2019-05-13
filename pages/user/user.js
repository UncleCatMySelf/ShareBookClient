// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }else{
      wx.getUserInfo({
        success:res =>{
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },

  getUserInfo:function(e){
   console.log(e)
   app.globalData.userInfo = e.detail.userInfo
   this.setData({
     userInfo: app.globalData.userInfo
   })
  },

  myWallet:function(event){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },

  mySecurities: function (event) {
    wx.navigateTo({
      url: '../securities/securities',
    })
  },

  myRead: function (event) {
    wx.navigateTo({
      url: '../read/read',
    })
  },

  helpCenter: function (event) {
    wx.navigateTo({
      url: '../help/help',
    })
  }
})