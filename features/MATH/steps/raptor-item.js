const { When, Then } = require('cucumber');
const expect = require('chai').expect;
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { sleep, visitURL } = require(`${process.cwd()}/app/driver`);
const { Key } = require('selenium-webdriver');


When(/^I am on the AMS page and search for the item id "(.*)"$/, async function (itemId) {
  log.debug(`itemId = ${itemId}`);
  await pages.ams.populate('filterSearch', itemId);
  await pages.ams.waitForElementVisibility('itemIdNewWindow', itemId, 10);
  await pages.ams.click('itemIdNewWindow', itemId);
  await pages.raptorAms.switchToTab('Raptor Authoring');
  await pages.raptorAms.waitForElementVisibility('staticTextfield');
});

When(/^I click Cycle Variables$/, async function () {
  await pages.raptorAlgos.click('cycleVariables');
});

Then('I verify the algos are rendered in the text module', async function () {
  await sleep(2000); // give it a chance to render the text
  let text = await pages.raptorAms.getText('staticTextfield');
  log.debug(`text = ${text}`);
  expect(text).not.to.include('???');
});

When(/^I am on the AMS page and click the first item id$/, async function () {
  await pages.ams.click('authorModeColumn'); // sort so that Raptor Qs appear above Hatchling Qs
  await pages.ams.waitForElementVisibility('firstItemIdNewWindow');
  await pages.ams.click('firstItemIdNewWindow');
  await pages.raptorAms.switchToTab('Raptor Authoring');
});

When(/^I input "(.*)" with status "(.*)" into the author item url$/, async function (itemId, status) {
  log.debug(`itemId = "${itemId}", status = "${status}"`);
  let currentUrl = await pages.raptorAms.getCurrentURL();
  let newUrl = currentUrl.split("/");
  newUrl.splice(6,1,itemId);
  newUrl.splice(7,1,status);
  newUrl = newUrl.join("/");
  log.debug(`newUrl = "${newUrl}"`);
  await visitURL(newUrl, Key.ENTER);
  await pages.raptorAms.waitForElementVisibility('staticTextfield');
});
