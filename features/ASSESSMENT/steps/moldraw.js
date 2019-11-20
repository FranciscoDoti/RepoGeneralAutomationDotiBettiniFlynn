const { Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib, moldrawlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

Then('I grade Correct tab', async function () {
  await pages.raptor.click('Module MolDraw Edit', 1);
  await pages.moldraw.assertElementExists('MolDraw Static Module Checkbox');
  await pages.moldraw.click('MolDraw Static Module Checkbox');
  await pages.raptor.click('Tab', 'correct');
  await moldrawlib.draw('Single Bond');

  await raptorlib.saveItem();
  await raptorlib.checkAnswerMode();
  await moldrawlib.draw('Single Bond');
  await pages.raptor.click('Check Your Work Submit Button');

  await pages.raptor.assertText('activeTabTakeMode', 'correct1');
});

Then('I grade Incorrect tab', async function () {
  await pages.raptor.click('Module MolDraw Edit', 1);
  await pages.moldraw.assertElementExists('MolDraw Static Module Checkbox');
  await pages.moldraw.click('MolDraw Static Module Checkbox');
  await pages.raptor.click('Tab', 'correct');
  await moldrawlib.draw('Single Bond');
  await pages.raptor.click('Add Incorrect Context Button');
  await moldrawlib.draw('Double Bond');

  await raptorlib.saveItem();
  await raptorlib.checkAnswerMode();
  await moldrawlib.draw('Double Bond');
  await pages.raptor.click('Check Your Work Submit Button');

  await pages.raptor.assertText('activeTabTakeMode', 'incorrect1');
});

Then('I grade Default tab', async function () {
  await pages.raptor.click('Module MolDraw Edit', 1);
  await pages.moldraw.assertElementExists('MolDraw Static Module Checkbox');
  await pages.moldraw.click('MolDraw Static Module Checkbox');
  await pages.raptor.click('Tab', 'correct');
  await moldrawlib.draw('Single Bond');

  await raptorlib.saveItem();
  await raptorlib.checkAnswerMode();
  await moldrawlib.draw('Double Bond');
  await pages.raptor.click('Check Your Work Submit Button');

  await pages.raptor.assertText('activeTabTakeMode', 'default');
});
