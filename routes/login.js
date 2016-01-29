var express = require('express'),
    router = express.Router(),
    models = require('../models');

router.get('/login', function (req, res) {
  models.Seat.findAll({
    order: 'id ASC',
    include: [
      {
        model: models.User
      }
    ]
  }).then(function (seats) {
    var seatResults = {},
        results = [];

    for(var i = 0;i < seats.length;i++){
      var column = seats[i].get('column'),
          name = seats[i].get('User').get('name');
      if(!seatResults[column]){
        seatResults[column] = [];
      }

      seatResults[column].push({
        id: seats[i].get('User').get('id'),
        name: name.length == 3?'？？' + name[2]: '？' + name[1],
        gender: seats[i].get('User').get('gender')
      });
    }

    for(i in seatResults){
      results.push({
        column: i,
        members: seatResults[i]
      });
    }

    results.splice(3, 0, { aisle: true });
    results.splice(8, 0, { aisle: true });
    results[5].platform = true;
    results[6].platform = true;

    res.render('login.html', {
      message: req.flash('error'),
      seats: results,
      actMessage: req.flash('act_error'),
      globalMessage: req.flash('info')
    });
  });
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
          req.flash('info', '该账号已激活！');
          res.redirect('/login');
        }else if(!data.mobile || !data.email || !data.password){
          req.flash('act_error', '请将信息填写完整后再尝试激活！');
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
