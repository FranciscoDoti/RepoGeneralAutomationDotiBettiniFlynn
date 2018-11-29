const webdriver = require('selenium-webdriver');
const config = require('../config.js');
const process = require("process");
const minimist = require("minimist");


const buildDriver = function() {
  var builder;
  var argv = minimist(process.argv.slice(2));

  var capabilities = {
    "browserName": argv.browser || "chrome",
    "takesScreenshot": true,
    "version": argv.version
  };

  if (config.mode === 'local') {
    builder = new WebDriver.Builder()
      .withCapabilities(capabilities)
      .build();
  } else if (config.mode === 'browserstack') {
    capabilities = _.merge(capabilities, config.browserstack);

    builder = new WebDriver.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build();
  } else {
    builder = new WebDriver.Builder()
      .usingServer("http://selenium:4444/wd/hub")
      .withCapabilities(capabilities)
      .build();
  }

  return builder;
}


module.exports = {
  build: build
};