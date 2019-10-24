const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When(/^I add the following choices in "(.*)" module$/, async function (module, datatable) {
  await pages.raptor.scrollElementIntoView('Module ' + module, 1);
  await pages.raptor.click('Module ' + module, 1);
  for (let i = 0; i < datatable.rows().length; i++) {
    if (i > 1) {
      await pages.raptor.click('Add Choice Button');
    }
    await pages.raptor.populate('Choice Value Textbox', i + 1, datatable.hashes()[i].Value);
  }
});

Then('The rendered values of the variables are displayed as choices in the module', async function () {
  await pages.raptor.click('Cycle Variables Button');
  await raptorlib.saveItem();
  let text = await pages.raptor.getText('Choice Text 1');
  if (await expect(text.length).to.equal(1)) {
    log.info(`Expected length is "${1}". Actual length is "${text.length}". PASS`);
  };
});