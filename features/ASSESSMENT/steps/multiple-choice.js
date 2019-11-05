const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { hatchlinglib, raptorlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I set the number "(.*)" as the correct answwer$/, async function (correctAnswer) {
  await pages.raptor.click('Tab', 'correct');
  await pages.raptor.scrollElementIntoView('Answer Radio Button ' + correctAnswer);
  await pages.raptor.click('Answer Radio Button ' + correctAnswer);
});

Then('The variable values are displayed as choices', async function () {
  await pages.raptor.click('Cycle Variables Button');
  await raptorlib.saveItem();
  let text = await pages.raptor.getText('Choice Text 1');
  switch (text) {
    case "oak":
    case "pine":
    case "beech":
      log.info(`Correct value rendered "${text}". PASS`);
      break;
  }
});

When(/^I add \"([^\"]*)\" hatchling item with following details$/, async function (moduleType, datatable) {
  await hatchlinglib.createHatchlingEasyItem(moduleType);
  for (let i = 0; i < datatable.rows().length; i++) {
    let question = datatable.hashes()[i];
    let questionTitle = await hatchlinglib.populateQuestion(question);
    this.data.set('Question Title',questionTitle);
  }
});

When('I add the following correct answer and feedback', async function (datatable) {
  let c = datatable.hashes()[0];
  await pages.hatchlingItem.populate('Correct Answer', c.Answer);
  await pages.hatchlingItem.click('Collapsible Title', 'Correct Answer Feedback');
  await pages.hatchlingItem.populate('Correct Answer Feedback', c.Feedback);
});

When('I add the following incorrect answers and feedback', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.hatchlingItem.click('Button', 'Add Answer');
    let ans = datatable.hashes()[i];
    await pages.hatchlingItem.populate('Incorrect Answer', i + 1, ans.Answer);
    await pages.hatchlingItem.click('Collapsible Incorrect Feedback Title', i + 1);
    await pages.hatchlingItem.populate('Incorrect Answer Feedback', i + 1, ans.Feedback);
  };
});

When(/^I set hint and generic feedback with following details and save$/, async function (datatable) {
  let ans = datatable.hashes()[0];
  for (let i = 0; i < datatable.rows().length; i++) {
    let hint = datatable.hashes()[i];
    await hatchlinglib.populateHint(hint);
  }
  await hatchlinglib.clickGenericFeedback();
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Generic Feedback', ans['Generic Feedback']);
  await pages.hatchlingItem.click('Button', 'Save');
});

