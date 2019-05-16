import { Token } from 'util/token.js';
import { Userinfo } from 'util/userinfo.js';
App({

  globalData: {
    userInfo: null
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var token = new Token(); 
    token.verify();
    var userinfo = new Userinfo();
    userinfo.verify();
    console.log(111);
  }
  
})
