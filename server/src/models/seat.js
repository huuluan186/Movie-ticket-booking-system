'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Seat.belongsTo(models.Cinema, { foreignKey: 'cinema_id', as: 'cinema' });
        Seat.hasMany(models.Ticket, { foreignKey: 'seat_id', as: 'ticket' });
    }
  }
  Seat.init({
    seat_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    cinema_id: DataTypes.STRING,
    seat_row: DataTypes.STRING,
    seat_column: DataTypes.STRING,
    seat_type: DataTypes.ENUM(['VIP', 'Normal']),
    is_booked: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};