"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicals.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
    }
  }
  Vehicals.init(
    {
      id_vehical: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      licensePlate: DataTypes.STRING,
      vehicalLocation: DataTypes.STRING,
      id_warehouse: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicals",
      primaryKey: "id_vehical",
    }
  );
  return Vehicals;
};
