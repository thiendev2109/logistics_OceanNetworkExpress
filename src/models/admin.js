"use strict";
import bcrypt from "bcrypt";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
    }
  }
  Admin.init(
    {
      id_admin: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      adminName: DataTypes.STRING,
      adminSystem: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      id_warehouse: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  return Admin;
};
