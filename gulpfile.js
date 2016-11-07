var gulp = require('gulp');
var scss = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');

var dirs = {
    'server': 'server.js',
    'public': {
        'css': 'public/css',
        'html': 'public/views',
        'js': 'public/js',
        'assets': 'public/assets',
        'fonts': 'public/fonts',
        'icons': 'public/icons'
    },
    'src': {
        'scss': 'src/scss/**/*.scss',
        'html': 'src/views/**/*.html',
        'js': 'src/js/**/*.js',
        'assets': 'src/assets/**/*',
        'fonts':'src/fonts/**/*',
        'icons':'src/icons/**/*'
    }
};

////////////////////
///// RUN
////////////////////
gulp.task('build', ['html', 'js', 'scss', 'fonts', 'icons', 'assets']);

gulp.task('watch', ['html:watch', 'js:watch', 'scss:watch']);

gulp.task('default', ['build', 'watch', 'nodemon', 'browser-sync']);

////////////////////
///// BUILD
////////////////////
gulp.task('html', function() {
    gulp.src(dirs.src.html)
        .pipe(gulp.dest(dirs.public.html))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(dirs.src.js)
    .pipe(gulp.dest(dirs.public.js))
    .on('change', browserSync.reload);
});

gulp.task('scss', function() {
    return gulp.src(dirs.src.scss)
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(sourcemaps.write('./maps')) //Write srcMaps to relative dir
        .pipe(gulp.dest(dirs.public.css))
        .pipe(browserSync.stream());
});


gulp.task('fonts', function () {
    gulp.src(dirs.src.fonts)
        .pipe(gulp.dest(dirs.public.fonts))
        .on('change', browserSync.reload);
});

gulp.task('icons', function () {
    gulp.src(dirs.src.icons)
        .pipe(gulp.dest(dirs.public.icons))
        .on('change', browserSync.reload);
});

gulp.task('assets', function () {
    gulp.src(dirs.src.assets)
        .pipe(gulp.dest(dirs.public.assets))
        .on('change', browserSync.reload);
});

////////////////////
///// WATCH
////////////////////
gulp.task ('html:watch', function() {
    gulp.watch(dirs.src.html, ['html']);
});

gulp.task ('js:watch', function() {
    gulp.watch(dirs.src.js, ['js']);
});

gulp.task ('scss:watch', function() {
    gulp.watch(dirs.src.scss, ['scss']);
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
});

gulp.task('nodemon', function(cb) {
    var started = false;
    return nodemon({
        'script': dirs.server,
        'watch': [dirs.server, dirs.src.html, dirs.projects],
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
