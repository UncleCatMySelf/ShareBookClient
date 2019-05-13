import { Base } from '../../util/base.js';
var util = require('../../util/util.js');

class Book extends Base{
  constructor() {
    super();
  }

  getHouseBookInfo(id, callback) {
    var params = {
      url: 'house/get_house_book?id=' + id, 
      sCallback: function (data) {
        var datas = [];
        datas = data.data;
        var books = [];
        for (var idx in datas.wxBookMsgVos) {
          var book = datas.wxBookMsgVos[idx];
          var title = book.title;
          if (title.length >= 16) {
            title = title.substring(0, 16) + '...';
          }
          var author = book.author;
          if(author.length >= 4){
            author = author.substring(0, 4) + '...';
          }
          var introduced = book.introduced;
          if (introduced.length >= 41){
            introduced = introduced.substring(0,41) + '...';
          }
          var temp = {
            stars: util.converToStarsArray(book.score),
            title: title,
            average: book.score,
            num: book.num,
            coverageUrl: book.image,
            bookid: book.bookid,
            author: author,
            introduced: introduced
          }
          books.push(temp);
        }
        callback && callback(datas,books);
      }
    }
    this.request(params);
  }

}

export { Book };