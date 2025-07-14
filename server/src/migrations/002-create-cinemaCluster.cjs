// migrations/xxxxxx-create-cinema-cluster.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CinemaClusters', {
      cluster_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      cluster_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chain_id: {
        type: Sequelize.STRING,
        references: {
          model: 'CinemaChains',
          key: 'chain_id'
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
    await queryInterface.dropTable('CinemaClusters');
  }
};
