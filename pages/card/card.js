import { Card } from 'card-model.js';
var cardModel = new Card();

// pages/card/card.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    changs:'0',
    userCardinfo:{
      imgYesNo:'',
      message:'',
      openYesNo:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._userCardData(wx.getStorageSync('userid'));
  },

  monthTap:function(res){
    var dataId = res.target.dataset.id;
    this.setData({
      changs: dataId
    })
  },

  _userCardData: function (id) {
    cardModel.getUserCardInfo(id, (res) => {
      this.setData({
        'userCardinfo': res
      });
    });
  },

  wechatPayTap:function(res){
    var that = this;
    if (this.data.changs == '0'){
      wx.showToast({
        title: '请选择卡卷类型',
      })
    }else{
      if(this.data.changs == '5'){
        var feeValue = 0.01;
      }else {
        var feeValue = 0.02;
      }
      wx.request({
        url: 'https://www.mobook.xin/api/v1/pay/get_pre_order',
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token'),
          'id': wx.getStorageSync('userid'),
          'lable': 'card',
          'fee': feeValue,
          'token_key': 'token_' + wx.getStorageSync('userid')
        },
        success: function (res) {
          //console.log(res);
          if (res.data.data == 8008) {
            wx.showToast({
              title: '请先充值押金哦！'
            })
          } else if (res.data.data == 7007){
            wx.showToast({
              title: '还未到续费时间范围'
            })
          }else {
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
                that._userCardData(wx.getStorageSync('userid'));
              },
              fail: function (res) {
                wx.showToast({
                  title: '充值失败'
                })
              }
            })
          }
        },
        fail: function (res) {
          //console.log(res);
        }
      })
    }
  }
  
})