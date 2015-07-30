/* global module */
module.exports = function(karma) {
  karma.set({
    autoWatch: true,
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [ 'app/**/*.spec.js' ],
    exclude: [],
    port: 9018,
    runnerPort: 9101,
    browsers: [
      'Chrome'
    ],
    reporters: ['mocha'],
    singleRun: false,
    colors: true,
    logLevel: karma.LOG_INFO,
    preprocessors: {
      'app/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [
        ['stringify'],
        ['babelify', {
          stage: 0
        }]
      ]
    }
  });
};
