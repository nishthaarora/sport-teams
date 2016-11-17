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

var team_controller = require('./controller/events');
var event_controller = require('./controller/team');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


app.set('view engine', 'html');

app.set('views', __dirname + '/views');

// app.use('/', event_controller);

models.sequelize.sync()


// .then(function() {

// 	return models.Team.create(
// 	{
// 		Team_name:"blue"
// 	}, {
// 			date: '2016/11/10',
// 		start_time: '10:40:50',
// 		end_time: '11:40:10',
// 		type: 'game',
// 		score1: 20,
// 		score: 10,
// 		location: 'william'
// 	}, {
// 		include:[models.Team]
// 	}
// 	)
// })




app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
