/**
// https://stackoverflow.com/questions/49862078/protractor-and-cucumber-function-timed-out-using-async-await
*/

const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const seleniumWebDriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('../../config/config.json');

var options = new chrome.Options().headless();
var prefs = new seleniumWebDriver.logging.Preferences();
prefs.setLevel(seleniumWebDriver.logging.Type.BROWSER, seleniumWebDriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);

function ThisWorld() {
  this.environment = config.environment;
  this.mode = config.executionMode;
  this.browser = config.browser;
  this.screenshots = config.screenshots;

  var driver = new seleniumWebDriver.Builder();
  switch (this.mode) {
    case 'local':
      driver.forBrowser(config.browser);
        //.withCapabilities(config.capabilities)
      break;
    case 'headless':
      driver.forBrowser('chrome')
        .setChromeOptions(options)
        .usingServer("http://selenium.local-mml.cloud:4444/wd/hub")
        //.withCapabilities(config.capabilities)
      break;
    case 'browserstack':
      driver.usingServer('http://hub-cloud.browserstack.com/wd/hub')
        //.withCapabilities(config.capabilities)
        .forBrowser(config.browser)
      break;
    default:
      driver.usingServer('http://selenium:4444/wd/hub')
        //.withCapabilities(config.capabilities)
        .forBrowser(config.browser)
  };

    this.driver = driver.build();
    this.webdriver = seleniumWebDriver;

    setDefaultTimeout(config.timeout);
  };

setWorldConstructor(ThisWorld);