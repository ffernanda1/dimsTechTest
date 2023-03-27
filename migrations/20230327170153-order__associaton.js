'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('orders', {
      fields: ['id_order_detail'],
      type: 'foreign Key',
      name: 'order_details_association',
      references: {
        table: 'order_details',
        field: 'id_order_detail'
      }
    });

    await queryInterface.addConstraint('orders', {
      fields: ['id_costumer'],
      type: 'foreign Key',
      name: 'order_costumer_association',
      references: {
        table: 'costumers',
        field: 'id_costumer'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
