'use strict';

module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    Team_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Team.belongsToMany(models.Event, {through:'eventTeam', onDelete: "CASCADE"
        });

      }
    }
  });
  return Team;
};