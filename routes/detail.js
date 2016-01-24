var express = require('express'),
    router = express.Router();

router.get('/activities/:id', require('../helpers/auth_check'), function (req, res) {
  res.render('detail.html');
});

module.exports = router;
