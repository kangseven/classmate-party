var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// 认证策略配置
passport.use('local', new LocalStrategy({
    usernameField: 'mobile'
  }, function (mobile, password, done) {
  models.User.findOne({
    where: {
      mobile: mobile
    }
  }).then(function (user) {
    if(user == null || password !== user.password){
      return done(null, false, { message: '手机号或密码错误！' });
    }
    return done(null, user);
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
