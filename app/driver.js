// ------------ Start up the cselenium webdriver ------------
const webdriver = require('selenium-webdriver');
const { log } = require('./logger');
const { loadConfig } = require('./util');

// https://stackoverflow.com/questions/49862078/protractor-and-cucumber-function-timed-out-using-async-await
var {setDefaultTimeout} = require('cucumber');

const config = loadConfig('config');

// setDefaultTimeout(60 * 500);
setDefaultTimeout(700 * 700); 
let service;

// Show Process config files
process.argv.forEach(function (val, index, array) {
  log.debug(index + ': ' + val);
});

const buildDriver = function () {
  const config = loadConfig('config');

  const browser = config && config.driver && config.driver.type ? config.driver.type : 'chrome';
  const headless = config && config.driver && config.driver.headless !== undefined ? config.driver.headless : true;
  const screen = {
    width: 640,
    height: 480
  };
  const driver = new webdriver.Builder();
  if (browser === 'chrome') {
    driver.forBrowser(browser)
      .withCapabilities(webdriver.Capabilities.chrome());
    if (headless) {
      driver.setChromeOptions(new chrome.Options().headless().windowSize(screen));
    }
    service = new chrome.ServiceBuilder(chromePath).build();
    chrome.setDefaultService(service);
  } else if (browser === 'firefox') {
    driver.forBrowser(browser)
      .withCapabilities(webdriver.Capabilities.firefox());
    if (headless) {
      driver.setFirefoxOptions(new firefox.Options().headless().windowSize(screen));
    }

    service = new firefox.ServiceBuilder(firefoxPath).build();
  } else {
    throw new Error(`Driver not found for: ${browser}`)
  }
  return driver.build();
}


module.exports = {
  build: build
};


/**
 * http://usejsdoc.org/
 */
'use strict';
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { log } = require('./logger');

var coreAutomation = function (worldData) {
  let that = {};
  that.config = require('../../../config/config.json');
  log.debug('Configuration loaded');
  that.loginAccounts = {};

  log.debug('baseURL:' + that.config['baseURL']);

  that.initChrome = function () {
    var path = require('chromedriver').path;

    var chromeService = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(chromeService);

    var driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
  };

  that.initDriver = function () {
    switch (that.config.loaddriver) {
      case 'chrome': {
        that.initChrome;
        break;
      }
      default: {
        that.initChrome;
      }
    }
  };
  that.test = function () {
    log.debug('Executing test() function in coreAutomation');
  };

  return that;
};

module.exports = coreAutomation;
