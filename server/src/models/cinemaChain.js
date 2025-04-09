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

    }
  }
  CinemaChain.init({
    chain_name: DataTypes.STRING,
    logo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CinemaChain',
  });
  return CinemaChain;
};