var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();

// user login form
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/main.html'));
});

// event entry form
router.get('/input', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/enteringEvents/eventsEntry.html'));
})


// add team players form
router.get('/addplayers', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/enteringEvents/enteringTeamMembers.html'));
})


// display all events
router.get('/events', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/events/events.html'));
})

// sign-in
router.get('/signin', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/user/signIn.html'));
})

// sign-up
router.get('/signup', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/user/signup.html'));
})

// sign-up
router.get('/stats', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/stats/displayCharts.html'));
})

module.exports = router;