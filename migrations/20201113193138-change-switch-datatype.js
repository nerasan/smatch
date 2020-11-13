'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.changeColumn('users', 'switchCode', {
      type: Sequelize.STRING,
      allowNull: true,
      isNumeric: true,
      max: 12
    })

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.changeColumn('users', 'switchCode', {
      type: Sequelize.INTEGER,
      isNumeric: true,
      max: 12
    })
  }
}
};
