var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//不同
var logger = require('morgan');//不同
var cookieParser = require('cookie-parser');//不同
var bodyParser = require('body-parser');//不同

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());//不同
app.use(bodyParser.urlencoded({ extended: false }));//不同
app.use(cookieParser());//不同
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-livereload')());
app.use('/', routes);//不同
app.use('/users', users);//不同

// catch 404 and forward to error handler//不同
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {//不同
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

/**
 * Module dependencies.
 */

/*var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');
var http = require('http');
var path = require('path');

var app = express();
*/
// all environments
/*app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());//不同
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-livereload')());
*/
// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes);
app.get('/users', users);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/