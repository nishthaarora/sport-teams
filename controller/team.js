var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var formatDateInArray = require('./util').formatDateInArray;
// function for creating dropdown for the teams menu for team related events
router.get('/api/allteams', function(req, res) {
		models.Team.findAll({
			attributes: ['id', 'Team_name'],
			include: [models.Event]
		}).then(function(allTeams) {
			allTeams = formatDateInArray(allTeams)
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
			allTeams = formatDateInArray(allTeams)
			return res.json(allTeams)
		});
	})

// getPlayers()
router.get('/api/players/:team', function(req, res){
	var team = req.params.team;
	return models.Player.findAll({
		where: {
			team: team
		}
	}).then(function(players){
		players = formatDateInArray(players)
		return res.json(players)
	})
})


	// adding team players
router.post('/api/addplayers', function(req, res) {
			var newPlayer = req.body;
			return models.Player.findAll({
				where: {
					fname: newPlayer.fname.toLowerCase(),
					lname: newPlayer.lname.toLowerCase(),
					team: newPlayer.team,
					uniformNum: newPlayer.uniformNum
				}
			}).then(function(users) {
				if (users.length > 0) {
					res.send({
						success: false
					})
				} else {
					findAllTeams(newPlayer)
						.then(function(data) {
							return new Promise(function(resolve) {
								data.forEach(function(ele) {
									resolve(ele.id)
								})
							})
						}).then(function(teamId) {
								return models.Player.create({
									fname: newPlayer.fname.toLowerCase(),
									lname: newPlayer.lname.toLowerCase(),
									team: newPlayer.team,
									uniformNum: newPlayer.uniformNum,
									TeamId: teamId
								})
							}).then(function(player) {
								console.log(player)
								res.send({
									success: true
								})
							})
						}
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