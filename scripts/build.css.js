const gulp = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const replace = require('gulp-replace')
const rename = require('gulp-rename')

gulp.task('compile:css', () => gulp
  .src('../src/**/style/*.scss')
  .pipe(sass())
  .pipe(csso())
  .pipe(gulp.dest(file => file.base.replace('.scss', '.css').replace('src', 'es')))
)

gulp.task('copy:scss', () => gulp
  .src('../src/**/style/*.scss')
  .pipe(gulp.dest(file => file.base.replace('src', 'es')))
)

gulp.task('modify:scss', () => gulp
  .src('../es/**/style/*.js')
  .pipe(replace(/\.scss/g, '.css'))
  .pipe(rename((path) => {
    path.basename = 'css'
  }))
  .pipe(gulp.dest(file => file.base))
)

gulp.task('default', gulp.parallel('compile:css', 'copy:scss', 'modify:scss'))