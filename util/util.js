function converToStarsArray(stars){
  var trueStars = stars/2;
  var num = trueStars.toString().substring(0,1);
  var array = [];
  for(var i =1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }
    else{
      array.push(0);
    }
  }
  return array;
}

function http(url,callback) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/xml' // 默认值
    },
    success: function (res) {
      callback(res.data);
    }
  })
}

module.exports = {
  converToStarsArray: converToStarsArray,
  http: http
}