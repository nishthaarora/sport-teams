'use strict';
module.exports = function(sequelize, DataTypes) {
  var teamMembers = sequelize.define('teamMembers', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    uniformNum: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
           teamMembers.hasOne(models.Team);
      }
    }
  });
  return teamMembers;
};