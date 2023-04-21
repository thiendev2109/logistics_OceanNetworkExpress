"use strict";
import bcrypt from "bcrypt";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      id_customer: {
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
      password: {
        type: DataTypes.STRING,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      company: DataTypes.STRING,
      birthday: DataTypes.DATE,
      sex: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Customer",
      primaryKey: "id_customer",
    }
  );

  return Customer;
};
