'use strict';
var Team = require('../models')['Event'];

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
    queryInterface.addColumn(
      'Events',
      'game',
    {
      type: Sequelize.STRING,
      after: 'end_time'
    }),

    queryInterface.addColumn(
      'Events',
      'comment',
      {
      type: Sequelize.TEXT,
      after: 'location'
    })
    ]
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
       return [
         queryInterface.removeColumn('Events', 'game'),
         queryInterface.removeColumn('Events', 'comment')
        ]
    }
};
