const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I add the following choices', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    if (i > 1) {
      await pages.multipleSelect.click('addChoiceButton');
    }
    await pages.multipleSelect.populate('choiceValueTextbox', i + 1, datatable.hashes()[i].Value);
  }
});

Then('The rendered values of the variables are displayed as choices in the module', async function () {
  await pages.raptor.click('cycleVariablesButton');
  await pages.raptor.click('moreButton');
  await pages.raptor.click('saveAsDraft');
  let text = await pages.multipleSelect.getText('choice1Text');
  if (await expect(text.length).to.equal(1)) {
    log.info(`Expected length is "${1}". Actual length is "${text.length}". PASS`);
  };
});