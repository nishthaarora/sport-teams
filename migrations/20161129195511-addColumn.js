'use strict';

var Players = require('../models')['Player'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
     return [
    queryInterface.addColumn(
      'Players',
      'fbID',
    {
      type: Sequelize.BIGINT,

    }), queryInterface.addColumn(
      'Players',
      'URL',
    {
      type: Sequelize.STRING(1234),

    })
    ]
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return[
    queryInterface.removeColumn('Players','fbID'),
    queryInterface.removeColumn('Players','URL')
    ]
  }
};
