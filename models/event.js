'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    game: DataTypes.STRING,
    type: DataTypes.STRING,
    score1: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    location: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Event.belongsToMany(models.Team, {through: 'eventTeam', onDelete: "CASCADE"});
        // Event.hasMany(models.Team);
      }
    }
  });
  return Event;
};