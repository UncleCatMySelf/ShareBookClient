import { NotesDetail } from 'notes-detail-model.js';
var notesDetail = new NotesDetail()

// pages/user_note/notes-detail/notes-detail.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    state:'',
    bookId:'',
    book:[],
    summary:'',
    imgs:{
      img1:0,
      img2:0,
      img3:0,
      img4:0,
      img5:0
    },
    score: 0,
    textarea:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    this.setData({
      id: options.id,
      state:options.state,
      bookId:options.bookid,
    })
    this._findBookHostry(options.bookid, options.id);
  },

  _findBookHostry: function (bookid, hostryid){
    notesDetail.findBookHostry(bookid,hostryid,(res)=>{
      //console.log(res);
      this.setData({
        'book': res
      });
      var summary = res.summary;
      if (summary.length >= 150){
          summary = summary.substring(0, 150) + '...';
      }
      this.setData({
        'summary': summary
      });
      if(res.score == 2){
        this.setData({
          imgs: {
            img1: 1,
            img2: 0,
            img3: 0,
            img4: 0,
            img5: 0
          }
        })
      } else if (res.score == 4){
        this.setData({
          imgs: {
            img1: 1,
            img2: 1,
            img3: 0,
            img4: 0,
            img5: 0
          }
        })
      } else if (res.score == 6){
        this.setData({
          imgs: {
            img1: 1,
            img2: 1,
            img3: 1,
            img4: 0,
            img5: 0
          }
        })
      } else if (res.score == 8){
        this.setData({
          imgs: {
            img1: 1,
            img2: 1,
            img3: 1,
            img4: 1,
            img5: 0
          }
        })
      } else if (res.score == 8) {
        this.setData({
          imgs: {
            img1: 1,
            img2: 1,
            img3: 1,
            img4: 1,
            img5: 1
          }
        })
      }
    }
    )},

  bindTextAreaBlur:function(e){
    //console.log(e);
    this.setData({
      textarea: e.detail.value
    })
  },

  submitTab:function(event){
    //console.log(this.data.score);
    //console.log(this.data.textarea);
    notesDetail.addUserComments(this.data.id, this.data.score, this.data.textarea,(res)=>{
      if(res == 2000){
        wx.showToast({
          title: '提交成功',
        })
      }else {
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  },

  img1fun:function(){
    this.setData({
      imgs:{
        img1: 1,
        img2: 0,
        img3: 0,
        img4: 0,
        img5: 0
      },
      score: 2
    })
  },

  img2fun:function(){
    this.setData({
      imgs: {
        img1: 1,
        img2: 1,
        img3: 0,
        img4: 0,
        img5: 0
      },
      score: 4
    })
  },

  img3fun: function () {
    this.setData({
      imgs: {
        img1: 1,
        img2: 1,
        img3: 1,
        img4: 0,
        img5: 0
      },
      score: 6
    })
  },

  img4fun: function () {
    this.setData({
      imgs: {
        img1: 1,
        img2: 1,
        img3: 1,
        img4: 1,
        img5: 0
      },
      score: 8
    })
  },

  img5fun: function () {
    this.setData({
      imgs: {
        img1: 1,
        img2: 1,
        img3: 1,
        img4: 1,
        img5: 1
      },
      score: 10
    })
  },
})