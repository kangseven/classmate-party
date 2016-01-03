module.exports = function (sequelize, DataTypes) {
  var joined = sequelize.define('ActivityJoined', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return joined;
};
