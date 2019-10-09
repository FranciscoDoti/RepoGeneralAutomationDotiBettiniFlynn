const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { raptorlib, amslib, updatelib, hatchlinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I set the number "(.*)" as the correct answwer$/, async function (correctAnswer) {
  await pages.raptor.click('Tab', 'correct');
  await pages.multipleChoice.scrollElementIntoView('Answer Radio Button ' + correctAnswer);
  await pages.multipleChoice.click('Answer Radio Button ' + correctAnswer);
});

Then('The variable values are displayed as choices', async function () {
  await pages.raptor.click('Cycle Variables Button');
  await pages.raptor.click('More Button');
  await pages.raptor.click('Save As Draft');
  let text = await pages.multipleSelect.getText('Choice Text 1');
  switch (text) {
    case "oak":
    case "pine":
    case "beech":
      log.info(`Correct value rendered "${text}". PASS`);
      break;
  }
});

When(/^I add \"([^\"]*)\" hatchling item with following details$/, async function (moduleType, datatable) {
  let code = Date.now();
  await hatchlinglib.createHatchlingEasyItem(moduleType);
  await pages.hatchlingItem.assertText('Dialog Title', 'Multiple Choice Question');
  let q = datatable.hashes()[0];
  q.QuestionTitle = q.QuestionTitle + " " + code;
  // await pages.hatchlingItem.populate('Question Title', q.QuestionTitle);
  await pages.hatchlingItem.populate('Question Prompt', q.QuestionPrompt); 
  this.data.set("Question Title",q.questionTitle);
});

When('I add the following correct answer and feedback', async function (datatable) {
  let c = datatable.hashes()[0];
  await pages.hatchlingItem.populate('Correct Answer', c.Answer);
  await hatchlinglib.clickCorrectAnsFeedback();
  await pages.hatchlingItem.populate('Correct Answer Feedback', c.Feedback);
});

When('I add the following incorrect answers and feedback', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.hatchlingItem.click('Button', 'Add Answer');
    let ans = datatable.hashes()[i];
    await pages.hatchlingItem.populate('Incorrect Answer', i+1, ans.Answer);
    await pages.hatchlingItem.click('Collapsible Incorrect Feedback Title', i+1);
    await pages.hatchlingItem.populate('Incorrect Answer Feedback', i+1, ans.Feedback);  
  };
});

When(/^I set hint and generic feedback with following details and save$/,async function (datatable) {
  let ans = datatable.hashes()[0];
  await hatchlinglib.clickHint();
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Hint', ans.Hint);
  await hatchlinglib.clickGenericFeedback();
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Generic Feedback', ans.GenericFeedback);
  await hatchlinglib.clickSaveEasyItem();
  
  // let questionTitle = this.data.get("Question Title");
  // let itemId = await pages.hatchlingItem.getText('item id', questionTitle);
  // log.info(`===============> "${itemId}". PASS`);

});
