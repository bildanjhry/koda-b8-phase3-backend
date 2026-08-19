'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Links.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  Links.init({
    user_id: DataTypes.INTEGER,
    original_url: DataTypes.STRING,
    slug: DataTypes.STRING,
    shorted_url:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Links',
  });
  return Links;
};