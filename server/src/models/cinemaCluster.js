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

    }
  }
  CinemaCluster.init({
    cluster_name: DataTypes.STRING,
    address: DataTypes.STRING,
    chain_id: DataTypes.INTEGER,
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CinemaCluster',
  });
  return CinemaCluster;
};