# React Boilerplate

This is a boilerplate project for a ReactJS application. This project utilizes Redux for application logic flow. It is intended to be used as an isomorphic application - it is set up to do server-side rendering using React components. The server component is an ExpressJS server.

## Core Dependencies
* React (v0.14.7)
* React Router (v2.0.0)
* Redux (v3.3.1) with Redux Thunk (v2.0.1)
* Express (v4.13.4)
* Jade templating (v1.11.0)

## Build Dependencies
* Gulp
* Gulp Live Server (for a local development server)
* Browserify (with Watchify plugin)
* Babel (with es2015 and React presets included)
* ESLint and JSCS (precommit hooks for checking linting and code style)

## Utilities
* jQuery
* Bootstrap (SASS)
* Lodash
* Moment
* Font Awesome
* classnames
* keymirror
* mobile-detect

# Installation

Clone this repository to your local machine. Switch into the pulled down directory and run the following:
```
npm install
gulp
```
This installs the listed dependencies, builds the app and starts a gulp-live-server at `http://localhost:9005`. It also starts a watch task that automatically reloads on changes to application JS and SASS files and restarts the server with changes to server JS files.
