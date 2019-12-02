const { When, Then } = require('cucumber');
const expect = require('chai').expect;
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);

When(/^I am on the AMS page and search for the item id "(.*)"$/, async function (itemId) {
  log.debug(`itemId = ${JSON.stringify(itemId)}`);
  await pages.ams.populate('filterSearch', itemId);
  await pages.ams.waitForElementVisibility('itemIdNewWindow', itemId, 10);
  await pages.ams.click('itemIdNewWindow', itemId);
  await pages.raptorAms.switchToTab('Raptor Authoring');
  await pages.raptorAms.waitForElementVisibility('staticTextfield');
});

When(/^I click Cycle Variables$/, async function () {
  await pages.raptorAms.click('cycleVariables');
  await pages.raptorAms.assertElementExists('staticTextfield');
});

Then('I verify the algos are rendered in the text module', async function () {
  // wait a few sec at first to give it a chance to render
  let text = await pages.raptorAms.getText('staticTextfield');
  log.debug(`text = ${text}`);
  expect(text).not.to.include('???');
});
