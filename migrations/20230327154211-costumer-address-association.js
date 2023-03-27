'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('costumers', {
      fields: ['id_cos_dress'],
      type: 'foreign Key',
      name: 'costumer_address_association',
      references: {
        table: 'costumer_addresses',
        field: 'id_cos_dress'
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
