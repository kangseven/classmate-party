var express = require('express'),
    router = express.Router(),
    models = require('../models');

router.get('/activities/:id(\\d+)', require('../helpers/auth_check'), function (req, res) {
  models.Activity.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (activity) {
    if(activity){
      models.ActivityJoined.findAll({
        where: {
          ActivityId: req.params.id
        },
        include: [
          {
            model: models.User
          }
        ]
      }).then(function (list) {
        var isJoined = false;
        for(var i = 0;i < list.length;i++){
          if(list[i].get('User').get('id') == req.user.id){
            isJoined = true;
            break;
          }
        }
        res.render('detail.html', {
          message: req.flash('info'),
          activity: activity,
          participants: list,
          isJoined: isJoined
        });
      });
    }else{
      res.redirect('/');
    }
  })
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
