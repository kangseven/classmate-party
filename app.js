var express = require('express'),
    app = express(),
    nodemon = require('nodemon');

app.engine('.html', require('ejs').renderFile);

app.use(require('./routes'));

app.listen(4000, function () {
  var addr = this.address().address,
      port = this.address().port;
  console.log('Server running at http://%s:%s/', addr == '::'?'127.0.0.1': addr, port);
});
