'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasMany(models.OrderTable, {
            foreignKey: 'user_id',
            as: 'orders',
            onDelete: 'CASCADE',  
        });
    }
  }
  User.init({
    user_id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_role:DataTypes.ENUM(['admin','user']),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};