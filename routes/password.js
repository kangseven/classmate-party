var express = require('express'),
    router = express.Router();

router.get('/account/password', function (req, res) {
  res.render('password.html');
});

module.exports = router;
