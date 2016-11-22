var express = require('express');
// var router = require('router');
var bodyParser = require('body-parser')
// var methodOverride = require('method-override');
// var exphbs = require('express-handlebars');
var path = require('path');
// var logger = require('morgan');
// var session = require('express-session');
// var cookieParser = require('cookie-parser'); // for working with cookies
// and we bring in our models folder. This brings in the model's object, as defined in index.js
var models = require('./models');


var app = express();

var event_controller = require('./controller/events');
var team_controller = require('./controller/team');

//blocksheader from containing information about our server
app.disable('x-powered-by');
var user_controller = require('./controller/user')
var html_routes = require('./controller/html-routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static(process.cwd() + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use('/', html_routes);
app.use('/login', user_controller);
app.use('/events', event_controller);
app.use('/teams', team_controller);

models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
models.sequelize.sync();

// .then(function() {

// 	return models.Team.create(
// 		{
// 			Team_name: "blue",
// 			Events: {
// 				date: '2016/11/01',
//         start_time: '16:50:00',
//         end_time: '20:20:00',
//         type: "game",
//         score1: 0,
//         score: 0,
//         location: "william cannon"
// 			}
// 		},
// 		{
// 			include: [models.Event]
// 		}
// 	)
// }).then(function(newTeam) {
// 	console.log(newTeam);
// })






app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
