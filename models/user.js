module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function (models) {
          User.belongsToMany(models.Activity, {
            through: 'ActivityJoined'
          });
        }
      }
  });

  return User;
};
