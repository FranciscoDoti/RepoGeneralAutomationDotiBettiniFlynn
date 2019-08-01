const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

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
  await pages.raptor.click('More Button');
  await pages.raptor.click('Save As Draft');
  await mathpages.raptorAms.click('menuBarMore');
  await pages.raptor.click('Check Answer Switch Menu');

  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.wordAnswer.populate('Word Answer Textbox', datatable.hashes()[i].Word);
    await pages.raptor.click('Check Your Work Submit Button');
    await pages.raptor.assertText('activeTab', datatable.hashes()[i].Result);
  }
});
