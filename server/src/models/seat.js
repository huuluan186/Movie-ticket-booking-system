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

    }
  }
  Seat.init({
    cinema_id: DataTypes.INTEGER,
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