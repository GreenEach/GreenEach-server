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
        foreignKey:"userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
      Content.hasMany(models.Comment)
    }
  }
  Content.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId:{
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};