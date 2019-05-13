import { Config } from 'config.js';

class Userinfo{
  constructor() {
    this.save_user_info = Config.restUrl + 'token/save_user_info';
  }

  verify(){
    this.getUserInfo();
  }

  getUserInfo(res,callBack){
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        //获取用户敏感数据密文和偏移向量
        if (res.userInfo) {
          //数据库存储用户首次基本信息
          wx.request({ 
            url: that.save_user_info,
            data: {
              token: wx.getStorageSync('token'),
              avatarUrl: res.userInfo.avatarUrl,
              city: res.userInfo.city,
              country: res.userInfo.country,
              gender: res.userInfo.gender,
              nickName: res.userInfo.nickName,
              province: res.userInfo.province
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              //console.log(res);
              wx.showToast({
                title: '登录成功',
              })
              callBack && callBack(res);
            }
          })
        }
      }
    })
  }

}

export { Userinfo };