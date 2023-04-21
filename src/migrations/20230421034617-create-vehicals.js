"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vehicals", {
      id_vehical: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      licensePlate: { allowNull: false, type: Sequelize.STRING },
      vehicalLocation: { allowNull: false, type: Sequelize.STRING },
      id_warehouse: { allowNull: false, type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Vehicals");
  },
};
