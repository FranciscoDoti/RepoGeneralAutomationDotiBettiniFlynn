const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const execution = require('../../config/properties.json');
const config = require('../../config.js');

var options = new chrome.Options().headless();
var prefs = new seleniumWebdriver.logging.Preferences();
prefs.setLevel(seleniumWebdriver.logging.Type.BROWSER, seleniumWebdriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);

function ThisWorld() {
  var builder;

  this.environment = execution.environment;
  this.mode = execution.executionMode;
  this.browser = execution.browser;
  this.screenshots = execution.screenshots;

  switch (this.mode) {
    case 'local':
      builder = new seleniumWebdriver.Builder()
        .withCapabilities(config.capabilities)
        .build();
      break;
    case 'headless':
      builder = new seleniumWebdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .usingServer("http://selenium.local-mml.cloud:4444/wd/hub")
        .withCapabilities(config.capabilities)
        .build();
      break;
    case 'browserstack':
      builder = new seleniumWebdriver.Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(config.capabilities)
        .build();
      break;
    default:
      builder = new seleniumWebdriver.Builder()
        .usingServer('http://selenium:4444/wd/hub')
        .withCapabilities(config.capabilities)
        .build();
  };

    this.driver = builder;
    setDefaultTimeout(config.timeout);
  };

setWorldConstructor(ThisWorld);