const {When, Then} = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;

/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */

When(/^I am on the AMS page and click open a saved raptor item$/, async function () {
  let fs = require('fs');

  // reading item id number from file
  let savedItemId = fs.readFileSync('raptor-itemId.txt').toString();
  await pages.ams.populate('filterSearch', savedItemId.split(' ')[0]);
  await pages.ams.click('itemId', savedItemId.split(' ')[0]);
});

When(/^I set the item status to live$/, async function () {
  await pages.ams.populate('itemStatus', 'Live');
  console.log("clicked live");
  await pages.ams.click('itemStatus');
  console.log("clicked itemStatus");

  await pages.ams.click('modalSave');
  console.log("clicked modalSave");
});

Then(/^I verify the item reflects status update in "(.*)" element$/, async function (element) {
  // the columnStatus page element id will be updated with data-test-id added in this sprint
  let pageText = await pages.ams.getText(element);
  expect(pageText).to.be.oneOf(['live', 'in progress', 'Algolia is Processing']);
});
