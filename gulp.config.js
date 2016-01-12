/**
 * Created by rimambaks on 11/13/2015.
 */
"use strict";

module.exports = function () {
    var client = './src/client/';
    var build = './build/';

    var config = {
        temp: './tmp',
        html:[client + '/**/*.html'],
        /* Files path */
        client: [client + '/*',client + '/**/*.js', !client + '/**/boot.js'],
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        js: build + 'app',

        sass: [client + 'styles/*.scss',client + 'styles/**/*.scss'],
        css: client + 'styles'


    };

    return config;
};