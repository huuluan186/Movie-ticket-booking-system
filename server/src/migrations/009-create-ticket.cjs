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
            onDelete: 'SET NULL',
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
            onDelete: 'SET NULL',
            allowNull: true
        },
        ticket_status:{
            type: Sequelize.ENUM('Booked', 'Used', 'Canceled'),
            allowNull: false,
            defaultValue: 'Booked'
        },
     
       // Snapshot fields:
        movie_id_snapshot:{
            type: Sequelize.STRING
        },
        movie_title_snapshot: {
            type: Sequelize.STRING
        },
        chain_id_snapshot:{
            type: Sequelize.STRING
        },
        chain_name_snapshot: {
            type: Sequelize.STRING
        },
        cluster_id_snapshot:{
            type: Sequelize.STRING
        },
        cluster_name_snapshot: {
            type: Sequelize.STRING
        },
        address_snapshot: {
            type: Sequelize.STRING
        },
        cinema_name_snapshot: {
            type: Sequelize.STRING
        },
        row_snapshot: {
            type: Sequelize.INTEGER
        },
        column_snapshot: {
            type: Sequelize.INTEGER
        },
        showtime_date_snapshot: {
            type: Sequelize.DATEONLY
        },
        showtime_starttime_snapshot: {
            type: Sequelize.TIME
        },
        showtime_endtime_snapshot: {
            type: Sequelize.TIME
        },
        price_snapshot: {
            type: Sequelize.DECIMAL(10, 2)
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
