const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { sleep } = require(`${process.cwd()}/app/driver`);

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

When('I add hatchling item as {string} with following details', async function (string, datatable) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  date = mm + '/' + dd + '/' + yyyy;
  time = hours+":"+minutes+":"+seconds;
  await pages.ams.click('Add Item', 'Easy');
  await pages.ams.click('easyItemMultipleChoice');
  
  for (let i = 0; i < datatable.rows().length; i++) {
  await pages.hatchlingItem.populate('Question Title', datatable.hashes()[i].QuestionTitle+" : "+date+" , "+time);
  await pages.hatchlingItem.populate('Question Prompt', datatable.hashes()[i].QuestionPrompt); 
  }
});

Then(/^I verify the items were updated in AMS$/, async function () {
  
});

When('I add the following correct answer and feedback', async function (datatable) {
  let ans = datatable.hashes()[0];
  await pages.hatchlingItem.populate('Correct Answer', ans.Answer);
  await pages.hatchlingItem.click('Collapsible Title','Correct Answer Feedback');
  await pages.hatchlingItem.populate('Correct Answer Feedback', ans.Feedback);
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
  await pages.hatchlingItem.click('Collapsible Title', 'Hint');
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Hint', ans.Hint);
  await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
  await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Generic Feedback', ans.GenericFeedback);
  await pages.hatchlingItem.click('Button', 'Save');

});