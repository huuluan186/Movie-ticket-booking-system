'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Payment.init({
    order_id: DataTypes.INTEGER,
    payment_method: DataTypes.ENUM(['Credit Card', 'Debit Card','PayPal', 'Cash']),
    transaction_id: DataTypes.STRING,
    payment_time: DataTypes.DATETIME,
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};