var express = require('express'),
    router = express.Router();

router.get('/activation', function (req, res) {
  res.render('activation.html');
});

module.exports = router;
