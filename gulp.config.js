/**
 * Created by rimambaks on 11/13/2015.
 */
"use strict";

module.exports = function () {
    var client = './src/client/';
    var build = './build/';

    var config = {
        temp: './tmp',

        /* Files path */
        client: [client + '/*',client + '/**/*.js', !client + '/**/boot.js'],
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        js: build + 'app',

        sass: client + 'styles/*.*',
        css: client + 'styles'


    };

    return config;
};