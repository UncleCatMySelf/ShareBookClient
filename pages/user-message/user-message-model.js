import { Base } from '../../util/base.js';

class UserMessage extends Base{
  constructor() {
    super();
  }


  getUserMessage(id,callback){ 
    var params = {
      url: 'user/get_user_message?id=' + id + '&token_key=token_' + id,
      sCallback: function (data) {
        var datas = [];
        datas = data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

}

export { UserMessage };