import { UserWallet } from 'user_wallet_model.js';
var userWallet = new UserWallet();

// pages/map/user_wallet/user_wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
      data:{
        //押金
        deposit: 0.0,
        //充值
        recharge: 0.0
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._userWalletData(wx.getStorageSync('userid'));
    //console.log(this.data.userinfo);
  },

  onShow:function(event){
    this._userWalletData(wx.getStorageSync('userid'));
  },

  topUpSrc: function () {
    wx.navigateTo({
      url: '../top_up/top_up',
    })
  },

  cardTap:function(){
    wx.navigateTo({
      url: '../card/card',
    })
  },

  _userWalletData: function (id) {
    userWallet.getUserWalletInfo(id, (res) => {
      //console.log(res);
      this.setData({
        'userinfo': res
      });
    });
  },

  orderSign:function(e){
    var fid = e.detail.formId;
    var fObj = e.detail.value;
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + e.token;
    var d = {
      touser: e.openid,
      template_id:'Js1Rcy5EGpcpTU7NUA6LLel2qDKfxv9mtPwbaPFslO8',//申请的模板消息
      page:'/pages/index/index',
      form_id:fid,
      data:{
        "keyword1":{
          
        }
      }
    }
  },

  depositTap:function(res){
    var depositValue = 0.01;
    var that = this;
    if (this.data.userinfo.data.deposit != 0.01){
      //console.log("押金充值");
      wx.request({
        url: 'https://www.mobook.xin/api/v1/pay/get_pre_order',
        //url: 'http://www.mobook.com:8080/api/v1/pay/get_pre_order',
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token'),
          'id': wx.getStorageSync('userid'),
          'lable': 'deposit',
          'fee': depositValue,
          'token_key': 'token_' + wx.getStorageSync('userid')
        },
        success: function (res) {
          //console.log(res);
          var preData = res.data;
          wx.requestPayment({
            timeStamp: preData.data.timeStamp,
            nonceStr: preData.data.nonceStr,
            package: preData.data.package,
            signType: preData.data.signType,
            paySign: preData.data.paySign,
            success: function (res) {
              wx.showToast({
                title: '充值成功',
              })
              that._userWalletData(wx.getStorageSync('userid'));
            },
            fail: function (res) {
              wx.showToast({
                title: '充值失败',
              })
              that._userWalletData(wx.getStorageSync('userid'));
            }
          })
        },
        fail: function (res) {
          //console.log(res);
        }
      })
    }else{
      //console.log("押金退款");
      wx.request({
        url: 'https://www.mobook.xin/api/v1/pay/refund',
        //url: 'http://www.mobook.com:8080/api/v1/pay/refund',
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token'),
          'id': wx.getStorageSync('userid'),
          'token_key': 'token_' + wx.getStorageSync('userid')
        },
        success:function(res){
          console.log(res);
          if(res.data.status == 100){
            wx.showToast({
              title: '尚未归还书籍',
            })
          }else{
            wx.showToast({
              title: '退款成功',
            })
          }
          that._userWalletData(wx.getStorageSync('userid'));
        },
        fail:function(res){
          wx.showToast({
            title: '退款失败',
          })
          that._userWalletData(wx.getStorageSync('userid'));
        }
      })
    }
  }
})