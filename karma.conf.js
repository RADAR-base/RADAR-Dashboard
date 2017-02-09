// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-browserstack-launcher'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('@angular/cli/plugins/karma'),
    ],
    files: [
      { pattern: './src/test.ts', watched: false },
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli'],
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov',
      },
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev',
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'karma-remap-istanbul']
      : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,

    browserStack: {
      project: 'radar-dashboard',
      build: 'Karma Local',
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },
    customLaunchers: {
      'BS_CHROME': {
        base: 'BrowserStack',
        browser: 'chrome',
        os: 'Windows',
        os_version: '10',
      },
      'BS_FIREFOX': {
        base: 'BrowserStack',
        browser: 'firefox',
        os: 'Windows',
        os_version: '10',
      },
      'BS_SAFARI': {
        base: 'BrowserStack',
        browser: 'safari',
        os: 'OS X',
        os_version: 'El Capitan',
      },
      'BS_EDGE': {
        base: 'BrowserStack',
        browser: 'edge',
        os: 'Windows',
        os_version: '10',
      },
      'BS_IOS9': {
        base: 'BrowserStack',
        device: 'iPad Mini 4',
        os: 'ios',
        os_version: '9.1',
      },
    },
    browserDisconnectTimeout: 20000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 240000,
    captureTimeout: 240000,

    // browsers: ['Chrome'],
    browsers: ['Chrome', 'BS_EDGE', 'BS_FIREFOX'],
  });

  if (process.env['TRAVIS']) {
    config.browserStack.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    config.browserStack.build = 'Karma Travis #' +
      process.env.TRAVIS_BUILD_NUMBER + ' [' +
      process.env.TRAVIS_BUILD_ID + ']';
  }
};
