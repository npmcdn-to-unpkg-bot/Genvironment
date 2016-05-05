/**
 * Created by imambaks on 5-5-2016.
 */

(function (global) {
    "use strict";


//    map tells the System loader where to look for things

    var map = {
        'app': 'app',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular'
    };

    // packages tells the system loader how to load when no filename and/or no extenstion

    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'}
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router'
    ];

    // add packages entries for angular packages in hthe form of '@angular/common': {main: 'index.js', defaulte:'js'}

    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'}
    })

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);


})(this);