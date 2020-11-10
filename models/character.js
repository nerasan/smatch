'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.character.hasMany(models.match)
    }
  };
  character.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    series: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};