'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaCluster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        CinemaCluster.belongsTo(models.CinemaChain, {
            foreignKey: 'chain_id',
        });
        CinemaCluster.hasMany(models.Cinema, {
            foreignKey: 'cluster_id',
            onDelete: 'CASCADE',
        });
    }
  }
  CinemaCluster.init({
    cluster_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    cluster_name: DataTypes.STRING,
    address: DataTypes.STRING,
    chain_id: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CinemaCluster',
  });
  return CinemaCluster;
};