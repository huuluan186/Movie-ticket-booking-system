import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CinemaCluster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        CinemaCluster.belongsTo(models.CinemaChain, {
            foreignKey: 'chain_id',
            as: 'cinema_chain'
        });
        CinemaCluster.hasMany(models.Cinema, {
            foreignKey: 'cluster_id',
            onDelete: 'CASCADE',
            as: 'cinema_cluster',
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
    //city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CinemaCluster',
  });
  return CinemaCluster;
};