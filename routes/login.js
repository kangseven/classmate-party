var express = require('express'),
    router = express.Router();

router.get('/login', function (req, res) {
  res.render('login.html');
});

module.exports = router;
