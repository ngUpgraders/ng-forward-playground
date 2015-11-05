/* global module */
module.exports = function(karma) {
  karma.set({
    basePath: '',

    frameworks: ['angular', 'mocha', 'browserify'],
    angular: ['mocks'],

    files: [
      'app/**/*.spec.js'
    ],

    browsers: ['Chrome'],

    reporters: ['mocha'],

    singleRun: false,
    autoWatch: true,
    colors: true,

    preprocessors: {
      'app/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify', { stage: 0 }]
      ]
    }
  });
};
