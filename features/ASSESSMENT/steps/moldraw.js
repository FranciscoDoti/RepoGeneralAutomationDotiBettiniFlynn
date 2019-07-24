const { Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

Then('I grade Correct tab', async function () {
  await pages.moldraw.click('moldrawStaticModuleCheckbox');
  await mathpages.raptorAms.click('Correct Tab');
  await pages.moldraw.click('singleBondButton');
  await pages.moldraw.click('drawingArea');

  await mathpages.raptorAms.click('menuBarMore');
  await pages.raptor.click('checkAnswerSwitchMenu');
  await pages.moldraw.click('singleBondButton');
  await pages.moldraw.click('drawingArea');
  await mathpages.raptorAms.click('checkYourWorkSubmit');

  await pages.raptor.assertText('activeTab', 'correct1');
});

Then('I grade Incorrect tab', async function () {
  await pages.moldraw.click('moldrawStaticModuleCheckbox');
  await mathpages.raptorAms.click('Correct Tab');
  await pages.moldraw.click('singleBondButton');
  await pages.moldraw.click('drawingArea');
  await pages.raptor.click('addIncorrectContextButton');
  await pages.moldraw.click('doubleBondButton');
  await pages.moldraw.click('drawingArea');

  await mathpages.raptorAms.click('menuBarMore');
  await pages.raptor.click('checkAnswerSwitchMenu');
  await pages.moldraw.click('doubleBondButton');
  await pages.moldraw.click('drawingArea');
  await mathpages.raptorAms.click('checkYourWorkSubmit');

  await pages.raptor.assertText('activeTab', 'incorrect1');
});

Then('I grade Default tab', async function () {
  await pages.moldraw.click('moldrawStaticModuleCheckbox');
  await mathpages.raptorAms.click('Correct Tab');
  await pages.moldraw.click('singleBondButton');
  await pages.moldraw.click('drawingArea');

  await mathpages.raptorAms.click('menuBarMore');
  await pages.raptor.click('checkAnswerSwitchMenu');
  await pages.moldraw.click('doubleBondButton');
  await pages.moldraw.click('drawingArea');
  await mathpages.raptorAms.click('checkYourWorkSubmit');

  await pages.raptor.assertText('activeTab', 'default');
});
