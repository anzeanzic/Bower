var gulp = require('gulp');
var flatten = require('gulp-flatten');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('move', function() {
	gulp.src(['./src/index.html'])
		.pipe(gulp.dest('./dist'))
		.pipe(notify('Uspesno sem premaknil HTML datoteko!'));
	gulp.src(['!./src/index.html', './src/**/*.html'])
		.pipe(flatten())
		.pipe(gulp.dest('./dist/templates'))
		.pipe(notify('Uspesno sem premaknil template!'));
});

gulp.task('scripts', function() {
	gulp.src(['./src/app.js', '.src/**/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify('Uspesno sem premaknil Javascript datoteke!'));
});

gulp.task('angular', function() {
	gulp.src(['./bower_components/angular/angular.min.js'])
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify('Uspesno sem premaknil AngularJS!'));
});

gulp.task('bootstrap', function() {
	gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css'])
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify('Uspesno sem premaknil Bootstrap CSS!'));
});

gulp.task('serve', function() {
	gulp.src('.').pipe(webserver({
		port: 48080,
		livereload: true,
		open: 'http://localhost:48080/dist/'
	}));
});

gulp.task('watch', ['serve'], function() {
	gulp.start(['scripts', 'move', 'angular', 'bootstrap']);
	gulp.watch(['src/**/*.js'], ['scripts']);
	gulp.watch(['src/**/*.html'], ['move']);
});