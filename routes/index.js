var express = require('express'),
    router = express.Router(),
    models = require('../models');

router.use(require('./activation'));
router.use(require('./login'));
router.use(require('./detail'));

router.get('/', function (req, res) {
  models.Activity.findAll().then(function (activities) {
    res.render('index.html', {
      activityList: activities
    });
  });
});

module.exports = router;
