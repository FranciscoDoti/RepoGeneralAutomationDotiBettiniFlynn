// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const path = require('path');
const { loadConfig, loadLogin } = require('../../../app/util');
const { getDriver, sleep } = require('../../../app/driver');
const { By } = require('selenium-webdriver');

const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');

const config = loadConfig('config');

// Scenario setup
let pages = {
  navigation: new PageObject('navigation.json', stepsPath)
};

Given(/^I have opened Achieve "(.*)"$/, async function (urlKey) {
  const url = config[urlKey];
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

When('I click on sign In button on top right corner', async function () {
  try {
    await sleep(5000);
    log.debug('clicking on sigin button');
    await pages.navigation.populate('sign_in', 'click');
  } catch (err) {
    log.error(err.stack);
  }
});

When(/^I have logged in as "(.*)"$/, async function (userFile) {
  try {
    const user = loadLogin(userFile);
    log.debug(`Using user ${user.username}`);
    await pages.navigation.populate('txt_username', user.username);
    await pages.navigation.populate('txt_password', user.password);

    await pages.navigation.populate('signin_button', 'click');
    log.debug(`Login button was clicked`);
  } catch (err) {
    log.error(err.stack);
    throw err;
  }
});

Then('I sign out of Achieve', async function () {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
});

When('I click on open menu', async function () {
  try {
    log.debug('Clicking open_menu button');
    await sleep(5000);
    await pages.navigation.populate('open_menu', 'click');
    log.debug(`open_menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
