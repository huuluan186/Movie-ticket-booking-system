'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  OrderTable.init({
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    total_amount: DataTypes.DECIMAL,
    payment_status: DataTypes.ENUM(['Pending', 'Completed', 'Canceled']),
  }, {
    sequelize,
    modelName: 'OrderTable',
  });
  return OrderTable;
};