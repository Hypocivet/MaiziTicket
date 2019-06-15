var server = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = new server();
var mysql = require("./mysql");

app.use(bodyParser.json());

app.all("*", function(request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS"
  );
  response.header("X-Powered-By", " 3.2.1");
  response.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.listen(520, function() {
  console.log("麦子网服务器已启动！");
});

function getParams(request, callback) {
  var results = "";
  var data = {};
  request.on("data", result => {
    results += result;
  });
  request.on("end", () => {
    var median = results.split("&");
    median.forEach(element => {
      data[element.split("=")[0]] = element.split("=")[1];
    });
    callback(data);
  });
}

app.post("/api/login", (request, response) => {
  getParams(request, data => {
    mysql.login(data.username, data.password, result => {
      response.json(result);
    });
  });
});

app.post("/api/register", (request, response) => {
  getParams(request, data => {
    mysql.register(data.username, data.password, result => {
      mysql.addInfo(data.username, result => {
        response.json(result);
      });
    });
  });
});

app.post("/api/getInfoByType", (request, response) => {
  getParams(request, data => {
    mysql.getInfoByType(decodeURI(data.type), result => {
      response.json(result);
    });
  });
});

app.post("/api/getInfoByUser", (request, response) => {
  getParams(request, data => {
    mysql.getInfoByUser(
      decodeURIComponent(data.sql).replace(/\+/g, " "),
      result => {
        response.json(result);
      }
    );
  });
});

app.post("/api/getInfoById", (request, response) => {
  getParams(request, data => {
    mysql.getInfoById(data.ticketId, results => {
      response.json(results);
    });
  });
});

app.post("/api/getInfoByTxt", (request, response) => {
  getParams(request, data => {
    mysql.getInfoByTxt(decodeURI(data.searchTxt), result => {
      response.json(result);
    });
  });
});

app.post("/api/getInfoByCity", (request, response) => {
  getParams(request, data => {
    mysql.getInfoByCity(decodeURI(data.city), result => {
      response.json(result);
    });
  });
});

app.post("/api/userInfo", (request, response) => {
  getParams(request, data => {
    mysql.userInfo(data.username, result => {
      response.json(result);
    });
  });
});

app.post("/api/alterInfo", (request, response) => {
  getParams(request, data => {
    var info = [decodeURI(data.nickname), data.sex, data.birthday];
    mysql.alterInfo(data.username, info, result => {
      response.json(result);
    });
  });
});

app.post("/api/alterPassword", (request, response) => {
  getParams(request, data => {
    mysql.alterPassword(data.username, data.oldP, data.newP, result => {
      response.json(result);
    });
  });
});

app.post("/api/authentication", (request, response) => {
  getParams(request, data => {
    mysql.authentication(
      data.username,
      decodeURI(data.realname),
      data.IDNumber,
      result => {
        response.json(result);
      }
    );
  });
});

app.post("/api/getBuyer", (request, response) => {
  getParams(request, data => {
    mysql.getBuyer(data.username, result => {
      response.json(result);
    });
  });
});

app.post("/api/getBuyerById", (request, response) => {
  getParams(request, data => {
    mysql.getBuyerById(data.buyerId, result => {
      response.json(result);
    });
  });
});

app.post("/api/delBuyer", (request, response) => {
  getParams(request, data => {
    mysql.delBuyer(data.username, data.number, result => {
      response.json(result);
    });
  });
});

app.post("/api/addBuyer", (request, response) => {
  getParams(request, data => {
    var info = [
      data.username,
      decodeURI(data.name),
      decodeURI(data.type),
      data.number,
      decodeURI(data.id)
    ];
    mysql.addBuyer(info, result => {
      response.json(result);
    });
  });
});

app.post("/api/getSite", (request, response) => {
  getParams(request, data => {
    mysql.getSite(data.username, result => {
      response.json(result);
    });
  });
});

app.post("/api/getSiteById", (request, response) => {
  getParams(request, data => {
    mysql.getSiteById(data.siteId, result => {
      response.json(result);
    });
  });
});

app.post("/api/alterSite", (request, response) => {
  getParams(request, data => {
    var info = [
      decodeURI(data.name),
      decodeURI(data.phone),
      decodeURI(data.site)
    ];
    mysql.alterSite(data.id, info, result => {
      response.json(result);
    });
  });
});

app.post("/api/delSite", (request, response) => {
  getParams(request, data => {
    mysql.delSite(data.id, result => {
      response.json(result);
    });
  });
});

app.post("/api/addSite", (request, response) => {
  getParams(request, data => {
    var date = new Date();
    var info = [
      decodeURI(data.username),
      decodeURI(data.name),
      decodeURI(data.phone),
      decodeURI(data.site),
      "",
      decodeURI(data.username) +
        date.getFullYear() +
        (date.getMonth() + 1) +
        date.getDate() +
        date.getHours() +
        date.getMinutes()
    ];
    mysql.addSite(info, result => {
      response.json(result);
    });
  });
});

app.post("/api/submitOrder", (request, response) => {
  getParams(request, data => {
    var info = [
      data.username,
      data.orderId,
      data.ticketId,
      data.counts,
      decodeURI(data.orderState),
      data.siteId,
      data.buyerId,
      data.sPrice
    ];
    mysql.submitOrder(info, result => {
      response.json(result);
    });
  });
});

app.post("/api/getOrder", (request, response) => {
  getParams(request, data => {
    mysql.getOrder(data.username, result => {
      response.json(result);
    });
  });
});

app.post("/api/payOrder", (request, response) => {
  getParams(request, data => {
    mysql.payOrder(data.orderId, result => {
      response.json(result);
    });
  });
});

app.post("/api/addTicket", (request, response) => {
  getParams(request, data => {
    var info = [
      data.ticketId,
      decodeURIComponent(data.poster),
      decodeURI(data.name).replace(/\+/g, " "),
      decodeURI(data.place).replace(/\+/g, " "),
      data.time,
      data.price.replace(/\+/g, " "),
      decodeURI(data.type),
      decodeURI(data.city)
    ];
    mysql.addTicket(info, result => {
      response.json(result);
    });
  });
});

app.post("/api/delTicket", (request, response) => {
  getParams(request, data => {
    mysql.delTicket(data.goodsId, result => {
      response.json(result);
    });
  });
});

app.post("/api/alterTicket", (request, response) => {
  getParams(request, data => {
    var info = [
      decodeURIComponent(data.poster),
      decodeURI(data.name).replace(/\+/g, " "),
      decodeURI(data.place).replace(/\+/g, " "),
      data.price.replace(/\+/g, " "),
      decodeURI(data.type),
      decodeURI(data.city)
    ];
    mysql.alterTicket(data.ticketId, info, result => {
      response.json(result);
    });
  });
});
