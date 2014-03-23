/**
 * Theme Gulp Task
 *
 * TODO :
 * - custom task to migrate mysql db
 * - custom task to generate changelog
 * - custom task to zip and release
 * - css-flip to support RTL
 */


var gulp = require('gulp'),
	changed = require('gulp-changed'),
	cached = require('gulp-cached'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	prefix = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	livereload = require('gulp-livereload'),
	path = require('path'),
	es = require('event-stream'),
	chalk = require('chalk'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	csscomb = require('gulp-csscomb'),
	jscs = require('gulp-jscs'),
	csslint = require("gulp-csslint");

/**
* [Tasks]
* =====================================================================================================================
*/

/**
* Less Task
*/
gulp.task('less', ['clean-css'], function(){
	return es.concat(
		gulp.src('src/less/style.less')
			.pipe(less({
				paths:[ 'src/less/bootstrap-less', 'src/less/inc/' ]
			}))
			.pipe(prefix('last 2 version', '> 1%', 'ie 8', 'ie 7', 'ie 9', 'android 2.3', 'android 4', 'opera 12'))
			.pipe(gulp.dest('../')),
		gulp.src(['src/less/*.less', '!src/less/style.less'])
			.pipe(less({
				paths:[ 'src/less/bootstrap-less', 'src/less/inc/' ]
			}))
			.pipe(prefix('last 2 version', '> 1%', 'ie 8', 'ie 7', 'ie 9', 'android 2.3', 'android 4', 'opera 12'))
			.pipe(csscomb({
				config: '.csscomb.json'
			}))
			.pipe(gulp.dest('../assets/front/css/'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(minifycss())
			.pipe(gulp.dest('../assets/front/css/')),
		gulp.src('src/less/vendor/**/*.css')
			.pipe(gulp.dest('../assets/front/css/'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(minifycss())
			.pipe(gulp.dest('../assets/front/css/'))
	);
});

/**
* Scripts Tasks
*/
gulp.task('scripts', ['clean-js'], function(){
	return es.concat(
		gulp.src('src/js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulp.dest('../assets/front/js/'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(uglify({
				compress: true
			}))
			.pipe(gulp.dest('../assets/front/js/')),
		gulp.src('src/js/vendor/*.js')
			.pipe(gulp.dest('../assets/front/js/vendor/'))
	);
})

/**
* Copy dummy-images
*/
gulp.task('copy-dummy', ['clean-dummy'], function(){
	return gulp.src('src/dummy-images/**/*')
		.pipe(gulp.dest('../assets/front/dummy-images/'));
})

/**
* Copy Images
*/
gulp.task('copy-images', ['clean-images'], function(){
	return gulp.src('src/images/**/*')
		.pipe(gulp.dest('../assets/front/images/'));
})

/**
* Copy Fonts
*/
gulp.task('copy-fonts', ['clean-fonts'], function(){
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('../assets/front/fonts/'));
})

/**
* [Watch Tasks]
* =====================================================================================================================
*/
gulp.task('watch', function(){
	gulp.watch('src/less/**/*.less', function(event){
		console.log(chalk.red('File : ['+event.path+'] was '+event.type ));
		console.log(chalk.green('running tasks...'));
		gulp.start('less');
	});
	gulp.watch('src/dummy-images/**/*', function(event){
		console.log('File '+event.path+' was '+event.type+', running tasks...');
		gulp.start('copy-dummy');
	});
	gulp.watch('src/images/**/*', function(event){
		console.log('File '+event.path+' was '+event.type+', running tasks...');
		gulp.start('copy-images');
	});
	gulp.watch('src/js/**/*', function(event){
		console.log('File '+event.path+' was '+event.type+', running tasks...');
		gulp.start('scripts');
	});
	gulp.watch('src/fonts/**/*', function(event){
		console.log('File '+event.path+' was '+event.type+', running tasks...');
		gulp.start('copy-fonts');
	});
});

/**
* [Default Tasks]
* =====================================================================================================================
*/
gulp.task('default', [
	'less',
	'copy-images',
	'copy-dummy',
	'scripts',
	'copy-fonts',
	'watch'
]);

/**
* [Check JS Code Style Tasks]
* =====================================================================================================================
*/
gulp.task('jscs', function(){
	return gulp.src('src/js/*.js')
		.pipe(jscs());
})

/**
* [Lint CSS Files]
* =====================================================================================================================
*/
gulp.task('csslint', function(){
	return gulp.src(['../assets/front/css/theme.css', '../assets/front/css/grid-custom.css', '../assets/front/css/bootstrap-theme.css'])
		.pipe(csslint())
		.pipe(csslint.reporter());
})

/**
* [Clean]
* =====================================================================================================================
*/

/**
* Clean CSS
*/
gulp.task('clean-css', function () {
	return gulp.src('../assets/front/css/', {read: false})
		.pipe(clean({force: true}));
});

/**
* Clean Images
*/
gulp.task('clean-images', function () {
	return gulp.src('../assets/front/images/', {read: false})
		.pipe(clean({force: true}));
});

/**
* Clean Dummy Images
*/
gulp.task('clean-dummy', function () {
	return gulp.src('../assets/front/dummy-images/', {read: false})
		.pipe(clean({force: true}));
});

/**
* Clean Fonts
*/
gulp.task('clean-fonts', function () {
	return gulp.src('../assets/front/fonts/', {read: false})
		.pipe(clean({force: true}));
});

/**
* Clean JS
*/
gulp.task('clean-js', function () {
	return gulp.src('../assets/front/js/', {read: false})
		.pipe(clean({force: true}));
});
