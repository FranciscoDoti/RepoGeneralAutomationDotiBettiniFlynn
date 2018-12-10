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

When('I click on the Sign In button on the Home page', async function() {
  let qa = new selenium(this.driver);

  await qa.click(page.main.home.sign_in);
});

When(/^I have logged in as "(.*)"$/, async function(user_object) {
  let qa = new selenium(this.driver);
  let payload = require(`../../data/user/${config.environment}/${user_object}.json`);

  await qa.input(page.login.username, user.username);
  await qa.input(page.login.password, user.password);
  await qa.click(page.login.sign_in);
});

Then('I Sign Out of Achieve', async function() {
  let qa = new selenium(this.driver);

  await qa.click(page.achieve.user.button);
  await qa.click(page.achieve.user.sign_out);
});

After('@admin', async function() {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

After('@admin-save', async function() {
  await pages.createAccount.populate('save_button', 'click');
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

After('@admin-cancel', async function() {
  await pages.createAccount.populate('cancel_account', 'click');
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

When('I click on course settings', async function() {
  await pages.navigation.populate('Course_setting', 'click');
});

// use this step to delete the course and commentit when you are not using( example is available in Qual_Pm, Quant_Pm)
When('I click on delete the course', async function() {
  await pages.navigation.populate('Delete_course', 'click');
  await pages.navigation.populate('Confirm_Delete_course', 'click');
});
