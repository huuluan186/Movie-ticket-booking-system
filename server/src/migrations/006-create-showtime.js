// migrations/xxxxxx-create-showtime.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Showtimes', {
      showtime_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      showtime_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      showtime_starttime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      showtime_endtime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies',
          key: 'movie_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
      },
      cinema_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cinemas',
          key: 'cinema_id'
        },
        onDelete: 'CASCADE',
        allowNull: true
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
    await queryInterface.dropTable('Showtimes');
  }
};
