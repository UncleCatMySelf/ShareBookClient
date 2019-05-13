import { Base } from '../../../util/base.js';

class NotesDetail extends Base {
  constructor() {
    super();
  }

  findBookHostry(bookid, hostryid, callback) {
    var params = {
      url: 'user/get_hostry_book?bookId=' + bookid + '&hostryId=' + hostryid,
      sCallback: function (data) {
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

  addUserComments(hostryid, score, tarea, callback){
    //console.log(tarea);
    var params = {
      type:'POST',
      url: 'user/add_user_comments_for_book',
      data:{
        'tArea': tarea,
        'hostryId': hostryid,
        'score': score,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      sCallback: function (data) {
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

}

export { NotesDetail };