var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser'); // for working with cookies

// and we bring in our models folder. This brings in the model's object, as defined in index.js
var models = require('./models');
var app = express();
var event_controller = require('./controller/events');
var team_controller = require('./controller/team');
var user_controller = require('./controller/user');
var html_routes = require('./controller/html-routes');
var facebook_login = require('./controller/fbLogin');

//blocksheader from containing information about our server
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));
app.use(express.static(process.cwd() + '/public'));

// allow sessions
app.use(session({
	secret: 'app',
	cookie: {
		maxAge: 60000
	},
	resave: true,
	saveUninitialized: true
}));
app.use(cookieParser());


app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use('/', html_routes);
app.use('/users', user_controller);
app.use('/events', event_controller);
app.use('/teams', team_controller);
app.use('/fb', facebook_login);

models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
models.sequelize.sync();

app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});