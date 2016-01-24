var express = require('express'),
    router = express.Router();

router.get('/account/password', require('../helpers/auth_check'), function (req, res) {
  res.render('password.html');
});

module.exports = router;
