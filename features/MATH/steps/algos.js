const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;


When(/^I select Question tab and click on algos Variables button$/, async function () {
    await pages.raptorAms.click('questionContent');
    await pages.raptorAlgos.click('variables');
  });

When(/^I click on List Variable button, list algos table is added$/, async function () {
    await pages.raptorAlgos.click('algosButton', '+ List Variable');
    await pages.raptorAlgos.assertElementExists('listAlgosVariableName');
  });

  When(/^I click on Add Column and Delete Column buttons, list column is added and deleted respectively$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Add Column');
    await pages.raptorAlgos.assertElementExists('listAlgosInput');
    await pages.raptorAlgos.click('algosButton', 'Value 2');
    await pages.raptorAlgos.assertElementDoesNotExist('listAlgosInput');
  });

  When(/^I click on Add Row and Delete Row buttons, list row is added and deleted respectively$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Add Row');
    await pages.raptorAlgos.assertElementExists('rowAlgosInput');
    await pages.raptorAlgos.click('rowAlgosDelete');
    await pages.raptorAlgos.assertElementDoesNotExist('rowAlgosInput');
  });

  When(/^I click on Remove Table button, list algos table is deleted$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Remove Table');
    await pages.raptorAlgos.assertElementDoesNotExist('listAlgosVariableName');
  });
