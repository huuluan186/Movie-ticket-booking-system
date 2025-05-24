'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Cinema.belongsTo(models.CinemaCluster, {
            foreignKey: 'cluster_id',
            as: 'cinema_cluster'
        });

        Cinema.hasMany(models.Showtime, {
            foreignKey: 'cinema_id',
            onDelete: 'CASCADE', 
            as:'cinema'
        });
    }
  }
  Cinema.init({
    cinema_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    cinema_name: DataTypes.STRING,
    cluster_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cinema',
  });
  return Cinema;
};