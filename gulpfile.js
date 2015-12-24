var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', ['browser-sync'], function() {

});

//static server
gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "http://localhost:8008",
		files: ["*"],
		browser: "google chrome",
		port: 8000
	});
});