var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var minifyCss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
  return gulp.src(['build/javascripts/*'], {read: false}).pipe(clean());
});

gulp.task('javascript', function() {
  return browserify({
    entries: 'public/javascripts/client.js',
    extensions: ['.react.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('client.js'))
  .pipe(gulp.dest('build/javascripts'));
});

gulp.task('browserify', function() {
  return gulp.src('build/javascripts/client.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/javascripts/'));
});

gulp.task('styles', function() {
  return gulp.src('public/stylesheets/**/*.css')
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/css/'));
});

//Start me
gulp.task('default', function() {
  runSequence('clean', 'javascript', 'browserify', 'styles');
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
