/**
 * Created by rimambaks on 11/13/2015.
 */
"use strict";

module.exports = function () {
    var client = './src/client/';
    var build = './build/';

    var config = {
        build: build,
        temp: './tmp',
        html:[client + '/**/*.html'],
        /* Files path */
        client_ts: [client + '/*',client + '/**/*.js', !client + '/**/boot.js'],
        client: client,
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        js: build + 'app',
        lib: build + 'lib',

        sass: [client + 'styles/*.scss',client + 'styles/**/*.scss',client + 'styles/**/**/*.scss'],
        css: client + 'styles'



    };

    return config;
};