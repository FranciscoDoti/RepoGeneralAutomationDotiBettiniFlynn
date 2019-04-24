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
