const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('default', () => {
  gulp.src(['src/**/*.js'])
    .pipe(eslint({"fix": true}))
    .pipe(eslint.format());
});

