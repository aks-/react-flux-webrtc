var gulp = require('gulp');
var clean = require('gulp-clean');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var minifycss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return gulp.src(['public/build/javascripts/*'], {read: false}).pipe(clean());
});

gulp.task('javascript', function() {
  return gulp.src('public/javascripts/**/*.js')
  .pipe(react())
  .pipe(gulp.dest('public/build/javascripts/'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/build/javascripts'));
});

gulp.task('browserify', ['javascript'], function() {
  return gulp.src('public/build/javascripts/main.js')
  .pipe(browserify({transform:['envify']}))
  .pipe(rename('browserified.js'))
  .pipe(gulp.dest('public/build/javascript'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/build/javascripts/'))
});

gulp.task('styles', function() {
  return gulp.src('public/stylesheets/**/*.css')
  .pipe(gulp.dest('public/build/css/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/build/css/'));
});

//Start me
gulp.task('default', ['clean'], function() {
  return gulp.start('browserify', 'styles');
});

//for dev purpose
gulp.task('watch', ['clean'], function() {
  var watching = false;
  gulp.start('browserify', 'styles', function() {
    if (!watching) {
      watching = true;
      gulp.watch('public/javascripts/**/*.js', ['javascript']);
      gulp.watch('public/javascripts/main.js', ['browserify']);
      gulp.watch('public/stylesheets/**/*', ['styles']);
      nodemon({script: 'app.js', watch: './'});
    }
  });
});
