const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I configure the following item details', async function (datatable) {
  await mathpages.raptorAms.click('menuBarMore');
  await mathpages.raptorAms.click('moreItemDetails');
  await pages.raptor.populate('itemDetailsTitle', datatable.hashes()[0].Title);
  await pages.raptor.click('itemDetailsDoneButton');
});

When(/^I add list variables with "(.*)" rows and "(.*)" columns$/, async function (rows, columns, datatable) {
  await pages.raptor.click('variablesChevron');
  await pages.raptor.click('addListVariableButton');

  for (let col = 1; col < columns; col++) {
    await pages.raptor.click('addColumnButton');
  }

  for (let row = 1; row < rows; row++) {
    await pages.raptor.click('addRowButton');
  }

  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.raptor.populate('variableNameTextbox', i + 1, datatable.hashes()[i].Name);
    await pages.raptor.populate('variableValue1Textbox', i + 1, datatable.hashes()[i].Value1);
    await pages.raptor.populate('variableValue2Textbox', i + 1, datatable.hashes()[i].Value2);
    await pages.raptor.populate('variableTypeDropdown', i + 1, datatable.hashes()[i].Type);
  }
});

When('I add the following range algos', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.raptor.click('addRangeAlgoButton');
    await pages.raptor.populate('rangeNameTextbox', i * 2 + 1, '');
    await pages.raptor.populate('rangeNameTextbox', i * 2 + 1, datatable.hashes()[i].Name);
    await pages.raptor.populate('rangeMinimumTextbox', i * 2 + 1, datatable.hashes()[i].Minimum);
    await pages.raptor.populate('rangeMaximumTextbox', i * 2 + 1, datatable.hashes()[i].Maximum);
    await pages.raptor.populate('rangeIncrementTextbox', i * 2 + 1, datatable.hashes()[i].Increment);
  }
});

When('I add the following calculated algos', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.raptor.click('addCalculatedAlgoButton');
    await pages.raptor.populate('calculatedNameTextbox', i * 2 + 1, '');
    await pages.raptor.populate('calculatedNameTextbox', i * 2 + 1, datatable.hashes()[i].Name);
    await pages.raptor.populate('calculatedEquationTextbox', i * 2 + 1, datatable.hashes()[i].Equation);
  }
});

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