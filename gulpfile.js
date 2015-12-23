/**
 * Created by rimambaks on 11/13/2015.
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();


gulp.task('styles', function () {

    console.log('Compiling sass --> CSS');

    return gulp
        .src(config.sass)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.minifyCss())
        .pipe(gulp.dest(config.css));
});


gulp.task('scripts', function () {
    "use strict";

    console.log('compiling js');

    return gulp
        .src(config.alljs)
        .pipe($.concat('all.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(config.js));

});

gulp.task('serve', function () {

    browserSync({
        server: {
            baseDir: './src/client/'
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
    gulp.watch(config.client, [browserSync.reload]);
    gulp.watch(config.alljs, ['scripts']);

});

gulp.task('default', ['styles', 'scripts', 'serve', 'watch']);