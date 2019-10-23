const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I add the following choices', async function (datatable) {
  await pages.raptor.scrollElementIntoView('Module Multiple Select', 1);
  await pages.raptor.click('Module Multiple Select', 1);
  for (let i = 0; i < datatable.rows().length; i++) {
    if (i > 1) {
      await pages.multipleSelect.click('Add Choice Button');
    }
    await pages.multipleSelect.populate('Choice Value Textbox', i + 1, datatable.hashes()[i].Value);
  }
});

Then('The rendered values of the variables are displayed as choices in the module', async function () {
  await pages.raptor.click('Cycle Variables Button');
  await pages.raptor.click('More Menu');
  await pages.raptor.click('Save As Draft');
  let text = await pages.multipleSelect.getText('Choice Text 1');
  if (await expect(text.length).to.equal(1)) {
    log.info(`Expected length is "${1}". Actual length is "${text.length}". PASS`);
  };
});