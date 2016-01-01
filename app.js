var express = require('express'),
    app = express(),
    nodemon = require('nodemon');

app.engine('.html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html');
});

var server = app.listen(4000, function () {
  var addr = server.address().address,
      port = server.address().port;
  console.log('Server running at http://%s:%s/', addr == '::'?'127.0.0.1': addr, port);
})
