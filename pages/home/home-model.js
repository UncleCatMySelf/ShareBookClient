import { Base } from '../../util/base.js';
  
class Home extends Base {
  constructor() {
    super();
  }
 
  findOneHouse(id,callback){
    var params = {
      url: 'house/find_one_house?id=' + id,
      sCallback:function(data) {
        var datas = [];
        datas = data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

  backbook(channelid,userid,callback){
    var params = {
      url:'user/back_book?channelId='+channelid+'&userId='+userid,
      sCallback:function(data){
        var datas = [];
        datas = data.data;
        callback && callback(datas);
      }
    }
    this.request(params);
  }

 
  findPositionHouse(longitude, latitude, callback) {
    var params = {
      //url: 'house/find_position?longitude=' + longitude + '&latitude=' + latitude,
      url: 'house/find_position_all',
      sCallback: function (data) {
        var datas = data.data;
        var list = [];
        for (var i = 0; i < datas.length; i++) {
          list[i] = {
            latitude: datas[i].latitude,
            longitude: datas[i].longitude,
            iconPath: "/imgs/home/mobook house.png",
            id: datas[i].id,
            width: 30,
            height: 40
          }
        }
        callback && callback(list);
      }
    }
    this.request(params);
  }
}

export { Home };