var express = require('express'),
    router = express.Router();

router.get('/activities/:id', function (req, res) {
  res.render('detail.html');
});

module.exports = router;
