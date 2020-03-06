const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;


When(/^I select Question tab and click on algos Variables button$/, async function () {
    await pages.raptorAms.click('questionContent');
    await pages.raptorAlgos.click('variables');
  });

When(/^I click on List Variable button, list algos table is added$/, async function () {
    await pages.raptorAlgos.click('algosButton', '+ List Variable');
    await pages.raptorAlgos.assertElementExists('variableName1ListAlgos');
  });

  When(/^I click on Add Column and Delete Column buttons, list column is added and deleted respectively$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Add Column');
    await pages.raptorAlgos.assertElementExists('row1Column2ListAlgos');
    await pages.raptorAlgos.click('algosButton', 'Value 2');
    await pages.raptorAlgos.assertElementDoesNotExist('row1Column2ListAlgos');
  });

  When(/^I click on Add Row and Delete Row buttons, list row is added and deleted respectively$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Add Row');
    await pages.raptorAlgos.assertElementExists('row2ListAlgos');
    await pages.raptorAlgos.click('row2ListAlgosDelete');
    await pages.raptorAlgos.assertElementDoesNotExist('row2ListAlgos');
  });

  When(/^I click on Remove Table button, list algos table is deleted$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Remove Table');
    await pages.raptorAlgos.assertElementDoesNotExist('variableName1ListAlgos');
  });
