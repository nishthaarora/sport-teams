'use strict';

module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    Team_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

         // Team.hasOne(models.Event);
        Team.belongsToMany(models.Event, {through:'eventTeam', onDelete: "CASCADE"
          // foreignKey: {
          //   allowNull: false
          // }
        });
        // Team.hasMany(models.Event, {onDelete: "SET NULL", onUpdate: "CASCADE"});
      }
    }
  });
  return Team;
};