import { Base } from '../../../util/base.js';


class BookDetail extends Base{
  constructor() {
    super();
  } 

  getBookReviewInfo(id, callback){
    var params = {
      url:'book/get_book_review_msg?id=' + id,
      sCallback: function(data) {
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

  alsoToTabFunction(id, userid, callback){
    var params = {
      url:'book/also_to_book?id='+id+'&userid='+userid,
      sCallback:function(data){
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

  getBookDetailInfo(id, callback){
    var params = {
      url: 'book/get_book_detail_msg?id=' + id,
      sCallback: function (data) {
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  } 
}

export { BookDetail };