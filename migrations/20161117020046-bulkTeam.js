'use strict';

var Team = require('../models')['Team'];

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Team.bulkCreate([{
        Team_name: "red"
      }, {
        Team_name: "blue"
      }, {
        Team_name: "yellow"
      }, {
        Team_name: "pink"
      }, {
        Team_name: "purple"
      }]

    )
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

     return Team.destroy({
      where: {
        Team_name: [
      "red",
      "blue",
      "yellow",
      "pink",
      "purple"
      ]
    }
  })
}
}