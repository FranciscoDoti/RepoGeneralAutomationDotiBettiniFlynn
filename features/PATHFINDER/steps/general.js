const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then(/^there should be a "(.*)" on the "(.*)" page$/, async function (locator, page) {
  await pages[page].assertElementExists(locator);
})

When(/^I click on the "(.*)" on the "(.*)" page$/, async function (locator, page) {
  await pages[page].assertElementExists(locator);
  await pages[page].click(locator);
})

Then(/^"(.*)" on the "(.*)" page should include the text "(.*)"$/, async function (locator, page, substring) {
  await pages[page].assertTextIncludes(locator, substring);
})
