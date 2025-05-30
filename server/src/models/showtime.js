'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Định nghĩa quan hệ thuộc về Movie
      Showtime.belongsTo(models.Movie, {
        foreignKey: 'movie_id',
        as: 'movie' // Tùy chọn alias nếu cần
      });

      Showtime.belongsTo(models.Cinema, {
        foreignKey: 'cinema_id',
        as: 'cinema' 
      });

      Showtime.hasMany(models.Ticket, { foreignKey: 'showtime_id', as: 'tickets' });
      
    }
  }
  Showtime.init({
    showtime_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    showtime_date: DataTypes.DATEONLY,
    showtime_starttime: DataTypes.TIME,
    showtime_endtime: DataTypes.TIME,
    price: DataTypes.DECIMAL,
    movie_id: DataTypes.STRING,
    cinema_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Showtime',
  });
  return Showtime;
};