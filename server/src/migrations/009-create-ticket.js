// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      showtime_id: {
        type: Sequelize.INTEGER,
        unique:true,
        references: {
          model: 'Showtimes',
          key: 'showtime_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
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
      seat_id: {
        type: Sequelize.INTEGER,
        unique:true,
        references: {
          model: 'Seats',
          key: 'seat_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
     purchase_time:{
        type:Sequelize.DATE,
        allowNull:false
     },
     ticket_status:{
        type: Sequelize.ENUM('Booked', 'Used', 'Canceled'),
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
    await queryInterface.dropTable('Tickets');
  }
};
