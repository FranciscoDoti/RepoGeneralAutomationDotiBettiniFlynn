const webdriver = require('selenium-webdriver');
const config = require('../config.js');
const process = require("process");
const minimist = require("minimist");
// https://stackoverflow.com/questions/49862078/protractor-and-cucumber-function-timed-out-using-async-await
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(700 * 700);



const buildDriver = function() {
  var builder;
  var capabilities;
  var argv = minimist(process.argv.slice(2));

  var capabilities = {
    "browserName": argv.browser || "chrome",
    "takesScreenshot": true,
    "version": argv.version
  };

  if (mode === 'local') {
    builder = new WebDriver.Builder()
      .withCapabilities(capabilities)
      .build();
  } else if (mode === 'browserstack') {
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
