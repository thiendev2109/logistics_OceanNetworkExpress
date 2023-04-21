"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id_booking: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      id_warehouse: { allowNull: false, type: Sequelize.STRING },
      id_customer: { allowNull: false, type: Sequelize.STRING },
      id_service: { allowNull: false, type: Sequelize.STRING },
      id_merchandiseType: { allowNull: false, type: Sequelize.STRING },
      origin: { allowNull: false, type: Sequelize.STRING },
      destination: { allowNull: false, type: Sequelize.STRING },
      requestDepartureDate: { allowNull: false, type: Sequelize.DATE },
      requestArrivelDate: { allowNull: false, type: Sequelize.DATE },
      status: { allowNull: false, type: Sequelize.INTEGER },
      bookingNote: { allowNull: true, type: Sequelize.STRING },
      volumn1PCS: { allowNull: false, type: Sequelize.STRING },
      totalWeight: { allowNull: false, type: Sequelize.FLOAT },
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
    await queryInterface.dropTable("Bookings");
  },
};
