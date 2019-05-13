var app = getApp();
Page({
  data: {
    avatarUrl: null,
    items: [
      { name: 'USA', value: '无法借书' },
      { name: 'CHN', value: '无法还书' },
    ],
    item2: [
      { name: 'USA', value: '无法扣费' },
      { name: 'CHN', value: '图书错误' },
    ],
    item3: [
      { name: 'BRA', value: '设备损坏' },
      { name: 'JPN', value: '其他' },
    ],
    checkdata:{},
    textmessage:'',
    paths:{},
    scene:'ABCSD'
  },
  checkboxChange: function (e) {
    this.setData({
      checkdata:e.detail.value
    })
  },

  scanCodeTap: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  },

  //上传
  uploadFileTap: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          paths: tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  formTap:function(e){
    console.log(e);
  },

  bindFormSubmit: function (e) {
    this.setData({
      textmessage: e.detail.value.textarea
    })
    var check = "";
    var that = this;
    for(var i=0;i<this.data.checkdata.length;i++){
      check = check + this.data.checkdata[i] + "、";
    }
    if (that.data.paths[0] == null){
      wx.showToast({
        title: '请选择图片',
      })
    }else{
      wx.uploadFile({
        url: 'https://www.mobook.xin/api/v1/user/upload_user_fault',
        filePath: that.data.paths[0],
        name: 'file',
        header: { "Content-Type": "multipart/form-data" },
        formData: { 
          'textarea': that.data.textmessage,
          'check': check,
          'scene': that.data.scene,
          'userid': wx.getStorageSync('userid')
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '反馈成功！',
            })
          } else {
            wx.showToast({
              title: '请稍后再传哦！',
            })
          }
        }
      })
    }
  }
})