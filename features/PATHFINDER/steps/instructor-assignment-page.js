const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then(/^there should be a "(.*)" on the instructor assignment page$/, async function (locator) {
  await pages.instructorAssignment.assertElementExists(locator);
})

When(/^I click on the "(.*)" on the instructor assignment page$/, async function (locator) {
  await pages.instructorAssignment.assertElementExists(locator);
  await pages.instructorAssignment.click(locator);
})

Then(/^"(.*)" should include the text "(.*)"$/, async function (locator, substring) {
// this sleep is necessary because of a timing issue caused by not having separate identifiers
// for each of the different modals. It will be removed after LST-500 fixes this problem.
  await driver.sleep(3000);
  await pages.instructorAssignment.assertTextIncludes(locator, substring);
})
