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
            as: 'cinema_cluster',
            onDelete: 'CASCADE'
        });

        Cinema.hasMany(models.Showtime, {
            foreignKey: 'cinema_id',
            onDelete: 'CASCADE', 
            as:'cinema',
        });

        Cinema.hasMany(models.Seat, {
            foreignKey: 'cinema_id',
            as: 'seats',
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
    rowCount: DataTypes.INTEGER,
    columnCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cinema',
  });
  return Cinema;
};