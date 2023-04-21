"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // p
      Employees.belongsTo(models.EmployeeType, {
        foreignKey: "id_employeeType",
      });
      Employees.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
    }
  }
  Employees.init(
    {
      id_employee: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      address: DataTypes.STRING,
      cardIndentify: DataTypes.STRING,
      birthday: DataTypes.DATE,
      sex: DataTypes.BOOLEAN,
      id_warehouse: DataTypes.STRING,
      id_employeeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employees",
      primaryKey: "id_employee",
    }
  );

  return Employees;
};
