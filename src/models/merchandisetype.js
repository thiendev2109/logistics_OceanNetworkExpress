"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MerchandiseType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MerchandiseType.hasMany(models.Booking, {
        foreignKey: "id_merchandiseType",
      });
    }
  }
  MerchandiseType.init(
    {
      id_merchandiseType: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      merchandiseTypeName: DataTypes.STRING,
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "MerchandiseType",
      primaryKey: "id_merchandiseType",
    }
  );
  return MerchandiseType;
};
