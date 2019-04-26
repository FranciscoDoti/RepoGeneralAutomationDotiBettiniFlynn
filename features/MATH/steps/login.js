const { Given, When } = require('cucumber');
let pages = require('../pages/_page.js').pages;

When(/^I click on the New Raptor item in the AMS page$/, async function () {
  await pages.ams.click('raptorNewItem');
});

When(/^I navigate to AuthorApp tab$/, async function () {
  await qa.changeWindow(1);
  await qa.exists(page.math.raptorAms.titleName);
});