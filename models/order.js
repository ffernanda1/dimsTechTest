'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.belongsTo(models.costumers, {foreignKey: 'id_costumer'});
      order.hasMany(models.order_detail, {foreignKey: 'id_order_detail'});
      models.costumers.hasMany(order, {foreignKey: 'id_costumer'});
      models.order_detail.hasOne(order, {foreignKey: 'id_order_detail'});
    }
  }
  order.init({
    id_order: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_order_detail: DataTypes.INTEGER,
    id_costumer: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};