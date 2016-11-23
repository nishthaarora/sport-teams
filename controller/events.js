var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Sequelize = require('sequelize');

// to see all the existing events
router.get('/api/all', function(req, res) {
	models.Team.findAll({
		include: [models.Event],
	}).then(function(allEvents) {
			res.setHeader('Content-Type', 'application/json');
			return res.json(allEvents);
				})
		})


// to see the events respective to the team you belong to
// router.get('/api/:team', function(req, res) {
// 	var team = req.params.team;
// 	// console.log('team', team)
// 	models.Team.findAll({
// 		where: {Team_name: team},
// 		include: [models.Event],
// 	}).then(function(allEvents) {
// 		res.setHeader('Content-Type', 'application/json');
// 		return res.json(allEvents)
// 	})
// })


// get events from current date and specified game
router.get('/api/:game', function(req, res) {
	var game = req.params.game;
	console.log('game', game)
	models.Event.findAll({
		where: {
			game: game,
			date: {
			$eq: Sequelize.fn('CURDATE')
			// $eq: '2016-11-21'
			}
		},
		include: [models.Team]
	}).then(function(allEvents) {
		console.log(allEvents);
		res.setHeader('Content-Type', 'application/json');
		return res.json(allEvents)
	})
})



/* Taking user inputs from the input route and creating sql database for events
	 using blueBird promises getting the param @data from function getTeamId(), looping through response
		and creating the events further finding the event respective to the the team
	*/
router.post('/api/input', function(req, res) {
	var newEvent = req.body;

	getTeamId(newEvent)
		.then(function(data) {
			return new Promise(function(resolve) {
				data.forEach(function(ele) {
					resolve(ele.id);
				})
			})
		}).then(function(teamId) {
			return models.Event.create({
				date: newEvent.date,
				start_time: newEvent.start_time,
				end_time: newEvent.end_time,
				game: newEvent.game,
				type: newEvent.type,
				score1: newEvent.score1,
				score: newEvent.score,
				location: newEvent.location,
				comment: newEvent.comment
			}).then(function(currentEvent) {
				var selectedTeams = newEvent.team;
				selectedTeams.forEach(function(ele) {
					return models.Team.findOne({
						where: {
							team_name: ele
						}
					}).then(function(team) {
						return team.addEvent(currentEvent);
						res.redirect('/events/api/input');
					})
				})
			})
		})
		res.send('success');
})

function getTeamId(event) {
	return models.Team.findAll({
		attributes: ['id'],
		where: {
			team_name: event.team
		}
	})
}



module.exports = router