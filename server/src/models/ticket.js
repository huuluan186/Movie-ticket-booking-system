import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Ticket.belongsTo(models.Showtime, { foreignKey: 'showtime_id', onDelete: 'SET NULL', as: 'showtime' });
        Ticket.belongsTo(models.Seat, { foreignKey: 'seat_id', onDelete: 'SET NULL', as: 'seat' });
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

    // snapshot fields
    movie_id_snapshot: DataTypes.STRING,    
    movie_title_snapshot: DataTypes.STRING,
    chain_id_snapshot: DataTypes.STRING,
    chain_name_snapshot: DataTypes.STRING,
    cluster_id_snapshot: DataTypes.STRING,
    cluster_name_snapshot: DataTypes.STRING,
    address_snapshot: DataTypes.STRING,
    cinema_name_snapshot: DataTypes.STRING,
    row_snapshot: DataTypes.INTEGER,
    column_snapshot: DataTypes.INTEGER,
    showtime_date_snapshot: DataTypes.DATEONLY,
    showtime_starttime_snapshot: DataTypes.TIME,
    showtime_endtime_snapshot: DataTypes.TIME,
    price_snapshot: DataTypes.DECIMAL(10, 2),

  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};