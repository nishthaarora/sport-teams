'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    type: DataTypes.STRING,
    score1: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Event.belongsToMany(models.Team, {through: 'eventTeam'});

      }
    }
  });
  return Event;
};