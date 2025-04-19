// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Seats', {
      seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cinema_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'Cinemas',
          key: 'cinema_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
        seat_row: {
            type: Sequelize.STRING(1),
            allowNull: false,
            unique:true
        },
        seat_column: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique:true
        },
        seat_type:{
            type: Sequelize.ENUM('VIP', 'Normal'),
            allowNull: false
        },
        is_booked:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
    await queryInterface.dropTable('Seats');
  }
};
