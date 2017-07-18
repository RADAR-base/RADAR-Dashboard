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
      require('karma-coverage-istanbul-reporter'),
      require('karma-jasmine-html-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      // Include a Material theme in the test suite.
      // NOTE: Not a final solution as it should use the global styles in main.scss instead
      // https://github.com/angular/material2/issues/4056
      {
        pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
        included: true,
        watched: true
      }
    ],
    angularCli: {
      environment: 'dev'
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      config: './.angular-cli.json',
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,

    browserStack: {
      project: 'radar-dashboard',
      build: 'Karma Local',
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY
    },
    customLaunchers: {
      BS_CHROME: {
        base: 'BrowserStack',
        browser: 'chrome',
        os: 'Windows',
        os_version: '10'
      },
      BS_FIREFOX: {
        base: 'BrowserStack',
        browser: 'firefox',
        os: 'Windows',
        os_version: '10'
      },
      BS_SAFARI: {
        base: 'BrowserStack',
        browser: 'safari',
        os: 'OS X',
        os_version: 'El Capitan'
      },
      BS_EDGE: {
        base: 'BrowserStack',
        browser: 'edge',
        os: 'Windows',
        os_version: '10'
      },
      BS_IOS9: {
        base: 'BrowserStack',
        device: 'iPad Mini 4',
        os: 'ios',
        os_version: '9.1'
      }
    },
    browserDisconnectTimeout: 20000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 240000,
    captureTimeout: 240000,

    browsers: ['Chrome'] // for quick local tests
    // browsers: ['Chrome', 'BS_EDGE', 'BS_FIREFOX', 'BS_SAFARI']
  })

  if (process.env['TRAVIS']) {
    config.browserStack.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER
    config.browserStack.build = 'Karma Travis #' +
      process.env.TRAVIS_BUILD_NUMBER +
      ' [' +
      process.env.TRAVIS_BUILD_ID +
      ']'
  }
}
