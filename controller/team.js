
var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();

// router.get('/allteams', function(req, res) {
// 	models.Team.findAll({
// 		attributes: ['id', 'Team_name'],
// 		include: [models.Event]
// 	}).then(function(allTeams) {
// 		res.send(JSON.stringify(allTeams))
// 	});
// })




module.exports = router;