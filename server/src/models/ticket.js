'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Ticket.init({
    showtime_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    seat_id: DataTypes.INTEGER,
    purchase_time: DataTypes.DATETIME,
    ticket_status: DataTypes.ENUM(['Booked', 'Used', 'Canceled']),
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};