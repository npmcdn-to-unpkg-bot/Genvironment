/**
 * Created by rimambaks on 11/13/2015.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();


gulp.task('styles', function () {

    gutil.log(gutil.colors.blue('Compiling SASS --> CSS'));

    return gulp
        .src(config.sass)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.cssnano())
        .pipe(gulp.dest(config.css));
});


//gulp.task('scripts', function () {
//    "use strict";
//
//    gutil.log(gutil.colors.cyan('Compiling JS'));
//
//    return gulp
//        .src(config.alljs)
//        .pipe($.concat('all.js'))
//        .pipe($.uglify())
//        .pipe(gulp.dest(config.js));
//
//});

gulp.task('serve', function () {

    gutil.log(gutil.colors.green('Serving the browser'));

    browserSync({
        server: {
            baseDir: './src/client/',
            routes: {
                "/node_modules": "node_modules"
            }


        }
    });

});

gulp.task('clean-styles', function () {

    var files = config.temp + '**/*.css';
    console.log('Compiling sass --> CSS');
    return del(files);
});


gulp.task('watch', function () {
    gulp.watch(config.sass, ['styles', browserSync.reload]);
    gulp.watch(config.client, browserSync.reload);
    //gulp.watch(config.alljs, ['scripts']);

});

gulp.task('default', ['styles', 'serve', 'watch']);