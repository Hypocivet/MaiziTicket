var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "maiziticket"
});

function select(sql, callback) {
  connection.query(sql, (error, results) => {
    callback(results);
  });
}

function insert(sql, value, callback) {
  connection.query(sql, value, (error, results) => {
    callback(results);
  });
}

function update(sql, value, callback) {
  connection.query(sql, value, (error, results) => {
    callback(results);
  });
}

function del(sql, callback) {
  connection.query(sql, (error, results) => {
    callback(results);
  });
}

module.exports = {
  //登陆验证
  login: function(username, password, callback) {
    select('select * from login where username="' + username + '"', results => {
      if (results.length != 0) {
        if (results[0].password === password)
          callback({
            isLogin: true,
            class: results[0].class
          });
        else callback({ isLogin: false });
      } else callback({ isLogin: false });
    });
  },
  //注册
  register: function(username, password, callback) {
    select('select * from login where username="' + username + '"', results => {
      if (results.length == 0) {
        insert(
          "insert into login(username,password) value(?,?)",
          [username, password],
          results => {
            if (results.affecteRows != 0) callback(true);
            else callback(false);
          }
        );
      } else callback(false);
    });
  },
  //获取用户信息
  userInfo: function(username, callback) {
    select(
      'select * from userInfo where username="' + username + '"',
      results => {
        callback(results);
      }
    );
  },
  //修改用户信息
  alterInfo: function(username, info, callback) {
    update(
      'update userInfo set nickname=?,sex=?,birthday=? where username="' +
        username +
        '"',
      info,
      results => {
        callback(true);
      }
    );
  },
  //修改密码
  alterPassword: function(username, oldP, newP, callback) {
    select('select * from login where username="' + username + '"', results => {
      if (results[0].password === oldP) {
        update(
          'update login set password=? where username="' + username + '"',
          newP,
          results => {
            callback(true);
          }
        );
      } else {
        callback(false);
      }
    });
  },
  //实名验证
  authentication: function(username, realname, IDNumber, callback) {
    var info = [realname, IDNumber];
    update(
      'update userInfo set realname=?,IDNumber=? where username="' +
        username +
        '"',
      info,
      results => {
        callback(true);
      }
    );
  },
  getBuyerById: function(buyerId, callback) {
    select('select * from buyer where id="' + buyerId + '"', results => {
      callback(results);
    });
  },
  //获取当前账号添加的购买人
  getBuyer: function(username, callback) {
    select('select * from buyer where username="' + username + '"', results => {
      callback(results);
    });
  },
  //删除选中的购买人
  delBuyer: function(username, number, callback) {
    del(
      'delete from buyer where username="' +
        username +
        '" and number="' +
        number +
        '"',
      results => {
        callback(true);
      }
    );
  },
  //添加购买人
  addBuyer: function(info, callback) {
    insert(
      "insert into buyer(username,name,type,number,id) value(?,?,?,?,?)",
      info,
      results => {
        callback(true);
      }
    );
  },
  //添加账号信息
  addInfo:function(username,callback){
    var info = [username,"","","","",""];
    insert("insert into userinfo(username,nickname,realname,sex,birthday,IDNumber) value(?,?,?,?,?,?)",info,results=>{
      callback(true);
    })
  },
  //获取当前账号收货地址
  getSite: function(username, callback) {
    select('select * from site where username="' + username + '"', results => {
      callback(results);
    });
  },
  //通过id获取收货地址
  getSiteById: function(siteId, callback) {
    select('select * from site where id="' + siteId + '"', results => {
      callback(results);
    });
  },
  //修改收货地址
  alterSite: function(id, info, callback) {
    update(
      'update site set name=?,phone=?,site=? where id="' + id + '"',
      info,
      results => {
        callback(true);
      }
    );
  },
  //删除收货地址
  delSite: function(id, callback) {
    del('delete from site where id="' + id + '"', results => {
      callback(true);
    });
  },
  //新增收货地址
  addSite: function(info, callback) {
    insert(
      "insert into site(username,name,phone,site,choose,id) value(?,?,?,?,?,?)",
      info,
      results => {
        callback(true);
      }
    );
  },
  //根据类别获取票务信息
  getInfoByType: function(type, callback) {
    select('select * from ticket where type="' + type + '"', results => {
      callback(results);
    });
  },
  //用户自定义查询方式
  getInfoByUser: function(sql, callback) {
    select(sql, results => {
      callback(results);
    });
  },
  //根据商品id获取信息
  getInfoById: function(ticketId, callback) {
    select(
      'select * from ticket where ticketId="' + ticketId + '"',
      results => {
        callback(results);
      }
    );
  },
  //通过查询语句获取信息
  getInfoByTxt: function(searchTxt, callback) {
    select(
      'select * from ticket where (name like "%' + searchTxt + '%")',
      results => {
        callback(results);
      }
    );
  },
  //通过城市获取信息
  getInfoByCity: function(city, callback) {
    select('select * from ticket where city="' + city + '"', results => {
      callback(results);
    });
  },
  //订单提交
  submitOrder: function(info, callback) {
    insert(
      "insert into orderInfo(username,orderId,ticketId,counts,orderState,siteId,buyerId,sPrice) value(?,?,?,?,?,?,?,?)",
      info,
      results => {
        callback(true);
      }
    );
  },
  //获取订单信息
  getOrder: function(username, callback) {
    select(
      'select * from orderInfo where username="' + username + '"',
      results => {
        callback(results);
      }
    );
  },
  //订单支付
  payOrder: function(orderId, callback) {
    update(
      'update orderInfo set orderState=? where orderId="' + orderId + '"',
      "已支付",
      results => {
        callback(true);
      }
    );
  },
  //添加新商品
  addTicket: function(info, callback) {
    insert(
      "insert into ticket(ticketId,poster,name,place,time,price,type,city) value(?,?,?,?,?,?,?,?)",
      info,
      results => {
        callback(true);
      }
    );
  },
  //删除商品
  delTicket: function(goodsId, callback) {
    console.log(goodsId);
    del('delete from ticket where ticketId="' + goodsId + '"', results => {
      callback(true);
    });
  },
  //修改商品
  alterTicket: function(ticketId, info, callback) {
    update(
      'update ticket set poster=?,name=?,place=?,price=?,type=?,city=? where ticketId="' +
        ticketId +
        '"',
      info,
      results => {
        callback(true);
      }
    );
  }
};
