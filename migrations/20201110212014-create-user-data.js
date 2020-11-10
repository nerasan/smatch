'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      switchCode: {
        type: Sequelize.STRING
      },
      top1char: {
        type: Sequelize.STRING
      },
      top2char: {
        type: Sequelize.STRING
      },
      top3char: {
        type: Sequelize.STRING
      },
      top1winrate: {
        type: Sequelize.INTEGER
      },
      top1loserate: {
        type: Sequelize.INTEGER
      },
      top2winrate: {
        type: Sequelize.INTEGER
      },
      top2loserate: {
        type: Sequelize.INTEGER
      },
      top3winrate: {
        type: Sequelize.INTEGER
      },
      top3loserate: {
        type: Sequelize.INTEGER
      },
      totalW: {
        type: Sequelize.INTEGER
      },
      totalL: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userData');
  }
};