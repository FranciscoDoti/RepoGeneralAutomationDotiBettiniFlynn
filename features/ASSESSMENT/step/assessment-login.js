const { Given, Then, When } = require('cucumber');
const Selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const { sapling } = require('../../../features/_support/url');

Given('I am on the activity editor page', async function () {
  let driver = new Selenium(this.driver);
  await driver.goTo(sapling.local.empty_activity);
});

When(/I click on assignment tab$/, async function () {
  let driver = new Selenium(this.driver);
  driver.click(page.assessment.activityEditor.assignmentTab);
});

Then(/I am good$/, async function () {
  let driver = new Selenium(this.driver);
  await driver.exists(page.assessment.activityEditor.empty);
})
