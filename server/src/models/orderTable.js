import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class OrderTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        OrderTable.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete:"CASCADE"
        });
        OrderTable.hasMany(models.Ticket, {
            foreignKey: 'order_id',
            as: 'tickets',
            onDelete: 'CASCADE'
        });
    }
  }
  OrderTable.init({
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_id: DataTypes.STRING,
    order_date: DataTypes.DATE,
    total_amount: DataTypes.DECIMAL,
    payment_status: DataTypes.ENUM(['Pending', 'Completed', 'Canceled']),
  }, {
    sequelize,
    modelName: 'OrderTable',
  });
  return OrderTable;
};