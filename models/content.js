'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.belongsTo(models.User, {
        foreignKey:"user_id"
      })
      Content.hasMany(models.Comment)
    }
  }
  Content.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    level: DataTypes.STRING,
    season: DataTypes.STRING,
    category: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};