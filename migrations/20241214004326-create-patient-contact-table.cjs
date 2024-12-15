'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient_contacts', {
      patient_id: {
        type: Sequelize.STRING,
        references: {
          model: 'patients',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      contact_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'contacts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      is_emergency_contact: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patient_contacts');
  },
};
