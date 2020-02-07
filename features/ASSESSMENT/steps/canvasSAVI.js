const { When, Then } = require('cucumber');
const { canvasSAVIlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { assert } = require('chai');

When(/^I select "(.*)" in the SAVI module edit panel$/, async function (dropdownOption) {
  await canvasSAVIlib.selectSAVIModule(dropdownOption, 1)
});

Then(/^I verify that the SAVI module "(.*)" is rendered$/, async function(saviModule) {
  assert.isTrue(await canvasSAVIlib.moduleIsRendered(saviModule), `SAVI Module ${saviModule} was not rendered`)
});