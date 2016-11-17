var models = require('../models');
var path = require('path');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/main.html'));
});


	router.get('/events', function(req, res) {
			models.Event.findAll({
				include: [models.Team]
			}).then(function(allEvents){

				res.send(JSON.stringify(allEvents))
			})
	})


module.exports = router