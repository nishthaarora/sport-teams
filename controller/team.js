
var models = require('../models');

var express = require('express');
var router = express.Router();


// router.get('/events', function(req, res) {
	models.Team.findAll({
		// attributes: ['id', 'Team_name'],
		include: [models.Event]
	}).then(function(result) {
		// console.log(result);
	});
// })






module.exports = router;