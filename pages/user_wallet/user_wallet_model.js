import { Base } from '../../util/base.js';

class UserWallet extends Base{
  constructor() {
    super();
  }

  getUserWalletInfo(id,callback){
    var params = {
      url: 'user/get_user_wallet?id=' + id + '&token_key=token_' + id,
      sCallback: function (data) {
        var datas = [];
        datas = data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }
}

export { UserWallet };