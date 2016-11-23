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
        Team_name: "Red"
      }, {
        Team_name: "Blue"
      }, {
        Team_name: "Yellow"
      }, {
        Team_name: "Pink"
      }, {
        Team_name: "Purple"
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
      "Red",
      "Blue",
      "Yellow",
      "Pink",
      "Purple"
      ]
    }
  })
}
}