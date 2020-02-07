const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { canvasSAVIlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { assert } = require('chai');

When(/^I select "(.*)" in the SAVI module edit window$/, async function (dropdownOption) {
  await pages.canvasSAVI.click('Module SAVI Edit', 1);
  await pages.canvasSAVI.populate('SAVI Edit Window Dropdown', dropdownOption);
  await pages.canvasSAVI.click('SAVI Edit Window Done button');
});

Then(/^I verify that the SAVI module "(.*)" is rendered$/, async function(saviModule) {
  assert.isTrue(await canvasSAVIlib.moduleIsRendered(saviModule), `SAVI Module ${saviModule} was not rendered`)
});