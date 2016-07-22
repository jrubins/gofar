'use strict';

// Transforms our JSX and ES2015 modules at runtime when it encounters them.
require('babel-register');

var express = require('express');
var ConnectLiveReload = require('connect-livereload');

var config = require('./../config/buildConfig');
var Constants = require('./../app/constants/constants');
var RouteHandlers = require('./routeHandlers').default;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(ConnectLiveReload({
    port: config.serverLrPort
}));

app.use(express.static(config.paths.dist));

RouteHandlers(app);

app.listen(config.serverPort, function() {
    console.log('Server listening on port ' + config.serverPort + '...');
    console.log(Constants.SERVER_START_KEYWORD);
});
