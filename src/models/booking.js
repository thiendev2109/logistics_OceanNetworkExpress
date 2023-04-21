"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // prettier-ignore
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Customer, { foreignKey: "id_customer" });
      Booking.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
      Booking.belongsTo(models.Services, { foreignKey: "id_service" });
      Booking.belongsTo(models.MerchandiseType, {foreignKey: "id_merchandiseType"});
    }
  }
  Booking.init(
    {
      id_booking: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      id_warehouse: DataTypes.STRING,
      id_customer: DataTypes.STRING,
      id_service: DataTypes.STRING,
      id_merchandiseType: DataTypes.STRING,
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      requestDepartureDate: DataTypes.DATE,
      requestArrivelDate: DataTypes.DATE,
      status: DataTypes.INTEGER,
      bookingNote: DataTypes.STRING,
      volumn1PCS: DataTypes.STRING,
      totalWeight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Booking",
      primaryKey: "id_booking",
    }
  );
  return Booking;
};
