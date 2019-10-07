// ------------ Start up the chrome server ------------
const webdriver = require('selenium-webdriver');
const remote = require('selenium-webdriver/remote');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const chromedriver = require('chromedriver');
const firefoxdriver = require('geckodriver');
const { log } =  require(`${process.cwd()}/app/logger`);
const defaults = require(`${process.cwd()}/config/config.json`);
const argv = require('minimist')(process.argv.slice(2));
let driver;

const config = {
  environment : argv.env || defaults.environment,
  mode : argv.mode || defaults.mode,
  browser : argv.browser || defaults.browser,
  screenshots : argv.screenshots || defaults.screenshots,
  headless : argv.h || (argv.headless === "true" ? true : false) || defaults.headless,
  timeout : defaults.timeout*1000,
  stack: argv.stack || defaults.stack || argv.env || defaults.environment,
  reportJSON : argv.f.indexOf('json:') > -1 ? (argv.f).split(':')[1] : undefined,
  capabilities : undefined,
  datetime : new Date().toISOString()
};

const buildDriver = function() {  
  const driver = new webdriver.Builder();
  log.info(`Launching ${config.browser}`); 
  switch (config.browser.toLowerCase()) {
    case 'firefox': 
      var firefoxOptions = {
        'args':['--start-maximized','--disable-infobars'],
        'prefs':{
          'profile.content_settings.exceptions.automatic_downloads.*.setting': 1,
          'download.prompt_for_download':false,
          'download.default_directory':`${process.cwd()}/reports/downloads`
        }
      };
      var firefoxCapabilities = webdriver.Capabilities.firefox();
      firefoxCapabilities.set('firefoxOptions', firefoxOptions);
      driver.withCapabilities(firefoxCapabilities);
      if (config.headless === true) {
        driver.setFirefoxOptions(new firefox.Options().headless());
      };
      break;
    case 'safari':
      let safariOptions = {
        'args': ['--start-maximized', '--disable-infobars'],
        'prefs': {
          'profile.content_settings.exceptions.automatic_downloads.*.setting': 1,
          'download.prompt_for_download': false,
          'download.default_directory': `${process.cwd()}/reports/downloads`
        }
      }
      var safariCapabilities = webdriver.Capabilities.safari();
      safariCapabilities.set('safariOptions', safariOptions);
      driver.withCapabilities(safariCapabilities);
      break;
    case 'ie':
      log.info('IE not implement yet.');
      break;
    case 'chrome':
    default:
      chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
      var chromeOptions = {
        'args': ['--start-maximized', '--disable-infobars'],
        'prefs': {
          'profile.content_settings.exceptions.automatic_downloads.*.setting': 1,
          'download.prompt_for_download': false,
          'download.default_directory': `${process.cwd()}/reports/downloads`
        }
      };
      var chromeCapabilities = webdriver.Capabilities.chrome();
      chromeCapabilities.set('goog:chromeOptions', chromeOptions)
      driver.withCapabilities(chromeCapabilities);
      if (config.headless === true) {
        driver.setChromeOptions(new chrome.Options().headless());
      };
  }

  switch (config.mode.toLowerCase()) {
    case 'docker':
      driver.usingServer("http://chrome.local-mml.cloud:4444/wd/hub")
      break;
    case 'browserstack':
      driver.usingServer('http://hub-cloud.browserstack.com/wd/hub')
      break;
    case 'localgrid':
      driver.usingServer('http://localhost:4444/wd/hub/')
      break;
    case "hub":
      driver.usingServer('https://dev-qa-hub.mldev.cloud/wd/hub')
  }
  return driver.build();
};

driver = buildDriver();

const visitURL = async function(url){
  log.info(`Loading the url ${url} in the browser.`);
  await driver.manage().window().maximize();  
  await driver.manage().setTimeouts({ implicit: config.timeout, pageLoad: config.timeout, script: config.timeout });
  await driver.setFileDetector(new remote.FileDetector());
  await driver.get(url);
  await sleep(2000);
};

const closeBrowser = async function(){
  log.info(`Closing the browser. Current URL is ${await driver.getCurrentUrl()}.`);
  config.capabilities = await getCapabilities();
  return driver.quit();
};

const resetBrowser = async function () {
  var tabs = await driver.getAllWindowHandles();
  if (tabs.length > 1) {
    for (let index = 1; index < tabs.length; index++) {
      await switchToTab(tabs[index]);
      log.info(`Closing tab ${await getTitle()}.`);
      await driver.close();
    }
  }
  await switchToTab(tabs[0]);
  log.info(`Clearing cache and cookies. Current URL is ${await driver.getCurrentUrl()}.`);
  await driver.manage().deleteAllCookies();
  return await driver.executeScript('window.sessionStorage.clear();window.localStorage.clear();');
};

const activateTab = async function (tabName) {
  let startTimer = Date.now();
  while(Date.now() - startTimer < config.timeout){
    var tabs = await driver.getAllWindowHandles();
    for (let index = 0; index < tabs.length; index++) {
      await switchToTab(tabs[index]);
      let currentTabName = await getTitle();
      if (currentTabName.includes(tabName)) {
        log.debug(`${currentTabName} tab activated.`);
        return true;
      }
    }
    await sleep(5000);
  };
  return false;
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
    return await driver.getTitle();
  } catch (err) {
    log.error(err.stack);
  }
};

const getURL = async function () {
  try {
    return await driver.getCurrentUrl();
  } catch (err) {
    log.error(err.stack);
  }
};

const takeScreenshot = async function () {
  try {
    return await driver.takeScreenshot();
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

const getCapabilities = async function () {
  return (await driver.getCapabilities()).map_;
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

process.on('exit', function () {
  const reportPath = `${process.cwd()}/${config.reportJSON}`;
  const metadata = {
    "Browser": config.capabilities.get('browserName').toUpperCase(),
    "Browser Version": config.capabilities.get('browserVersion').toUpperCase(),
    "Platform": config.capabilities.get('platformName').toUpperCase(),
    "Environment": config.environment.toUpperCase(),
    "Stack": config.stack.toUpperCase(),
    "Executed": config.mode.toUpperCase(),
    "Date": config.datetime.split('T')[0],
    "Time": config.datetime.split('T')[1].split('.')[0]
  }
  const fs = require('fs');
  let contents = fs.readFileSync(reportPath);
  let json = JSON.parse(contents);
  for (let index = 0; index < json.length; index++) {
    json[index].metadata = metadata;
  };
  contents = JSON.stringify(json);
  fs.writeFileSync(reportPath, contents);
});

module.exports = {
  closeBrowser,
  resetBrowser,
  visitURL,
  getURL,
  getTitle,
  activateTab,
  takeScreenshot,
  getDriver,
  getWebDriver,
  getCapabilities,
  onPageLoadedWaitById,
  onWaitForElementToBeLocated,
  onWaitForWebElementToBeEnabled,
  onWaitForWebElementToBeDisabled,
  onWaitForElementToBeVisible,
  onWaitForElementToBeInvisible,
  config,
  sleep
};