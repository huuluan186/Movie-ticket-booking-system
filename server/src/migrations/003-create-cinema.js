// migrations/xxxxxx-create-cinema.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cinemas', {
      cinema_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cinema_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cluster_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CinemaClusters',
          key: 'cluster_id'
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
    await queryInterface.dropTable('Cinemas');
  }
};
