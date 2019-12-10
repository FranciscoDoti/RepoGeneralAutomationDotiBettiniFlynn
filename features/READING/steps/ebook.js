const { Given, When, Then, Before } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const urls = require(`${process.cwd()}/config/urls.json`);
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/READING/pages/.page.js`).pages;
let page

Before('@GetEnvironment', function () {
  if (this.environment == 'local') {
    page = 'localEbook';
  } else {
    page = 'ebook';
  }
})

Given('I open a reading', async function () {
  let url = _.get(urls, ['Reading', this.stack]);
  await visitURL(url);
});

Then('there should be ebook content', async function () {
  await pages[page].assertElementExists("Epub Content Frame");
});

When('I type {int} in the page number input', async function (pageNumber) {
  await pages[page].populate('Page Number Input', pageNumber);
});

When('I click on the {string}', async function (locator) {
  await pages[page].assertElementExists(locator);
  await pages[page].click(locator);
});

Then('there should be a {string} with the text {string}', async function (locator, text) {
  await pages[page].assertText(locator, text);
});

Then('there should be a {string} that includes the text {string}', async function (locator, text) {
  await pages[page].assertTextIncludes(locator, text);
})
