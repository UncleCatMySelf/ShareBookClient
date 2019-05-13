// pages/map/top_up/top_up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amoutList: [
      0.1, 0.05, 0.02, 0.01
    ],
    curSelected: '0'
  },
  selectAmount: function (e) {
    var dataId = e.target.dataset.id;
    //console.log(dataId);
    this.setData({
      curSelected: dataId
    })
  }, 
  
  // 提交充值
  sublime_topUpTap: function () {
    //var feeValue = this.data.curSelected;
    // todo 判断用户是否有选择价格
    var feeValue = 0.1;
    wx.request({
      url: 'https://www.mobook.xin/api/v1/pay/get_pre_order',
      //url: 'http://www.mobook.com:8080/api/v1/pay/get_pre_order',
      method:'POST',
      header:{
        'content-type': 'application/json',
        'token': wx.getStorageSync('token'),
        'id': wx.getStorageSync('userid'),
        'lable': 'recharge',
        'fee': feeValue,
        'token_key': 'token_' + wx.getStorageSync('userid')
      },
      success:function(res){
        //console.log(res);
        if(res.data.data == 8008){
          wx.showToast({
               title: '请先充值押金哦！'
          })
        }else{

          var preData = res.data;
          wx.requestPayment({
            timeStamp: preData.data.timeStamp,
            nonceStr: preData.data.nonceStr,
            package: preData.data.package,
            signType: preData.data.signType,
            paySign: preData.data.paySign,
            success: function (res) {
              //console.log("success"+res);
              wx.showToast({
                title: '充值成功',
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '充值失败'
              })
            }
          })
        }
      },
      fail:function(res){
        //console.log(res);
      }
    })
  }
})