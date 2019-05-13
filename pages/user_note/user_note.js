import { UserNote } from 'user_note-model.js';
var userNote = new UserNote();

// pages/user_note/user_note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     books:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._findHostryList(wx.getStorageSync('userid'));
  },

  onShow:function(event){
    this._findHostryList(wx.getStorageSync('userid'));
  },

  _findHostryList: function (id) {
    userNote.findHostryList(id, (res) => {
      //console.log(res);
      this.setData({
        'books': res
      });
    });
  },

  toMyReadTap:function(event){
    //console.log(event);
      wx.navigateTo({
        url: 'notes-detail/notes-detail?id=' + event.currentTarget.dataset.id
        + "&state=" + event.currentTarget.dataset.state
        + "&bookid=" + event.currentTarget.dataset.bookid,
      })
  }
})