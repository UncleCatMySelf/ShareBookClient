import { Base } from '../../util/base.js';
 
class UserNote extends Base {
  constructor() {
    super();
  }

  findHostryList(id, callback) {
    var params = {
      url: 'user/get_user_hostry?userId=' + id,
      sCallback: function (data) {
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

}

export { UserNote };