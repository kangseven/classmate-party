var express = require('express'),
    app = express(),
    nodemon = require('nodemon')
    models = require("./models"),
    utils = require('./helpers/utils'),
    passport = require('./helpers/passport');

app.engine('.html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());

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
