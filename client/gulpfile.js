const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const errorify = require('errorify');
const del = require('del');
const tsify = require('tsify');
const gulpTypings = require('gulp-typings');
const source = require('vinyl-source-stream');
const runSequence = require('run-sequence');

function createBrowserifier(entry) {
  return browserify({
    basedir: '.',
    debug: true,
    entries: [entry],
    cache: {},
    packageCache: {}
  })
      .plugin(tsify)
      .plugin(watchify)
      .plugin(errorify);
}

function bundle(browserifier, bundleName, destination) {
  return browserifier
      .bundle()
      .pipe(source(bundleName))
      .pipe(gulp.dest(destination));
}

gulp.task('clean', function () {
  return del('./built/**/*')
});

gulp.task('installTypings', function () {
  return gulp.src('typings.json').pipe(gulpTypings());
});

gulp.task('tsc-browserify-src', function () {
  return bundle(
      createBrowserifier('./src/main.ts'),
      'bundle.js',
      'built');
});

gulp.task('default', function (done) {
  runSequence(['clean', 'installTypings'], 'tsc-browserify-src', function () {
    console.log('Watching...');
    gulp.watch(['src/**/*.ts'],
        ['tsc-browserify-src']);
  });
});