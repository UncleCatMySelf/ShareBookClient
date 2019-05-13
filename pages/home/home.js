// pages/home.js
const app = getApp()
import { Home } from 'home-model.js';
var position1, position2, position3, position4, position5,position6;
var W = 0; var H = 0;
var controls;
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    marker:{},
    map: {
      markers: [],
      hasMarkers: false,//解决方案
      controls: controls,
    },
    userInfo: {},
    showView: false,
    markerId:'0'
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
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var scene = decodeURIComponent(options.scene);
    this._getLocation();
    //this._loadData(wx.getStorageSync('longitude'), wx.getStorageSync('latitude'));
  },

  _loadData: function (longitude, latitude) {
    home.findPositionHouse(longitude, latitude, (res) => {
      this.setData({
        'map.markers': res,
        'map.hasMarkers': true
      });
    });
  },

  _markerData:function(id){
    home.findOneHouse(id,(res) =>{
      this.setData({
        'marker': res
      });
    });
  },

  // houseDetailTap: function () {
  //   wx.navigateTo({
  //     url: '../library/library?id=' + event.markerId,
  //   })
  // },

  onBookSrc: function () {
    wx.navigateTo({
      url: '../book/book?id=' + this.data.markerId,
    })
    //this.hideModal_2();
  },


  //页面加载时定位到用户实际中心位置
  _getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    });
  },

  //中心定位
  moveToLocation: function () {
    this.mapCtx.moveToLocation();
  },

  //扫码
  onfootTap: function (event) {
    wx.scanCode({
      success: (res) => {
        console.log(res.path);
        var id = res.path.substring(22, 36);
        wx.navigateTo({
          url: '../book/book?id='+id,
        })
      }
    })
  },

  onbackTap:function(event){
    wx.scanCode({
      success: (res) => {
        //console.log(res.path);
        var id = res.path.substring(22, 36);
        home.backbook(id,wx.getStorageSync('userid'),(res)=>{
          console.log(res);
          if(res == 8000 || res == 8003){
            wx.showToast({
              title: '不具备还书条件',
            })
          }else if (res == 8001 || res == 8002){
            wx.showToast({
              title: '设备异常请勿还书',
            })
          }else if (res == 7000){
            wx.showToast({
              title: '设备空余空间不足',
            })
          }else if (res == 6000 || res == 7001){
            wx.showToast({
              title: '系统异常联系客服',
            })
          }else if (res == 2000){
            wx.showToast({
              title: '月卡用户消费愉快',
            })
          }else if (res == 2001){
            wx.showToast({
              title: '已从余额扣除金额',
            })
          }else if (res == 2002){
            wx.showToast({
              title: '余额不足请充值',
            })
            wx.navigateTo({
              url: '../user_wallet/user_wallet',
            })
          }
        });
      }
    })
  },

  //control点击事件
  controltap: function (event) {
    var that = this;
    var id = event.controlId;
    switch (id) {
      case 1:
        this.moveToLocation();
        break;
      case 2:
        wx.navigateTo({
          url: '../user-message/user-message',
        })
        break;
      case 4:
        that.setData({
          showModal: true
        });
        break;
      case 5:
        this.onfootTap();
        break;
      case 6:
        this.onbackTap();
        break;
    }
  },

  //跳转
  onFault: function () {
    wx.navigateTo({
      url: '../fault/fault',
    })
    this.hideModal();
  },

  onService:function(){
    wx.makePhoneCall({
      phoneNumber: '02026099062',
    })
    this.hideModal();
  },

  onCommon: function () {
    wx.navigateTo({
      url: '../common-problems/common-problems',
    })
    this.hideModal();
  },

  //书屋事件
  markertap: function (event) {
    this._markerData(event.markerId);
    // this.setData({
    //   showModal_2: true
    // })
    this.setData({
      markerId: event.markerId
    })
    this.onBookSrc();
  },
 
  //隐藏书屋弹窗
  hideModal_2: function () {
    this.setData({
      showModal_2: false
    });
  },

  //弹框
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },

  // 隐藏模态对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  //对话框取消按钮点击事件
  onCancel: function () {
    this.hideModal();
  },

  //改变显示状态 
  onChangeShowState: function (event) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map');
    this.moveToLocation();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        W = res.windowWidth;
        H = res.windowHeight;
        // 根据屏幕宽高动态设置control 位置
        // 定位
        position1 = {
          left: W * .05,
          top: H - 65,
          width: 36,
          height: 36
        }
        // 扫码开锁
        position2 = {
          left: W * .20,
          top: H - 75,
          width: 90,
          height: 44
        }
        // 设备
        position3 = {
          left: W * .95 - 40,
          top: H - 140,
          width: 35,
          height: 35
        }
        // 个人中心
        position4 = {
          left: W * .95 - 40,
          top: H - 65,
          width: 35,
          height: 35
        }
        // 中心
        position5 = {
          left: W * .5 - 10,
          top: H * .5 - 35,
          width: 20,
          height: 40
        }
        //还书
        position6 = {
          left: W * .55,
          top: H - 75,
          width: 90,
          height: 44
        }
        controls = [{
          id: 1,
          iconPath: '/imgs/home/Refresh.png',
          position: position1,
          clickable: true
        }, {
          id: 2,
          iconPath: '/imgs/home/user.png',
          position: position4,
          clickable: true
        }, {
          id: 3,
          iconPath: '/imgs/home/Location.png',
          position: position5,
          clickable: true
        }, {
          id: 4,
          iconPath: '/imgs/home/fault.png',
          position: position3,
          clickable: true
        }, {
          id: 5,
          iconPath: '/imgs/home/out.png',
          position: position2,
          clickable: true
        }, {
          id: 6,
          iconPath: '/imgs/home/back.png',
          position: position6,
          clickable: true
        }]
        that.setData({
          controls: controls
        });
      }
    })
  }

})