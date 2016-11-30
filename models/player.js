'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    team: DataTypes.STRING,
    uniformNum: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fbID: DataTypes.BIGINT,
    URL: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Player.belongsTo(models.Team)
      }
    }
  });
  return Player;
};