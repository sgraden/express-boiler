var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
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
  'server': {
    'main': 'server.js',
    'watch': [
      'server.js'
    ]
  },
  'public': {
	  'css': 'public/css',
	  'html': 'public/views'
  },
  'sass': 'src/sass/**/*.scss',
  'images': 'src/images/**/*.*',
  'html': 'src/views/**/*.html'
};

// gulp.task('default', ['sass', 'browser-sync'], function() {
//
// });

//static server
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
		files: [dirs.public], //["public/**/*.*"],
		browser: "google chrome",
		port: 8000
	});
});


// gulp.task('nodemon', function (cb) {
// 	var started = false;
// 	return nodemon({
// 		script: 'server.js',
// 		env: {'NODE_ENV': 'development'}
// 	}).on('start', function () {
// 		if (!started) {
// 			cb();
// 			started = true;
// 		}
// 	});
// });

gulp.task('nodemon', function (cb) {
  nodemon({
    'script': dirs.server.main,
    'watch': dirs.server.watch,
    'env': {
      'NODE_ENV': 'development'
    }
  })
  .once('start', function () {
    cb();
  })
  .on('restart', function () {
    console.log('------ Restarted Server ------');
  });
});

gulp.task('sass', function () {
  return gulp.src(dirs.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dirs.public.css));
});

gulp.task('html', function() {
  gulp.src(dirs.html)
    .pipe(gulp.dest(dirs.public.html))
    .pipe(browserSync.stream());
});

gulp.task('html:watch', function () {
  gulp.watch(dirs.html, ['html']);
});

//////////////////////////////
// Running Tasks
//////////////////////////////
gulp.task('build', ['html', 'sass']);

gulp.task('watch', ['html:watch']);

gulp.task('default', ['build', 'watch']);
