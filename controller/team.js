var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
// function for creating dropdown for the teams menu for team related events
router.get('/api/allteams', function(req, res) {
		models.Team.findAll({
			attributes: ['id', 'Team_name'],
			include: [models.Event]
		}).then(function(allTeams) {
			return res.json(allTeams)
		});
	})
	// team specific events
router.get('/api/:team', function(req, res) {
		var team = req.params.team;
		models.Team.findAll({
			where: {
				Team_name: team
			},
			include: [models.Event]
		}).then(function(allTeams) {
			return res.json(allTeams)
		});
	})
	// adding team players
router.post('/api/addplayers', function(req, res) {
	var newPlayer = req.body;
	findAllTeams(newPlayer)
		.then(function(data) {
			return new Promise(function(resolve) {
				data.forEach(function(ele) {
					resolve(ele.id)
				})
			})
		}).then(function(teamId) {
			return models.Player.create({
				fname: newPlayer.fname,
				lname: newPlayer.lname,
				team: newPlayer.team,
				uniformNum: newPlayer.uniformNum,
				TeamId: teamId
			}).then(function(player) {})
		})
})

function findAllTeams(newPlayer) {
	return models.Team.findAll({
		where: {
			Team_name: newPlayer.team
		},
		attributes: ['id']
	})
}
module.exports = router;