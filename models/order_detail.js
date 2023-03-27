'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order_detail.belongsTo(models.products, {foreignKey: 'id_products'});
      order_detail.hasMany( models.payment_method, {foreignKey: 'id_pay_method'});
      models.products.hasMany(order_detail, {foreignKey: 'id_products'});
      models.payment_method.hasMany(order_detail, {foreignKey: 'id_pay_method'});
    }
  }
  order_detail.init({
    id_order_detail: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_product: DataTypes.INTEGER,
    id_pay_method: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price_sell: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};