const {setWorldConstructor, setDefaultTimeout} = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const config = require('../../config.js');
const _ = require('lodash');
const process = require("process");
const minimist = require("minimist");
require('chromedriver');

function CustomWorld() {
  var argv = minimist(process.argv.slice(2));
  var builder;
  var capabilities = {
    "browserName": argv.browser || "chrome",
    "takesScreenshot": true,
    "version": argv.version
  };

  if (config.mode === 'local') {
    builder = new seleniumWebdriver.Builder()
      .withCapabilities(capabilities)
      .build();
  } else if (config.mode === 'browserstack') {
    capabilities = _.merge(capabilities, config.browserstack);

    builder = new seleniumWebdriver.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build();
  } else {
    builder = new seleniumWebdriver.Builder()
      .usingServer("http://selenium:4444/wd/hub")
      .withCapabilities(capabilities)
      .build();
  }

  this.driver = builder;
  setDefaultTimeout(config.timeout);
};

setWorldConstructor(CustomWorld);
