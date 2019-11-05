const {setWorldConstructor, setDefaultTimeout} = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('../../config.js');
var options = new chrome.Options().headless();
var prefs = new seleniumWebdriver.logging.Preferences();

prefs.setLevel(seleniumWebdriver.logging.Type.BROWSER, seleniumWebdriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);

require('chromedriver');

function CustomWorld () {
  var builder;

  if (config.mode === 'local-achieve') {
    if (JSON.parse(config.headless)) {
      builder = new seleniumWebdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .usingServer("http://selenium.local-mml.cloud:4444/wd/hub")
        .withCapabilities(config.capabilities)
        .build();
    } else {
      builder = new seleniumWebdriver.Builder()
        .withCapabilities(config.capabilities)
        .build();
    }
  } else if (config.mode === 'local') {
    builder = new seleniumWebdriver.Builder()
      .withCapabilities(config.capabilities)
      .build();
  } else if (config.mode === 'browserstack') {
    builder = new seleniumWebdriver.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
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
