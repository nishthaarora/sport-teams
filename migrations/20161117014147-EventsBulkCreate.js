'use strict';
var Event = require('../models')['Event'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
       return Event.bulkCreate([{
        date: '2016/11/01',
        start_time: '16:50:00',
        end_time: '20:20:00',
        type: "practice",
        score1: 0,
        score: 0,
        location: "william cannon"
      }, {
        date: '2016/11/16',
        start_time: '04:10:00',
        end_time: '05:20:00',
        type: "game",
        score1: 20,
        score: 16,
        location: "pflugerville"
      }, {
         date: '2016/11/20',
        start_time: '1:50:00',
        end_time: '20:20:00',
        type: "game",
        score1: 100,
        score: 98,
        location: "Rainy Street"
      }]

    )

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Event.destroy({
      where:
       [
       {
        date: '2016/11/01',
        start_time: '16:50:00',
        end_time: '20:20:00',
        type: "practice",
        score1: 0,
        score: 0,
        location: "william cannon"
      }, {
         date: '2016/11/16',
        start_time: '04:10:00',
        end_time: '05:20:00',
        type: "game",
        score1: 20,
        score: 16,
        location: "pflugerville"
      }, {
         date: '2016/11/20',
        start_time: '1:50:00',
        end_time: '20:20:00',
        type: "game",
        score1: 100,
        score: 98,
        location: "Rainy Street"
      }
      ]

  })
}
}
