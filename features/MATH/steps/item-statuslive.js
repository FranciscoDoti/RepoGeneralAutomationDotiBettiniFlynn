const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;

/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */

Then(/^I note the item Id and save in a temp file$/, async function () {
  let itemid = await pages.raptorAms.getText('getItemid');
  let num = itemid.split(": ")[1].split(' ')[0];
  
  this.data.set('itemId', num);
  await pages.raptorAms.switchToTab('Sapling');
});

When(/^I am on the AMS page and click open the raptor item$/, async function () {
  let savedItemId = this.data.get('itemId');
  
  await pages.ams.populate('filterSearch', savedItemId);
  await pages.ams.waitForElementVisibility('itemId', savedItemId,90);
  await pages.ams.click('itemId', savedItemId);
});

When(/^I set the item status to live$/, async function () {
  await pages.ams.populate('itemStatus', 'Live');
  await pages.ams.click('itemStatus');
  await pages.ams.click('modalSave');
});

Then(/^I verify the item reflects status update in "(.*)" element$/, async function (element) {
  // the columnStatus page element id will be updated with data-test-id added in this sprint
  let savedItemId = this.data.get('itemId');
  let pageText = await pages.ams.getText(element, savedItemId);

  expect(pageText).to.be.oneOf(['live', 'in progress', 'Algolia is Processing']);
});

