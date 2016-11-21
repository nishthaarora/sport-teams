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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use('/', event_controller);
app.use('/teams', team_controller);

models.sequelize.sync()





app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
