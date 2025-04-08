// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'OrderTables',
          key: 'order_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
     payment_method:{
        type: Sequelize.ENUM('Credit Card', 'Debit Card', 'PayPal', 'Cash'),
        allowNull: false
     },  
     transaction_id:{
        type: Sequelize.STRING,
        unique:true,
        allowNull: false
     },
     purchase_time:{
        type:Sequelize.DATE,
        allowNull:false
     },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
  }
};
