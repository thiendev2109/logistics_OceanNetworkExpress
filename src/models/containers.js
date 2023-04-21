"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Containers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Containers.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
    }
  }
  Containers.init(
    {
      id_container: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      containerPosition: DataTypes.STRING,
      size: DataTypes.STRING,
      id_warehouse: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Containers",
      primaryKey: "id_container",
    }
  );
  return Containers;
};
