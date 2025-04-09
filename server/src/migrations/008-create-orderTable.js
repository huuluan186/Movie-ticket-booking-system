// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderTables', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
      order_date:{
        type: Sequelize.DATE,
        allowNull: false
      }, 
      total_amount:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      payment_status:{
        type: Sequelize.ENUM('Pending', 'Completed', 'Canceled'),
        allowNull: false
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
    await queryInterface.dropTable('OrderTables');
  }
};
