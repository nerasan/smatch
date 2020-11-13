'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.userData.belongsTo(models.user)
    }
  };
  userData.init({
    switchCode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    top1char: DataTypes.STRING,
    top2char: DataTypes.STRING,
    top3char: DataTypes.STRING,
    top1winrate: DataTypes.INTEGER,
    top1loserate: DataTypes.INTEGER,
    top2winrate: DataTypes.INTEGER,
    top2loserate: DataTypes.INTEGER,
    top3winrate: DataTypes.INTEGER,
    top3loserate: DataTypes.INTEGER,
    totalW: DataTypes.INTEGER,
    totalL: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userData',
  });
  return userData;
};