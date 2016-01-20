/**
 * Created by rimambaks on 11/13/2015.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();


gulp.task('index', function () {
    var target = gulp.src(config.build + 'index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([config.build + 'lib/*'], {read: false});

    return target.pipe($.inject(sources, {relative: true}))
        .pipe(gulp.dest(config.build));
});


// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(config.lib);
});
gulp.task('copy:libs', ['clean'], function () {

    return gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/tinycolor2/tinycolor.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/d3/d3.js'
        ])
        .pipe(gulp.dest(config.lib))

});

gulp.task('copy:assets', function () {
    return gulp.src([
            config.client + '**/*',
            '!' + config.client + '**/*.ts',
            '!' + config.client + '**/*.scss',
            '!' + config.css + '**/!(main.css)',
        ])
        .pipe(gulp.dest(config.build))
})


gulp.task('styles', function () {

    gutil.log(gutil.colors.blue('Compiling SASS --> CSS'));

    return gulp
        .src(config.sass)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.cssnano())
        .pipe($.sourcemaps.write())
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
    gulp.watch(config.client_ts, browserSync.reload);
    gulp.watch(config.html, browserSync.reload);
    //gulp.watch(config.alljs, ['scripts']);

});

gulp.task('default', ['styles', 'serve', 'watch']);
gulp.task('build', function (callback) {

        runSequence(
            'clean',
            ['copy:libs', 'copy:assets'],
            'index',
            callback
        );
    }
);