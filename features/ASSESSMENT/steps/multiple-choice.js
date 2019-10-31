const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { hatchlinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { sleep } = require(`${process.cwd()}/app/driver`);

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

When(/^I add \"([^\"]*)\" hatchling item with following details on \"([^\"]*)\"$/, async function (moduleType, type, datatable) {
  if (type === 'AMS') {
    await hatchlinglib.createHatchlingEasyItem(moduleType);
  } else if (type === 'AE') {
    await pages.hatchlingItemFrame.click('Button', 'Create Question');
    await pages.assignmentTab.click('HatchlingQuestionType', moduleType);
  }
  for (let i = 0; i < datatable.rows().length; i++) {
    let question = datatable.hashes()[i];
    let questionTitle = await hatchlinglib.populateQuestion(question, type);
    this.data.set('Question Title', questionTitle);
  }
});

When(/^I add the following correct answer and feedback on \"([^\"]*)\"$/, async function (moduleType, datatable) {
  let c = datatable.hashes()[0];
  if (moduleType === 'AMS') {
    await pages.hatchlingItem.populate('Correct Answer', c.Answer);
    await pages.hatchlingItem.click('Collapsible Title', 'Correct Answer Feedback');
    await pages.hatchlingItem.populate('Correct Answer Feedback', c.Feedback);
  } else if (moduleType === 'AE') {
    await pages.hatchlingItemFrame.populate('Correct Answer', c.Answer);
    await pages.hatchlingItemFrame.click('Collapsible Title', 'Correct Answer Feedback');
    await pages.hatchlingItemFrame.populate('Correct Answer Feedback', c.Feedback);
  }

});

When(/^I add the following incorrect answers and feedback on \"([^\"]*)\"$/, async function (moduleType, datatable) {
  if (moduleType === 'AMS') {
    for (let i = 0; i < datatable.rows().length; i++) {
      await pages.hatchlingItem.click('Button', 'Add Answer');
      let ans = datatable.hashes()[i];
      await pages.hatchlingItem.populate('Incorrect Answer', i + 1, ans.Answer);
      await pages.hatchlingItem.click('Collapsible Incorrect Feedback Title', i + 1);
      await pages.hatchlingItem.populate('Incorrect Answer Feedback', i + 1, ans.Feedback);
    };
  } else if (moduleType === 'AE') {
    for (let i = 0; i < datatable.rows().length; i++) {
      await pages.hatchlingItemFrame.click('Button', 'Add Answer');
      let ans = datatable.hashes()[i];
      await pages.hatchlingItemFrame.populate('Incorrect Answer', i + 1, ans.Answer);
      await pages.hatchlingItemFrame.click('Collapsible Incorrect Feedback Title', i + 1);
      await pages.hatchlingItemFrame.populate('Incorrect Answer Feedback', i + 1, ans.Feedback);
    };
  }
});

When(/^I set hint and generic feedback with following details and save on \"([^\"]*)\"$/, async function (moduleType, datatable) {

  let ans = datatable.hashes()[0];
  for (let i = 0; i < datatable.rows().length; i++) {
    let hint = datatable.hashes()[i];
    await hatchlinglib.populateHint(moduleType, hint);
  }
  await hatchlinglib.clickGenericFeedback(moduleType);
  if (moduleType === 'AMS') {
    await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Generic Feedback', ans['Generic Feedback']);
    await pages.hatchlingItem.click('Button', 'Save');
  } else if (moduleType === 'AE') {
    await pages.hatchlingItemFrame.populate('Hint and Generic Feedback', 'Generic Feedback', ans['Generic Feedback']);
    await pages.hatchlingItemFrame.click('Button', 'Save');
  }
  await sleep(2000);
});
When('Add the created custom question to assessment and verify it is displayed in assessment', async function () {
  let createdQuestionTitle = this.data.get('Question Title');
  await pages.customQuestion.click('Created Custom Question', createdQuestionTitle);
  await pages.customQuestion.click('Action Bar Buttons', 'Add');
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-assignment');
  await pages.customQuestion.assertElementExists('Created Custom Question', createdQuestionTitle);
});

