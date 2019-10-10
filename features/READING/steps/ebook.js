const { Given, When, Then } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/READING/pages/.page.js`).pages;
const _ = require('lodash');
const driver = require(`${process.cwd()}/app/driver.js`);

Then('there should be ebook content', async function () {
  if (this.environment == 'local') {
    await pages.localEbook.assertElementExists("Epub Content Frame");
  } else {
    await pages.ebook.assertElementExists("Epub Content Frame");
  }
});

When('I type {int} in the page number input', async function (pageNumber) {
  if (this.environment == 'local') {
    await pages.localEbook.populate('Page Number Input', pageNumber);
  } else {
    await pages.ebook.populate('Page Number Input', 'pageNumber');
  }
});

Given('I open a reading', async function () {
  let url = _.get(urls, ['Reading', this.stack]);
  await visitURL(url);
});

When('I click on the {string}', async function (locator) {
  await pages.localEbook.assertElementExists(locator);
  await pages.localEbook.click(locator);
});

Then('there should be a {string} with the text {int}', async function (locator, text) {
  await driver.getDriver().sleep(3000);
  await pages.localEbook.assertText(locator, text);
});
