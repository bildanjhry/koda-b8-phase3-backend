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
        foreignKey: 'id_user',
        as: 'user',
      });
    }
  }
  Links.init({
    id_user: DataTypes.INTEGER,
    url: DataTypes.STRING,
    shorted: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Links',
  });
  return Links;
};