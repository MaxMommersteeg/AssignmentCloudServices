// Used NPM modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/database');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

// Data access layer

mongoose.connect(config.database);

// Configuration passport
require('./config/passport')(passport);

// Models
require('./models/show')(mongoose);
require('./models/user')(mongoose);

// Routes
var user = require('./routes/user')(mongoose, config);
var shows = require('./routes/shows')(mongoose);
var omdbapi = require('./routes/omdbapi')(mongoose);

// Express initialisation
var app = express();

//  View engine
app.set('view engine', 'jade');

//  Views path
app.set('views', path.join(__dirname, 'views'));

// Log to console
app.use(logger('dev'));

// Express settings
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize passport
app.use(passport.initialize());


// Setup routes
app.use('/user', user);
app.use('/shows', shows);
app.use('/omdbapi.js', omdbapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handler which will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Error handler which will NOT print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
