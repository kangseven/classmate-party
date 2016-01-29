module.exports = function (sequelize, DataTypes) {
  var Joined = sequelize.define('ActivityJoined', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Joined.belongsTo(models.User);
        }
      }
    }
  );

  return Joined;
};
