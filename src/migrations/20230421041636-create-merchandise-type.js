"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MerchandiseTypes", {
      id_merchandiseType: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      merchandiseTypeName: { allowNull: false, type: Sequelize.STRING },
      price: { allowNull: false, type: Sequelize.DOUBLE },
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
    await queryInterface.dropTable("MerchandiseTypes");
  },
};
