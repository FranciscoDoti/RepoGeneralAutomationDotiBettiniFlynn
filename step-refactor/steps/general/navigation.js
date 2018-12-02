// features/support/steps.js
const { Given, When, Then, After } = require('cucumber');
const selenium = require('../../app/selenium.js');
const page = require('../../../page/a_master.js');
const config = require('../config/config.js');


Given(/^I have opened Achieve "(.*)"$/, async function (url) {
  await selenium.goTo(url);
});

When('I click on sign In button on top right corner', async function () {
  await sleep(5000);
  await selenium.click(page.login.signin);
  // await pages.navigation.populate('sign_in', 'click');
});

When(/^I have logged in as "(.*)"$/, async function (userObject) {
  let user = userObject || {
    username:'Generic',
    password:'Password'
  };

  await selenium.populate(page.login.username, user.username);
  await selenium.populate(page.login.password, user.password);
  await selenium.populate(page.login.signin, "click");
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
