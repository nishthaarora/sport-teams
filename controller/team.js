var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

// router.get('/allteams', function(req, res) {
// 	models.Team.findAll({
// 		attributes: ['id', 'Team_name'],
// 		include: [models.Event]
// 	}).then(function(allTeams) {
// 		res.send(JSON.stringify(allTeams))
// 	});
// })


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
					TeamId:teamId
				}).then(function(player) {
					})
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