/**
 * Created by rimambaks on 11/13/2015.
 */

//   load NPM plugins
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    del = require('del')

// load gulp config file
var config = require('./gulp.config')();

// load all gulp plugins
var $ = require('gulp-load-plugins')();

// change the index.html references
gulp.task('index', function () {

    $.util.log($.util.colors.blue('changing the index.html file'));

    // sources
    var systemJsFile = 'system.src.js';
    var primarySource = gulp.src(config.build + 'lib/' + systemJsFile, {read: false});
    var secondarySources = gulp.src([config.build + 'lib/*', '!' + config.build + 'lib/' + systemJsFile], {read: false});

    // targets
    var target = gulp.src(config.build + 'index.html');

    return target.pipe($.inject(series(primarySource, secondarySources), {relative: true}))
        .pipe(gulp.dest(config.build));
});


// clean the contents of the distribution directory
gulp.task('clean', function () {
    $.util.log($.util.colors.red('cleaning the build folder'));
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

    $.util.log($.util.colors.blue('Compiling SASS --> CSS'));

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

    $.util.log($.util.colors.green('Serving the browser'));

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