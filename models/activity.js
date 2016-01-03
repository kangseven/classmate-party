module.exports = function (sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      location: DataTypes.STRING,
      fee: DataTypes.FLOAT,
      description: DataTypes.TEXT
    },
    {
      classMethods: {
        associate: function (models) {
          Activity.belongsToMany(models.User, {
            through: 'ActivityJoined'
          });
        }
      }
    }
  );

  return Activity;
};
