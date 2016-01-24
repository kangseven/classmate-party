var express = require('express'),
    router = express.Router(),
    models = require('../models');

router.get('/activities/:id(\\d+)', require('../helpers/auth_check'), function (req, res) {
  res.render('detail.html', { message: req.flash('info') });
});

router.post('/activities/:id(\\d+)', require('../helpers/auth_check'), function (req, res) {
  var path = '/activities/' + req.params.id;
  models.ActivityJoined.findOne({
    where: {
      UserId: req.user.id,
      ActivityId: req.params.id
    }
  }).then(function (result) {
    if(result){
      result.destroy();
      req.flash('info', '已成功取消参加该活动！');
      res.redirect(path);
    }else{
      models.ActivityJoined.create({
        ActivityId: req.params.id,
        UserId: req.user.id
      }).then(function () {
        req.flash('info', '已成功参加该活动！');
        res.redirect(path);
      });
    }
  });
});

module.exports = router;
