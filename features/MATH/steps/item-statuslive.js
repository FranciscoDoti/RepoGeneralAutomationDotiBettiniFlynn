const {When, Then} = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;

/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */

When(/^I am on the AMS page and click open a saved raptor item$/, async function () {
  let fs = require('fs');

  // reading item id number from file
  let savedItemId = fs.readFileSync("raptor-itemId.txt").toString();
  await pages.ams.populate('filterSearch', savedItemId);

  //-------please discuss with me @Vibha
  await pages.undefined.click(`a[data-test-id='item-${savedItemId}']`);
});

When(/^I set the item status to live$/, async function () {
  await pages.ams.populate('itemStatus', "Live");
  await pages.ams.click('itemStatus');
  await pages.ams.click('modalSave');
});


//-------please update @Vibha
Then(/^I verify the item in "(.*)" system, with "(.*)" feature, reflects status update in "(.*)" element$/, async function (system, feature, element) {
  let pageElement = await _.get(page, [system, feature, element]);
  // the columnStatus page element id will be updated with data-test-id added in this sprint
  let pageText = await qa.getText(pageElement);
  expect(assert_text.math.statusUpdate).to.include(pageText);
});