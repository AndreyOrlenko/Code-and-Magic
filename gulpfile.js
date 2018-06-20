'use strict';
var gulp = require('gulp'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync');

var config = {
  server: {
    baseDir: './src'
  },
  host: 'localhost',
  port: 9000,
  logPrefix: 'Frontend_Devil',
  open: false
};

gulp.task('serve', function() {
  browserSync.init(config);
  browserSync
    .watch(['src/**/*.*'])
    .on('add', browserSync.reload)
    .on('change', browserSync.reload)
    .on('unlink', browserSync.reload)
    .on('error', notify.onError());
});
