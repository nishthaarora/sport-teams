'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      uniformNum: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
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
    });
  },
  down: function(queryInterface, Sequelize) {
     queryInterface.sequelize.query(
      'SET FOREIGN_KEY_CHECKS = 0;', {raw: true}
    ).then(function(results){
      queryInterface.sequelize.query(
        'DROP TABLE IF EXISTS playerTeam'
      )
    })
    .then(function(){
      return queryInterface.dropTable('Players');
    })
  }
};