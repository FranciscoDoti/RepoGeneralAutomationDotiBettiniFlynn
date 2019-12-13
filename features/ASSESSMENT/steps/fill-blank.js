const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I add a dropdown with text "(.*)" and the following options$/, async function (text, datatable) {
  await pages.raptor.click('Raptor Canvas Btns', 'edit-module-button');
  await pages.fillBlank.populate('Text', text);
  await pages.fillBlank.click('Add DropDown Button');
  for (let i = 0; i < datatable.rows().length; i++) {
    if (i > 0) {
      await pages.raptor.click('Add Choice Button');
      await pages.fillBlank.waitForElementVisibility('Choice Value Text', i+2, datatable.hashes()[i].Option);
    }
    await pages.fillBlank.populate('Choice Value Text', i+2 , datatable.hashes()[i].Option);
  }
});

When(/^I set correct answer "(.*)" for FB$/, async function (answer) {
  await pages.raptor.click('Tab', 'correct');
  await pages.fillBlank.click('DropDown');
  await pages.fillBlank.click('Option', '2');
});

Then('I check FB answer', async function () {
  await raptorlib.checkAnswerMode();
  await pages.fillBlank.click('DropDown');
  await pages.fillBlank.click('Option', '2');
  await pages.raptor.click('Check Your Work Submit Button');
  await pages.raptor.assertText('activeTabTakeMode', 'correct1');
});
