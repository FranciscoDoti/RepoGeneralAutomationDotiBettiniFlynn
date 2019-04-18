/**
// https://stackoverflow.com/questions/49862078/protractor-and-cucumber-function-timed-out-using-async-await
*/

const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const seleniumWebDriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('../../config/properties.json');

var options = new chrome.Options().headless();
var prefs = new seleniumWebDriver.logging.Preferences();
prefs.setLevel(seleniumWebDriver.logging.Type.BROWSER, seleniumWebDriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);

function ThisWorld() {
  var builder;

  this.environment = config.environment;
  this.mode = config.executionMode;
  this.browser = config.browser;
  this.screenshots = config.screenshots;

  switch (this.mode) {
    case 'local':
      builder = new seleniumWebDriver.Builder()
        //.withCapabilities(config.capabilities)
        .forBrowser(config.browser)
        .build();
      break;
    case 'headless':
      builder = new seleniumWebDriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .usingServer("http://selenium.local-mml.cloud:4444/wd/hub")
        //.withCapabilities(config.capabilities)
        .build();
      break;
    case 'browserstack':
      builder = new seleniumWebDriver.Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        //.withCapabilities(config.capabilities)
        .forBrowser(config.browser)
        .build();
      break;
    default:
      builder = new seleniumWebDriver.Builder()
        .usingServer('http://selenium:4444/wd/hub')
        //.withCapabilities(config.capabilities)
        .forBrowser(config.browser)
        .build();
  };

    this.driver = builder;
    this.webdriver = seleniumWebDriver;

    setDefaultTimeout(config.timeout);
  };

setWorldConstructor(ThisWorld);