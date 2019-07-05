const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver.js`);

When('I configure the following grading options', async function (datatable) {
  await mathpages.raptorAms.click('correctTab');
  for (let i = 0; i < datatable.rows().length; i++) {
    let checkboxStatus = await pages.wordAnswer.getAttributeValue('Grading Option Checkbox', datatable.hashes()[i].Option, 'selected');
    if (checkboxStatus !== datatable.hashes()[i].Value) {
      await pages.wordAnswer.click('Grading Option Checkbox', datatable.hashes()[i].Option);
    }
  }
});

When('I add the following word choices', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.wordAnswer.click('Add Choice Button');
    await pages.wordAnswer.populate('Word Choice Textbox', i + 1, datatable.hashes()[i].Word);
  }
});

Then('I grade the following words', async function (datatable) {
  await pages.raptor.click('moreButton');
  await pages.raptor.click('saveAsDraft');
  await driver.sleep(3000);
  await mathpages.raptorAms.click('menuBarMore');
  await pages.raptor.click('checkAnswerSwitchMenu');

  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.wordAnswer.populate('Word Answer Textbox', '');
    await pages.wordAnswer.populate('Word Answer Textbox', datatable.hashes()[i].Word);
    await mathpages.raptorAms.click('checkYourWorkSubmit');
    await pages.raptor.assertText('activeTab', datatable.hashes()[i].Result);
  }
});
