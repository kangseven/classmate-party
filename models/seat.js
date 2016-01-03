module.exports = function (sequelize, DataTypes) {
  var Seat = sequelize.define('Seat', {
      column: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function (models) {
          Seat.belongsTo(models.User);
        }
      }
    }
  );

  return Seat;
}
