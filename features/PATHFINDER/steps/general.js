const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then('there should be a {string} on the {string} page', async function (locator, page) {
  await pages[page].assertElementExists(locator);
});

Then('there should be a {string} that includes the text {string} on the {string} page', async function (locator, text, page) {
  await pages[page].assertTextIncludes(locator, text);
});

When('I click on the {string} on the {string} page', async function (locator, page){
  await pages[page].assertElementExists(locator);
  await pages[page].click(locator);
});

When('I click on the {string} with the text {string} on the {string} page', async function (locator, text, page){
  await pages[page].assertElementExists(locator, text);
  await pages[page].click(locator, text);
});

When('I sleep', async function (){
  await driver.getDriver().sleep(1000);
});
