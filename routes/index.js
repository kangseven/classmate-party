var express = require('express'),
    router = express.Router();

router.use(require('./activation'));
router.use(require('./login'));
router.use(require('./detail'));

router.get('/', function (req, res) {
  res.render('index.html');
});

module.exports = router;
