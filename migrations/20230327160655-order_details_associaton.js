'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_details', {
      fields: ['id_product'],
      type: 'foreign Key',
      name: 'order_details_product_association',
      references: {
        table: 'products',
        field: 'id_product'
      }
    })
    await queryInterface.addConstraint('order_details', {
      fields: ['id_pay_method'],
      type: 'foreign Key',
      name: 'order_details_pay_association',
      references: {
        table: 'payment_methods',
        field: 'id_pay_method'
      }
    });
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
