// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      ticket_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      showtime_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Showtimes',
          key: 'showtime_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
      order_id: {
        type: Sequelize.STRING,
        references: {
          model: 'OrderTables',
          key: 'order_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
      seat_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Seats',
          key: 'seat_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
     ticket_status:{
        type: Sequelize.ENUM('Booked', 'Used', 'Canceled'),
        allowNull: false,
        defaultValue: 'Booked'
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
        unique_ticket: {
          fields: ['showtime_id', 'seat_id']
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  }
};
