"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      story.belongsTo(models.space, { foreignKey: "spaceId" });
      story.belongsToMany(models.user, {
        through: "likes",
        foreignKey: "idstory",
        as: "storyLikes",
      });
      story.hasMany(models.comment, { foreignKey: "storyId" });
    }
  }
  story.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "story",
    }
  );
  return story;
};
