'use strict';

// For transpiling any ES6 modules.
require('babel-register');

// Set up any environmental variables.
require('dotenv').config();

var gulp = require('gulp');
var gutil = require('gulp-util');
var gls = require('gulp-live-server'); // Local development server
var browserify = require('browserify'); // Bundles JS
var watchify = require('watchify'); // Allows for cached browserify builds
var babelify = require('babelify');
var looseEnvify = require('loose-envify');
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var sass = require('gulp-sass');
var through2 = require('through2');

var config = require('./config/buildConfig').default; // Configuration options.
var Constants = require('./app/constants/constants');

// Browserify is defined here so it remains persistent through incremental builds. Needed for watchify.
var browserifier = browserify({
  entries: [config.paths.app.mainJs],
  transform: [
    babelify,
    looseEnvify,
  ],
  cache: {},
  packageCache: {},
});

// This is the local dev server. Uses gulp-live-server.
var server;

/**
 * Binds listeners for a server reload so that we can notify live reload to
 * refresh the page when the server has finished reloading.
 */
function bindServerReload() {
  server.server.stdout.on('data', function(data) {
    if (data.indexOf(Constants.SERVER_START_KEYWORD) !== -1) {
      server.notify({
        path: 'bundle.js',
      });
    }
  });
}

gulp.task('init-server', function() {
  server = gls(config.paths.server.mainJs, {
    env: process.env,
  });
  server.start().then(bindServerReload);
});

gulp.task('restart-server', ['js'], function() {
  server.start().then(bindServerReload);
});

gulp.task('fonts', function() {
  gulp.src(config.paths.app.fonts)
    .pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('images', function() {
  gulp.src(config.paths.app.images)
    .pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('sass', function() {
  gulp.src(config.paths.app.sass.src)
    .pipe(sass({
      includePaths: config.paths.app.sass.importPaths,
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(server ? server.notify() : through2.obj());
});

gulp.task('js', function(cb) {
  browserifier.bundle()
    .on('error', function(error) {
      // Stop browserify. Without this it will lock up on failure.
      cb(new gutil.PluginError('browserify', {
        name: 'Error',
        message: error.message,
      }));
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .on('end', cb);
});

gulp.task('watch', function() {
  browserifier.plugin(watchify, {
    poll: true, // Polling is necessary for NFS mounts (DOCKER).
  });

  gulp.watch(config.paths.app.sass.src, ['sass']);
  browserifier.on('update', function() {
    gulp.start('js', 'restart-server');
  });

  gulp.watch(config.paths.server.js, ['restart-server']);
});

gulp.task('build', [
  'images',
  'fonts',
  'sass',
  'js',
]);

gulp.task('default', [
  'init-server',
  'images',
  'fonts',
  'sass',
  'js',
  'watch',
]);
