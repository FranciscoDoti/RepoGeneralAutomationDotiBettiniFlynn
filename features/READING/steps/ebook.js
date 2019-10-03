const { Given, When, Then } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/READING/pages/.page.js`).pages;
const _ = require('lodash');

Then('there should be ebook content', async function () {
  await pages.ebook.assertElementExists("Epub Content Frame");
});

When('I type {int} in the page number input', async function (pageNumber) {
  if (this.environment == 'local') {
    await pages.localEbook.populate('Page Number Input', pageNumber);
  } else {
    await pages.ebook.populate('Page Number Input', '42');
  }
});

Given('I open a reading', async function () {
  let url = _.get(urls, ['Reading', this.stack]);
  await visitURL(url);
});
