var express = require('express'),
    router = express.Router(),
    models = require('../models');

router.get('/login', function (req, res) {
  res.render('login.html', { message: req.flash('error') });
});

router.post('/login',
  require('../helpers/passport').authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', require('../helpers/auth_check'), function (req, res) {
  req.logout();
  res.redirect('/login');
});

router.post('/activation', function (req, res) {
  var data = req.body;

  if(data.id){
    models.User.findOne({
      where: {
        id: data.id
      }
    }).then(function (user) {
      if(user){
        if(user.get('password')){
          req.flash('info', '该账号已激活，不可重复激活！');
          res.redirect('/login');
        }else if(user.get('name') == data.name){
          models.User.update({
            mobile: data.mobile,
            email: data.email,
            password: data.password
          }, {
            where: {
              id: data.id
            }
          }).then(function () {
            req.flash('info', '激活账号成功！');
            res.redirect('/login');
          });
        }else{
          req.flash('act_error', '输入的真实姓名有误！');
          res.redirect('/login');
        }
      }else{
        res.redirect('/login');
      }
    })
  }else{
    res.redirect('/login');
  }
});

module.exports = router;
