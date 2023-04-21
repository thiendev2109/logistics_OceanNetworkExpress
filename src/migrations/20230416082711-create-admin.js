"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Admins", {
      id_admin: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
      },
      adminName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      adminSystem: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // true is admin system, false is admin branch
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_warehouse: {
        type: Sequelize.STRING,
        allowNull: true,
      },
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
    await queryInterface.dropTable("Admins");
  },
};
