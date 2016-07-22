'use strict';

module.exports = {
    serverPort: 9005,
    serverLrPort: 35729, // Live reload port.
    paths: {
        dist: './dist',

        app: {
            html: './app/*.html',
            fonts: [
                'node_modules/font-awesome/fonts/*',
                './app/assets/fonts/**/*'
            ],
            images: './app/assets/images/**/*',
            js: './app/**/*.js',
            sass: {
                importPaths: [
                    'node_modules/bootstrap-sass/assets/stylesheets/',
                    'node_modules/font-awesome/scss/',
                    'app/assets/sass/'
                ],
                src: './app/assets/**/*.scss'
            },
            mainJs: './app/main.js'
        },

        server: {
            js: './server/**/*.js',
            mainJs: './server/server.js'
        }
    }
};
