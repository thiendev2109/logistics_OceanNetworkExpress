"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeType.hasMany(models.Employees, { foreignKey: "id_employeeType" });
    }
  }
  EmployeeType.init(
    {
      id_employeeType: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      employeeTypeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmployeeType",
      primaryKey: "id_employeeType",
    }
  );

  return EmployeeType;
};
