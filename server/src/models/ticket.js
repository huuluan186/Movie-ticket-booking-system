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
        Ticket.belongsTo(models.Showtime, { foreignKey: 'showtime_id', onDelete: 'CASCADE', as: 'showtime' });
        Ticket.belongsTo(models.Seat, { foreignKey: 'seat_id', onDelete: 'CASCADE', as: 'seat' });
        Ticket.belongsTo(models.OrderTable, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'order' });
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
    ticket_status: DataTypes.ENUM(['Booked', 'Used', 'Canceled']),
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};