var gulp = require('gulp');
//Removes a directory or a file
var del = require('del');
//Run in order
var gulpSequence = require('gulp-sequence');

var paths = {
  build: {
    all: 'build',
    dev: 'build/dev'
  },
  js: {
    app: [
      'src/app/js/**/*.js'
    ],
    vendor: [
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/material-design-lite/material.js',
      'node_modules/jquery/dist/jquery.js'
    ],
    unit: [
      'src/test/unit/**/*.spec.js'
    ],
    mock: [
      'node_modules/angular-mocks/angular-mocks.js',
      'src/test/e2e/e2eConfig.js'
    ]
  },
  templates: [
    'src/app/views/templates/**/*.html'
  ],
  css: [
    'node_modules/material-design-lite/material.css'
  ],
  less: {
    main: 'src/app/less/main.less',
    path: [
      'src/app/less/*.less'
    ]
  },
  html: 'src/app/**/*.html',
  index: 'src/app/index-angular.html',
  karma: __dirname + '/karma.conf.js',
  protractor: __dirname + '/protractor.conf.js',
  assets: {
    fonts: [
      'node_modules/roboto-fontface/fonts/*.*',
      'node_modules/material-design-icons/iconfont/*.*'
    ],
    data: [
      'src/app/assets/data/*.*'
    ],
    images: [
      'src/app/assets/img/**/*.*',
      'src/app/assets/logo/*.*'
    ],
    i18n: [
      'src/app/assets/i18n/**/*.*'
    ],
    favicon: [
      'src/app/assets/favicon.ico'
    ]
  }
};

var config = {
  paths: paths,
  timestamp: Date.now()
};

require('./gulp/build.js')(gulp, config);
require('./gulp/serve.js')(gulp, config);
require('./gulp/unit.js')(gulp, config);
require('./gulp/e2e.js')(gulp, config);

gulp.task('default', function () {
  gulp.start(['build']);
});

gulp.task('build', function (callback) {
  gulpSequence('clean', '_build', callback);
});

gulp.task('serve', function (callback) {
  gulpSequence('clean', '_serve', callback);
});

gulp.task('clean', function (done) {
  del(paths.build.all, done);
});

gulp.task('unit', function (done) {
  gulp.start(['_unit']);
});

gulp.task('e2e', function (callback) {
  gulpSequence('clean', '_serve', '_e2e', callback);
});

module.exports = {
  paths: paths
};