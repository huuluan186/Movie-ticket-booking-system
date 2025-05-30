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
        Ticket.belongsTo(models.Showtime, { foreignKey: 'showtime_id', as: 'showtime' });

        Ticket.belongsTo(models.Seat, { foreignKey: 'seat_id', as: 'seat' });

        //Ticket.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    }
  }
  Ticket.init({
    ticket_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    showtime_id: DataTypes.STRING,
    order_id: DataTypes.STRING,
    seat_id: DataTypes.STRING,
    purchase_time: DataTypes.DATE,
    ticket_status: DataTypes.ENUM(['Booked', 'Used', 'Canceled']),
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};