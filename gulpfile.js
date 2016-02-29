var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');


var dirs = {
    // 'js': {
    //   'lint': [
    //     'index.js',
    //     'src/**/*.js',
    //     '!src/**/*.min.js'
    //   ],
    //   'uglify': [
    //     'src/js/**/*.js',
    //     '!src/js/**/*.min.js'
    //   ]
    // },
    'server': 'server.js',
    'public': {
        'css': 'public/css',
        'html': 'public/views'
    },
    'sass': 'src/sass/**/*.scss',
    'images': 'src/images/**/*.*',
    'html': 'src/views/**/*.html'
};

////////////////////
///// RUN
////////////////////
gulp.task('build', ['html', 'sass']);

gulp.task('watch', ['html:watch', 'sass:watch']);

gulp.task('default', ['build', 'watch', 'browser-sync', 'nodemon']);

////////////////////
///// BUILD
////////////////////
gulp.task('sass', function() {
    return gulp.src(dirs.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps')) //Write srcMaps to relative dir
        .pipe(gulp.dest(dirs.public.css))
        .pipe(browserSync.stream());
    //.pipe(browserSync.stream({match: '**/*.css'}));?
});

gulp.task('html', function() {
    gulp.src(dirs.html)
        .pipe(gulp.dest(dirs.public.html))
        .pipe(browserSync.stream());
});

////////////////////
///// WATCH
////////////////////
gulp.task('html:watch', function() {
    gulp.watch(dirs.html, ['html']);
});

gulp.task('sass:watch', function() {
    gulp.watch(dirs.sass, ['sass']);
});

////////////////////
///// SERVER
////////////////////
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 8000
    });
    // gulp.watch(dirs.server).on('change', browserSync.reload);
});

gulp.task('nodemon', function(cb) {
    var started = false;
    return nodemon({
        'script': dirs.server,
        'watch': dirs.server,
        'env': {
            'NODE_ENV': 'development' //Should be able to put this in bash profile!
        }
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function() {
        console.log('------ Restarted Server ------');
    });
});
