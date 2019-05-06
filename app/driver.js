// ------------ Start up the chrome server ------------
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const chromePath = require('chromedriver').path;
const firefoxPath = require('geckodriver').path;
const { log } = require('./logger');
const config = require('../config/config.json');

let driver;
const buildDriver = function(){
  
  const driver = new webdriver.Builder();
  if(config.browser.toLowerCase() == 'chrome')
  {
    var options = new chrome.Options();
    options.addArguments(`download.default_directory=${process.cwd()}+/reports/download/`);
    
    switch (config.mode) {
      case 'local':
        driver.forBrowser('chrome')
        .setChromeOptions(options)
        //.withCapabilities(config.capabilities)
        break;
      case 'headless':
        var headlessOptions = options.headless();
        var loggingPrefs = new webdriver.logging.Preferences();
        loggingPrefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
        headlessOptions.setLoggingPrefs(loggingPrefs);

        driver.forBrowser('chrome')
          .setChromeOptions(options)
          .usingServer("http://selenium.local-mml.cloud:4444/wd/hub")
        //.withCapabilities(config.capabilities)
        break;
      case 'browserstack':
        driver.usingServer('http://hub-cloud.browserstack.com/wd/hub')
          .forBrowser('chrome')
          .setChromeOptions(options)
        //.withCapabilities(config.capabilities)
        break;
      default:
        driver.usingServer('http://selenium:4444/wd/hub')
          .forBrowser('chrome')
          .setChromeOptions(options)
        //.withCapabilities(config.capabilities)
    }
  }

  log.info(`${config.browser} browser launched.`);
  return driver.build();
};
driver = buildDriver();

const visitURL = async function(url){
  log.info(`Loading the url ${url} in the browser.`);
  await driver.manage().timeouts().implicitlyWait(config.timeout);
  return driver.get(url);
};

const closeBrowser = async function(){
  log.info(`Closing the browser. Current URL is ${await driver.getCurrentUrl()}.`);
  return driver.quit();
};

const resetBrowser = async function () {
  //close all tabs but 1
  var tabs = await driver.getAllWindowHandles();
  if (tabs.length > 1) {
    for (let index = 1; index < tabs.length; index++) {
      await switchToTab(tabs[index]);
      log.info(`Closing tab ${await getTitle()}.`);
      await driver.close();
    }
  }
  await switchToTab(tabs[0]);
  //clear cache and cookies
  log.info(`Clearing cache and cookies. Current URL is ${await driver.getCurrentUrl()}.`);
  await driver.manage().deleteAllCookies();
  return driver.executeScript('window.sessionStorage.clear();window.localStorage.clear();');
};

const activateTab = async function (tabName) {
  var masterTab = await driver.getWindowHandle();
  var tabs = await driver.getAllWindowHandles();

  for (let index = 0; index < tabs.length; index++) {
    await switchToTab(tabs[index]);
    currentTabName = await getTitle();
    if (currentTabName.includes(tabName)) {
      break;
    }
  }

  currentTabName = await getTitle();
  if (!currentTabName.includes(tabName)) {
    log.info(`${tabName} tab was not found.`);
    await switchToTab(masterTab);
  } else {
    log.debug(`${currentTabName} tab activated.`);
  }
};

const switchToTab = async function (tab) {
  try {
    await driver.switchTo().window(tab);
  } catch (err) {
    log.error(err.stack);
  }
};

const getTitle = async function () {
  try {
    return driver.getTitle();
  } catch (err) {
    log.error(err.stack);
  }
};

const getURL = async function () {
  try {
    return driver.getCurrentUrl();
  } catch (err) {
    log.error(err.stack);
  }
};

const getDriver = function () {
  return driver;
};

const getWebDriver = function () {
  return webdriver;
};

const onPageLoadedWaitById = async function (elementIdOnNextPage) {
  let by = webdriver.By.id(elementIdOnNextPage);
  log.debug(`Page Loaded - waited on id: ${elementIdOnNextPage}`);
  onWaitForElementToBeVisible(by);
}

const onWaitForElementToBeVisible = async function (element) {
  log.debug(`Waiting for element (${element}) to appear...`);
  try {
    await driver.wait(webdriver.until.elementLocated(element, 10000));
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(element)), 10000);
  } catch (err) {
    log.error(err.stack);
  }
}

const onWaitForElementToBeInvisible = async function (element) {
  log.debug(`Waiting for element to disappear...`);
  try {
    await driver.wait(webdriver.until.elementLocated(element, 10000));
    await driver.wait(webdriver.until.elementIsNotVisible(driver.findElement(element)), 15000);
  } catch (err) {
    log.error(err.stack);
  }
}

const onWaitForWebElementToBeEnabled = async function (webElement) {
  log.debug(`Waiting for webElement to become enabled...`);
  try {
    await driver.wait(webdriver.until.elementIsEnabled(webElement, 10000));
  } catch (err) {
    log.error(err.stack);
  }
}

const onWaitForWebElementToBeDisabled = async function (webElement) {
  log.debug(`Waiting for webElement to become disabled...`);
  try {
    await driver.wait(webdriver.until.elementIsDisabled(webElement), 3000);
  } catch (err) {
    log.error(err.stack);
  }
}

const onWaitForElementToBeLocated = async function (element) {
  log.debug(`Waiting for element to become located...`);
  try {
    await driver.wait(webdriver.until.elementLocated(element, 10000));
  } catch (err) {
    log.error(err.stack);
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Show Process config files
process.argv.forEach(function (val, index, array) {
  log.debug(index + ': ' + val);
});

module.exports = {
  closeBrowser,
  resetBrowser,
  visitURL,
  getURL,
  activateTab,
  getDriver,
  getWebDriver,
  onPageLoadedWaitById,
  onWaitForElementToBeLocated,
  onWaitForWebElementToBeEnabled,
  onWaitForWebElementToBeDisabled,
  onWaitForElementToBeVisible,
  onWaitForElementToBeInvisible,
  config,
  sleep
};











//let service;
// const buildDriver = function () {
//   const config = loadConfig('config');

//   const browser = config && config.driver && config.driver.type ? config.driver.type : 'chrome';
//   const headless = config && config.driver && config.driver.headless !== undefined ? config.driver.headless : true;
//   const screen = {
//     width: 640,
//     height: 480
//   };
//   const driver = new webdriver.Builder();
//   if (browser === 'chrome') {
//     driver.forBrowser(browser)
//       .withCapabilities(webdriver.Capabilities.chrome());
//     if (headless) {
//       driver.setChromeOptions(new chrome.Options().headless().windowSize(screen));
//     }
//     service = new chrome.ServiceBuilder(chromePath).build();
//     chrome.setDefaultService(service);
//   } else if (browser === 'firefox') {
//     driver.forBrowser(browser)
//       .withCapabilities(webdriver.Capabilities.firefox());
//     if (headless) {
//       driver.setFirefoxOptions(new firefox.Options().headless().windowSize(screen));
//     }

//     service = new firefox.ServiceBuilder(firefoxPath).build();
//   } else {
//     throw new Error(`Driver not found for: ${browser}`)
//   }
//   return driver.build();
// }