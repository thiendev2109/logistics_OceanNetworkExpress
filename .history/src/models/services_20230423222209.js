"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Services.hasMany(models.Booking, { foreignKey: "id_service" });
    }
  }
  Services.init(
    {
      id_service: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      serviceName: DataTypes.STRING,
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Services",
      primaryKey: "id_service",
    }
  );
  return Services;
};
