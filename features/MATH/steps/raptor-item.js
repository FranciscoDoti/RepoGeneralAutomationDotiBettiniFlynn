const { When, Then } = require('cucumber');
const expect = require('chai').expect;
const { Key } = require('selenium-webdriver');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const { log } = require(`${process.cwd()}/app/logger`);


When(/^I am on the AMS page and search for the item ids$/, async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let data = datatable.hashes()[i];
    log.debug(`data = ${JSON.stringify(data)}`);

    await pages.ams.populate('filterSearch', data.itemId);
    await pages.ams.waitForElementVisibility('itemIdNewWindow', data.itemId, 10);
    await pages.ams.click('itemIdNewWindow', data.itemId);
    // await pages.raptorAms.assertAlertIsNotPresent(10);
    // then close the tab
  }
});

Then(/^I verify no window pop up message is displayed$/, async function () {
  await pages.raptorAms.assertAlertIsNotPresent(10);
});
