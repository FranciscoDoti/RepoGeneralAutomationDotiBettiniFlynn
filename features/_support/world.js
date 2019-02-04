const {setWorldConstructor, setDefaultTimeout} = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const config = require('../../config.js');
require('chromedriver');

function CustomWorld () {
  var builder;

  if (config.mode === 'local') {
    builder = new seleniumWebdriver.Builder()
      .withCapabilities(config.capabilities)
      .build();
  } else if (config.mode === 'browserstack') {
    builder = new seleniumWebdriver.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(config.capabilities)
      .build();
  } else if (config.mode === 'assess') {
    builder = new seleniumWebdriver.Builder()
      .usingServer('http://int.saplinglearning.me')
      .withCapabilities(config.capabilities)
      .build();
  } else {
    builder = new seleniumWebdriver.Builder()
      .usingServer('http://selenium:4444/wd/hub')
      .withCapabilities(config.capabilities)
      .build();
  }

  this.driver = builder;
  setDefaultTimeout(config.timeout);
};

setWorldConstructor(CustomWorld);
