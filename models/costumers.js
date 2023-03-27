'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class costumers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      costumers.belongsTo(models.costumer_address, {foreignKey: 'id_cos_dress'});
      models.costumer_address.hasOne(costumers, {foreignKey: 'id_cos_dress'});
        
    }
  }
  costumers.init({
    id_costumer: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_cos_dress: DataTypes.INTEGER,
    costumer_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'costumers',
  });
  return costumers;
};