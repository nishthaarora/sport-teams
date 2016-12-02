var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();


// facebook signin function if the user exist
function signIn(req, res) {
	return models.Player.findOne({
		where: {
			email: req.body.email.toLowerCase(),
			fbID: req.body.fbID
		}
	}).then(function(user) {
		if (user) {
			req.session.logged_in = true;
			res.cookie('logged_in', true);
			res.cookie('user_name', req.body.fname);
			res.cookie('userTeam', user.team);
			res.json({
				success: true
			})
		} else {
			signUp(req, res)
		}
	})
}

// facebook signup function, if the user doesnot exist
function signUp(req, res) {
	return models.Player.create({
		fname: req.body.fname.toLowerCase(),
		lname: req.body.lname.toLowerCase(),
		email: req.body.email.toLowerCase(),
		fbID: req.body.fbID,
		URL: res.URL
	}).then(function(user) {
		req.session.logged_in = true;
		res.cookie('logged_in', true);
		res.cookie('user_name', req.body.fname);
		// res.cookie('userTeam', user.team);
		res.json({
			success: true,
			new: true,
			id: user.id
		})
	})
}

// updating table with user info in sequelize when user enter info in modal at the time of signup
function updateTable(req, res) {
	findTeamInTeamTable(req.body.team)
		.then(function(data) {
			return new Promise(function(resolve) {
				resolve(data[0].id)
			})
		})
		.then(function(teamId) {
			return models.Player.update({
				team: req.body.team,
				uniformNum: req.body.uniformNum,
				TeamId: teamId
			}, {
				where: {
					id: req.body.id
				}
			})
		})
				res.cookie('userTeam', req.body.team);
				res.json({
				success: true,
				new: true
		})

}

// finding team id to fill in sequelize player table
function findTeamInTeamTable(team) {
	return models.Team.findAll({
		where: {
			Team_name: team
		}
	})
}

router.post('/signin', signIn);
router.post('/update', updateTable);

module.exports = router;