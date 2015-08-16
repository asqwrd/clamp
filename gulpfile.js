/*jshint node:true,strict:true,undef:true,unused:true*/
'use strict';


/**
 * Import tasks
 **/
var bump = require('gulp-bump');
var del = require('del');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var gulp = require('gulp');



/**
 * Environment
 **/
// JS path
var jsFile = './index.js';



/**
 * Tasks
 */
// Cleans the destination build folder: gulp clean
gulp.task('clean', function(cb) {
	del('*.min.js', cb);
});

// Check client-side JavaScript code quality using JSHint.
gulp.task('lint-js', function() {
	gulp.src(jsFile)
		.pipe(jshint('./.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

// Compile js
gulp.task('js', function() {
	gulp.src(jsFile)
		.pipe(uglify())
		.pipe(rename('clamp.min.js'))
		.pipe(gulp.dest('./'));
});

// Versioning
gulp.task('bump', function() {
	gulp.src(['package.json'], {
			base: './'
		})
		.pipe(bump({
			type: gutil.env.bump ? gutil.env.bump : 'patch'
		}))
		.pipe(gulp.dest('./'));
});

// Watch for file changes and build accordingly.
gulp.task('watch', function() {
	gulp.watch(jsFile, ['build']);
});

// Default tasks.
// In NPM it is setup with: gulp clean && gulp build --production
gulp.task('build', ['lint-js', 'js']);

// When developing you can continuously build files using just: gulp
gulp.task('default', ['build', 'watch']);