import { Config } from 'config.js';

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'user/verify';
    this.tokenUrl = Config.restUrl + 'user/get_token';
  }

  verify() { 
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this._veirfyFromServer(token);
    }
  }

  // 携带令牌去服务器校验令牌
  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.data;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  //从服务器获取token
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res);
            wx.setStorageSync('token', res.data.data[0].token);
            callBack && callBack(res.data.data[0].token);
          }
        })
      }
    })
  }
}

export { Token };