var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var formatDateInArray = require('./util').formatDateInArray;

// to see all the existing greater than today's date events
router.get('/api/all', function(req, res) {
	models.Event.findAll({
		include: [models.Team]
	}).then(function(allEvents) {
		allEvents = formatDateInArray(allEvents);
		res.setHeader('Content-Type', 'application/json');
		return res.json(allEvents);
	});
})

// get events from current date and specified game
router.get('/api/:game', function(req, res) {
	var game = req.params.game;
	models.Event.findAll({
		where: {
			game: game
		},
		include: [models.Team]
	}).then(function(allEvents) {
		allEvents = formatDateInArray(allEvents);
		res.setHeader('Content-Type', 'application/json');
		return res.json(allEvents)
	})
})


// update data in sequelize
router.post('/api/update/:id', function(req, res) {
	var updateEventId = req.params.id
	return models.Event.update({
		score1: req.body.score1,
		score: req.body.score
	}, {
		where: {
			id: updateEventId
		}
	}).then(function() {
		res.json({
			success: true
		})
	})
})


// count query

// router.get('api/eventCount', function(req, res) {
// 	return models.Event.count({
// 		where: {
// 			id: distinct
// 		}
// 	})
// 	.then(function(err, count){
// 		console.log('count', count)
// 	})
// })


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