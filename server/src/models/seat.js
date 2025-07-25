import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Seat.belongsTo(models.Cinema, { foreignKey: 'cinema_id',onDelete: 'CASCADE', as: 'cinema' });
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
    row: DataTypes.INTEGER,
    column: DataTypes.INTEGER,
    type: DataTypes.ENUM(['VIP', 'Normal']),
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};