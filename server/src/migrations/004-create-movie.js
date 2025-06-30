// migrations/xxxxxx-create-movie.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      movie_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      age_limit:{
        type: Sequelize.STRING,
        allowNull: true
      },
      director: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cast: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      linkTrailer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      poster: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'Coming Soon',
          'Now Showing',
        ), // Đưa mảng giá trị vào thẳng type
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};
