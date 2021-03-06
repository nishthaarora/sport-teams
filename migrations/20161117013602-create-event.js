'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      type: {
        type: Sequelize.STRING
      },
      score1: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function(queryInterface, Sequelize) {

     queryInterface.sequelize.query(
      'SET FOREIGN_KEY_CHECKS = 0;', {raw: true}
    ).then(function(results){
      queryInterface.sequelize.query(
        'DROP TABLE IF EXISTS eventTeam'
      )
    })
    .then(function(){
      return queryInterface.dropTable('Events');
    })
  }
}