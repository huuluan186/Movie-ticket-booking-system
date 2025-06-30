// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Seats', {
      seat_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      cinema_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Cinemas',
          key: 'cinema_id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
        row: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        column: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        type:{
            type: Sequelize.ENUM('VIP', 'Normal'),
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
    },
    {
        uniqueKeys: {
            unique_seat: {
            fields: ['cinema_id', 'row', 'column']
            }
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Seats');
  }
};
