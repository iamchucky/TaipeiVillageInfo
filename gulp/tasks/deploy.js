var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var config = require('../config').deploy;

gulp.task('deploy', function() {
  gulp.src(config.src).pipe(ghPages());
});
