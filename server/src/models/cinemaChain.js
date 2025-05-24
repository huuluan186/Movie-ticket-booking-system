'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaChain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Định nghĩa quan hệ 1-nhiều với CinemaCluster
        CinemaChain.hasMany(models.CinemaCluster, {
            foreignKey: 'chain_id',
            onDelete: 'CASCADE',
            as: 'cinema_chain'
        });
    }
  }
  CinemaChain.init({
    chain_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    chain_name: DataTypes.STRING,
    logo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CinemaChain',
  });
  return CinemaChain;
};