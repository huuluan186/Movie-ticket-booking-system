'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Định nghĩa quan hệ 1-nhiều với Showtime
        Movie.hasMany(models.Showtime, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE' // Tự động xóa các Showtime liên quan khi xóa Movie
        });
    }
  }
  Movie.init({
    movie_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    country: DataTypes.STRING,
    genre: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    age_limit: DataTypes.STRING,
    director: DataTypes.STRING,
    cast: DataTypes.TEXT,
    description: DataTypes.TEXT('long'),
    linkTrailer: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    poster: DataTypes.STRING,
    status: DataTypes.ENUM(['Coming Soon', 'Now Showing']),
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};