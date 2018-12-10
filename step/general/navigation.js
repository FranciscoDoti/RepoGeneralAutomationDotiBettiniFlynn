const { Given, When, Then, After } = require('cucumber');
const selenium = require('../../app/selenium.js');
const page = require('../../page/a_master.js');
const URL = require('../../data/url/url.js');
const config = require('../../config.js');
const _ = require('lodash');


Given(/^I have opened "(.*)" "(.*)"$/, async function(page, endpoint) {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, [page.toLowerCase(), endpoint.toLowerCase()]);

  await qa.goTo(url);
});

When('I click on sign In button on top right corner', async function() {
  let qa = new selenium(this.driver);

  await qa.click(page.login.signin);
});

When(/^I have logged in as "(.*)"$/, async function(userObject) {
  let qa = new selenium(this.driver);
  let payload = require(`../../data/user/${config.environment}/${userObject}.json`);
  let user = payload || {
    username: 'Generic',
    password: 'Password'
  };

  await qa.input(page.login.username, user.username);
  await qa.input(page.login.password, user.password);
  await qa.click(page.login.sign_in);
});

Then('I sign out of Achieve', async function() {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
});

After('@admin', async function() {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

After('@admin-save', async function() {
  await pages.createAccount.populate('save_button', 'click');
  await sleep(3000);
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

After('@admin-cancel', async function() {
  await pages.createAccount.populate('cancel_account', 'click');
  await sleep(3000);
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

When('I click on course settings', async function() {
  await sleep(5000);
  await pages.navigation.populate('Course_setting', 'click');
});

// use this step to delete the course and commentit when you are not using( example is available in Qual_Pm, Quant_Pm)
When('I click on delete the course', async function() {
  await pages.navigation.populate('Delete_course', 'click');
  await pages.navigation.populate('Confirm_Delete_course', 'click');
});
