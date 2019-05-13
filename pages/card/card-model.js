import { Base } from '../../util/base.js';

class Card extends Base{
  constructor() {
    super();
  }

  getUserCardInfo(id, callback) {
    var params = {
      url: 'user/get_user_card?id=' + id + '&token_key=token_' + id,
      sCallback: function (data) {
        var datas = [];
        datas = data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }
}

export { Card };