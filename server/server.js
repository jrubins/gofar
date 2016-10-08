'use strict';

// Transforms our JSX and ES2015 modules at runtime when it encounters them.
require('babel-register');

var connectLiveReload = require('connect-livereload');
var express = require('express');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var winston = require('winston');

var AppRouteHandlers = require('routeHandlers/appRouteHandlers').default;
var config = require('buildConfig').default;
var Constants = require('constants/constants');
var LogUtil = require('utils/logs');

// Set up our logger.
if (process.env.NODE_ENV !== Constants.ENV_DEV) {
  winston.add(winston.transports.File, {
    filename: 'app.log',
  });
  winston.remove(winston.transports.Console);
}

LogUtil.setLogger(winston);

var app = express();

app.set('views', config.paths.server.viewsDir);
app.set('view engine', 'pug');

app.use(helmet());

if (process.env.NODE_ENV === Constants.ENV_DEV) {
  app.use(connectLiveReload({
    port: config.serverLrPort,
  }));
}

app.use(express.static(config.paths.dist));
app.use(favicon(config.paths.app.favicon));

AppRouteHandlers(app);

app.listen(config.serverPort, function(err) {
  if (err) {
    LogUtil.error('Error starting Express server:', err);

    return;
  }

  LogUtil.info('Server listening on port ' + config.serverPort + '...');
  LogUtil.info(Constants.SERVER_START_KEYWORD);
});
