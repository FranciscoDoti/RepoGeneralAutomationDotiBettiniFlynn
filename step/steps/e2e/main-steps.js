// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const path = require('path');
const assert = require('assert');

const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { getDriver, sleep } = require('../../../app/driver');
const { loadConfig, loadLogin } = require('../../../app/util');
const { log } = require('../../../app/logger');
/*
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
*/

let pages = {
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath)
};

Given('I am on MacMillanLearning.com', async function () {
  const config = await loadConfig('config');
  log.debug(`Loading URL ${config.loginURL}`);
  await getDriver().get(config.loginURL);
  await sleep(2000);
});

When('I click the login button', async function () {
  try {
    log.debug('Clicking on login button');
    const clickedButton = await pages.mainPage.populate('btn_login', 'click');
    log.debug(`Login button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err.stack);
  }
});

When(/^I click by id "(.*)" button$/, async function (buttonLabel) {
  try {
    log.debug('Clicking on login button');
    const clickedButton = await pages.login.populate(buttonLabel, 'click');
    log.debug(`Clicked button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err.stack);
  }
});

Then('I should be on the login screen', async function () {
  log.debug('Checking that we are on the login screen');
  const onLoginPage = await pages.login.getElement('btn_signin');
  assert(onLoginPage, 'Expected to be on Login page');
});

When(/^I enter "(.*)" and "(.*)"$/, async function (username, password) {
  const loginFile = await loadLogin('failed');
  log.debug(`Entering username: ${loginFile.username} and password`);
  await pages.login.populate('txt_username', loginFile.username);
  await pages.login.populate('txt_password', loginFile.password);
});

When(/^I save a variable "(.*)"$/, async function (saveVariable) {
  await pages.login.parse(saveVariable);
});
When('I test things', function () {
  log.debug('test steps:' + pages.mainPage.name);
});

Then(/^I should get a message that says "(.*)"$/, async function (message) {
  await pages.login.assertText('txt_loginFailed', message);
});
