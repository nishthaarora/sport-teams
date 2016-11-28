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
				res.cookie('logged_in', true);
				res.cookie('user_name', user.fname);
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

	models.Player.findAll({
		where: {
			fname: req.body.fname.toLowerCase(),
			lname: req.body.lname.toLowerCase(),
			team: req.body.team,
			uniformNum: req.body.uniformNum
		}
	}).then(function(users) {
		if (users.length > 0 && users[0].email !== null) {
			res.send({
				success: false,
				error: 'User already exists. Please go to login page.'
			});

		} else if (users.length > 0 && users[0].email === null) {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					return models.Player.update({
						email: req.body.email,
						password: hash
					}, {
						where: {
							fname: req.body.fname.toLowerCase(),
							lname: req.body.lname.toLowerCase(),
							team: req.body.team,
							uniformNum: req.body.uniformNum
						}
					}).then( function() {
						res.json({success: true})
					}, function( err ) {
						res.json({
							success: false,
							error: err
						})
					});
				})
			})

		} else {
			// sending the data teamId to the record created in mysql at the time of user signup
			findAllTeams(req.body.team)
				.then(function(data) {
					return new Promise(function(resolve) {
						data.forEach(function(ele) {
							resolve(ele.id)
						})
					})
				}).then(function(teamId) {
					bcrypt.genSalt(10, function(err, salt) {
						bcrypt.hash(req.body.password, salt, function(err, hash) {
							models.Player.create({
								fname: req.body.fname.toLowerCase(),
								lname: req.body.lname.toLowerCase(),
								team: req.body.team,
								uniformNum: req.body.uniformNum,
								email: req.body.email,
								password: hash,
								TeamId: teamId
							})
						})
					})
				}).then(function(user) {
					// we save the logged in status to the session
					req.session.logged_in = true;
					res.cookie('logged_in', true);
					// the user id to the session
					res.cookie('user_name', user.fname);
					res.json({
						success: true
					});
				})
		}
	})
})


router.get('/signout', function(req, res) {
	// var cookieSid = req.cookies['connect.sid']

	req.session.destroy()
	req.session = null
		// res.clearCookie('cookieSid', {expires: new Date()}, {path:'/'})
		// res.clearCookie('connect.sid');
	res.clearCookie('user_name');
	res.cookie('logged_in', false);
	res.json({
		logged_in: false
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