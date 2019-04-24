const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const config = require('../../config/config.json');

function ThisWorld() {
  this.environment = config.environment;
  this.mode = config.executionMode;
  this.browser = config.browser;
  this.screenshots = config.screenshots;
  // this.webdriver = seleniumWebDriver; look in driver.js
  // setDefaultTimeout(config.timeout);  look in driver.js
};

setWorldConstructor(ThisWorld);