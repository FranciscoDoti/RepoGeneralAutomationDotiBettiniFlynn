// features/support/steps.js
const { Given, When, Then, After } = require('cucumber');
const { loadConfig, loadLogin } = require('../../../app/util');
const { getDriver, sleep } = require('../../../app/driver');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');

const config = loadConfig('config');

// Scenario setup
let pages = {
  navigation: new PageObject('navigation.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath)
};

Given(/^I have opened Achieve "(.*)"$/, async function (urlKey) {
  const url = config[urlKey];
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

When('I click on sign In button on top right corner', async function () {
  await sleep(5000);
  log.debug('clicking on sigin button');
  await pages.navigation.populate('sign_in', 'click');
});

When(/^I have logged in as "(.*)"$/, async function (userFile) {
  const user = loadLogin(userFile);
  log.debug(`Using user ${user.username}`);
  await pages.navigation.populate('txt_username', user.username);
  await pages.navigation.populate('txt_password', user.password);
  await pages.navigation.populate('signin_button', 'click');
  log.debug(`Login button was clicked`);
});

Then('I sign out of Achieve', async function () {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
});

After('@admin', async function () {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

After('@admin-save', async function () {
  await pages.createAccount.populate('save_button', 'click');
  await sleep(3000);
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

After('@admin-cancel', async function () {
  await pages.createAccount.populate('cancel_account', 'click');
  await sleep(3000);
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

When('I click on course settings', async function () {
  log.debug('Clicking course settings button');
  await sleep(5000);
  await pages.navigation.populate('Course_setting', 'click');
});
// use this step to delete the course and commentit when you are not using( example is available in Qual_Pm, Quant_Pm)
When('I click on delete the course', async function () {
  await pages.navigation.populate('Delete_course', 'click');
  await pages.navigation.populate('Confirm_Delete_course', 'click');
});

// AfterAll(function () {
//   getDriver().quit();
//   return Promise.resolve();
// });