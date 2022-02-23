"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  space.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      backgroundColor: { type: DataTypes.STRING, allowNull: true },
      color: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "space",
    }
  );
  return space;
};
