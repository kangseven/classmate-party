var express = require('express'),
    router = express.Router();

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

module.exports = router;
