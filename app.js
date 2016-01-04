var express = require('express'),
    app = express(),
    nodemon = require('nodemon')
    models = require("./models"),
    utils = require('./helpers/utils');

app.engine('.html', require('ejs').renderFile);

app.use(require('./routes'));

// 将 utils 通过 locals 暴露给模板引擎使用
(function () {
  for(var i in utils){
    app.locals[i] = utils[i];
  }
})();

models.sequelize.sync().then(function () {
  app.listen(4000, function () {
    var addr = this.address().address,
        port = this.address().port;
    console.log('Server running at http://%s:%s/', addr == '::'?'127.0.0.1': addr, port);
  });
});
