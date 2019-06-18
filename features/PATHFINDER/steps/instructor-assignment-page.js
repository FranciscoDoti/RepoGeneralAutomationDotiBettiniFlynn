const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const assert = require('chai').assert;
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then(/^there should be a "(.*)" on the instructor assignment page$/, async function (locator) {
  await pages.instructorAssignmentPage.assertElementExists(locator);
})

When(/^I click on the "(.*)" on the instructor assignment page$/, async function (locator) {
  await pages.instructorAssignmentPage.assertElementExists(locator);
  await pages.instructorAssignmentPage.click(locator);
})

Then(/^"(.*)" should include the text "(.*)"$/, async function (locator, substring) {
// this sleep is necessary because of a timing issue caused by not having separate identifiers
// for each of the different modals. It will be removed after LST-500 fixes this problem.
  await driver.sleep(3000);
  const string = await pages.instructorAssignmentPage.getAttributeValue(locator, 'text');
  await assert.include(string, substring);
})
