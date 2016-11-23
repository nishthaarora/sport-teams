var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


// user login
router.post('/login', function(req, res) {
	return models.Player.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user) {
		if (user === null) {
			res.redirect('/users/signin')
		}
		bcrypt.compare(req.body.password, user.password, function(err, result) {
			if (result === true) {
				// we save the logged in status to the session
				req.session.logged_in = true;
				// the user id to the session

				res.cookie('user_name', user.fname);

				req.session.cookie.expires = false;

				res.json({
					success: true
				});

			} else {
				res.json({
					success: false
				});
			}
		})
	})
})



// create user
router.post('/create', function(req, res) {
	// sending the data teamId to the record created in mysql at the time of user signup
	findAllTeams(req.body.team)
		.then(function(data) {
			return new Promise(function(resolve) {
				data.forEach(function(ele) {
					resolve(ele.id)
				})
			})
		}).then(function(teamId) {
			models.Player.findAll({
				where: {
					fname: req.body.fname,
					lname: req.body.lname,
					email: req.body.email
				}
			}).then(function(users) {
				if (users.length > 0 && users.email !== null) {
					res.send('we already have an email or username for this account');
				} else {
					bcrypt.genSalt(10, function(err, salt) {
						bcrypt.hash(req.body.password, salt, function(err, hash) {
							models.Player.create({
								fname: req.body.fname,
								lname: req.body.lname,
								team: req.body.team,
								uniformNum: req.body.uniformNum,
								email: req.body.email,
								password: hash,
								TeamId: teamId
							}).then(function(user) {
								// we save the logged in status to the session
								req.session.logged_in = true;
								// the user id to the session
								res.cookie('user_name', user.fname);

								req.session.cookie.expires = false;

								res.json({
									success: true
								});
							})
						})
					})
				}
			})
		})
})


router.post('/signout', function(req, res) {
	req.session.destroy(function() {
		req.session = null
		res.clearCookie('connect.sid', '', {expires: new Date()});
		res.clearCookie('user_name');
		res.json({
			success: true
		})
	})
})


function findAllTeams(teamName) {
	return models.Team.findAll({
		where: {
			Team_name: teamName
		},
		attributes: ['id']
	})
}



module.exports = router;