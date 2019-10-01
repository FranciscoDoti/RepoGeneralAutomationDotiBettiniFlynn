const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/READING/pages/.page.js`).pages;

Then('there should be ebook content', async function () {
  await pages.ebook.assertElementExists("Content");
});

When('I type 42 in the page number input', async function () {
  await pages.ebook.populate('Page Number Input', '42');
});
