// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var browserstack = require('browserstack-local');

exports.config = {
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  allScriptsTimeout: 360000,
  getPageTimeout: 360000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  commonCapabilities: {
    'name': 'radar-dashboard',
    'build': 'Protractor Local',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.local': true,
    'browserstack.debug': true,
    'resolution': '1024x768'
  },
  multiCapabilities: [
    { 'browserName': 'Chrome' },
    { 'browserName': 'Firefox' },
    { 'browserName': 'Safari' },
    { 'browserName': 'Edge' }
  ],
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 360000,
    print: function () {}
  },
  useAllAngular2AppRoots: true,
  onPrepare: function () {
    require('ts-node').register({ project: 'e2e' });
    jasmine.getEnv().addReporter(new SpecReporter());
  },
  beforeLaunch: function () {
    console.log('Connecting local');
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({
        'key': exports.config.commonCapabilities['browserstack.key']
      }, function (error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },
  afterLaunch: function () {
    return new Promise(function (resolve) {
      exports.bs_local.stop(resolve);
    });
  }
};

if (process.env['TRAVIS']) {
  exports.config.commonCapabilities['browserStack.tunnelIdentifier'] = process.env.TRAVIS_JOB_NUMBER;
  exports.config.commonCapabilities['browserStack.build'] = 'Karma Travis #' +
    process.env.TRAVIS_BUILD_NUMBER + ' [' +
    process.env.TRAVIS_BUILD_ID + ']';
}

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) {
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  }
});
