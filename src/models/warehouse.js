"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Warehouse.hasMany(models.Admin, { foreignKey: "id_warehouse" });
      Warehouse.hasMany(models.Employees, { foreignKey: "id_warehouse" });
      Warehouse.hasMany(models.Containers, { foreignKey: "id_warehouse" });
      Warehouse.hasMany(models.Vehicals, { foreignKey: "id_warehouse" });
    }
  }
  Warehouse.init(
    {
      id_warehouse: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      warehouseName: DataTypes.STRING,
      location: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      country: DataTypes.STRING,
      address: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Warehouse",
      timestamps: false,
      primaryKey: "id_warehouse",
    }
  );

  return Warehouse;
};
